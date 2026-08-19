import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const PUBLIC_SITE_ORIGIN = "https://bcpressurewashing.ca";
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const adminClient = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

function corsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("origin") || "";
  const allowed =
    origin === "https://bcpressurewashing.ca" ||
    origin === "https://www.bcpressurewashing.ca" ||
    /^https:\/\/[a-z0-9-]+(?:\.[a-z0-9-]+)*\.vercel\.app$/i.test(origin) ||
    /^https:\/\/[a-z0-9-]+(?:\.[a-z0-9-]+)*\.lovable\.app$/i.test(origin) ||
    /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin);
  return {
    "Access-Control-Allow-Origin": allowed ? origin : PUBLIC_SITE_ORIGIN,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Cache-Control": "no-store",
    Vary: "Origin",
  };
}

function json(req: Request, body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders(req) },
  });
}

function normalizePhone(value: unknown): string {
  if (typeof value !== "string" || !value.trim()) return "";
  let digits = value.replace(/\D/g, "");
  if (digits.length === 10) digits = `1${digits}`;
  if (digits.length !== 11 || !digits.startsWith("1")) {
    throw new Error("Enter a valid Canadian or US phone number.");
  }
  return `+${digits}`;
}

function normalizeEmail(value: unknown): string {
  if (typeof value !== "string" || !value.trim()) return "";
  const email = value.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Enter a valid customer email.");
  return email;
}

function newInviteToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function inviteUrl(sessionId: string, token: string): string {
  return `${PUBLIC_SITE_ORIGIN}/virtual-estimate/${sessionId}?token=${encodeURIComponent(token)}`;
}

async function requireAdmin(req: Request): Promise<boolean> {
  const authorization = req.headers.get("authorization") || "";
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  const accessToken = match?.[1]?.trim() || "";
  if (!accessToken) return false;

  const { data: userData, error: userError } = await adminClient.auth.getUser(accessToken);
  if (userError || !userData.user) return false;

  const { data: isAdmin, error: adminError } = await adminClient.rpc("is_admin", { user_id: userData.user.id });
  return !adminError && isAdmin === true;
}

async function deliverInvite(params: {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  url: string;
}) {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/send-virtual-estimate-sms`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      apikey: SERVICE_ROLE_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customerName: params.customerName,
      customerPhone: params.customerPhone,
      customerEmail: params.customerEmail,
      sessionUrl: params.url,
      requestType: "invite",
    }),
  });
  const payload = await response.json().catch(() => ({}));
  return { ok: response.ok && payload?.success !== false, payload };
}

serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders(req) });
  if (req.method !== "POST") return json(req, { error: "Method not allowed" }, 405);

  try {
    if (!await requireAdmin(req)) return json(req, { error: "Admin access required" }, 403);
    const body = await req.json().catch(() => ({}));
    const action = typeof body.action === "string" ? body.action.trim().toLowerCase() : "create";

    if (action === "create") {
      const customerName = typeof body.customerName === "string" ? body.customerName.trim().slice(0, 120) : "";
      const customerPhone = normalizePhone(body.customerPhone);
      const customerEmail = normalizeEmail(body.customerEmail);
      const address = typeof body.address === "string" ? body.address.trim().slice(0, 250) : "";
      if (!customerPhone && !customerEmail) return json(req, { error: "Enter a phone number or email." }, 400);

      const sessionId = crypto.randomUUID();
      const token = newInviteToken();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
      const { data: created, error: createError } = await adminClient
        .from("virtual_estimate_sessions")
        .insert({
          session_id: sessionId,
          customer_name: customerName || null,
          customer_phone: customerPhone || null,
          customer_email: customerEmail || null,
          address: address || null,
          status: "invited",
          invite_token: token,
          invite_status: "invited",
          invite_expires_at: expiresAt,
          direct_join_allowed: true,
          waiting_for_host: true,
          participant_role: "customer",
          participant_source: "admin_invite",
          call_state: "idle",
        })
        .select("session_id,customer_name,customer_phone,customer_email,address,status,invite_expires_at,created_at")
        .single();
      if (createError || !created) {
        console.error("[virtual-estimate-admin] create failed", createError);
        return json(req, { error: "Could not create the virtual estimate invite." }, 500);
      }

      const url = inviteUrl(sessionId, token);
      let delivery: { ok: boolean; payload: any } | null = null;
      if (body.send !== false) delivery = await deliverInvite({ customerName, customerPhone, customerEmail, url });

      return json(req, {
        session: created,
        inviteUrl: url,
        inviteExpiresAt: expiresAt,
        sent: delivery?.ok ?? false,
        delivery: delivery?.payload ?? null,
      });
    }

    if (action === "get_link" || action === "resend") {
      const sessionId = typeof body.sessionId === "string" ? body.sessionId.trim().toLowerCase() : "";
      if (!UUID_PATTERN.test(sessionId)) return json(req, { error: "Invalid session" }, 400);
      const { data: existing, error: lookupError } = await adminClient
        .from("virtual_estimate_sessions")
        .select("session_id,customer_name,customer_phone,customer_email,invite_token,invite_expires_at,status")
        .eq("session_id", sessionId)
        .maybeSingle();
      if (lookupError || !existing) return json(req, { error: "Session not found" }, 404);

      let token = String(existing.invite_token || "");
      let expiresAt = existing.invite_expires_at ? String(existing.invite_expires_at) : "";
      if (!/^[0-9a-f]{64}$/i.test(token) || !expiresAt || new Date(expiresAt).getTime() <= Date.now()) {
        token = newInviteToken();
        expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
        const { error: refreshError } = await adminClient.from("virtual_estimate_sessions").update({
          invite_token: token,
          invite_expires_at: expiresAt,
          invite_status: "invited",
          direct_join_allowed: true,
          status: ["completed", "expired", "cancelled", "canceled"].includes(String(existing.status || "").toLowerCase()) ? "invited" : existing.status,
          updated_at: new Date().toISOString(),
        }).eq("session_id", sessionId);
        if (refreshError) return json(req, { error: "Could not refresh invite link" }, 500);
      }

      const url = inviteUrl(sessionId, token);
      if (action === "resend") {
        const customerPhone = normalizePhone(existing.customer_phone);
        const customerEmail = normalizeEmail(existing.customer_email);
        const customerName = typeof existing.customer_name === "string" ? existing.customer_name : "";
        const delivery = await deliverInvite({ customerName, customerPhone, customerEmail, url });
        return json(req, { inviteUrl: url, inviteExpiresAt: expiresAt, sent: delivery.ok, delivery: delivery.payload });
      }
      return json(req, { inviteUrl: url, inviteExpiresAt: expiresAt });
    }

    return json(req, { error: "Unsupported action" }, 400);
  } catch (error) {
    console.error("[virtual-estimate-admin] unexpected error", error);
    return json(req, { error: error instanceof Error ? error.message : "Unexpected invite error" }, 500);
  }
});
