import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.52.0";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";
const TWILIO_SID = Deno.env.get("TWILIO_ACCOUNT_SID") || "";
const TWILIO_TOKEN = Deno.env.get("TWILIO_AUTH_TOKEN") || "";
const TWILIO_FROM = Deno.env.get("TWILIO_FROM_NUMBER") || "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-system-health-token",
};

const SMS_CONSENT_TEXT = "I agree to receive occasional marketing text messages from BC Pressure Washing about local pricing, nearby service availability and referral discounts. Message frequency varies. Reply STOP to unsubscribe.";
const AI_CONSENT_TEXT = "I agree to receive automated or AI-generated voice calls from BC Pressure Washing at this phone number, no more than once per month, about storefront cleaning, pricing and availability. I can withdraw consent at any time.";

const RATES: Record<string, { low: number; high: number }> = {
  small: { low: 8, high: 10 },
  medium: { low: 12, high: 12 },
  large: { low: 16, high: 20 },
  mixed: { low: 10, high: 14 },
};
const FREQ_MULT: Record<string, number> = { weekly: 0.75, biweekly: 0.85, monthly: 1 };
const VISITS: Record<string, number> = { weekly: 4, biweekly: 2, monthly: 1 };
const MIN_VISIT = 40;
const MIN_MONTHLY = 60;

const OUTBOUND_TEMPLATES = [
  `Hey! This is Jayden from BC Pressure Washing. We do recurring storefront window cleaning — no contracts, cancel anytime. Want a fast text quote? Just reply with:\n\n1) Your business address\n2) Exterior only or interior + exterior\n3) Rough number of glass sections\n4) Mostly small, medium, or large windows`,
  `Hi there! Jayden here from BC Pressure Washing. I can text you a storefront window cleaning quote in about 60 seconds. Just send me:\n\n• Business address\n• Exterior only or interior too?\n• How many glass sections roughly\n• Small, medium, or large windows?`,
  `Hey, it's Jayden with BC Pressure Washing — following up on storefront window cleaning. If you'd like a quick price, reply with your address, glass count, and window size. Takes about a minute!`,
];

const FOLLOW_UPS = [
  `Hey! Just checking in — if you'd still like a storefront window cleaning quote, send me your address and rough glass count and I'll get you a price in seconds.`,
  `No rush at all — whenever you're ready, send your storefront address and I can text you a quick price for recurring window cleaning.`,
  `Last check-in! If you want pricing for storefront window cleaning, just reply with your address. We do no-contract monthly plans starting at $60.`,
];

const OBJECTION_RESPONSES: Record<string, string> = {
  just_looking: "No worries! When you're ready, just text your address and glass count and I can give you a price in seconds.",
  too_expensive: "I hear you — our prices are competitive for the area and we don't lock you into contracts. Want me to show you our monthly plan options?",
  need_to_ask: "Totally get it. I'll save your info so when you're ready, just text back and I'll have your quote ready to go.",
  have_someone: "No problem! If you ever want to compare pricing or your current cleaner isn't working out, we're here. No contracts, cancel anytime.",
  one_time: "Absolutely, we do one-time deep cleans too! Same info needed — address, glass count, and window size. I'll quote both one-time and recurring so you can compare.",
  before_opening: "Yes! We offer before-hours and after-hours cleaning. Most of our storefront clients prefer early morning before open.",
  contract: "Zero contracts. You can cancel or pause anytime with a text. Most clients stay because they love the service, not because they're locked in.",
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json", ...corsHeaders } });
}

function emptyTwiml(status = 200) {
  return new Response('<?xml version="1.0" encoding="UTF-8"?><Response></Response>', { status, headers: { "Content-Type": "text/xml" } });
}

function normalizePhone(value: unknown): string | null {
  let digits = String(value || "").replace(/\D/g, "");
  if (digits.length === 10) digits = `1${digits}`;
  if (digits.length !== 11 || !digits.startsWith("1")) return null;
  return `+${digits}`;
}

function samePhone(a: unknown, b: unknown) {
  const left = normalizePhone(a);
  const right = normalizePhone(b);
  return Boolean(left && right && left === right);
}

function makeReferralCode() {
  return `BC${crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase()}`;
}

