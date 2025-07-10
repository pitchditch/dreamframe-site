
-- Create a table to store quotes
CREATE TABLE public.quotes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  customer_email TEXT,
  services JSON NOT NULL,
  services_subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
  products JSON DEFAULT '[]',
  products_subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
  add_ons JSON DEFAULT '[]',
  gst_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  pst_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,
  notes TEXT,
  property_address TEXT,
  house_size TEXT,
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for quotes table
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

-- Allow public read access to quotes (you can modify this based on your needs)
CREATE POLICY "Anyone can view quotes" 
  ON public.quotes 
  FOR SELECT 
  USING (true);

-- Allow public insert access to quotes
CREATE POLICY "Anyone can create quotes" 
  ON public.quotes 
  FOR INSERT 
  WITH CHECK (true);

-- Create trigger to update the updated_at column
CREATE TRIGGER update_quotes_updated_at
  BEFORE UPDATE ON public.quotes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
