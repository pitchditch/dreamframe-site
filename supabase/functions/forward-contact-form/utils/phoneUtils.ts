
// Phone number formatting and validation utilities
export function formatPhoneNumber(phone: string): string {
  console.log(`Original phone number: ${phone}`);
  
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  console.log(`Digits only: ${digits}`);
  
  // Add +1 if it's a 10-digit North American number
  if (digits.length === 10) {
    const formatted = `+1${digits}`;
    console.log(`Formatted 10-digit number: ${formatted}`);
    return formatted;
  }
  
  // Add + if it doesn't have it but is international format
  if (digits.length > 10 && !phone.startsWith('+')) {
    const formatted = `+${digits}`;
    console.log(`Formatted international number: ${formatted}`);
    return formatted;
  }
  
  // Return as-is if already formatted
  const formatted = phone.startsWith('+') ? phone : `+${digits}`;
  console.log(`Final formatted number: ${formatted}`);
  return formatted;
}

export function extractPhoneNumber(body: any): string | null {
  const phoneField = body.phone || body.contactPhone || body.phoneNumber;
  const bookingPhone = body.customer?.phone;
  return phoneField || bookingPhone || null;
}