function calcQuote(count: number, size: string, freq: string, svcType: string) {
  const r = RATES[size] || RATES.medium;
  const fm = FREQ_MULT[freq] || 1;
  const visits = VISITS[freq] || 1;
  let low = Math.max(MIN_VISIT, Math.round(count * r.low * fm));
  let high = Math.max(MIN_VISIT, Math.round(count * r.high * fm));
  if (svcType === "interior_exterior") {
    low = Math.round(low * 1.4);
    high = Math.round(high * 1.6);
  }
  return { perVisitLow: low, perVisitHigh: high, monthlyLow: Math.max(MIN_MONTHLY, low * visits), monthlyHigh: Math.max(MIN_MONTHLY, high * visits), visits };
}

async function sendSms(to: string, body: string): Promise<string> {
  const phone = normalizePhone(to);
  if (!phone) throw new Error("Invalid recipient phone number");
  if (!TWILIO_SID || !TWILIO_TOKEN || !TWILIO_FROM) throw new Error("Twilio SMS is not configured");

  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${TWILIO_SID}:${TWILIO_TOKEN}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ To: phone, From: TWILIO_FROM, Body: body }),
  });
  const text = await response.text();
  if (!response.ok) throw new Error(`Twilio SMS error (${response.status}): ${text.slice(0, 300)}`);
  return JSON.parse(text).sid;
}

async function isValidTwilioRequest(req: Request, rawBody: string): Promise<boolean> {
  const provided = req.headers.get("X-Twilio-Signature") || "";
  if (!TWILIO_TOKEN || !provided) return false;
  const params = new URLSearchParams(rawBody);
  const keys = [...new Set([...params.keys()])].sort();
  let signed = req.url;
  for (const key of keys) for (const value of params.getAll(key).sort()) signed += key + value;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(TWILIO_TOKEN), { name: "HMAC", hash: "SHA-1" }, false, ["sign"]);
  const digest = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(signed)));
  const expected = btoa(String.fromCharCode(...digest));
  if (expected.length !== provided.length) return false;
  let mismatch = 0;
  for (let i = 0; i < expected.length; i++) mismatch |= expected.charCodeAt(i) ^ provided.charCodeAt(i);
  return mismatch === 0;
}

async function requireInternal(req: Request) {
  const authorization = req.headers.get("Authorization") || "";
  if (authorization === `Bearer ${SUPABASE_KEY}`) return;
  const systemToken = req.headers.get("x-system-health-token") || "";
  if (systemToken) {
    const { data: valid } = await supabase.rpc("verify_system_health_alert_token", { p_token: systemToken });
    if (valid === true) return;
  }
  if (authorization && SUPABASE_ANON_KEY) {
    const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { global: { headers: { Authorization: authorization } } });
    const { data: { user } } = await client.auth.getUser();
    if (user) {
      const { data: allowed } = await supabase.rpc("is_admin", { user_id: user.id });
      if (allowed === true) return;
    }
  }
  throw new Error("Internal authorization required");
}

async function findStorefrontLeadByPhone(phone: string) {
  const { data, error } = await supabase.from("storefront_call_leads").select("*").limit(2000);
  if (error) throw error;
  return (data || []).find((lead) => samePhone(lead.phone, phone)) || null;
}

async function appendMessage(leadId: string, direction: string, text: string) {
  const { data: lead } = await supabase.from("sms_quote_leads").select("messages").eq("id", leadId).single();
  const messages = Array.isArray(lead?.messages) ? lead.messages : [];
  messages.push({ direction, text, timestamp: new Date().toISOString() });
  await supabase.from("sms_quote_leads").update({ messages }).eq("id", leadId);
}

