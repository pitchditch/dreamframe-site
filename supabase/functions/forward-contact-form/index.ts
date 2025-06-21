
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend("re_aQbr4WSJ_9f2uADJtFenWH2XWSC5XgVXM");

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
    console.log('Form submission received:', {
      form: body.form,
      email: body.email,
      name: body.name,
      phone: body.phone
    });

    // Compose a simple HTML email body with form info
    const htmlFields = Object.entries(body)
      .filter(([key]) => !['form'].includes(key))
      .map(
        ([key, value]) =>
          `<tr><td style='padding:6px 12px; border:1px solid #ddd; background:#f9f9f9; font-weight:bold;'>${key}:</td><td style='padding:6px 12px; border:1px solid #ddd;'>${value ?? ""}</td></tr>`
      )
      .join("");

    const businessHtml = `
      <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>
        <h2 style='color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px;'>New Website Form Submission</h2>
        <table style='width: 100%; border-collapse: collapse; margin: 20px 0;'>
          ${htmlFields}
        </table>
        <div style='background: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;'>
          <p style='margin: 0; color: #374151;'>
            <strong>Form Source:</strong> ${body.form || 'Contact Form'}<br/>
            <strong>Submitted:</strong> ${new Date().toLocaleString('en-CA', { timeZone: 'America/Vancouver' })}
          </p>
        </div>
        <p style='color: #6b7280; font-size: 14px;'>
          This message was forwarded by the BC Pressure Washing website contact system.<br />
          Reply to this email to reach the customer directly.
        </p>
      </div>
    `;

    const subject =
      body.subject ||
      `New ${body.form || 'Contact'} Form Submission from ${body.name || body.email || "Visitor"}`;

    const replyToEmail = body.email && typeof body.email === "string" ? body.email : BUSINESS_EMAIL;

    // Send notification email to business
    console.log('Sending business notification email...');
    const businessEmailRes = await resend.emails.send({
      from: `BC Pressure Washing Site <noreply@bcpressurewashing.ca>`,
      to: [BUSINESS_EMAIL],
      subject,
      html: businessHtml,
      reply_to: replyToEmail,
    });

    console.log('Business email result:', businessEmailRes);

    // Send confirmation email to customer if email is provided
    let customerEmailRes = null;
    if (body.email && typeof body.email === "string") {
      console.log('Sending customer confirmation email to:', body.email);
      
      const customerHtml = `
        <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>
          <div style='background: #dc2626; color: white; padding: 20px; text-align: center;'>
            <img src='https://bcpressurewashing.ca/logo.png' alt='BC Pressure Washing' style='max-height: 60px; margin-bottom: 10px;' />
            <h1 style='margin: 0; font-size: 24px;'>Thank You for Contacting Us!</h1>
          </div>
          
          <div style='padding: 30px 20px;'>
            <p style='font-size: 18px; color: #374151; margin-bottom: 20px;'>
              Hi ${body.name || 'there'},
            </p>
            
            <p style='color: #374151; line-height: 1.6; margin-bottom: 20px;'>
              Thank you for your interest in BC Pressure Washing! We've received your ${body.form === 'SmartPriceCalculator' ? 'quote request' : 'message'} and will get back to you within 24 hours.
            </p>
            
            ${body.quote ? `
              <div style='background: #ecfdf5; border: 2px solid #10b981; border-radius: 8px; padding: 20px; margin: 20px 0;'>
                <h3 style='color: #065f46; margin: 0 0 15px 0; font-size: 20px;'>Your Quote Summary</h3>
                <p style='margin: 5px 0; color: #374151;'><strong>Service:</strong> ${body.serviceType || 'Service'}</p>
                <p style='margin: 5px 0; color: #374151;'><strong>Address:</strong> ${body.address || 'Address provided'}</p>
                <p style='margin: 5px 0; color: #374151;'><strong>Estimated Price:</strong> <span style='font-size: 24px; color: #10b981; font-weight: bold;'>${body.quote ? '$' + body.quote : 'Calculating'}</span></p>
              </div>
            ` : ''}
            
            <div style='background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0;'>
              <h4 style='color: #92400e; margin: 0 0 10px 0;'>What happens next?</h4>
              <ul style='color: #374151; margin: 0; padding-left: 20px;'>
                <li>We'll review your request and prepare a detailed quote</li>
                <li>One of our team members will call or text you within 24 hours</li>
                <li>We'll schedule a convenient time for your service</li>
                <li>You'll receive confirmation via email and text</li>
              </ul>
            </div>
            
            <div style='background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;'>
              <h4 style='color: #374151; margin: 0 0 15px 0;'>Need immediate assistance?</h4>
              <p style='margin: 5px 0; color: #374151;'>📞 <strong>Call or Text:</strong> (778) 808-7620</p>
              <p style='margin: 5px 0; color: #374151;'>📧 <strong>Email:</strong> info@bcpressurewashing.ca</p>
              <p style='margin: 5px 0; color: #374151;'>🕒 <strong>Hours:</strong> Monday-Saturday, 7AM-7PM</p>
            </div>
            
            <p style='color: #374151; line-height: 1.6;'>
              Thank you for choosing BC Pressure Washing - your trusted local cleaning professionals serving White Rock, Surrey, and Metro Vancouver!
            </p>
            
            <div style='text-align: center; margin: 30px 0;'>
              <p style='color: #6b7280; font-size: 14px; margin: 0;'>
                BC Pressure Washing | White Rock & Surrey, BC<br/>
                Professional • Reliable • Satisfaction Guaranteed
              </p>
            </div>
          </div>
        </div>
      `;

      customerEmailRes = await resend.emails.send({
        from: `BC Pressure Washing <info@bcpressurewashing.ca>`,
        to: [body.email],
        subject: body.quote ? 
          `Your Quote: ${body.serviceType} - $${body.quote} | BC Pressure Washing` :
          `Thank you for contacting BC Pressure Washing!`,
        html: customerHtml,
      });

      console.log('Customer confirmation email result:', customerEmailRes);
    }

    // Send SMS notification if phone number is provided
    let smsRes = null;
    if (body.phone && typeof body.phone === "string") {
      console.log('Phone number provided, but SMS service not configured:', body.phone);
      // Note: SMS would require Twilio integration - not currently set up
    }

    // Log the successful submission
    console.log('Form submission processed successfully:', {
      businessEmailSent: !!businessEmailRes?.data,
      customerEmailSent: !!customerEmailRes?.data,
      customerEmail: body.email,
      phoneProvided: !!body.phone
    });

    return new Response(JSON.stringify({ 
      success: true, 
      businessEmailRes,
      customerEmailRes,
      smsRes,
      message: "Your request has been sent successfully! Check your email for confirmation. We'll also call or text you within 24 hours."
    }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    console.error("Form forwarding error:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        message: "There was an issue processing your request. We'll still follow up with you soon!"
      }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
