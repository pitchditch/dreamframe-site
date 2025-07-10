export interface Quote {
  id: string;
  customer_name: string;
  customer_email: string | null;
  customer_phone: string | null;
  property_address: string | null;
  house_size: string | null;
  services: Array<{ name: string; price: number }>;
  products: Array<{ name: string; price: number }>;
  total_amount: number;
  sent_at: string;
  notes: string | null;
}