function parseIncomingMessage(body: string, lead: any): { updates: any; reply: string } {
  const lower = body.toLowerCase().trim();
  const updates: any = {};
  if (lower.includes("just looking") || lower.includes("just browsing")) return { updates: { notes: "Objection: just looking" }, reply: OBJECTION_RESPONSES.just_looking };
  if (lower.includes("too expensive") || lower.includes("too much")) return { updates: { notes: "Objection: price" }, reply: OBJECTION_RESPONSES.too_expensive };
  if (lower.includes("ask") && (lower.includes("owner") || lower.includes("manager"))) return { updates: { notes: "Objection: need approval" }, reply: OBJECTION_RESPONSES.need_to_ask };
  if (lower.includes("already have") || lower.includes("have someone")) return { updates: { notes: "Objection: has provider" }, reply: OBJECTION_RESPONSES.have_someone };
  if (lower.includes("one time") || lower.includes("one-time")) return { updates: { notes: "Wants one-time" }, reply: OBJECTION_RESPONSES.one_time };
  if (lower.includes("before open") || lower.includes("after hours") || lower.includes("after close")) return { updates: { preferred_time: lower.includes("before") ? "before_open" : "after_close" }, reply: OBJECTION_RESPONSES.before_opening };
  if (lower.includes("contract")) return { updates: {}, reply: OBJECTION_RESPONSES.contract };

  const hasAddress = /\d+.*(?:st|ave|rd|blvd|dr|way|hwy|street|avenue|road|broadway|drive|crescent|court|place|lane)/i.test(body);
  const hasInterior = /interior/i.test(lower);
  const hasExterior = /exterior/i.test(lower);
  const countMatch = body.match(/(\d{1,3})\s*(?:window|glass|pane|section|panel)/i) || body.match(/^(\d{1,3})$/m);
  const hasSmall = /small/i.test(lower);
  const hasMedium = /medium/i.test(lower);
  const hasLarge = /large/i.test(lower) && !/extra/i.test(lower);
  const hasWeekly = /weekly/i.test(lower) && !/bi/i.test(lower);
  const hasBiweekly = /bi-?weekly|every\s*2|twice/i.test(lower);
  const hasMonthly = /month/i.test(lower);

  if (hasAddress) { updates.address = body.trim(); updates.conversation_step = "got_address"; }
  if (hasInterior || hasExterior) updates.service_type = hasInterior ? "interior_exterior" : "exterior";
  if (countMatch) updates.glass_count = parseInt(countMatch[1]);
  if (hasSmall || hasMedium || hasLarge) updates.window_size = hasSmall ? "small" : hasMedium ? "medium" : "large";
  if (hasWeekly || hasBiweekly || hasMonthly) updates.frequency = hasWeekly ? "weekly" : hasBiweekly ? "biweekly" : "monthly";

  const merged = { ...lead, ...updates };
  let reply = "";
  if (!merged.address) {
    reply = "Got it! What's the business address? (Street address and city)";
    updates.conversation_step = "asking_address";
  } else if (!merged.service_type) reply = "Thanks! Do you want:\n1) Exterior only\n2) Interior + exterior";
  else if (!merged.glass_count) reply = "How many glass sections/windows on the front? A rough count is fine — or send a storefront photo and I'll count for you.";
  else if (!merged.window_size) reply = "What size are most of the windows?\n1) Small panes\n2) Medium/standard\n3) Large display windows";
  else if (!merged.frequency) reply = "How often would you like cleaning?\n1) Weekly\n2) Biweekly\n3) Monthly";
  else {
    const quote = calcQuote(merged.glass_count, merged.window_size || "medium", merged.frequency || "monthly", merged.service_type || "exterior");
    updates.estimated_price_low = quote.monthlyLow;
    updates.estimated_price_high = quote.monthlyHigh;
    updates.quote_status = "quoted";
    updates.conversation_step = "quoted";
    const svc = merged.service_type === "interior_exterior" ? "interior + exterior" : "exterior";
    const size = merged.window_size === "large" ? "large display" : merged.window_size;
    reply = quote.monthlyLow === quote.monthlyHigh
      ? `Based on ${merged.glass_count} ${size} ${svc} windows on a ${merged.frequency} schedule, your estimated price would be about $${quote.monthlyLow}/month.`
      : `Based on ${merged.glass_count} ${size} ${svc} windows on a ${merged.frequency} schedule, your estimated price would be about $${quote.monthlyLow}–$${quote.monthlyHigh}/month.`;
    if (quote.visits > 1) reply += ` That's ${quote.visits} visits/month at ~$${quote.perVisitLow}${quote.perVisitLow !== quote.perVisitHigh ? `–$${quote.perVisitHigh}` : ""} per visit.`;
    reply += "\n\nNo contracts, cancel anytime. We confirm the final price on the first visit.";
    reply += "\n\nSee our plans & book here: https://bcpressurewashing.ca/storefront-plans";
    updates.link_sent = true;
  }
  return { updates, reply };
}

