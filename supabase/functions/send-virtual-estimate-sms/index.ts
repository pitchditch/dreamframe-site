import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Temporary canonical Virtual Estimate host while the branded domain still serves
// a separate preview/published build. Keep customer + host call routes on the same
// known-good Vercel deployment so invites cannot fall back to the legacy UI.
const PUBLIC_SITE_ORIGIN = "https://dreamframe-site.vercel.app";
const SESSION_PATH_PATTERN = /^\/virtual-estimate\/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\/?$/i;

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });

const formatNorthAmericanPhone = (value: string) => {
  let digits = value.replace(/\D/g, "");
  if (digits.length === 10) digits = `1${digits}`;
  if (digits.length !== 11 || !digits.startsWith("1")) {
    throw new Error("Please enter a valid Canadian or US phone number.");
  }
  return `+${digits}`;
};

const normalizeEmail = (value: unknown) => {
  if (typeof value !== "string" || !value.trim()) return null;
  const email = value.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Please enter a valid customer email.");
  }
  return email;
};

const escapeHtml = (value: unknown) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const canonicalizeSessionUrl = (value: unknown) => {
  if (typeof value !== "string" || !value) throw new Error("Session URL is required");
  const url = new URL(value);
  const allowedInputHost =
    url.hostname === "bcpressurewashing.ca" ||
    url.hostname === "www.bcpressurewashing.ca" ||
    url.hostname === "dreamframe-site.vercel.app" ||
    url.hostname === "localhost" ||
    url.hostname === "127.0.0.1" ||
    url.hostname.endsWith(".lovable.app") ||
    url.hostname.endsWith(".lovable.dev") ||
    url.hostname.endsWith(".lovableproject.com");

  if (!allowedInputHost || !SESSION_PATH_PATTERN.test(url.pathname)) {
    throw new Error("Invalid virtual estimate session URL");
  }

  return `${PUBLIC_SITE_ORIGIN}${url.pathname.replace(/\/$/, "")}${url.search}`;
};

