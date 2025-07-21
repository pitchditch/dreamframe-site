
import { Resend } from "npm:resend@2.0.0";

const BUSINESS_EMAIL = "jaydenf3800@gmail.com";

export async function sendBusinessEmail(resend: Resend, body: any) {
  // Compose a simple HTML email body with form info
  const htmlFields = Object.entries(body)
    .map(
      ([key, value]) =>
        `<tr><td style='padding:6px 0'><strong>${key}:</strong></td><td>${value ?? ""}</td></tr>`
    )
    .join("");

  const html = `
    <div>
      <h2>New Website Form Submission</h2>
      <table>${htmlFields}</table>
      <p>
        This message was forwarded by the BC Pressure Washing website contact system.<br />
        Reply to this email to reach the customer.
      </p>
    </div>
  `;

  const subject =
    body.subject ||
    `New Contact Form Submission from ${body.name || body.contactName || body.email || "Visitor"}`;

  try {
    const emailRes = await resend.emails.send({
      from: `BC Pressure Washing <onboarding@resend.dev>`,
      to: [BUSINESS_EMAIL],
      subject,
      html,
      reply_to: body.email,
    });
    console.log("Business email sent:", emailRes);
    return emailRes;
  } catch (error) {
    console.error("Error sending business email:", error);
    return { error: error.message };
  }
}

export async function sendCustomerEmail(resend: Resend, body: any) {
  if (!body.email) {
    return null;
  }

  const customerHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #dc2626;">Thank you for contacting BC Pressure Washing!</h2>
      <p>Hi ${body.name || body.contactName || 'there'},</p>
      <p>We've received your inquiry and will get back to you within 24 hours.</p>
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Your Request Details:</h3>
        <p><strong>Service:</strong> ${body.service || body.form || 'General Inquiry'}</p>
        ${body.businessName ? `<p><strong>Business:</strong> ${body.businessName}</p>` : ''}
        ${body.address ? `<p><strong>Address:</strong> ${body.address}</p>` : ''}
        ${body.preferredTime ? `<p><strong>Preferred Time:</strong> ${body.preferredTime}</p>` : ''}
      </div>
      <p>Questions? Call us at <strong>(778) 808-7620</strong></p>
      <p>Best regards,<br>BC Pressure Washing Team</p>
    </div>
  `;

  try {
    const customerEmailRes = await resend.emails.send({
      from: "BC Pressure Washing <onboarding@resend.dev>",
      to: [body.email],
      subject: "Thanks for your inquiry - BC Pressure Washing",
      html: customerHtml,
    });

    console.log("Customer email sent:", customerEmailRes);
    return customerEmailRes;
  } catch (error) {
    console.error("Error sending customer email:", error);
    return { error: error.message };
  }
}
