
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
}

const sendSMS = async (phone: string, message: string) => {
  const twilioAccountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
  const twilioAuthToken = Deno.env.get("TWILIO_AUTH_TOKEN");
  const twilioFromNumber = Deno.env.get("TWILIO_FROM_NUMBER") || "+12345678901";

  if (!twilioAccountSid || !twilioAuthToken) {
    console.log("Twilio credentials not configured, skipping SMS");
    return null;
  }

  const credentials = btoa(`${twilioAccountSid}:${twilioAuthToken}`);
  
  try {
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
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, phone, name, service, formType, message }: ConfirmationRequest = await req.json();

    // Send email confirmation
    const emailResponse = await resend.emails.send({
      from: "BC Pressure Washing <info@bcpressurewashing.ca>",
      to: [email],
      subject: "We received your request - BC Pressure Washing",
      html: `
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
      `,
    });

    console.log("Email confirmation sent:", emailResponse);

    // Send SMS confirmation if phone number provided
    let smsResponse = null;
    if (phone && phone.trim()) {
      const smsMessage = `Hi ${name}! We received your ${service || 'service'} request. We'll contact you within 24 hours with your quote. BC Pressure Washing - (778) 808-7620`;
      smsResponse = await sendSMS(phone, smsMessage);
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