async function saveMarketingOptIn(req: Request, body: any) {
  if (String(body.website || "").trim()) return json({ success: true });
  const businessName = String(body.business_name || "").trim();
  const contactName = String(body.contact_name || "").trim() || null;
  const contactEmail = String(body.contact_email || "").trim() || null;
  const city = String(body.city || "").trim() || null;
  const phone = normalizePhone(body.phone);
  const smsConsent = body.sms_consent === true;
  const aiConsent = body.ai_call_consent === true;
  const referredBy = String(body.referral_code || "").trim().toUpperCase() || null;

  if (!businessName) return json({ success: false, error: "Business name is required" }, 400);
  if (!phone) return json({ success: false, error: "Enter a valid Canadian or US phone number" }, 400);
  if (!smsConsent) return json({ success: false, error: "SMS consent is required to join storefront updates" }, 400);

  const now = new Date().toISOString();
  const existing = await findStorefrontLeadByPhone(phone);
  const referralCode = existing?.marketing_referral_code || makeReferralCode();
  const changes: Record<string, unknown> = {
    business_name: businessName,
    contact_name: contactName,
    contact_email: contactEmail,
    city,
    phone,
    sms_marketing_consent: true,
    sms_marketing_consent_at: now,
    sms_marketing_consent_source: "web_opt_in",
    sms_marketing_consent_text: SMS_CONSENT_TEXT,
    sms_opted_out_at: null,
    consent_phone: phone,
    marketing_referral_code: referralCode,
    updated_at: now,
  };

  if (aiConsent) {
    changes.ai_call_consent = true;
    changes.ai_call_consent_at = now;
    changes.ai_call_consent_source = "web_opt_in";
    changes.ai_call_consent_text = AI_CONSENT_TEXT;
    changes.ai_call_consent_revoked_at = null;
    changes.ai_call_frequency = "monthly";
    changes.ai_next_call_at = now;
    changes.consent_phone = phone;
    changes.call_permission = true;
    changes.do_not_call = false;
  }

  let leadId = existing?.id || null;
  if (leadId) {
    const { error } = await supabase.from("storefront_call_leads").update(changes).eq("id", leadId);
    if (error) throw error;
  } else {
    const { data: inserted, error } = await supabase.from("storefront_call_leads").insert({ ...changes, status: "new", call_permission: true, do_not_call: false, attempts: 0, route_order: 0 }).select("id").single();
    if (error) throw error;
    leadId = inserted.id;
  }

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0]?.trim() || null;
  const userAgent = req.headers.get("user-agent") || null;
  const consentRows: Record<string, unknown>[] = [{
    lead_id: leadId,
    phone,
    consent_type: "sms_marketing",
    granted: true,
    source: "web_opt_in",
    consent_text: SMS_CONSENT_TEXT,
    ip_address: ip,
    user_agent: userAgent,
    metadata: { consent_version: "2026-08-18", business_name: businessName },
  }];
  if (aiConsent) consentRows.push({
    lead_id: leadId,
    phone,
    consent_type: "ai_voice_monthly",
    granted: true,
    source: "web_opt_in",
    consent_text: AI_CONSENT_TEXT,
    ip_address: ip,
    user_agent: userAgent,
    metadata: { consent_version: "2026-08-18", frequency: "monthly", business_name: businessName },
  });
  const { error: consentError } = await supabase.from("storefront_contact_consents").insert(consentRows);
  if (consentError) throw consentError;

  if (referredBy) {
    const { data: referrer } = await supabase.from("storefront_call_leads").select("id,marketing_referral_code").eq("marketing_referral_code", referredBy).maybeSingle();
    if (referrer?.id && referrer.id !== leadId) {
      await supabase.from("storefront_call_leads").update({ referred_by_marketing_code: referredBy }).eq("id", leadId);
      await supabase.from("storefront_referrals").upsert({
        referrer_lead_id: referrer.id,
        referred_lead_id: leadId,
        referral_code: referredBy,
        status: "pending",
        metadata: { source: "storefront_updates_opt_in" },
      }, { onConflict: "referred_lead_id", ignoreDuplicates: true });
    }
  }

  const shareUrl = `https://bcpressurewashing.ca/storefront-updates?ref=${encodeURIComponent(referralCode)}`;
  const confirmation = aiConsent
    ? `BC Pressure Washing: You're subscribed to storefront pricing/referral texts and monthly AI-call follow-ups. Referral link: ${shareUrl} Reply STOP to stop texts.`
    : `BC Pressure Washing: You're subscribed to storefront pricing/referral texts. Referral link: ${shareUrl} Reply STOP to unsubscribe.`;

  let messageSid: string | null = null;
  let deliveryError: string | null = null;
  try { messageSid = await sendSms(phone, confirmation); } catch (error) { deliveryError = error instanceof Error ? error.message : "SMS failed"; }
  await supabase.from("storefront_marketing_deliveries").insert({
    lead_id: leadId,
    message_type: "consent_confirmation",
    phone,
    message_body: confirmation,
    twilio_message_sid: messageSid,
    status: messageSid ? "sent" : "failed",
    error: deliveryError,
    sent_at: messageSid ? now : null,
  });

  return json({ success: true, lead_id: leadId, sms_consent: true, ai_call_consent: aiConsent, ai_call_frequency: aiConsent ? "monthly" : existing?.ai_call_frequency || "none", referral_code: referralCode, referral_url: shareUrl, confirmation_sms_sent: Boolean(messageSid) });
}

