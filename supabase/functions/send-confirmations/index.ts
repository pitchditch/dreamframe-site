
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
  estimateTotal?: number;
  services?: string[];
  addOns?: string[];
  houseSize?: string;
  address?: string;
  scheduledDate?: string;
  scheduledTime?: string;
  squareFootage?: number;
  notes?: string;
}

const sendSMS = async (phone: string, message: string) => {
  const twilioAccountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
  const twilioAuthToken = Deno.env.get("TWILIO_AUTH_TOKEN");
  const twilioFromNumber = Deno.env.get("TWILIO_FROM_NUMBER") || "+12345678901";

  console.log("SMS Configuration check:", {
    hasAccountSid: !!twilioAccountSid,
    hasAuthToken: !!twilioAuthToken,
    fromNumber: twilioFromNumber,
    targetPhone: phone
  });

  if (!twilioAccountSid || !twilioAuthToken) {
    console.log("Twilio credentials not configured, skipping SMS");
    return null;
  }

  // Clean phone number - remove any non-digit characters except +
  const cleanPhone = phone.replace(/[^\d+]/g, '');
  console.log("Cleaned phone number:", cleanPhone);

  const credentials = btoa(`${twilioAccountSid}:${twilioAuthToken}`);
  
  try {
    console.log("Sending SMS to:", cleanPhone);
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
          To: cleanPhone,
          Body: message,
        }),
      }
    );

    const responseText = await response.text();
    console.log("Twilio response status:", response.status);
    console.log("Twilio response:", responseText);

    if (response.ok) {
      const result = JSON.parse(responseText);
      console.log("SMS sent successfully:", result.sid);
      return result;
    } else {
      console.error("SMS sending failed:", responseText);
      return { error: responseText };
    }
  } catch (error) {
    console.error("SMS error:", error);
    return { error: error.message };
  }
};

const formatServices = (services: string[]): string => {
  if (!services || services.length === 0) return 'General service request';
  return services.join(', ');
};

