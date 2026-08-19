import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.52.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
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

function addOneCalendarMonth(value: Date) {
  const next = new Date(value);
  const day = next.getUTCDate();
  next.setUTCDate(1);
  next.setUTCMonth(next.getUTCMonth() + 1);
  const lastDay = new Date(Date.UTC(next.getUTCFullYear(), next.getUTCMonth() + 1, 0)).getUTCDate();
  next.setUTCDate(Math.min(day, lastDay));
  return next;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ success: false, error: "Method not allowed" }, 405);

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    if (!supabaseUrl || !anonKey || !serviceKey) throw new Error("Supabase configuration is incomplete");

    await requireAdminOrService(req, supabaseUrl, anonKey, serviceKey);
    const body = await req.json();
    const phone = normalizePhone(body.phone_number);
    if (!phone) return json({ success: false, error: "Enter a valid Canadian or US phone number" }, 400);

    const contactType = body.contact_type === "storefront" ? "storefront" : "residential";
    const leadId = typeof body.lead_id === "string" ? body.lead_id : null;
    const leadSource = body.lead_source === "storefronts" ? "storefronts" : "storefront_call_leads";
    const isRetry = Boolean(body.is_retry);
    const skipDuplicateCheck = Boolean(body.skipDuplicateCheck);
    const supabase = createClient(supabaseUrl, serviceKey);

    let storefrontLead: Record<string, any> | null = null;
    if (contactType === "storefront") {
      if (leadSource !== "storefront_call_leads" || !leadId) {
        return json({
          success: false,
          consentRequired: true,
          error: "Direct storefront AI calls are disabled. Use the Outbound Calls lead workflow so cold leads go to a live caller and only consented leads use AI.",
        }, 409);
      }

      const { data: lead, error: leadError } = await supabase
        .from("storefront_call_leads")
        .select("id,phone,do_not_call,call_permission,ai_call_consent,ai_call_consent_at,ai_call_consent_source,ai_call_consent_revoked_at,ai_call_frequency,ai_next_call_at,ai_last_call_at,consent_phone")
        .eq("id", leadId)
        .maybeSingle();

      if (leadError || !lead) return json({ success: false, error: "Storefront lead not found" }, 404);
      storefrontLead = lead;
      if (lead.do_not_call) return json({ success: false, error: "This lead is marked do not call" }, 409);
      if (lead.call_permission === false) return json({ success: false, error: "Calling is disabled for this lead" }, 409);
      if (lead.ai_call_consent_revoked_at) return json({ success: false, consentRequired: true, error: "AI-call consent was revoked for this lead" }, 409);

      const hasConsentProof = Boolean(
        lead.ai_call_consent &&
        lead.ai_call_consent_at &&
        String(lead.ai_call_consent_source || "").trim(),
      );
      if (!hasConsentProof) {
        return json({ success: false, consentRequired: true, error: "AI storefront call blocked: no documented express consent. Use the live human caller workflow instead." }, 409);
      }

      const frequency = String(lead.ai_call_frequency || "one_time");
      if (frequency === "none") {
        return json({ success: false, consentRequired: true, error: "AI storefront call blocked: consent has no active call frequency." }, 409);
      }

      const storedPhone = normalizePhone(lead.phone);
      const consentPhone = normalizePhone(lead.consent_phone);
      if (frequency === "monthly" && (!consentPhone || consentPhone !== phone || storedPhone !== phone)) {
        return json({ success: false, consentRequired: true, error: "Monthly AI-call consent does not match the phone number being called." }, 409);
      }
      if (frequency === "one_time" && consentPhone && consentPhone !== phone) {
        return json({ success: false, consentRequired: true, error: "AI-call consent does not match the phone number being called." }, 409);
      }

      if (frequency === "one_time" && lead.ai_last_call_at) {
        return json({ success: false, consentRequired: true, error: "The one-time AI-call consent for this lead has already been used." }, 409);
      }

      if (frequency === "monthly" && lead.ai_next_call_at) {
        const nextEligible = new Date(lead.ai_next_call_at).getTime();
        if (Number.isFinite(nextEligible) && nextEligible > Date.now()) {
          return json({
            success: false,
            cadenceBlocked: true,
            nextEligibleAt: lead.ai_next_call_at,
            error: "Monthly AI-call cadence blocked: this lead is not due yet.",
          }, 409);
        }
      }
    }

    if (!isRetry && !skipDuplicateCheck) {
      const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      const { data: existing } = await supabase
        .from("call_logs")
        .select("id,status")
        .eq("phone_number", phone)
        .gte("attempted_at", cutoff)
        .not("status", "in", '("failed","canceled")')
        .limit(1);
      if (existing?.length) return json({ success: false, duplicate: true, error: "This number was already called in the last 24 hours" }, 409);
    }

    if (body.dry_run === true) {
      return json({
        success: true,
        dryRun: true,
        to: phone,
        contactType,
        leadId,
        leadSource,
        cadence: storefrontLead?.ai_call_frequency || null,
      });
    }

    const accountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
    const authToken = Deno.env.get("TWILIO_AUTH_TOKEN");
    const fromNumber = Deno.env.get("TWILIO_FROM_NUMBER");
    if (!accountSid || !authToken || !fromNumber) throw new Error("Twilio credentials are incomplete");

    const projectRef = new URL(supabaseUrl).hostname.split(".")[0];
    const twimlParams = new URLSearchParams({
      storefront: contactType === "storefront" ? "true" : "false",
      businessName: String(body.business_name || "BC Pressure Washing"),
      leadSource,
    });
    if (leadId) twimlParams.set("leadId", leadId);

    const callUrl = `https://${projectRef}.supabase.co/functions/v1/call-twiml?${twimlParams.toString()}`;
    const statusUrl = `https://${projectRef}.supabase.co/functions/v1/call-status`;
    const twilioBody = new URLSearchParams({
      To: phone,
      From: fromNumber,
      Url: callUrl,
      Timeout: "25",
      StatusCallback: statusUrl,
    });
    for (const event of ["initiated", "ringing", "answered", "completed"]) {
      twilioBody.append("StatusCallbackEvent", event);
    }

    const twilioResponse = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Calls.json`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(`${accountSid}:${authToken}`)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: twilioBody,
    });

    const responseText = await twilioResponse.text();
    if (!twilioResponse.ok) return json({ success: false, error: `Twilio rejected the call (${twilioResponse.status})` }, 502);

    const callData = JSON.parse(responseText);
    const now = new Date();
    const nowIso = now.toISOString();

    const { error: logError } = await supabase.from("call_logs").insert({
      phone_number: phone,
      session_id: body.session_id || null,
      user_id: body.user_id || null,
      page_path: body.page_path || (contactType === "storefront" ? "/admin/outbound-calls" : null),
      call_sid: callData.sid,
      status: callData.status || "queued",
      attempted_at: nowIso,
      call_type: contactType,
      storefront_lead_id: leadSource === "storefront_call_leads" ? leadId : null,
      storefront_id: leadSource === "storefronts" ? leadId : null,
      agent_summary: contactType === "storefront" ? `Consented storefront IVR call to ${body.business_name || "unknown"}` : "Residential IVR call",
    });
    if (logError) console.error("[start-call] Call started but logging failed", logError);

    if (contactType === "storefront" && leadId && storefrontLead) {
      const frequency = String(storefrontLead.ai_call_frequency || "one_time");
      const nextCall = frequency === "monthly" ? addOneCalendarMonth(now).toISOString() : null;
      const { error: cadenceError } = await supabase
        .from("storefront_call_leads")
        .update({
          ai_last_call_at: nowIso,
          ai_next_call_at: nextCall,
          last_called_at: nowIso,
          updated_at: nowIso,
        })
        .eq("id", leadId);
      if (cadenceError) console.error("[start-call] Call started but cadence update failed", cadenceError);
    }

    return json({
      success: true,
      mode: "ai",
      callSid: callData.sid,
      status: callData.status || "queued",
      to: phone,
      nextEligibleAt: storefrontLead?.ai_call_frequency === "monthly" ? addOneCalendarMonth(now).toISOString() : null,
      message: `Call queued to ${phone}`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to start call";
    const status = message.includes("Authentication") ? 401 : message.includes("Admin") ? 403 : 500;
    console.error("[start-call]", message);
    return json({ success: false, error: message }, status);
  }
});
