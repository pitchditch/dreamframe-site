
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const BUSINESS_EMAIL = "jaydenf3800@gmail.com";
const TWILIO_ACCOUNT_SID = "AC0f87bb3e52a7a2dce6bd77f5edb0ceca";
const TWILIO_PHONE_NUMBER = "+13183929394";

// Function to send SMS via Twilio
async function sendSMS(to: string, message: string) {
  const twilioAuthToken = Deno.env.get("twillio key");
  
  if (!twilioAuthToken) {
    console.error("Twilio Auth Token not found");
    return { success: false, error: "SMS service not configured" };
  }

  try {
    const auth = btoa(`${TWILIO_ACCOUNT_SID}:${twilioAuthToken}`);
    
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
      {
        method: "POST",
        headers: {
          "Authorization": `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          From: TWILIO_PHONE_NUMBER,
          To: to,
          Body: message,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("SMS sent successfully:", data.sid);
      return { success: true, sid: data.sid };
    } else {
      const error = await response.text();
      console.error("SMS failed:", error);
      return { success: false, error };
    }
  } catch (error) {
    console.error("SMS error:", error);
    return { success: false, error: error.message };
  }
}

// Function to format phone number for SMS
function formatPhoneNumber(phone: string): string | null {
  if (!phone) return null;
  
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // If it starts with 1 and has 11 digits, it's already formatted
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`;
  }
  
  // If it has 10 digits, add +1
  if (digits.length === 10) {
    return `+1${digits}`;
  }
  
  // If it already starts with + return as is
  if (phone.startsWith('+')) {
    return phone;
  }
  
  return null;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    console.log("Form submission received:", body);

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

    // Send the email to business
    const emailRes = await resend.emails.send({
      from: `BC Pressure Washing Site <${from}>`,
      to: [BUSINESS_EMAIL],
      subject,
      html,
      reply_to: body.email,
    });

    console.log("Business email sent:", emailRes);

    // Send SMS confirmation to user if phone number is provided
    let smsResult = null;
    if (body.phone) {
      const formattedPhone = formatPhoneNumber(body.phone);
      console.log("Original phone:", body.phone, "Formatted:", formattedPhone);
      
      if (formattedPhone) {
        const smsMessage = `Hi ${body.name || 'there'}! Thanks for contacting BC Pressure Washing. We received your quote request and will get back to you within 24 hours. Call us at (778) 808-7620 for immediate assistance.`;
        
        smsResult = await sendSMS(formattedPhone, smsMessage);
        console.log("SMS result:", smsResult);
      } else {
        console.log("Invalid phone number format:", body.phone);
      }
    }

    // Send confirmation email to customer if email is provided
    let customerEmailResult = null;
    if (body.email) {
      const customerHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">Thank you for contacting BC Pressure Washing!</h2>
          <p>Hi ${body.name || 'there'},</p>
          <p>We've received your quote request and will get back to you within 24 hours with a personalized estimate.</p>
          <p><strong>Your submission details:</strong></p>
          <ul>
            ${body.serviceType ? `<li><strong>Service:</strong> ${body.serviceType}</li>` : ''}
            ${body.address ? `<li><strong>Address:</strong> ${body.address}</li>` : ''}
            ${body.phone ? `<li><strong>Phone:</strong> ${body.phone}</li>` : ''}
          </ul>
          <p>For immediate assistance, call us at <strong>(778) 808-7620</strong></p>
          <p>Best regards,<br/>
          Jayden Fisher<br/>
          BC Pressure Washing</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #666;">
            BC Pressure Washing - Professional Exterior Cleaning Services<br/>
            White Rock & Surrey, BC | (778) 808-7620
          </p>
        </div>
      `;

      customerEmailResult = await resend.emails.send({
        from: "BC Pressure Washing <website@bcpressurewashing.ca>",
        to: [body.email],
        subject: "Quote Request Received - BC Pressure Washing",
        html: customerHtml,
      });

      console.log("Customer email sent:", customerEmailResult);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        emailRes, 
        smsResult, 
        customerEmailResult 
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
