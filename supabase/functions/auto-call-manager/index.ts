import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.52.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-system-health-token",
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}

async function requireInternal(req: Request, url: string, anonKey: string, serviceKey: string) {
  const authorization = req.headers.get("Authorization") || "";
  if (authorization === `Bearer ${serviceKey}`) return;

  const admin = createClient(url, serviceKey);
  const systemToken = req.headers.get("x-system-health-token") || "";
  if (systemToken) {
    const { data: valid } = await admin.rpc("verify_system_health_alert_token", { p_token: systemToken });
    if (valid === true) return;
  }

  if (authorization) {
    const userClient = createClient(url, anonKey, { global: { headers: { Authorization: authorization } } });
    const { data: { user }, error } = await userClient.auth.getUser();
    if (!error && user) {
      const { data: allowed } = await admin.rpc("is_admin", { user_id: user.id });
      if (allowed === true) return;
    }
  }

  throw new Error("Internal authorization required");
}

async function callFunction(url: string, serviceKey: string, slug: string, body: Record<string, unknown>) {
  const response = await fetch(`${url}/functions/v1/${slug}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${serviceKey}`, apikey: serviceKey, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const text = await response.text();
  let payload: Record<string, unknown> = {};
  try { payload = text ? JSON.parse(text) : {}; } catch { payload = { error: text || `HTTP ${response.status}` }; }
  return { ok: response.ok, status: response.status, payload };
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const urlObject = new URL(req.url);
  if (req.method === "GET" && (urlObject.searchParams.get("action") || "status") === "status") {
    return json({
      success: true,
      deprecatedColdAutoCall: true,
      coldAutoCallEnabled: false,
      consentedMarketingAutomationEnabled: true,
      message: "Cold AI auto-calling stays disabled. This manager now runs only consented storefront AI follow-ups and opted-in local SMS updates.",
    });
  }

  if (req.method !== "POST") return json({ success: false, error: "Method not allowed" }, 405);

  try {
    const url = Deno.env.get("SUPABASE_URL") || "";
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    if (!url || !anonKey || !serviceKey) throw new Error("Supabase configuration missing");
    await requireInternal(req, url, anonKey, serviceKey);

    const body = await req.json().catch(() => ({}));
    const action = String(body.action || "run_consented_marketing");
    if (action !== "run_consented_marketing") return json({ success: false, error: `Unknown action: ${action}` }, 400);

    const [calls, sms] = await Promise.all([
      callFunction(url, serviceKey, "queue-callout", { source: "consented_marketing_scheduler" }),
      callFunction(url, serviceKey, "storefront-sms-quote", { action: "process_local_updates", source: "consented_marketing_scheduler" }),
    ]);

    return json({
      success: true,
      coldAutoCallEnabled: false,
      calls: calls.payload,
      sms: sms.payload,
      downstream: { callsStatus: calls.status, smsStatus: sms.status },
      ranAt: new Date().toISOString(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Automation failed";
    console.error("[auto-call-manager]", error);
    return json({ success: false, error: message }, message.includes("authorization") ? 401 : 500);
  }
});
