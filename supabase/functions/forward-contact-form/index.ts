
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
  console.log('Forward contact form function called');

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    console.log('Received form submission:', JSON.stringify(body, null, 2));

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      console.error('Missing required fields:', { name: body.name, email: body.email, message: body.message });
      throw new Error('Missing required fields: name, email, and message are required');
    }

    // Send email to business owner
    const businessHtmlFields = Object.entries(body)
      .filter(([key]) => !['save_to_tracking', 'form'].includes(key))
      .map(
        ([key, value]) =>
          `<tr><td style='padding:6px 0; font-weight:bold; text-transform:capitalize;'>${key.replace('_', ' ')}:</td><td style='padding:6px 0;'>${value ?? ""}</td></tr>`
      )
      .join("");

    const businessHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #1e40af; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">New Website Form Submission</h1>
        </div>
        <div style="padding: 20px; background-color: #f8f9fa;">
          <table style="width: 100%; border-collapse: collapse;">
            ${businessHtmlFields}
          </table>
        </div>
        <div style="padding: 20px; background-color: white; border-top: 2px solid #1e40af;">
          <p style="margin: 0; font-size: 14px; color: #666;">
            This message was forwarded by the BC Pressure Washing website contact system.<br />
            <strong>Reply to this email to reach the customer directly.</strong>
          </p>
        </div>
      </div>
    `;

    const businessSubject = body.subject || `New Contact Form Submission from ${body.name || body.email || "Website Visitor"}`;

    console.log('Sending email to business owner:', BUSINESS_EMAIL);
    
    // Send email to business owner
    const businessEmailResult = await resend.emails.send({
      from: `BC Pressure Washing <noreply@bcpressurewashing.ca>`,
      to: [BUSINESS_EMAIL],
      subject: businessSubject,
      html: businessHtml,
      reply_to: body.email,
    });

    console.log('Business email result:', businessEmailResult);

    if (businessEmailResult.error) {
      console.error('Business email failed:', businessEmailResult.error);
      throw new Error(`Failed to send business notification: ${businessEmailResult.error.message}`);
    }

    // Send confirmation email to customer
    let customerEmailResult = null;
    if (body.email && body.name) {
      console.log('Sending confirmation email to customer:', body.email);
      
      const customerHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #1e40af; color: white; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">BC Pressure Washing</h1>
            <p style="color: white; margin: 10px 0 0 0;">Professional Cleaning Services</p>
          </div>
          <div style="padding: 30px 20px; background-color: white;">
            <h2 style="color: #333; margin-top: 0;">Thank you for your quote request!</h2>
            <p>Hi ${body.name},</p>
            <p>We've received your message and will get back to you within 24 hours with a personalized quote.</p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #1e40af;">
              <h3 style="color: #333; margin-top: 0;">Your Request Details:</h3>
              <p><strong>Service:</strong> ${body.service || 'Not specified'}</p>
              <p><strong>Phone:</strong> ${body.phone || 'Not provided'}</p>
              <p><strong>Message:</strong> ${body.message}</p>
            </div>
            
            <div style="background-color: #e1f5fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Contact Us Directly:</h3>
              <p style="margin: 5px 0;"><strong>📞 Phone:</strong> (778) 808-7620</p>
              <p style="margin: 5px 0;"><strong>📧 Email:</strong> info@bcpressurewashing.ca</p>
              <p style="margin: 5px 0;"><strong>🕒 Hours:</strong> Mon-Sat: 7AM-7PM</p>
            </div>
            
            <p>We look forward to helping you with your cleaning needs!</p>
            
            <p>Best regards,<br>
            <strong>The BC Pressure Washing Team</strong></p>
          </div>
          <div style="background-color: #1e40af; color: white; padding: 20px; text-align: center; font-size: 12px;">
            <p style="margin: 5px 0; color: white;">BC Pressure Washing - Professional Cleaning Services</p>
            <p style="margin: 5px 0; color: white;">White Rock & Surrey, BC | Serving Metro Vancouver</p>
            <p style="margin: 5px 0; color: white;">(778) 808-7620 | info@bcpressurewashing.ca</p>
          </div>
        </div>
      `;

      customerEmailResult = await resend.emails.send({
        from: "BC Pressure Washing <info@bcpressurewashing.ca>",
        to: [body.email],
        subject: "Thank you for your quote request - BC Pressure Washing",
        html: customerHtml,
      });

      console.log('Customer confirmation email result:', customerEmailResult);

      if (customerEmailResult.error) {
        console.error('Customer email failed:', customerEmailResult.error);
        // Don't throw error for customer email failure, just log it
      }
    }

    // Save to house tracking system if requested
    if (body.save_to_tracking && body.name && body.email) {
      try {
        console.log('Processing customer data for house tracking...');
        
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

        console.log('Customer data prepared for house tracking:', trackingData);
        
        // In a real implementation, this would be saved to a database
        // For now, it's logged and can be manually added to the house tracking system
      } catch (trackingError) {
        console.error('Error preparing house tracking data:', trackingError);
        // Don't fail the whole request if tracking fails
      }
    }

    console.log('Form submission processed successfully');

    const response = {
      success: true,
      message: 'Form submitted successfully',
      businessEmailSent: !businessEmailResult.error,
      customerEmailSent: customerEmailResult ? !customerEmailResult.error : false,
      businessEmailId: businessEmailResult.data?.id,
      customerEmailId: customerEmailResult?.data?.id
    };

    console.log('Sending response:', response);

    return new Response(JSON.stringify(response), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
      status: 200,
    });

  } catch (error) {
    console.error("Contact form forwarding error:", error);
    
    const errorResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      details: error instanceof Error ? error.stack : undefined
    };

    return new Response(
      JSON.stringify(errorResponse),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    );
  }
});
