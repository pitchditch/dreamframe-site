
export interface ContactInfo {
  name: string;
  phone: string;
  email: string;
  referredBy: string;
  notes: string;
}

export interface FormSubmissionData {
  name: string;
  email: string;
  phone: string;
  referredBy: string;
  address: string;
  size: string;
  services: string[];  // Ensuring this is string[] not string
  addons: string[];    // Ensuring this is string[] not string
  notes: string;
  estimate: string | number;
  // Adding an index signature to fix the Record<string, unknown> compatibility issue
  [key: string]: string | string[] | number | undefined;
}
