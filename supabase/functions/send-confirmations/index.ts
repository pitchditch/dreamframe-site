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
    minimumFractionDigits: 0
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
      notes
    }: ConfirmationRequest = JSON.parse(body);
    
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
    
    // Send email confirmation with professional quote
    console.log("Attempting to send email to:", email);
    const emailResponse = await resend.emails.send({
      from: "BC Pressure Washing <info@bcpressurewashing.ca>",
      to: [email],
      subject: isProfessionalQuote ? 
        `Your Professional Quote - BC Pressure Washing ${estimateTotal ? `($${estimateTotal})` : ''}` :
        isBookingConfirmation ? 
          "Booking Confirmation & Professional Quote - BC Pressure Washing" : 
          "Your Professional Quote - BC Pressure Washing",
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); padding: 40px 30px; text-align: center; position: relative; overflow: hidden;">
            <div style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%); pointer-events: none;"></div>
            <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.3); position: relative; z-index: 1;">BC Pressure Washing</h1>
            <p style="color: #fef2f2; margin: 15px 0 0 0; font-size: 18px; font-weight: 300; position: relative; z-index: 1;">Professional Exterior Cleaning Services</p>
            <div style="margin-top: 20px; padding: 12px 24px; background: rgba(255,255,255,0.15); border-radius: 50px; display: inline-block; position: relative; z-index: 1;">
              <span style="color: white; font-size: 14px; font-weight: 500;">✨ Licensed & Insured • 5-Star Rated • Local & Trusted</span>
            </div>
          </div>

          <!-- Quote Header -->
          <div style="padding: 40px 30px 30px 30px; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);">
            <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 28px; font-weight: 600; text-align: center;">
              ${isProfessionalQuote ? `Thank you, ${name}!` : 
                isBookingConfirmation ? `Booking Confirmed, ${name}!` : `Thank you, ${name}!`}
            </h2>
            <p style="font-size: 18px; line-height: 1.6; color: #475569; margin: 0; text-align: center; max-width: 500px; margin: 0 auto;">
              ${isProfessionalQuote ? 
                'Your professional quote is ready! Jayden will personally handle your project to ensure exceptional results.' :
                isBookingConfirmation ? 
                  'Your service has been scheduled! Below is your booking confirmation and professional quote.' :
                  'We\'ve prepared your professional quote based on your requirements. Our team will contact you shortly to confirm details and schedule your service.'
              }
            </p>
          </div>

          ${isBookingConfirmation ? `
          <!-- Booking Confirmation Box -->
          <div style="margin: 0 30px; background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border: 2px solid #22c55e; border-radius: 12px; padding: 30px; margin-bottom: 30px; box-shadow: 0 4px 6px rgba(34, 197, 94, 0.1);">
            <h3 style="color: #16a34a; margin: 0 0 20px 0; font-size: 22px; font-weight: 600; display: flex; align-items: center;">
              <span style="margin-right: 10px; font-size: 24px;">📅</span>
              Your Scheduled Appointment
            </h3>
            <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #22c55e;">
              <div style="font-size: 20px; font-weight: 700; color: #16a34a; margin-bottom: 8px;">
                ${scheduledDate} at ${scheduledTime}
              </div>
              <div style="color: #166534; font-size: 16px; font-weight: 500; margin-bottom: 5px;">
                Service: ${serviceDetails}
              </div>
              ${address ? `<div style="color: #166534; font-size: 14px;">📍 ${address}</div>` : ''}
            </div>
          </div>
          ` : ''}

          <!-- Quote Summary Box -->
          ${estimateTotal ? `
          <div style="margin: 0 30px 30px 30px; background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); border-radius: 16px; padding: 35px; text-align: center; position: relative; overflow: hidden; box-shadow: 0 10px 25px rgba(30, 64, 175, 0.3);">
            <div style="position: absolute; top: -50%; right: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%); pointer-events: none;"></div>
            <h3 style="color: white; margin: 0 0 20px 0; font-size: 24px; font-weight: 600; position: relative; z-index: 1;">Your Professional Quote</h3>
            <div style="background: rgba(255,255,255,0.15); border-radius: 12px; padding: 25px; margin-bottom: 20px; position: relative; z-index: 1;">
              <div style="font-size: 42px; font-weight: 800; color: white; margin-bottom: 8px; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                ${formatCurrency(estimateTotal)}
              </div>
              <p style="color: #dbeafe; margin: 0; font-size: 14px; font-weight: 500;">Professional Service Investment</p>
            </div>
            <p style="color: #f0f9ff; margin: 0; font-size: 13px; position: relative; z-index: 1;">*Final price confirmed after property inspection</p>
          </div>
          ` : ''}

          <!-- Service Details -->
          <div style="margin: 0 30px 30px 30px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
            <div style="background: linear-gradient(90deg, #475569 0%, #64748b 100%); padding: 20px;">
              <h3 style="color: white; margin: 0; font-size: 20px; font-weight: 600;">📋 Service Details</h3>
            </div>
            <div style="padding: 25px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 12px 0; font-weight: 600; color: #475569; width: 35%; font-size: 14px;">Services:</td>
                  <td style="padding: 12px 0; color: #1e293b; font-size: 14px; font-weight: 500;">${serviceDetails}</td>
                </tr>
                ${addOnDetails !== 'None' ? `
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 12px 0; font-weight: 600; color: #475569; font-size: 14px;">Add-ons:</td>
                  <td style="padding: 12px 0; color: #1e293b; font-size: 14px; font-weight: 500;">${addOnDetails}</td>
                </tr>
                ` : ''}
                ${address ? `
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 12px 0; font-weight: 600; color: #475569; font-size: 14px;">Property:</td>
                  <td style="padding: 12px 0; color: #1e293b; font-size: 14px; font-weight: 500;">${address}</td>
                </tr>
                ` : ''}
                ${squareFootage ? `
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 12px 0; font-weight: 600; color: #475569; font-size: 14px;">Square Footage:</td>
                  <td style="padding: 12px 0; color: #1e293b; font-size: 14px; font-weight: 500;">${squareFootage.toLocaleString()} sq ft</td>
                </tr>
                ` : ''}
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 12px 0; font-weight: 600; color: #475569; font-size: 14px;">Property Size:</td>
                  <td style="padding: 12px 0; color: #1e293b; font-size: 14px; font-weight: 500;">${houseSizeText}</td>
                </tr>
                ${(message || notes) ? `
                <tr>
                  <td style="padding: 12px 0; font-weight: 600; color: #475569; font-size: 14px; vertical-align: top;">Notes:</td>
                  <td style="padding: 12px 0; color: #1e293b; font-size: 14px; font-weight: 500;">${message || notes}</td>
                </tr>
                ` : ''}
              </table>
            </div>
          </div>

          ${isBookingConfirmation ? `
          <!-- Appointment Reminder -->
          <div style="margin: 0 30px 30px 30px; background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border: 2px solid #3b82f6; border-radius: 12px; padding: 25px;">
            <h3 style="color: #1e40af; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">📋 Before Your Appointment</h3>
            <ul style="color: #1e3a8a; margin: 10px 0; padding-left: 20px; line-height: 1.6;">
              <li style="margin-bottom: 8px;">Ensure clear access to all areas requiring service</li>
              <li style="margin-bottom: 8px;">Remove any delicate items from the work area</li>
              <li style="margin-bottom: 8px;">Have your property keys/access ready if needed</li>
              <li style="margin-bottom: 8px;">Our team will call 30 minutes before arrival</li>
            </ul>
          </div>
          ` : `
          <!-- What's Next -->
          <div style="margin: 0 30px 30px 30px; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border: 2px solid #0ea5e9; border-radius: 12px; padding: 25px;">
            <h3 style="color: #0c4a6e; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">🎯 What Happens Next?</h3>
            <ul style="color: #164e63; margin: 10px 0; padding-left: 20px; line-height: 1.6;">
              <li style="margin-bottom: 8px;">Jayden will contact you within 24 hours to confirm details</li>
              <li style="margin-bottom: 8px;">Schedule a convenient time for your service</li>
              <li style="margin-bottom: 8px;">Our professional team will arrive on time and ready to work</li>
              <li style="margin-bottom: 8px;">100% satisfaction guarantee on all work completed</li>
            </ul>
          </div>
          `}

          <!-- Contact CTA -->
          <div style="text-align: center; margin: 40px 30px; padding: 35px; background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%); border-radius: 16px; border: 1px solid #e5e7eb;">
            <h3 style="font-size: 22px; color: #1f2937; margin: 0 0 20px 0; font-weight: 600;">
              Ready to Get Started? 🚀
            </h3>
            <p style="font-size: 16px; color: #6b7280; margin: 0 0 25px 0; line-height: 1.5;">
              Have questions or ready to book? Jayden is here to help!
            </p>
            <div style="margin: 20px 0;">
              <a href="tel:7788087620" style="display: inline-block; background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 16px; margin: 8px; box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3); transition: all 0.3s ease;">
                📞 Call (778) 808-7620
              </a>
              <a href="mailto:info@bcpressurewashing.ca" style="display: inline-block; background: linear-gradient(135deg, #374151 0%, #4b5563 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 16px; margin: 8px; box-shadow: 0 4px 12px rgba(55, 65, 81, 0.3); transition: all 0.3s ease;">
                ✉️ Email Us
              </a>
            </div>
          </div>

          <!-- Trust Badges -->
          <div style="margin: 0 30px 30px 30px; padding: 30px; background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); border-radius: 12px; text-align: center;">
            <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 30px;">
              <div style="text-align: center; min-width: 120px;">
                <div style="font-size: 18px; margin-bottom: 8px;">🛡️</div>
                <div style="font-weight: 600; color: #dc2626; font-size: 14px;">Licensed & Insured</div>
                <div style="font-size: 12px; color: #6b7280;">WCB & Liability</div>
              </div>
              <div style="text-align: center; min-width: 120px;">
                <div style="font-size: 18px; margin-bottom: 8px;">⭐</div>
                <div style="font-weight: 600; color: #dc2626; font-size: 14px;">5-Star Rated</div>
                <div style="font-size: 12px; color: #6b7280;">Google Reviews</div>
              </div>
              <div style="text-align: center; min-width: 120px;">
                <div style="font-size: 18px; margin-bottom: 8px;">🏠</div>
                <div style="font-weight: 600; color: #dc2626; font-size: 14px;">Local & Trusted</div>
                <div style="font-size: 12px; color: #6b7280;">White Rock & Surrey</div>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: linear-gradient(135deg, #1f2937 0%, #374151 100%); padding: 30px; text-align: center;">
            <div style="max-width: 400px; margin: 0 auto;">
              <h4 style="color: #f9fafb; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">BC Pressure Washing</h4>
              <p style="color: #d1d5db; margin: 0 0 15px 0; font-size: 14px; line-height: 1.5;">
                Professional Exterior Cleaning Services<br>
                Serving White Rock, Surrey & Metro Vancouver
              </p>
              <a href="https://bcpressurewashing.ca" style="color: #fbbf24; text-decoration: none; font-weight: 500; font-size: 14px;">
                🌐 bcpressurewashing.ca
              </a>
              <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #4b5563;">
                <p style="color: #9ca3af; margin: 0; font-size: 12px;">
                  © 2024 BC Pressure Washing. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
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
