import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  { auth: { persistSession: false, autoRefreshToken: false } },
);

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const TOKEN_PATTERN = /^[0-9a-f]{64}$/i;
const ALLOWED_ACTIONS = new Set([
  "view", "join", "presence", "position", "location", "address", "end",
  "admin_list", "host_presence", "host_leave", "call_reset", "signal", "signals", "call_state",
]);
const SIGNAL_KINDS = new Set(["offer", "answer", "ice", "hangup"]);
const CALL_STATES = new Set(["ready", "connecting", "connected", "ended", "failed"]);
const SELECT_FIELDS = [
  "session_id", "customer_name", "customer_phone", "customer_email", "status", "address",
  "current_lat", "current_lng", "current_heading", "current_pitch", "current_zoom", "host_available",
  "invite_token", "invite_status", "invite_expires_at", "direct_join_allowed", "waiting_for_host",
  "host_present", "participant_role", "participant_source", "location_requested", "customer_last_seen",
  "host_last_seen", "call_state", "call_started_at", "call_ended_at", "customer_call_ready",
  "host_call_ready", "created_at", "updated_at",
].join(",");

function corsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("origin") || "";
  const allowed =
    origin === "https://bcpressurewashing.ca" ||
    origin === "https://www.bcpressurewashing.ca" ||
    /^https:\/\/[a-z0-9-]+(?:\.[a-z0-9-]+)*\.lovable\.app$/i.test(origin) ||
    /^https:\/\/[a-z0-9-]+(?:\.[a-z0-9-]+)*\.vercel\.app$/i.test(origin) ||
    /^https:\/\/[a-z0-9-]+(?:--[a-z0-9-]+)?\.netlify\.app$/i.test(origin) ||
    /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin);
  return {
    "Access-Control-Allow-Origin": allowed ? origin : "https://bcpressurewashing.ca",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

function json(req: Request, body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...corsHeaders(req) },
  });
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
}

