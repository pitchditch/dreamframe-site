
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
    
    // Send email confirmation with professional quote
    console.log("Attempting to send email to:", email);
    const emailResponse = await resend.emails.send({
      from: "BC Pressure Washing <info@bcpressurewashing.ca>",
      to: [email],
      subject: isBookingConfirmation ? 
        "Booking Confirmation & Professional Quote - BC Pressure Washing" : 
        "Your Professional Quote - BC Pressure Washing",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">BC Pressure Washing</h1>
            <p style="color: #fecaca; margin: 10px 0 0 0; font-size: 16px;">Professional Exterior Cleaning Services</p>
          </div>

          <!-- Quote Details -->
          <div style="padding: 30px;">
            <h2 style="color: #dc2626; margin-bottom: 20px; font-size: 24px;">
              ${isBookingConfirmation ? `Booking Confirmed, ${name}!` : `Thank you, ${name}!`}
            </h2>
            <p style="font-size: 16px; line-height: 1.6; color: #374151; margin-bottom: 25px;">
              ${isBookingConfirmation ? 
                'Your service has been scheduled! Below is your booking confirmation and professional quote.' :
                'We\'ve prepared your professional quote based on your requirements. Our team will contact you shortly to confirm details and schedule your service.'
              }
            </p>

            ${isBookingConfirmation ? `
            <!-- Booking Confirmation Box -->
            <div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-left: 4px solid #16a34a; padding: 25px; margin: 25px 0; border-radius: 8px;">
              <h3 style="color: #16a34a; margin: 0 0 15px 0; font-size: 20px;">📅 Your Appointment</h3>
              <div style="font-size: 18px; font-weight: bold; color: #16a34a; margin-bottom: 5px;">
                ${scheduledDate} at ${scheduledTime}
              </div>
              <div style="color: #166534; font-size: 16px;">
                Service: ${serviceDetails}
              </div>
              ${address ? `<div style="color: #166534; font-size: 14px; margin-top: 5px;">Location: ${address}</div>` : ''}
            </div>
            ` : ''}

            <!-- Quote Summary Box -->
            ${estimateTotal ? `
            <div style="background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); border-left: 4px solid #dc2626; padding: 25px; margin: 25px 0; border-radius: 8px;">
              <h3 style="color: #dc2626; margin: 0 0 15px 0; font-size: 20px;">Your Professional Quote</h3>
              <div style="font-size: 32px; font-weight: bold; color: #dc2626; margin-bottom: 10px;">
                ${formatCurrency(estimateTotal)}
              </div>
              <p style="color: #6b7280; margin: 0; font-size: 14px;">*Final price may vary based on property inspection</p>
            </div>
            ` : ''}

            <!-- Service Details -->
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0; font-size: 18px;">Service Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #6b7280; width: 30%;">Services:</td>
                  <td style="padding: 8px 0; color: #374151;">${serviceDetails}</td>
                </tr>
                ${addOnDetails !== 'None' ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #6b7280;">Add-ons:</td>
                  <td style="padding: 8px 0; color: #374151;">${addOnDetails}</td>
                </tr>
                ` : ''}
                ${address ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #6b7280;">Property:</td>
                  <td style="padding: 8px 0; color: #374151;">${address}</td>
                </tr>
                ` : ''}
                ${squareFootage ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #6b7280;">Square Footage:</td>
                  <td style="padding: 8px 0; color: #374151;">${squareFootage.toLocaleString()} sq ft</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #6b7280;">Property Size:</td>
                  <td style="padding: 8px 0; color: #374151;">${houseSizeText}</td>
                </tr>
                ${(message || notes) ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #6b7280;">Notes:</td>
                  <td style="padding: 8px 0; color: #374151;">${message || notes}</td>
                </tr>
                ` : ''}
              </table>
            </div>

            ${isBookingConfirmation ? `
            <!-- Appointment Reminder -->
            <div style="background-color: #eff6ff; border: 1px solid #3b82f6; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <h3 style="color: #1e40af; margin-top: 0; font-size: 18px;">📋 Before Your Appointment</h3>
              <ul style="color: #1e3a8a; margin: 10px 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;">Ensure clear access to all areas requiring service</li>
                <li style="margin-bottom: 8px;">Remove any delicate items from the work area</li>
                <li style="margin-bottom: 8px;">Have your property keys/access ready if needed</li>
                <li style="margin-bottom: 8px;">Our team will call 30 minutes before arrival</li>
              </ul>
            </div>
            ` : `
            <!-- What's Next -->
            <div style="background-color: #f0f9ff; border: 1px solid #0ea5e9; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <h3 style="color: #0c4a6e; margin-top: 0; font-size: 18px;">What Happens Next?</h3>
              <ul style="color: #164e63; margin: 10px 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;">We'll contact you within 24 hours to confirm details</li>
                <li style="margin-bottom: 8px;">Schedule a convenient time for your service</li>
                <li style="margin-bottom: 8px;">Our professional team will arrive on time and ready to work</li>
                <li style="margin-bottom: 8px;">100% satisfaction guarantee on all work completed</li>
              </ul>
            </div>
            `}

            <!-- Contact Info -->
            <div style="text-align: center; margin: 30px 0;">
              <p style="font-size: 16px; color: #374151; margin-bottom: 15px;">
                <strong>Have questions? We're here to help!</strong>
              </p>
              <div style="margin: 15px 0;">
                <a href="tel:7788087620" style="display: inline-block; background-color: #dc2626; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 5px;">
                  Call (778) 808-7620
                </a>
                <a href="mailto:info@bcpressurewashing.ca" style="display: inline-block; background-color: #374151; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 5px;">
                  Email Us
                </a>
              </div>
            </div>

            <!-- Trust Badges -->
            <div style="text-align: center; margin: 25px 0; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
              <div style="display: inline-block; margin: 0 15px; text-align: center;">
                <div style="font-weight: bold; color: #dc2626;">✓ Licensed & Insured</div>
                <div style="font-size: 12px; color: #6b7280;">WCB & Liability</div>
              </div>
              <div style="display: inline-block; margin: 0 15px; text-align: center;">
                <div style="font-weight: bold; color: #dc2626;">✓ 5-Star Rated</div>
                <div style="font-size: 12px; color: #6b7280;">Google Reviews</div>
              </div>
              <div style="display: inline-block; margin: 0 15px; text-align: center;">
                <div style="font-weight: bold; color: #dc2626;">✓ Local & Trusted</div>
                <div style="font-size: 12px; color: #6b7280;">White Rock & Surrey</div>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #374151; padding: 20px; text-align: center;">
            <p style="color: #d1d5db; margin: 0; font-size: 14px;">
              BC Pressure Washing - Professional Exterior Cleaning Services<br>
              White Rock, Surrey & Metro Vancouver<br>
              <a href="https://bcpressurewashing.ca" style="color: #fbbf24;">bcpressurewashing.ca</a>
            </p>
          </div>
        </div>
      `,
    });

    console.log("Email confirmation sent:", emailResponse);

    // Send SMS confirmation if phone number provided
    let smsResponse = null;
    if (phone && phone.trim()) {
      const smsMessage = isBookingConfirmation ?
        `Hi ${name}! Your BC Pressure Washing appointment is confirmed for ${scheduledDate} at ${scheduledTime}. ${estimateTotal ? `Quote: ${formatCurrency(estimateTotal)}. ` : ''}We'll call 30 min before arrival. (778) 808-7620` :
        `Hi ${name}! Your quote from BC Pressure Washing is ready. ${estimateTotal ? `Estimated total: ${formatCurrency(estimateTotal)}. ` : ''}We'll contact you within 24 hours. (778) 808-7620`;
      
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
