import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.52.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-system-health-token",
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function requireAdminOrService(req: Request, url: string, anonKey: string, serviceKey: string) {
  const authorization = req.headers.get("Authorization") || "";
  if (authorization === `Bearer ${serviceKey}`) return;

  const client = createClient(url, anonKey, { global: { headers: { Authorization: authorization } } });
  const { data: { user }, error } = await client.auth.getUser();
  if (error || !user) throw new Error("Authentication required");

  const admin = createClient(url, serviceKey);
  const { data: allowed, error: adminError } = await admin.rpc("is_admin", { user_id: user.id });
  if (adminError || !allowed) throw new Error("Admin access required");
}

function normalizePhone(value: unknown): string | null {
  let digits = String(value || "").replace(/\D/g, "");
  if (digits.length === 10) digits = `1${digits}`;
  if (digits.length !== 11 || !digits.startsWith("1")) return null;
  return `+${digits}`;
}

function withinBusinessHours() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Vancouver",
    weekday: "short",
    hour: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const weekday = parts.find((part) => part.type === "weekday")?.value;
  const hour = Number(parts.find((part) => part.type === "hour")?.value || 0);
  return weekday !== "Sat" && weekday !== "Sun" && hour >= 9 && hour < 17;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ success: false, error: "Method not allowed" }, 405);

  try {
    const url = Deno.env.get("SUPABASE_URL") || "";
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    if (!url || !anonKey || !serviceKey) throw new Error("Supabase configuration missing");

    await requireAdminOrService(req, url, anonKey, serviceKey);

    if (!withinBusinessHours()) {
      return json({ success: true, called: 0, outsideBusinessHours: true, message: "Consented AI queue is limited to 9 AM–5 PM Pacific on weekdays" });
    }

    const supabase = createClient(url, serviceKey);
    const now = new Date();
    const nowIso = now.toISOString();
    const { data: candidates, error } = await supabase
      .from("storefront_call_leads")
      .select("id,business_name,phone,status,attempts,last_called_at,do_not_call,call_permission,ai_call_consent,ai_call_consent_at,ai_call_consent_source,ai_call_consent_revoked_at,ai_call_frequency,ai_next_call_at,ai_last_call_at,consent_phone")
      .eq("do_not_call", false)
      .eq("call_permission", true)
      .eq("ai_call_consent", true)
      .is("ai_call_consent_revoked_at", null)
      .not("ai_call_consent_at", "is", null)
      .not("ai_call_consent_source", "is", null)
      .not("status", "in", "(not_interested,wrong_number,do_not_call,booked,lost)")
      .order("ai_next_call_at", { ascending: true, nullsFirst: true })
      .order("created_at", { ascending: true })
      .limit(100);
    if (error) throw error;

    const eligible = (candidates || []).filter((lead) => {
      const frequency = String(lead.ai_call_frequency || "one_time");
      if (!String(lead.ai_call_consent_source || "").trim()) return false;
      const phone = normalizePhone(lead.phone);
      if (!phone) return false;

      if (frequency === "one_time") {
        if (lead.ai_last_call_at) return false;
        const consentPhone = normalizePhone(lead.consent_phone);
        return !consentPhone || consentPhone === phone;
      }

      if (frequency === "monthly") {
        const consentPhone = normalizePhone(lead.consent_phone);
        if (!consentPhone || consentPhone !== phone) return false;
        if (!lead.ai_next_call_at) return true;
        const dueAt = new Date(lead.ai_next_call_at).getTime();
        return Number.isFinite(dueAt) && dueAt <= now.getTime();
      }
      return false;
    }).slice(0, 5);

    if (!eligible.length) return json({ success: true, called: 0, message: "No consented storefront leads are due for an AI call" });

    const results: Array<Record<string, unknown>> = [];
    for (const lead of eligible) {
      try {
        const response = await fetch(`${url}/functions/v1/start-call`, {
          method: "POST",
          headers: { "Content-Type": "application/json", apikey: serviceKey, Authorization: `Bearer ${serviceKey}` },
          body: JSON.stringify({
            phone_number: lead.phone,
            contact_type: "storefront",
            business_name: lead.business_name,
            lead_id: lead.id,
            lead_source: "storefront_call_leads",
            session_id: `storefront-lead:${lead.id}`,
            page_path: "/admin/outbound-calls",
          }),
        });
        const responseText = await response.text();
        let callResult: Record<string, unknown> = {};
        try { callResult = responseText ? JSON.parse(responseText) : {}; } catch { callResult = { error: responseText || `start-call returned ${response.status}` }; }
        if (!response.ok || callResult.success !== true) throw new Error(String(callResult.error || `start-call returned ${response.status}`));

        await supabase.from("storefront_call_leads").update({
          status: "queued",
          attempts: Number(lead.attempts || 0) + 1,
          last_call_error: null,
          updated_at: nowIso,
        }).eq("id", lead.id);

        results.push({ leadId: lead.id, business: lead.business_name, success: true, callSid: callResult.callSid || null, cadence: lead.ai_call_frequency, nextEligibleAt: callResult.nextEligibleAt || null });
      } catch (error) {
        const message = error instanceof Error ? error.message : "Call failed";
        await supabase.from("storefront_call_leads").update({ last_call_error: message, updated_at: new Date().toISOString() }).eq("id", lead.id);
        results.push({ leadId: lead.id, business: lead.business_name, success: false, error: message });
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    const called = results.filter((result) => result.success === true).length;
    return json({ success: called > 0, called, attempted: results.length, message: `Started ${called} of ${results.length} due consented AI calls`, results }, called > 0 ? 200 : 502);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Queue failed";
    const status = message.includes("Authentication") ? 401 : message.includes("Admin") ? 403 : 500;
    console.error("[queue-callout]", error);
    return json({ success: false, error: message }, status);
  }
});
