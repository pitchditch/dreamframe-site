
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const BUSINESS_EMAIL = "jaydenf3800@gmail.com";

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
