
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface QuoteContractRequest {
  customerEmail: string;
  customerName: string;
  service: string;
  address: string;
  finalQuote: number;
  workDescription: string;
  estimatedCompletionTime: string;
  termsAndConditions?: string;
  attachments?: Array<{ name: string; url: string }>;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: QuoteContractRequest = await req.json();
    console.log("Quote/Contract request received:", body);

    if (!resend) {
      throw new Error("RESEND_API_KEY not configured");
    }

    // Create professional quote/contract email
    const quoteEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #dc2626; margin-bottom: 10px;">BC Pressure Washing</h1>
          <p style="color: #666; font-size: 16px;">Professional Cleaning Services</p>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
          <h2 style="color: #333; margin-top: 0;">Service Quote & Contract</h2>
          <p>Dear ${body.customerName},</p>
          <p>Thank you for your interest in our services. Please find your detailed quote and service agreement below.</p>
        </div>

        <div style="background-color: white; border: 1px solid #dee2e6; border-radius: 8px; padding: 25px; margin-bottom: 20px;">
          <h3 style="color: #dc2626; margin-top: 0; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">Service Details</h3>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
            <div>
              <strong>Service:</strong><br>
              <span style="color: #666;">${body.service}</span>
            </div>
            <div>
              <strong>Property Address:</strong><br>
              <span style="color: #666;">${body.address}</span>
            </div>
          </div>

          <div style="margin-bottom: 20px;">
            <strong>Work Description:</strong><br>
            <p style="color: #666; margin: 10px 0; line-height: 1.6;">${body.workDescription}</p>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
            <div>
              <strong>Estimated Completion:</strong><br>
              <span style="color: #666;">${body.estimatedCompletionTime}</span>
            </div>
            <div style="text-align: right;">
              <strong style="font-size: 18px;">Total Quote:</strong><br>
              <span style="color: #dc2626; font-size: 24px; font-weight: bold;">$${body.finalQuote.toLocaleString()}</span>
            </div>
          </div>
        </div>

        ${body.termsAndConditions ? `
        <div style="background-color: white; border: 1px solid #dee2e6; border-radius: 8px; padding: 25px; margin-bottom: 20px;">
          <h3 style="color: #dc2626; margin-top: 0;">Terms & Conditions</h3>
          <div style="color: #666; line-height: 1.6;">
            ${body.termsAndConditions.replace(/\n/g, '<br>')}
          </div>
        </div>
        ` : ''}

        <div style="background-color: #e7f3ff; border-left: 4px solid #0066cc; padding: 20px; margin-bottom: 30px;">
          <h3 style="color: #0066cc; margin-top: 0;">Next Steps</h3>
          <p style="margin-bottom: 10px;">To proceed with this service:</p>
          <ol style="color: #666; line-height: 1.6;">
            <li>Review the quote and service details above</li>
            <li>Reply to this email to confirm your acceptance</li>
            <li>We'll schedule the work at your convenience</li>
            <li>Payment is due upon completion of work</li>
          </ol>
        </div>

        <div style="text-align: center; padding: 20px; border-top: 2px solid #dee2e6;">
          <p style="color: #666; margin-bottom: 15px;">Questions about this quote?</p>
          <p style="margin-bottom: 10px;">
            <strong>Call:</strong> <a href="tel:778-808-7620" style="color: #dc2626; text-decoration: none;">(778) 808-7620</a>
          </p>
          <p style="margin-bottom: 20px;">
            <strong>Email:</strong> <a href="mailto:info@bcpressurewashing.ca" style="color: #dc2626; text-decoration: none;">info@bcpressurewashing.ca</a>
          </p>
          <p style="color: #999; font-size: 14px;">
            Thank you for choosing BC Pressure Washing<br>
            Professional • Reliable • Guaranteed
          </p>
        </div>
      </div>
    `;

    // Send the quote/contract email
    const emailRes = await resend.emails.send({
      from: "BC Pressure Washing <onboarding@resend.dev>",
      to: [body.customerEmail],
      subject: `Service Quote - ${body.service} at ${body.address}`,
      html: quoteEmailHtml,
      // Add attachments if provided
      ...(body.attachments && body.attachments.length > 0 && {
        attachments: body.attachments
      })
    });

    console.log("Quote/Contract email sent:", emailRes);

    return new Response(JSON.stringify({ 
      success: true, 
      emailRes,
      message: "Quote and contract sent successfully"
    }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    console.error("Error sending quote/contract:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    );
  }
});