async function processLocalUpdates(req: Request) {
  await requireInternal(req);
  const now = new Date();
  const localParts = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Vancouver", weekday: "short", hour: "2-digit", hourCycle: "h23" }).formatToParts(now);
  const weekday = localParts.find((part) => part.type === "weekday")?.value;
  const hour = Number(localParts.find((part) => part.type === "hour")?.value || 0);
  if (weekday === "Sat" || weekday === "Sun" || hour < 9 || hour >= 17) return json({ success: true, sent: 0, outsideBusinessHours: true });

  const bookingCutoff = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();
  const smsCooldown = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const [{ data: bookings, error: bookingError }, { data: leads, error: leadError }] = await Promise.all([
    supabase.from("bookings").select("id,service_address,status,created_at,is_test").in("status", ["scheduled", "confirmed"]).eq("is_test", false).gte("created_at", bookingCutoff).order("created_at", { ascending: false }).limit(100),
    supabase.from("storefront_call_leads").select("id,business_name,phone,city,sms_marketing_consent,sms_opted_out_at,last_marketing_sms_at,marketing_referral_code").eq("sms_marketing_consent", true).is("sms_opted_out_at", null).limit(1000),
  ]);
  if (bookingError) throw bookingError;
  if (leadError) throw leadError;

  const results: Array<Record<string, unknown>> = [];
  for (const lead of leads || []) {
    if (results.filter((item) => item.success === true).length >= 10) break;
    if (!lead.city || !normalizePhone(lead.phone)) continue;
    if (lead.last_marketing_sms_at && lead.last_marketing_sms_at >= smsCooldown) continue;
    const city = String(lead.city).trim();
    const booking = (bookings || []).find((item) => String(item.service_address || "").toLowerCase().includes(city.toLowerCase()));
    if (!booking) continue;
    const { data: duplicate } = await supabase.from("storefront_marketing_deliveries").select("id").eq("lead_id", lead.id).eq("source_booking_id", booking.id).eq("message_type", "local_booking").maybeSingle();
    if (duplicate) continue;

    const referralSuffix = lead.marketing_referral_code
      ? ` Refer a local business for a discount: https://bcpressurewashing.ca/storefront-updates?ref=${encodeURIComponent(lead.marketing_referral_code)}`
      : " Refer another local business for a discount.";
    const message = `BC Pressure Washing: We recently booked exterior cleaning in ${city}, so we may already be working nearby. Want current storefront pricing? Reply QUOTE.${referralSuffix} STOP to unsubscribe.`;

    try {
      const sid = await sendSms(lead.phone, message);
      await supabase.from("storefront_marketing_deliveries").insert({ lead_id: lead.id, source_booking_id: booking.id, message_type: "local_booking", phone: normalizePhone(lead.phone), message_body: message, twilio_message_sid: sid, status: "sent", sent_at: new Date().toISOString() });
      await supabase.from("storefront_call_leads").update({ last_marketing_sms_at: new Date().toISOString(), updated_at: new Date().toISOString() }).eq("id", lead.id);
      results.push({ leadId: lead.id, city, success: true });
    } catch (error) {
      const messageText = error instanceof Error ? error.message : "SMS failed";
      await supabase.from("storefront_marketing_deliveries").insert({ lead_id: lead.id, source_booking_id: booking.id, message_type: "local_booking", phone: normalizePhone(lead.phone), message_body: message, status: "failed", error: messageText });
      results.push({ leadId: lead.id, city, success: false, error: messageText });
    }
  }
  return json({ success: true, sent: results.filter((item) => item.success === true).length, attempted: results.length, results });
}

serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    if (req.method === "GET") return json({ status: "ok", service: "storefront-sms-quote", marketingConsent: true, endpoints: { "POST form-encoded": "Twilio inbound SMS webhook", "POST JSON": "Quote actions plus marketing_opt_in / process_local_updates" } });

    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("x-www-form-urlencoded") || contentType.includes("form-data")) {
      const rawText = await req.text();
      if (!(await isValidTwilioRequest(req, rawText))) {
        console.warn("[storefront-sms-quote] Rejected invalid Twilio signature");
        return emptyTwiml(403);
      }
      const params = new URLSearchParams(rawText);
      const from = params.get("From") || "";
      const body = params.get("Body") || "";
      const mediaUrl = params.get("MediaUrl0") || null;
      if (!from || !body) return emptyTwiml();

      const normalized = body.trim().toLowerCase();
      const marketingLead = await findStorefrontLeadByPhone(from);
      const now = new Date().toISOString();

      if (marketingLead && ["stop", "unsubscribe", "cancel", "end", "quit"].includes(normalized)) {
        await supabase.from("storefront_call_leads").update({ sms_marketing_consent: false, sms_opted_out_at: now, updated_at: now }).eq("id", marketingLead.id);
        await supabase.from("storefront_contact_consents").insert({ lead_id: marketingLead.id, phone: normalizePhone(from), consent_type: "sms_marketing", granted: false, source: "sms_keyword_stop", consent_text: body, metadata: { keyword: normalized } });
        return emptyTwiml();
      }

      if (marketingLead && normalized === "start") {
        await supabase.from("storefront_call_leads").update({ sms_marketing_consent: true, sms_marketing_consent_at: now, sms_marketing_consent_source: "sms_keyword_start", sms_marketing_consent_text: SMS_CONSENT_TEXT, sms_opted_out_at: null, updated_at: now }).eq("id", marketingLead.id);
        await supabase.from("storefront_contact_consents").insert({ lead_id: marketingLead.id, phone: normalizePhone(from), consent_type: "sms_marketing", granted: true, source: "sms_keyword_start", consent_text: SMS_CONSENT_TEXT, metadata: { keyword: "start" } });
        await sendSms(from, "BC Pressure Washing: You're subscribed to storefront pricing and referral updates. Reply STOP to unsubscribe.");
        return emptyTwiml();
      }

      if (marketingLead && ["stop calls", "no calls", "do not call", "dnc"].includes(normalized)) {
        await supabase.from("storefront_call_leads").update({ do_not_call: true, call_permission: false, ai_call_consent: false, ai_call_consent_revoked_at: now, ai_next_call_at: null, updated_at: now }).eq("id", marketingLead.id);
        await supabase.from("storefront_contact_consents").insert({ lead_id: marketingLead.id, phone: normalizePhone(from), consent_type: "do_not_call", granted: false, source: "sms_keyword_dnc", consent_text: body, metadata: { keyword: normalized } });
        await sendSms(from, "BC Pressure Washing: Understood. Automated calling has been disabled for this number.");
        return emptyTwiml();
      }

      if (marketingLead && ["refer", "referral"].includes(normalized) && marketingLead.marketing_referral_code) {
        await sendSms(from, `Your BC Pressure Washing referral link: https://bcpressurewashing.ca/storefront-updates?ref=${encodeURIComponent(marketingLead.marketing_referral_code)}`);
        return emptyTwiml();
      }

      if (marketingLead && ["quote", "price", "pricing"].includes(normalized)) {
        await supabase.from("storefront_call_leads").update({ status: "interested", outcome: "quote_requested", follow_up_at: now, follow_up_note: "Requested storefront pricing by SMS", updated_at: now }).eq("id", marketingLead.id);
        await sendSms(from, "Thanks — your storefront pricing request is marked as interested. Send your business address and rough glass count and I'll build the quote here by text.");
      }

      let { data: lead } = await supabase.from("sms_quote_leads").select("*").eq("phone_number", from).in("quote_status", ["started", "collecting"]).order("created_at", { ascending: false }).limit(1).maybeSingle();
      if (!lead) {
        const { data: newLead, error } = await supabase.from("sms_quote_leads").insert({ phone_number: from, lead_source: marketingLead ? "storefront_marketing" : "inbound", business_name: marketingLead?.business_name || null, quote_status: "collecting", conversation_step: "initial", storefront_photo_url: mediaUrl }).select().single();
        if (error) throw error;
        lead = newLead;
      }
      await appendMessage(lead.id, "inbound", body);
      if (mediaUrl && !lead.storefront_photo_url) await supabase.from("sms_quote_leads").update({ storefront_photo_url: mediaUrl }).eq("id", lead.id);
      const parsed = parseIncomingMessage(body, lead);
      if (Object.keys(parsed.updates).length) await supabase.from("sms_quote_leads").update(parsed.updates).eq("id", lead.id);
      if (parsed.reply && !["quote", "price", "pricing"].includes(normalized)) {
        await appendMessage(lead.id, "outbound", parsed.reply);
        await sendSms(from, parsed.reply);
      }
      return emptyTwiml();
    }

    let body: any = {};
    try {
      const rawText = await req.text();
      if (rawText.trim()) body = JSON.parse(rawText);
    } catch {
      return json({ error: "Invalid JSON body" }, 400);
    }

    const action = String(body.action || "");
    if (action === "marketing_opt_in") return await saveMarketingOptIn(req, body);
    if (action === "process_local_updates") return await processLocalUpdates(req);

    const { phone, leadSource, templateIndex, leadId, businessName, customMessage } = body;
    if (action === "send_outbound") {
      const index = templateIndex ?? 0;
      const message = customMessage || OUTBOUND_TEMPLATES[Math.min(index, OUTBOUND_TEMPLATES.length - 1)];
      const { data: newLead, error } = await supabase.from("sms_quote_leads").insert({ phone_number: phone, lead_source: leadSource || "outbound", business_name: businessName || null, quote_status: "started", conversation_step: "outbound_sent" }).select().single();
      if (error) throw error;
      await appendMessage(newLead.id, "outbound", message);
      const sid = await sendSms(phone, message);
      return json({ success: true, leadId: newLead.id, messageSid: sid });
    }

    if (action === "send_follow_up") {
      const { data: lead } = await supabase.from("sms_quote_leads").select("*").eq("id", leadId).single();
      if (!lead) throw new Error("Lead not found");
      const index = Math.min(lead.follow_up_count || 0, FOLLOW_UPS.length - 1);
      const message = customMessage || FOLLOW_UPS[index];
      await supabase.from("sms_quote_leads").update({ follow_up_count: (lead.follow_up_count || 0) + 1, last_follow_up_at: new Date().toISOString(), follow_up_needed: false }).eq("id", leadId);
      await appendMessage(leadId, "outbound", message);
      const sid = await sendSms(lead.phone_number, message);
      return json({ success: true, messageSid: sid });
    }

    if (action === "send_link") {
      const { data: lead } = await supabase.from("sms_quote_leads").select("*").eq("id", leadId).single();
      if (!lead) throw new Error("Lead not found");
      const city = lead.city ? `/${lead.city.toLowerCase().replace(/\s+/g, "-")}` : "";
      const link = `https://bcpressurewashing.ca/storefront-plans${city}`;
      const message = `Here's our storefront window cleaning plans page: ${link}\n\nNo contracts, cancel anytime. Book online or call (778) 808-7620.`;
      await supabase.from("sms_quote_leads").update({ link_sent: true, quote_status: "link_sent" }).eq("id", leadId);
      await appendMessage(leadId, "outbound", message);
      const sid = await sendSms(lead.phone_number, message);
      return json({ success: true, messageSid: sid });
    }

    if (action === "get_templates") return json({ outbound: OUTBOUND_TEMPLATES, follow_ups: FOLLOW_UPS, objections: OBJECTION_RESPONSES });
    return json({ error: `Unknown action: ${action || "none"}` }, 400);
  } catch (error) {
    console.error("[storefront-sms-quote]", error);
    const message = error instanceof Error ? error.message : "Storefront SMS error";
    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("form") || contentType.includes("urlencoded")) return emptyTwiml();
    return json({ error: message }, message.includes("authorization") ? 401 : 500);
  }
});
