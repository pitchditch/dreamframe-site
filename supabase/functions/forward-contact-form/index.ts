
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { sendSMS } from './utils/smsService.ts';
import { extractPhoneNumber } from './utils/phoneUtils.ts';
import { sendBusinessEmail, sendCustomerEmail } from './utils/emailService.ts';

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    console.log("Form submission received:", body);
    console.log("All form fields:", Object.keys(body));

    // Send the business notification email
    let emailRes = null;
    if (resend) {
      emailRes = await sendBusinessEmail(resend, body);
    } else {
      console.log("RESEND_API_KEY not available, skipping email");
      emailRes = { skipped: "No API key" };
    }

    // Send customer confirmation email
    let customerEmailRes = null;
    if (resend) {
      customerEmailRes = await sendCustomerEmail(resend, body);
    }

    // Send SMS confirmation without trial account prefix
    let smsRes = null;
    const finalPhoneNumber = extractPhoneNumber(body);
    
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
