
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ConfirmationRequest {
  email: string;
  phone?: string;
  name: string;
  service?: string;
  formType: string;
  message?: string;
  customEmailSubject?: string;
  customEmailHTML?: string;
  customSMSMessage?: string;
}

const sendSMS = async (phone: string, message: string) => {
  const twilioAccountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
  const twilioAuthToken = Deno.env.get("TWILIO_AUTH_TOKEN");
  const twilioFromNumber = Deno.env.get("TWILIO_FROM_NUMBER") || "+12345678901";

  console.log("SMS Configuration check:", {
    hasAccountSid: !!twilioAccountSid,
    hasAuthToken: !!twilioAuthToken,
    fromNumber: twilioFromNumber
  });

  if (!twilioAccountSid || !twilioAuthToken) {
    console.log("Twilio credentials not configured, skipping SMS");
    return null;
  }

  const credentials = btoa(`${twilioAccountSid}:${twilioAuthToken}`);
  
  try {
    console.log("Sending SMS to:", phone);
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`,
      {
        method: "POST",
        headers: {
          "Authorization": `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          From: twilioFromNumber,
          To: phone,
          Body: message,
        }),
      }
    );

    if (response.ok) {
      const result = await response.json();
      console.log("SMS sent successfully:", result.sid);
      return result;
    } else {
      const error = await response.text();
      console.error("SMS sending failed:", error);
      return null;
    }
  } catch (error) {
    console.error("SMS error:", error);
    return null;
  }
};

const handler = async (req: Request): Promise<Response> => {
  console.log("Send-confirmations function called with method:", req.method);
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.text();
    console.log("Request body received:", body);
    
    const { 
      email, 
      phone, 
      name, 
      service, 
      formType, 
      message,
      customEmailSubject,
      customEmailHTML,
      customSMSMessage
    }: ConfirmationRequest = JSON.parse(body);
    
    console.log("Parsed request data:", { email, phone, name, service, formType });

    // Check if Resend API key is available
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    console.log("Resend API key available:", !!resendApiKey);
    
    if (!resendApiKey) {
      console.error("RESEND_API_KEY not found in environment variables");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Send email confirmation
    console.log("Attempting to send email to:", email);
    
    let emailHTML = customEmailHTML;
    let emailSubject = customEmailSubject || `We received your ${formType} request - BC Pressure Washing`;
    
    // Use default template if no custom HTML provided
    if (!emailHTML) {
      emailHTML = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #dc2626;">Thank you, ${name}!</h1>
          <p>We've received your ${formType} request and will get back to you shortly.</p>
          
          ${service ? `<p><strong>Service requested:</strong> ${service}</p>` : ''}
          ${message ? `<p><strong>Your message:</strong> ${message}</p>` : ''}
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">What happens next?</h3>
            <ul style="color: #6b7280;">
              <li>We'll review your request within 24 hours</li>
              <li>You'll receive a personalized quote</li>
              <li>We'll contact you to schedule your service</li>
            </ul>
          </div>
          
          <p>Questions? Reply to this email or call us at <a href="tel:7788087620">(778) 808-7620</a></p>
          
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px; color: #6b7280; font-size: 14px;">
            <p>BC Pressure Washing<br>
            Professional cleaning services in Surrey, White Rock & Metro Vancouver<br>
            <a href="https://bcpressurewashing.ca">bcpressurewashing.ca</a></p>
          </div>
        </div>
      `;
    }

    const emailResponse = await resend.emails.send({
      from: "BC Pressure Washing <info@bcpressurewashing.ca>",
      to: [email],
      subject: emailSubject,
      html: emailHTML,
    });

    console.log("Email confirmation sent:", emailResponse);

    // Send SMS confirmation if phone number provided
    let smsResponse = null;
    if (phone && phone.trim()) {
      let smsMessage = customSMSMessage;
      
      // Use default message if no custom SMS provided
      if (!smsMessage) {
        smsMessage = `Hi ${name}! We received your ${service || 'service'} request. We'll contact you within 24 hours with your quote. BC Pressure Washing - (778) 808-7620`;
      }
      
      smsResponse = await sendSMS(phone, smsMessage);
    } else {
      console.log("No phone number provided, skipping SMS");
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        email: emailResponse,
        sms: smsResponse 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-confirmations function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
