
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend("re_4dUHLASo_BNLaERvyKA3e3rCJauQkjU7x");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const BUSINESS_EMAIL = "jaydenf3800@gmail.com";
const TWILIO_ACCOUNT_SID = "e81550a4a679b9a58bbdab855c63f1a8";
const TWILIO_PHONE_NUMBER = "+13183929394";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    // Compose a simple HTML email body with form info
    const htmlFields = Object.entries(body)
      .map(
        ([key, value]) =>
          `<tr><td style='padding:6px 0'><strong>${key}:</strong></td><td>${value ?? ""}</td></tr>`
      )
      .join("");

    const html = `
      <div>
        <h2>New Website Form Submission</h2>
        <table>${htmlFields}</table>
        <p>
          This message was forwarded by the BC Pressure Washing website contact system.<br />
          Reply to this email to reach the customer.
        </p>
      </div>
    `;

    const subject =
      body.subject ||
      `New Contact Form Submission from ${body.name || body.email || "Visitor"}`;

    const from =
      body.email && typeof body.email === "string"
        ? `${body.email}`
        : "website@bcpressurewashing.ca";

    // Send the email!
    const emailRes = await resend.emails.send({
      from: `BC Pressure Washing Site <${from}>`,
      to: [BUSINESS_EMAIL],
      subject,
      html,
      reply_to: body.email,
    });

    console.log("Email sent successfully:", emailRes);

    // Send SMS confirmation if phone number is provided
    if (body.phone) {
      try {
        const twilioAuthToken = Deno.env.get("TWILIO_AUTH_TOKEN");
        
        if (twilioAuthToken) {
          const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;
          
          const smsBody = `Hi ${body.name || 'there'}! Thanks for contacting BC Pressure Washing. We received your message and will get back to you within 24 hours. Call us at (778) 808-7620 for immediate assistance.`;
          
          const twilioResponse = await fetch(twilioUrl, {
            method: 'POST',
            headers: {
              'Authorization': 'Basic ' + btoa(`${TWILIO_ACCOUNT_SID}:${twilioAuthToken}`),
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              From: TWILIO_PHONE_NUMBER,
              To: body.phone,
              Body: smsBody,
            }),
          });

          if (twilioResponse.ok) {
            console.log("SMS confirmation sent successfully");
          } else {
            console.error("Failed to send SMS:", await twilioResponse.text());
          }
        } else {
          console.log("Twilio auth token not found, skipping SMS");
        }
      } catch (smsError) {
        console.error("SMS sending error:", smsError);
        // Don't fail the entire request if SMS fails
      }
    }

    return new Response(JSON.stringify({ success: true, emailRes }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    console.error("Forwarding error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
