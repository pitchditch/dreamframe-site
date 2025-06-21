
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend("re_4dUHLASo_BNLaERvyKA3e3rCJauQkjU7x");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const BUSINESS_EMAIL = "jaydenf3800@gmail.com";
const BUSINESS_PHONE = "7788087620"; // Your business phone number for notifications

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    console.log("Received form submission:", body);

    // Compose HTML email for business owner
    const htmlFields = Object.entries(body)
      .map(
        ([key, value]) =>
          `<tr><td style='padding:6px 0'><strong>${key}:</strong></td><td>${value ?? ""}</td></tr>`
      )
      .join("");

    const businessHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">New Website Form Submission</h2>
        <table style="width: 100%; border-collapse: collapse;">
          ${htmlFields}
        </table>
        <p style="margin-top: 20px; color: #666;">
          This message was forwarded by the BC Pressure Washing website contact system.<br />
          Reply to this email to reach the customer directly.
        </p>
      </div>
    `;

    // Customer confirmation email
    const customerHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">Thank You for Your Quote Request!</h2>
        <p>Hi ${body.name || body.contactName || 'there'},</p>
        <p>We've received your request for ${body.service || 'our services'} and we're excited to help you!</p>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #dc2626; margin-top: 0;">What happens next:</h3>
          <ul style="color: #374151;">
            <li>We'll contact you within 2 hours to discuss your needs</li>
            <li>Free on-site estimate within 24 hours</li>
            <li>Flexible scheduling around your availability</li>
            <li>Professional, insured service guaranteed</li>
          </ul>
        </div>

        <p><strong>Need immediate assistance?</strong><br>
        Call us at <a href="tel:7788087620" style="color: #dc2626;">(778) 808-7620</a></p>
        
        <p>Thank you for choosing BC Pressure Washing!</p>
        <p style="color: #666; font-size: 14px;">
          BC Pressure Washing - Professional Exterior Cleaning Services<br>
          Serving White Rock, Surrey & Greater Vancouver
        </p>
      </div>
    `;

    const subject = body.subject || `New Quote Request from ${body.name || body.contactName || body.email || "Website Visitor"}`;

    // Send email to business owner
    const businessEmailRes = await resend.emails.send({
      from: `BC Pressure Washing <noreply@bcpressurewashing.ca>`,
      to: [BUSINESS_EMAIL],
      subject: subject,
      html: businessHtml,
      reply_to: body.email || body.contactName,
    });

    console.log("Business email sent:", businessEmailRes);

    // Send confirmation email to customer if email provided
    let customerEmailRes = null;
    if (body.email) {
      customerEmailRes = await resend.emails.send({
        from: `BC Pressure Washing <noreply@bcpressurewashing.ca>`,
        to: [body.email],
        subject: "Quote Request Received - BC Pressure Washing",
        html: customerHtml,
      });
      console.log("Customer confirmation email sent:", customerEmailRes);
    }

    // Send SMS notification (using a simple SMS service or placeholder)
    // Note: For SMS, you would typically use Twilio, but since you haven't provided Twilio credentials,
    // I'm logging this as a placeholder. You can integrate Twilio later if needed.
    if (body.phone) {
      console.log(`SMS would be sent to ${body.phone}: "Thank you for your quote request! We'll contact you within 2 hours. - BC Pressure Washing (778) 808-7620"`);
      
      // Placeholder for future SMS integration
      // const smsMessage = `Thank you for your quote request! We'll contact you within 2 hours. - BC Pressure Washing (778) 808-7620`;
      // await sendSMS(body.phone, smsMessage);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        businessEmail: businessEmailRes,
        customerEmail: customerEmailRes,
        smsNote: body.phone ? "SMS notification logged (integration pending)" : null
      }), 
      {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    console.error("Forwarding error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
