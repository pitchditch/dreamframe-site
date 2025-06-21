
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

    // Send email to business owner
    const businessHtmlFields = Object.entries(body)
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

    // Send email to business owner
    await resend.emails.send({
      from: `BC Pressure Washing Site <website@bcpressurewashing.ca>`,
      to: [BUSINESS_EMAIL],
      subject: businessSubject,
      html: businessHtml,
      reply_to: body.email,
    });

    // Send confirmation email to customer if email is provided
    if (body.email && body.name) {
      const customerHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
            <h1 style="color: #333; margin: 0;">BC Pressure Washing</h1>
          </div>
          <div style="padding: 30px 20px;">
            <h2 style="color: #333;">Thank you for your quote request!</h2>
            <p>Hi ${body.name},</p>
            <p>We've received your message and will get back to you within 24 hours with a personalized quote.</p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Your Request Details:</h3>
              <p><strong>Service:</strong> ${body.service || 'Not specified'}</p>
              <p><strong>Message:</strong> ${body.message}</p>
            </div>
            
            <p>In the meantime, feel free to contact us directly:</p>
            <ul>
              <li><strong>Phone:</strong> (778) 808-7620</li>
              <li><strong>Email:</strong> bcpressurewashing.ca@gmail.com</li>
            </ul>
            
            <p>We look forward to helping you with your cleaning needs!</p>
            
            <p>Best regards,<br>
            The BC Pressure Washing Team</p>
          </div>
          <div style="background-color: #333; color: white; padding: 20px; text-align: center; font-size: 12px;">
            <p>BC Pressure Washing - Professional Cleaning Services</p>
            <p>White Rock & Surrey, BC | Serving Metro Vancouver</p>
          </div>
        </div>
      `;

      await resend.emails.send({
        from: "BC Pressure Washing <info@bcpressurewashing.ca>",
        to: [body.email],
        subject: "Thank you for your quote request - BC Pressure Washing",
        html: customerHtml,
      });
    }

    // Save to house tracking system if requested
    if (body.save_to_tracking && body.name && body.email) {
      try {
        // Get existing house pins from localStorage (this would typically be in a database)
        // For now, we'll create a new entry that can be imported into the house tracking system
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
        
        // In a real implementation, this would be saved to a database
        // For now, it's logged and can be manually added to the house tracking system
      } catch (trackingError) {
        console.error('Error saving to house tracking:', trackingError);
        // Don't fail the whole request if tracking fails
      }
    }

    return new Response(JSON.stringify({ success: true }), {
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
