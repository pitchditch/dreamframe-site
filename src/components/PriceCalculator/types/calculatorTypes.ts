
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
  services: string[];
  addons: string[];
  notes: string;
  estimate: string | number;
}
