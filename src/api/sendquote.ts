import { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import twilio from 'twilio';

const resend = new Resend(process.env.RESEND_API_KEY);
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { name, email, phone, service, address, message } = req.body;

  const html = `
    <div style="font-family:Arial,sans-serif;padding:1rem;">
      <h2 style="color:#0d3b66;">BC Pressure Washing – New Quote</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>Message:</strong> ${message || "(no message)"}</p>
    </div>
  `;

  const sms = `Quote from ${name} - ${service} - ${address}. Check your email.`;

  try {
    await resend.emails.send({
      from: "Jayden @ BC Pressure Washing <your@verifieddomain.ca>",
      to: [email, "bcpressurewashing.ca@gmail.com"],
      subject: `Quote Request - ${service}`,
      html,
    });

    await twilioClient.messages.create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+1${phone.replace(/\D/g, "")}`,
      body: sms,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending quote:", error);
    res.status(500).json({ success: false });
  }
}
