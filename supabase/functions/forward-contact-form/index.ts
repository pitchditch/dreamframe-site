
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
    console.log('Received form submission:', body);

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      throw new Error('Missing required fields: name, email, or message');
    }

    // Send email to business owner
    const businessHtmlFields = Object.entries(body)
      .filter(([key, value]) => key !== 'save_to_tracking' && value)
      .map(
        ([key, value]) =>
          `<tr><td style='padding:6px 0'><strong>${key}:</strong></td><td>${value ?? ""}</td></tr>`
      )
      .join("");

    const businessHtml = `
      <div>
        <h2>New Website Form Submission</h2>
        <table>${businessHtmlFields}</table>
        <p>
          This message was forwarded by the BC Pressure Washing website contact system.<br />
          Reply to this email to reach the customer.
        </p>
      </div>
    `;

    const businessSubject =
      body.subject ||
      `New Contact Form Submission from ${body.name || body.email || "Visitor"}`;

    console.log('Sending email to business owner:', BUSINESS_EMAIL);
    
    // Send email to business owner
    const businessEmailResult = await resend.emails.send({
      from: `BC Pressure Washing Site <website@bcpressurewashing.ca>`,
      to: [BUSINESS_EMAIL],
      subject: businessSubject,
      html: businessHtml,
      reply_to: body.email,
    });

    console.log('Business email sent:', businessEmailResult);

    // ALWAYS send confirmation email to customer
    console.log('Sending confirmation email to customer:', body.email);
    
    const customerHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #1e40af; color: white; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">BC Pressure Washing</h1>
        </div>
        <div style="padding: 30px 20px;">
          <h2 style="color: #333;">Thank you for your quote request!</h2>
          <p>Hi ${body.name},</p>
          <p>We've received your message and will get back to you within 24 hours with a personalized quote.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Your Request Details:</h3>
            <p><strong>Service:</strong> ${body.service || 'Not specified'}</p>
            <p><strong>Phone:</strong> ${body.phone || 'Not provided'}</p>
            <p><strong>Message:</strong> ${body.message}</p>
          </div>
          
          <p>In the meantime, feel free to contact us directly:</p>
          <ul>
            <li><strong>Phone:</strong> (778) 808-7620</li>
            <li><strong>Email:</strong> info@bcpressurewashing.ca</li>
          </ul>
          
          <p>We look forward to helping you with your cleaning needs!</p>
          
          <p>Best regards,<br>
          The BC Pressure Washing Team</p>
        </div>
        <div style="background-color: #1e40af; color: white; padding: 20px; text-align: center; font-size: 12px;">
          <p style="color: white; margin: 0;">BC Pressure Washing - Professional Cleaning Services</p>
          <p style="color: white; margin: 0;">White Rock & Surrey, BC | Serving Metro Vancouver</p>
        </div>
      </div>
    `;

    const customerEmailResult = await resend.emails.send({
      from: "BC Pressure Washing <info@bcpressurewashing.ca>",
      to: [body.email],
      subject: "Thank you for your quote request - BC Pressure Washing",
      html: customerHtml,
    });

    console.log('Customer confirmation email sent:', customerEmailResult);

    // Save to house tracking system if requested
    if (body.save_to_tracking && body.name && body.email) {
      try {
        console.log('Saving customer data for house tracking...');
        
        const trackingData = {
          id: `contact-${Date.now()}`,
          customerName: body.name,
          email: body.email,
          phone: body.phone || '',
          address: '', // Will need to be filled in later
          status: 'needs-quote',
          serviceInterest: body.service || '',
          notes: `Contact form submission: ${body.message}`,
          dateAdded: new Date().toISOString(),
          source: 'website-contact-form',
          isPreviousClient: false
        };

        console.log('New customer data for house tracking:', trackingData);
        
      } catch (trackingError) {
        console.error('Error saving to house tracking:', trackingError);
      }
    }

    console.log('Form submission processed successfully');

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Form submitted successfully. Confirmation email sent.',
      businessEmailId: businessEmailResult.data?.id,
      customerEmailId: customerEmailResult.data?.id
    }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Please check that all required fields are filled out correctly.'
      }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