const getSessionIdFromUrl = (sessionUrl: string) => {
  const url = new URL(sessionUrl);
  const [, route, sessionId] = url.pathname.split("/");
  if (route !== "virtual-estimate" || !sessionId) throw new Error("Invalid virtual estimate session URL");
  return sessionId;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { customerPhone, customerEmail, sessionUrl, customerName, requestType } = await req.json();

    if (!customerPhone) return json({ success: false, smsSent: false, error: "Phone number is required" }, 400);

    const to = formatNorthAmericanPhone(customerPhone);
    const normalizedEmail = normalizeEmail(customerEmail);
    const safeSessionUrl = canonicalizeSessionUrl(sessionUrl);
    const sessionId = getSessionIdFromUrl(safeSessionUrl);
    const adminHostUrl = `${PUBLIC_SITE_ORIGIN}/crm/virtual-estimate/${sessionId}`;
    const displayName = typeof customerName === "string"
      ? customerName.replace(/[\r\n]+/g, " ").trim().slice(0, 120)
      : "";
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    let smsSent = false;
    let smsError: string | null = null;
    let twilioPayload: Record<string, unknown> = {};
    const twilioAccountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
    const twilioAuthToken = Deno.env.get("TWILIO_AUTH_TOKEN");
    const twilioFromNumber = Deno.env.get("TWILIO_FROM_NUMBER");

    if (!twilioAccountSid || !twilioAuthToken || !twilioFromNumber) {
      console.error("Virtual estimate SMS is not configured: missing Twilio secret");
      smsError = "Text messaging is temporarily unavailable. Please call (778) 808-7620.";
    } else {
      const body = requestType === "call_request"
        ? `Hi${displayName ? ` ${displayName}` : ""}! BC Pressure Washing received your virtual-estimate call request. Jayden will call you shortly. Reply here if you need anything.`
        : `Hi${displayName ? ` ${displayName}` : ""}! BC Pressure Washing here. Open your virtual estimate: ${safeSessionUrl} Reply to this text if you have any questions.`;

      try {
        const twilioResponse = await fetch(
          `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`,
          {
            method: "POST",
            headers: {
              "Authorization": `Basic ${btoa(`${twilioAccountSid}:${twilioAuthToken}`)}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({ To: to, From: twilioFromNumber, Body: body }),
          },
        );

        twilioPayload = await twilioResponse.json().catch(() => ({}));
        if (twilioResponse.ok) {
          smsSent = true;
          console.log("Virtual estimate SMS accepted by Twilio", {
            sid: twilioPayload.sid,
            status: twilioPayload.status,
            to,
          });
        } else {
          console.error("Twilio rejected virtual estimate SMS", {
            status: twilioResponse.status,
            code: twilioPayload.code,
            message: twilioPayload.message,
          });
          smsError = "The text could not be sent. Check the number or call (778) 808-7620.";
        }
      } catch (error) {
        console.error("Virtual estimate SMS request failed", error);
        smsError = "The text could not be sent. Please retry.";
      }
    }

    let customerEmailSent = false;
    let customerEmailError: string | null = null;
    let customerEmailId: string | null = null;

    if (normalizedEmail && requestType !== "call_request") {
      if (!resendApiKey) {
        customerEmailError = "Email delivery is temporarily unavailable.";
      } else {
        try {
          const safeName = escapeHtml(displayName);
          const safeUrl = escapeHtml(safeSessionUrl);
          const emailResponse = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${resendApiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "BC Pressure Washing <quotes@bcpressurewashing.ca>",
              to: [normalizedEmail],
              subject: "Your BC Pressure Washing virtual estimate",
              html: `<!doctype html><html><body style="margin:0;background:#f6f7f9;font-family:Arial,sans-serif;color:#101828"><div style="max-width:600px;margin:0 auto;padding:32px 20px"><div style="background:#fff;border:1px solid #e4e7ec;border-radius:12px;padding:28px"><p style="margin:0 0 12px">Hi${safeName ? ` ${safeName}` : ""},</p><h1 style="font-size:24px;margin:0 0 12px">Join your virtual estimate</h1><p style="line-height:1.6;margin:0 0 24px">Use the secure link below to show us the property and discuss the work in real time.</p><a href="${safeUrl}" style="display:inline-block;background:#e21d2f;color:#fff;text-decoration:none;font-weight:700;padding:13px 20px;border-radius:8px">Open Virtual Estimate</a><p style="font-size:13px;color:#667085;margin:24px 0 0">BC Pressure Washing · (778) 808-7620</p></div></div></body></html>`,
              text: `Hi${displayName ? ` ${displayName}` : ""}, join your BC Pressure Washing virtual estimate: ${safeSessionUrl}`,
            }),
          });
          const emailPayload = await emailResponse.json().catch(() => ({}));
          customerEmailSent = emailResponse.ok;
          customerEmailId = typeof emailPayload.id === "string" ? emailPayload.id : null;
          if (!emailResponse.ok) {
            console.error("Customer virtual estimate email failed", emailPayload);
            customerEmailError = "The customer email could not be sent. Check the address and retry.";
          }
        } catch (error) {
          console.error("Customer virtual estimate email request failed", error);
          customerEmailError = "The customer email could not be sent. Please retry.";
        }
      }
    }

    let adminEmailSent = false;
    if (!normalizedEmail && resendApiKey) {
      try {
        const safeName = escapeHtml(displayName || "Unknown");
        const safePhone = escapeHtml(customerPhone);
        const safeAdminUrl = escapeHtml(adminHostUrl);
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "BC Pressure Washing <quotes@bcpressurewashing.ca>",
            to: ["jaydenf3800@gmail.com"],
            subject: `New Virtual Estimate - ${displayName || "New Customer"} (${customerPhone})`,
            html: `<h2>New Virtual Estimate</h2><p><strong>Customer:</strong> ${safeName}</p><p><strong>Phone:</strong> <a href="tel:${safePhone}">${safePhone}</a></p><p><a href="${safeAdminUrl}">Open Host Call</a></p>`,
          }),
        });
        adminEmailSent = emailResponse.ok;
        if (!emailResponse.ok) console.warn("Admin email notification failed", await emailResponse.text());
      } catch (emailError) {
        console.warn("Admin email notification failed", emailError);
      }
    }

    const success = smsSent && (!normalizedEmail || customerEmailSent);
    const errors = [smsError, customerEmailError].filter(Boolean);

    return json({
      success,
      smsSent,
      customerEmailSent,
      emailSent: adminEmailSent,
      error: errors.length ? errors.join(" ") : null,
      messageSid: typeof twilioPayload.sid === "string" ? twilioPayload.sid : null,
      messageStatus: typeof twilioPayload.status === "string" ? twilioPayload.status : null,
      customerEmailId,
      sessionUrl: safeSessionUrl,
      adminHostUrl,
    });
  } catch (error) {
    console.error("Virtual estimate invite error", error);
    return json({
      success: false,
      smsSent: false,
      customerEmailSent: false,
      error: error instanceof Error ? error.message : "Unable to send virtual estimate invite",
    }, 400);
  }
};

serve(handler);
