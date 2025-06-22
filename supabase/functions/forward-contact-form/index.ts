
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;
const twilioAccountSid = "AC137df830ca1a154ba8f82d06da9e40f1";
const twilioAuthToken = Deno.env.get("TWILIO_AUTH_TOKEN");
const twilioPhoneNumber = "+13183929394";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const BUSINESS_EMAIL = "jaydenf3800@gmail.com";

// Function to format phone number for SMS
function formatPhoneNumber(phone: string): string {
  console.log(`Original phone number: ${phone}`);
  
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  console.log(`Digits only: ${digits}`);
  
  // Add +1 if it's a 10-digit North American number
  if (digits.length === 10) {
    const formatted = `+1${digits}`;
    console.log(`Formatted 10-digit number: ${formatted}`);
    return formatted;
  }
  
  // Add + if it doesn't have it but is international format
  if (digits.length > 10 && !phone.startsWith('+')) {
    const formatted = `+${digits}`;
    console.log(`Formatted international number: ${formatted}`);
    return formatted;
  }
  
  // Return as-is if already formatted
  const formatted = phone.startsWith('+') ? phone : `+${digits}`;
  console.log(`Final formatted number: ${formatted}`);
  return formatted;
}

// Function to send SMS via Twilio
async function sendSMS(to: string, message: string) {
  try {
    console.log(`Twilio auth token available: ${twilioAuthToken ? 'Yes' : 'No'}`);
    
    if (!twilioAuthToken) {
      console.error("TWILIO_AUTH_TOKEN is missing");
      return { success: false, error: "Twilio auth token not configured" };
    }

    const formattedTo = formatPhoneNumber(to);
    console.log(`Attempting to send SMS to: ${formattedTo}`);
    console.log(`SMS message: ${message}`);
    
    const body = new URLSearchParams({
      To: formattedTo,
      From: twilioPhoneNumber,
      Body: message,
    });

    console.log(`Twilio request body: ${body.toString()}`);

    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`,
      {
        method: "POST",
        headers: {
          "Authorization": `Basic ${btoa(`${twilioAccountSid}:${twilioAuthToken}`)}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      }
    );

    const result = await response.json();
    console.log(`Twilio response status: ${response.status}`);
    console.log(`Twilio response:`, result);
    
    if (response.ok) {
      console.log("SMS sent successfully:", result.sid);
      return { success: true, sid: result.sid };
    } else {
      console.error("Failed to send SMS:", result);
      return { success: false, error: result };
    }
  } catch (error) {
    console.error("SMS sending error:", error);
    return { success: false, error: error.message };
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    console.log("Form submission received:", body);
    console.log("All form fields:", Object.keys(body));

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
      `New Contact Form Submission from ${body.name || body.contactName || body.email || "Visitor"}`;

    // Send the business notification email
    let emailRes = null;
    if (resend) {
      try {
        emailRes = await resend.emails.send({
          from: `BC Pressure Washing Site <noreply@bcpressurewashing.ca>`,
          to: [BUSINESS_EMAIL],
          subject,
          html,
          reply_to: body.email,
        });
        console.log("Business email sent:", emailRes);
      } catch (error) {
        console.error("Error sending business email:", error);
        emailRes = { error: error.message };
      }
    } else {
      console.log("RESEND_API_KEY not available, skipping email");
      emailRes = { skipped: "No API key" };
    }

    // Send customer confirmation email
    let customerEmailRes = null;
    if (body.email && resend) {
      try {
        const customerHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #dc2626;">Thank you for contacting BC Pressure Washing!</h2>
            <p>Hi ${body.name || body.contactName || 'there'},</p>
            <p>We've received your inquiry and will get back to you within 24 hours.</p>
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Your Request Details:</h3>
              <p><strong>Service:</strong> ${body.service || body.form || 'General Inquiry'}</p>
              ${body.businessName ? `<p><strong>Business:</strong> ${body.businessName}</p>` : ''}
              ${body.address ? `<p><strong>Address:</strong> ${body.address}</p>` : ''}
              ${body.preferredTime ? `<p><strong>Preferred Time:</strong> ${body.preferredTime}</p>` : ''}
            </div>
            <p>Questions? Call us at <strong>(778) 808-7620</strong></p>
            <p>Best regards,<br>BC Pressure Washing Team</p>
          </div>
        `;

        customerEmailRes = await resend.emails.send({
          from: "BC Pressure Washing <noreply@bcpressurewashing.ca>",
          to: [body.email],
          subject: "Thanks for your inquiry - BC Pressure Washing",
          html: customerHtml,
        });

        console.log("Customer email sent:", customerEmailRes);
      } catch (error) {
        console.error("Error sending customer email:", error);
        customerEmailRes = { error: error.message };
      }
    }

    // Send SMS confirmation without trial account prefix
    let smsRes = null;
    const phoneField = body.phone || body.contactPhone || body.phoneNumber;
    
    // For booking calendar, also check nested customer object
    const bookingPhone = body.customer?.phone;
    const finalPhoneNumber = phoneField || bookingPhone;
    
    console.log(`Phone field search results:`, {
      phone: body.phone,
      contactPhone: body.contactPhone,
      phoneNumber: body.phoneNumber,
      customerPhone: body.customer?.phone,
      finalPhoneNumber
    });
    
    if (finalPhoneNumber) {
      console.log(`Phone number found: ${finalPhoneNumber}`);
      const customerName = body.name || body.contactName || body.customer?.name || 'there';
      // Clean message without any trial prefixes
      const smsMessage = `Hi ${customerName}! Thanks for contacting BC Pressure Washing. We've received your inquiry and will call you back within 24 hours. Questions? Call (778) 808-7620`;
      
      smsRes = await sendSMS(finalPhoneNumber, smsMessage);
      console.log("SMS result:", smsRes);
    } else {
      console.log("No phone number provided in form data");
      console.log("Available fields:", Object.keys(body));
    }

    return new Response(JSON.stringify({ 
      success: true, 
      emailRes, 
      customerEmailRes,
      smsRes 
    }), {
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
