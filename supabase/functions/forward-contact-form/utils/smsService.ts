
import { formatPhoneNumber } from './phoneUtils.ts';

const twilioAccountSid = "AC137df830ca1a154ba8f82d06da9e40f1";
const twilioPhoneNumber = "+13183929394";

// Function to send SMS via Twilio
export async function sendSMS(to: string, message: string) {
  try {
    const twilioAuthToken = Deno.env.get("TWILIO_AUTH_TOKEN");
    console.log(`Twilio auth token available: ${twilioAuthToken ? 'Yes' : 'No'}`);
    
    if (!twilioAuthToken) {
      console.error("TWILIO_AUTH_TOKEN is missing");
      return { success: false, error: "Twilio auth token not configured" };
    }

    const formattedTo = formatPhoneNumber(to);
    console.log(`Attempting to send SMS to: ${formattedTo}`);
    console.log(`SMS message: ${message}`);
    
    const body = new URLSearchParams({
      To: formattedTo,
      From: twilioPhoneNumber,
      Body: message,
    });

    console.log(`Twilio request body: ${body.toString()}`);

    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`,
      {
        method: "POST",
        headers: {
          "Authorization": `Basic ${btoa(`${twilioAccountSid}:${twilioAuthToken}`)}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      }
    );

    const result = await response.json();
    console.log(`Twilio response status: ${response.status}`);
    console.log(`Twilio response:`, result);
    
    if (response.ok) {
      console.log("SMS sent successfully:", result.sid);
      // Check if the message was sent with trial account prefix
      if (result.body && result.body.includes("Sent from your Twilio trial account")) {
        console.log("Note: SMS sent with trial account prefix - upgrade Twilio account to remove");
      }
      return { success: true, sid: result.sid, message: result.body };
    } else {
      console.error("Failed to send SMS:", result);
      return { success: false, error: result };
    }
  } catch (error) {
    console.error("SMS sending error:", error);
    return { success: false, error: error.message };
  }
}