const formatAddOns = (addOns: string[]): string => {
  if (!addOns || addOns.length === 0) return 'None';
  return addOns.map(addOn => {
    return addOn
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }).join(', ');
};

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2
  }).format(amount);
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
      estimateTotal,
      services,
      addOns,
      houseSize,
      address,
      scheduledDate,
      scheduledTime,
      squareFootage,
      notes,
      servicesSubtotal,
      products,
      productsSubtotal,
      gstAmount,
      pstAmount
    } = JSON.parse(body);
    
    console.log("Parsed request data:", { email, phone, name, service, formType, estimateTotal, scheduledDate, scheduledTime });

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

    // Prepare service details for the quote
    const serviceDetails = services ? formatServices(services) : service || 'Service request';
    const addOnDetails = addOns ? formatAddOns(addOns) : 'None';
    const houseSizeText = houseSize ? houseSize.charAt(0).toUpperCase() + houseSize.slice(1) : 'Not specified';
    
    // Determine if this is a booking confirmation or regular quote
    const isBookingConfirmation = formType === 'Booking Confirmation' && scheduledDate && scheduledTime;
    const isProfessionalQuote = formType === 'Professional Quote';

    // Prepare products section
    const productsSection = products && products.length > 0 ? `
    <div class="details-section">
      <div class="details-header">📦 Products & Materials</div>
      <div class="details-content">
        ${products.map((product: any) => `
        <div class="detail-row">
          <div class="detail-label">${product.name}:</div>
          <div class="detail-value">${formatCurrency(product.cost)}</div>
        </div>
        `).join('')}
        <div class="detail-row" style="border-top: 2px solid #e2e8f0; padding-top: 12px; margin-top: 12px;">
          <div class="detail-label">Products Subtotal:</div>
          <div class="detail-value font-semibold">${formatCurrency(productsSubtotal || 0)}</div>
        </div>
        ${gstAmount > 0 ? `
        <div class="detail-row">
          <div class="detail-label">GST (5%):</div>
          <div class="detail-value">${formatCurrency(gstAmount)}</div>
        </div>
        ` : ''}
        ${pstAmount > 0 ? `
        <div class="detail-row">
          <div class="detail-label">PST (7%):</div>
          <div class="detail-value">${formatCurrency(pstAmount)}</div>
        </div>
        ` : ''}
      </div>
    </div>
    ` : '';
    
    // Send email confirmation with beautiful styling
    console.log("Attempting to send email to:", email);
    const emailResponse = await resend.emails.send({
      from: "BC Pressure Washing <info@bcpressurewashing.ca>",
      to: [email],
      subject: isProfessionalQuote ? 
        `Your Professional Quote - BC Pressure Washing ${estimateTotal ? `(${formatCurrency(estimateTotal)})` : ''}` :
        isBookingConfirmation ? 
          "Booking Confirmation & Professional Quote - BC Pressure Washing" : 
          "Your Professional Quote - BC Pressure Washing",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>BC Pressure Washing Quote</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f8fafc; }
            .container { max-width: 650px; margin: 0 auto; background: white; }
            .header { background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); padding: 30px; text-align: center; color: white; position: relative; overflow: hidden; }
            .header::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%); }
            .logo { max-width: 280px; height: auto; margin-bottom: 20px; position: relative; z-index: 1; filter: brightness(0) invert(1); }
            .header h1 { font-size: 28px; font-weight: 700; margin-bottom: 8px; text-shadow: 0 2px 4px rgba(0,0,0,0.3); position: relative; z-index: 1; }
            .header p { font-size: 16px; color: #fef2f2; position: relative; z-index: 1; }
            .badge { display: inline-block; background: rgba(255,255,255,0.15); padding: 10px 20px; border-radius: 50px; margin-top: 15px; font-size: 13px; font-weight: 500; position: relative; z-index: 1; }
            .content { padding: 40px 30px; }
            .greeting { text-align: center; margin-bottom: 30px; }
            .greeting h2 { font-size: 26px; color: #1e293b; margin-bottom: 15px; }
            .greeting p { font-size: 16px; color: #475569; max-width: 500px; margin: 0 auto; }
            .quote-box { background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; padding: 30px; border-radius: 16px; text-align: center; margin: 25px 0; position: relative; overflow: hidden; box-shadow: 0 10px 25px rgba(30, 64, 175, 0.3); }
            .quote-box::before { content: ''; position: absolute; top: -50%; right: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%); }
            .quote-box h3 { font-size: 22px; margin-bottom: 20px; position: relative; z-index: 1; }
            .price-display { background: rgba(255,255,255,0.15); padding: 20px; border-radius: 12px; margin-bottom: 15px; position: relative; z-index: 1; }
            .price { font-size: 36px; font-weight: 800; text-shadow: 0 2px 4px rgba(0,0,0,0.3); }
            .price-label { font-size: 13px; color: #dbeafe; margin-top: 5px; }
            .disclaimer { font-size: 12px; color: #f0f9ff; position: relative; z-index: 1; }
            .details-section { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; margin: 25px 0; overflow: hidden; }
            .details-header { background: linear-gradient(90deg, #475569 0%, #64748b 100%); color: white; padding: 18px; font-size: 18px; font-weight: 600; }
            .details-content { padding: 20px; }
            .detail-row { display: flex; padding: 10px 0; border-bottom: 1px solid #e2e8f0; }
            .detail-row:last-child { border-bottom: none; }
            .detail-label { font-weight: 600; color: #475569; width: 40%; font-size: 14px; }
            .detail-value { color: #1e293b; font-size: 14px; font-weight: 500; flex: 1; }
            .services-section { background: #f0f9ff; border: 2px solid #3b82f6; border-radius: 12px; margin: 25px 0; overflow: hidden; }
            .services-header { background: linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 18px; font-size: 18px; font-weight: 600; }
            .booking-confirm { background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border: 2px solid #22c55e; border-radius: 12px; padding: 25px; margin: 25px 0; box-shadow: 0 4px 6px rgba(34, 197, 94, 0.1); }
            .booking-confirm h3 { color: #16a34a; font-size: 20px; margin-bottom: 15px; display: flex; align-items: center; }
            .booking-details { background: white; padding: 18px; border-radius: 8px; border: 1px solid #22c55e; }
            .booking-date { font-size: 18px; font-weight: 700; color: #16a34a; margin-bottom: 5px; }
            .booking-service { color: #166534; font-size: 15px; font-weight: 500; margin-bottom: 3px; }
            .booking-address { color: #166534; font-size: 13px; }
            .next-steps { background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border: 2px solid #0ea5e9; border-radius: 12px; padding: 20px; margin: 25px 0; }
            .next-steps h3 { color: #0c4a6e; font-size: 16px; margin-bottom: 12px; }
            .next-steps ul { color: #164e63; padding-left: 18px; }
            .next-steps li { margin-bottom: 6px; }
            .cta-section { text-align: center; background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%); padding: 30px; border-radius: 16px; margin: 30px 0; border: 1px solid #e5e7eb; }
            .cta-section h3 { font-size: 20px; color: #1f2937; margin-bottom: 15px; }
            .cta-section p { font-size: 15px; color: #6b7280; margin-bottom: 20px; }
            .cta-buttons { margin: 15px 0; }
            .cta-button { display: inline-block; padding: 14px 28px; margin: 6px; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 15px; transition: all 0.3s ease; }
            .cta-primary { background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3); }
            .cta-secondary { background: linear-gradient(135deg, #374151 0%, #4b5563 100%); color: white; box-shadow: 0 4px 12px rgba(55, 65, 81, 0.3); }
            .trust-badges { background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); padding: 25px; border-radius: 12px; text-align: center; margin: 25px 0; }
            .badges-grid { display: flex; justify-content: center; flex-wrap: wrap; gap: 25px; }
            .badge-item { text-align: center; min-width: 100px; }
            .badge-icon { font-size: 16px; margin-bottom: 6px; }
            .badge-title { font-weight: 600; color: #dc2626; font-size: 13px; }
            .badge-desc { font-size: 11px; color: #6b7280; }
            .footer { background: linear-gradient(135deg, #1f2937 0%, #374151 100%); color: white; padding: 25px; text-align: center; }
            .footer h4 { font-size: 16px; margin-bottom: 12px; }
            .footer p { color: #d1d5db; font-size: 13px; margin-bottom: 12px; }
            .footer a { color: #fbbf24; text-decoration: none; font-weight: 500; }
            .footer-divider { border-top: 1px solid #4b5563; margin-top: 15px; padding-top: 15px; }
            .footer-divider p { color: #9ca3af; font-size: 11px; margin: 0; }
            @media (max-width: 600px) {
              .container { margin: 0; }
              .header, .content { padding: 20px; }
              .price { font-size: 28px; }
              .badges-grid { flex-direction: column; gap: 15px; }
              .cta-button { display: block; margin: 6px 0; }
              .logo { max-width: 220px; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <!-- Header -->
            <div class="header">
              <img src="https://uyqudsqwspapmujvzmm.supabase.co/storage/v1/object/public/lovable-uploads/41acc7e7-b980-4bca-aec1-f999b7c2c9f9.png" alt="BC Pressure Washing Logo" class="logo">
              <h1>Professional Exterior Cleaning Services</h1>
              <p>Licensed & Insured • 5-Star Rated • Local & Trusted</p>
              <div class="badge">
                ✨ Serving White Rock, Surrey & Metro Vancouver
              </div>
            </div>

            <!-- Content -->
            <div class="content">
              <!-- Greeting -->
              <div class="greeting">
                <h2>${isProfessionalQuote ? `Thank you, ${name}!` : 
                      isBookingConfirmation ? `Booking Confirmed, ${name}!` : `Thank you, ${name}!`}</h2>
                <p>${isProfessionalQuote ? 
                    'Your professional quote is ready! Jayden will personally handle your project to ensure exceptional results.' :
                    isBookingConfirmation ? 
                      'Your service has been scheduled! Below is your booking confirmation and professional quote.' :
                      'We\'ve prepared your professional quote based on your requirements. Our team will contact you shortly to confirm details and schedule your service.'
                  }</p>
              </div>

              ${isBookingConfirmation ? `
              <!-- Booking Confirmation -->
              <div class="booking-confirm">
                <h3>📅 Your Scheduled Appointment</h3>
                <div class="booking-details">
                  <div class="booking-date">${scheduledDate} at ${scheduledTime}</div>
                  <div class="booking-service">Service: ${serviceDetails}</div>
                  ${address ? `<div class="booking-address">📍 ${address}</div>` : ''}
                </div>
              </div>
              ` : ''}

              ${estimateTotal ? `
              <!-- Quote Box -->
              <div class="quote-box">
                <h3>Your Professional Quote</h3>
                <div class="price-display">
                  <div class="price">${formatCurrency(estimateTotal)}</div>
                  <div class="price-label">Professional Service Investment</div>
                </div>
                <div class="disclaimer">*Final price confirmed after property inspection</div>
              </div>
              ` : ''}

              <!-- Service Details -->
              <div class="services-section">
                <div class="services-header">🔧 Services Requested</div>
                <div class="details-content">
                  <div class="detail-row">
                    <div class="detail-label">Services:</div>
                    <div class="detail-value">${serviceDetails}</div>
                  </div>
                  ${servicesSubtotal ? `
                  <div class="detail-row">
                    <div class="detail-label">Services Cost:</div>
                    <div class="detail-value font-semibold">${formatCurrency(servicesSubtotal)}</div>
                  </div>
                  ` : ''}
                </div>
              </div>

              ${productsSection}

              <!-- Property Details -->
              <div class="details-section">
                <div class="details-header">🏠 Property Information</div>
                <div class="details-content">
                  ${address ? `
                  <div class="detail-row">
                    <div class="detail-label">Property:</div>
                    <div class="detail-value">${address}</div>
                  </div>
                  ` : ''}
                  ${squareFootage ? `
                  <div class="detail-row">
                    <div class="detail-label">Square Footage:</div>
                    <div class="detail-value">${squareFootage.toLocaleString()} sq ft</div>
                  </div>
                  ` : ''}
                  <div class="detail-row">
                    <div class="detail-label">Property Size:</div>
                    <div class="detail-value">${houseSizeText}</div>
                  </div>
                  ${(message || notes) ? `
                  <div class="detail-row">
                    <div class="detail-label">Notes:</div>
                    <div class="detail-value">${message || notes}</div>
                  </div>
                  ` : ''}
                </div>
              </div>

              ${!isBookingConfirmation ? `
              <!-- What's Next -->
              <div class="next-steps">
                <h3>🎯 What Happens Next?</h3>
                <ul>
                  <li>Jayden will contact you within 24 hours to confirm details</li>
                  <li>Schedule a convenient time for your service</li>
                  <li>Our professional team will arrive on time and ready to work</li>
                  <li>100% satisfaction guarantee on all work completed</li>
                </ul>
              </div>
              ` : ''}

              <!-- CTA Section -->
              <div class="cta-section">
                <h3>Ready to Get Started? 🚀</h3>
                <p>Have questions or ready to book? Jayden is here to help!</p>
                <div class="cta-buttons">
                  <a href="tel:7788087620" class="cta-button cta-primary">📞 Call (778) 808-7620</a>
                  <a href="mailto:info@bcpressurewashing.ca" class="cta-button cta-secondary">✉️ Email Us</a>
                </div>
              </div>

              <!-- Trust Badges -->
              <div class="trust-badges">
                <div class="badges-grid">
                  <div class="badge-item">
                    <div class="badge-icon">🛡️</div>
                    <div class="badge-title">Licensed & Insured</div>
                    <div class="badge-desc">WCB & Liability</div>
                  </div>
                  <div class="badge-item">
                    <div class="badge-icon">⭐</div>
                    <div class="badge-title">5-Star Rated</div>
                    <div class="badge-desc">Google Reviews</div>
                  </div>
                  <div class="badge-item">
                    <div class="badge-icon">🏠</div>
                    <div class="badge-title">Local & Trusted</div>
                    <div class="badge-desc">White Rock & Surrey</div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Footer -->
            <div class="footer">
              <h4>BC Pressure Washing Property Maintenance Ltd.</h4>
              <p>Professional Exterior Cleaning Services<br>
              Serving White Rock, Surrey & Metro Vancouver</p>
              <a href="https://bcpressurewashing.ca">🌐 bcpressurewashing.ca</a>
              <div class="footer-divider">
                <p>© 2024 BC Pressure Washing Property Maintenance Ltd. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Email confirmation sent:", emailResponse);

    // Send SMS confirmation if phone number provided
    let smsResponse = null;
    if (phone && phone.trim()) {
      const smsMessage = isProfessionalQuote ?
        `Hi ${name}! Your BC Pressure Washing quote is ready: ${serviceDetails} - ${estimateTotal ? formatCurrency(estimateTotal) : 'Custom pricing'}. ${notes || message ? (notes || message) + ' ' : ''}Jayden will contact you within 24hrs. Questions? Call (778) 808-7620` :
        isBookingConfirmation ?
          `Hi ${name}! Your BC Pressure Washing appointment is confirmed for ${scheduledDate} at ${scheduledTime}. ${estimateTotal ? `Quote: ${formatCurrency(estimateTotal)}. ` : ''}We'll call 30 min before arrival. (778) 808-7620` :
          `Hi ${name}! Your quote from BC Pressure Washing is ready. ${estimateTotal ? `Estimated total: ${formatCurrency(estimateTotal)}. ` : ''}We'll contact you within 24 hours. (778) 808-7620`;
      
      smsResponse = await sendSMS(phone, smsMessage);
      console.log("SMS sending result:", smsResponse);
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