function finiteNumber(value: unknown): number | null {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function isRecent(value: unknown, maxAgeMs = 20_000): boolean {
  if (typeof value !== "string" || !value) return false;
  const time = new Date(value).getTime();
  return Number.isFinite(time) && Date.now() - time <= maxAgeMs;
}

async function isAdminRequest(req: Request): Promise<boolean> {
  const authorization = req.headers.get("authorization") || "";
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  if (!match) return false;
  const jwt = match[1].trim();
  if (!jwt) return false;
  const { data: userData, error: userError } = await supabase.auth.getUser(jwt);
  if (userError || !userData.user) return false;
  const { data: adminResult, error: adminError } = await supabase.rpc("is_admin", { user_id: userData.user.id });
  if (adminError) {
    console.error("[virtual-estimate-session] admin check failed", adminError);
    return false;
  }
  return adminResult === true;
}

function publicSession(row: Record<string, any>) {
  const directJoinAllowed = row.direct_join_allowed === true && Boolean(row.customer_phone || row.customer_email) &&
    !["completed", "expired", "cancelled", "canceled"].includes(String(row.status || "").toLowerCase());
  const hostPresent = row.host_present === true && (isRecent(row.host_last_seen) || !row.host_last_seen);
  const customerPresent = isRecent(row.customer_last_seen, 30_000);
  return {
    sessionId: row.session_id,
    status: row.status,
    agentJoined: row.status === "agent_joined" || hostPresent,
    directJoinAllowed,
    customerName: row.customer_name || "",
    customerPhone: row.customer_phone || "",
    customerEmail: row.customer_email || "",
    address: row.address || "",
    hostAvailable: row.host_available === true,
    waitingForHost: row.waiting_for_host !== false,
    locationRequested: row.location_requested === true,
    hostPresent,
    customerPresent,
    callState: row.call_state || "idle",
    customerCallReady: row.customer_call_ready === true,
    hostCallReady: row.host_call_ready === true,
    callStartedAt: row.call_started_at || null,
    callEndedAt: row.call_ended_at || null,
    createdAt: row.created_at || null,
    updatedAt: row.updated_at || null,
    currentPosition: row.current_lat != null && row.current_lng != null ? {
      lat: Number(row.current_lat), lng: Number(row.current_lng), heading: Number(row.current_heading) || 0,
      pitch: Number(row.current_pitch) || 0, zoom: Number(row.current_zoom) || 1,
    } : null,
  };
}

async function fetchSession(sessionId: string) {
  return await supabase.from("virtual_estimate_sessions").select(SELECT_FIELDS).eq("session_id", sessionId).maybeSingle();
}

serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders(req) });
  if (req.method !== "POST") return json(req, { error: "Method not allowed" }, 405);
  try {
    const body = await req.json().catch(() => ({}));
    const action = typeof body.action === "string" ? body.action.trim().toLowerCase() : "view";
    const sessionId = typeof body.sessionId === "string" ? body.sessionId.trim().toLowerCase() : "";
    const inviteToken = typeof body.inviteToken === "string" ? body.inviteToken.trim().toLowerCase() : "";
    if (!ALLOWED_ACTIONS.has(action)) return json(req, { error: "Unsupported session action" }, 400);
    const adminRequest = await isAdminRequest(req);

    if (action === "admin_list") {
      if (!adminRequest) return json(req, { error: "Admin access required" }, 403);
      const { data: rows, error } = await supabase.from("virtual_estimate_sessions").select(SELECT_FIELDS)
        .order("created_at", { ascending: false }).limit(50);
      if (error) return json(req, { error: "Could not load virtual estimate sessions" }, 500);
      return json(req, { sessions: (rows || []).map((row) => publicSession(row)) });
    }

    if (!UUID_PATTERN.test(sessionId)) return json(req, { error: "This session link is invalid" }, 400);
    const { data: existing, error: lookupError } = await fetchSession(sessionId);
    if (lookupError) return json(req, { error: "Session lookup failed" }, 500);
    if (!existing) return json(req, { error: "Session not found" }, 404);

    if (!adminRequest) {
      const storedToken = String(existing.invite_token || "").trim().toLowerCase();
      if (!TOKEN_PATTERN.test(storedToken) || !TOKEN_PATTERN.test(inviteToken) || !safeEqual(storedToken, inviteToken)) {
        return json(req, { error: "Session not found" }, 404);
      }
      if (existing.invite_expires_at) {
        const expiresAt = new Date(existing.invite_expires_at).getTime();
        if (Number.isFinite(expiresAt) && expiresAt < Date.now()) return json(req, { error: "This invite has expired" }, 410);
      }
    }

    const now = new Date().toISOString();
    let updates: Record<string, unknown> | null = null;
    if (["host_presence", "host_leave", "call_reset"].includes(action) && !adminRequest) {
      return json(req, { error: "Admin access required" }, 403);
    }

    if (action === "host_presence") {
      updates = { host_present: true, host_available: true, host_last_seen: now, waiting_for_host: false,
        status: ["invited", "waiting", "active"].includes(String(existing.status)) ? "agent_joined" : existing.status, updated_at: now };
    } else if (action === "host_leave") {
      updates = { host_present: false, host_available: false, host_call_ready: false, host_last_seen: now, updated_at: now };
    } else if (action === "call_reset") {
      const { error: clearError } = await supabase.from("virtual_estimate_call_signals").delete().eq("session_id", sessionId);
      if (clearError) return json(req, { error: "Could not reset call" }, 500);
      updates = { call_state: "waiting", host_call_ready: true, call_started_at: now, call_ended_at: null,
        host_last_seen: now, host_present: true, host_available: true, waiting_for_host: false, updated_at: now };
    } else if (action === "signal") {
      const kind = typeof body.kind === "string" ? body.kind.trim().toLowerCase() : "";
      if (!SIGNAL_KINDS.has(kind)) return json(req, { error: "Invalid call signal" }, 400);
      const payload = body.payload && typeof body.payload === "object" && !Array.isArray(body.payload) ? body.payload : {};
      if (JSON.stringify(payload).length > 100_000) return json(req, { error: "Call signal is too large" }, 413);
      const sender = adminRequest ? "host" : "customer";
      const { data: inserted, error: signalError } = await supabase.from("virtual_estimate_call_signals")
        .insert({ session_id: sessionId, sender, kind, payload }).select("id").single();
      if (signalError) return json(req, { error: "Could not send call signal" }, 500);
      const signalUpdates: Record<string, unknown> = { updated_at: now };
      if (kind === "offer" || kind === "answer") signalUpdates.call_state = "connecting";
      if (kind === "hangup") {
        signalUpdates.call_state = "ended"; signalUpdates.call_ended_at = now;
        signalUpdates.customer_call_ready = false; signalUpdates.host_call_ready = false;
      }
      if (Object.keys(signalUpdates).length > 1) await supabase.from("virtual_estimate_sessions").update(signalUpdates).eq("session_id", sessionId);
      return json(req, { ok: true, signalId: inserted?.id ?? null });
    } else if (action === "signals") {
      const afterId = Math.max(0, Math.floor(finiteNumber(body.afterId) ?? 0));
      const myRole = adminRequest ? "host" : "customer";
      const { data: signals, error: signalError } = await supabase.from("virtual_estimate_call_signals")
        .select("id,sender,kind,payload,created_at").eq("session_id", sessionId).neq("sender", myRole)
        .gt("id", afterId).order("id", { ascending: true }).limit(100);
      if (signalError) return json(req, { error: "Could not receive call signals" }, 500);
      return json(req, { signals: signals || [] });
    } else if (action === "call_state") {
      const state = typeof body.state === "string" ? body.state.trim().toLowerCase() : "";
      if (!CALL_STATES.has(state)) return json(req, { error: "Invalid call state" }, 400);
      const actorReadyColumn = adminRequest ? "host_call_ready" : "customer_call_ready";
      updates = { [actorReadyColumn]: state !== "ended" && state !== "failed", updated_at: now };
      if (adminRequest) updates.host_last_seen = now; else updates.customer_last_seen = now;
      if (state !== "ready") updates.call_state = state;
      if (state === "connected") updates.call_started_at = existing.call_started_at || now;
      if (state === "ended") {
        updates.call_ended_at = now; updates.customer_call_ready = false; updates.host_call_ready = false;
      }
    } else if (action === "join") {
      const customerPhone = typeof body.customerPhone === "string" ? body.customerPhone.trim() : "";
      const customerName = typeof body.customerName === "string" ? body.customerName.trim().slice(0, 120) : null;
      const digits = customerPhone.replace(/\D/g, "");
      if (digits.length < 10 || digits.length > 11) return json(req, { error: "Enter a valid phone number" }, 400);
      updates = { customer_phone: customerPhone.slice(0, 30), customer_name: customerName || existing.customer_name,
        customer_last_seen: now, status: ["invited", "waiting"].includes(String(existing.status)) ? "active" : existing.status,
        participant_role: "customer", participant_source: existing.participant_source || "customer_link" };
    } else if (action === "presence") {
      updates = { customer_last_seen: now };
    } else if (action === "position") {
      const position = body.position || {};
      const lat = finiteNumber(position.lat); const lng = finiteNumber(position.lng);
      const heading = finiteNumber(position.heading); const pitch = finiteNumber(position.pitch); const zoom = finiteNumber(position.zoom);
      if (lat === null || lat < -90 || lat > 90 || lng === null || lng < -180 || lng > 180) return json(req, { error: "Invalid map position" }, 400);
      updates = { current_lat: lat, current_lng: lng, current_heading: heading ?? 0, current_pitch: pitch ?? 0, current_zoom: zoom ?? 1, updated_at: now };
    } else if (action === "location") {
      const latitude = finiteNumber(body.latitude); const longitude = finiteNumber(body.longitude);
      if (latitude === null || latitude < -90 || latitude > 90 || longitude === null || longitude > 180) return json(req, { error: "Invalid location" }, 400);
      updates = { customer_lat: latitude, customer_lng: longitude, location_requested: false, customer_last_seen: now };
    } else if (action === "address") {
      const address = typeof body.address === "string" ? body.address.trim().slice(0, 250) : "";
      const latitude = finiteNumber(body.latitude); const longitude = finiteNumber(body.longitude);
      if (!address || latitude === null || longitude === null) return json(req, { error: "Invalid address" }, 400);
      updates = { address, current_lat: latitude, current_lng: longitude, updated_at: now };
    } else if (action === "end") {
      updates = { status: "completed", waiting_for_host: false, call_state: "ended", call_ended_at: now,
        customer_call_ready: false, host_call_ready: false, updated_at: now };
    }

    let current = existing;
    if (updates) {
      const { data: updated, error: updateError } = await supabase.from("virtual_estimate_sessions").update(updates)
        .eq("session_id", sessionId).select(SELECT_FIELDS).single();
      if (updateError || !updated) return json(req, { error: "Session update failed" }, 500);
      current = updated;
    }
    return json(req, { session: publicSession(current) });
  } catch (error) {
    console.error("[virtual-estimate-session] unexpected error", error);
    return json(req, { error: "Unexpected session error" }, 500);
  }
});
