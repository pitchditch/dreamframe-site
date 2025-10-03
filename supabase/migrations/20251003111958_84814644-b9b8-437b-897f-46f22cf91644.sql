-- Create properties table
CREATE TABLE IF NOT EXISTS public.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  address_line1 TEXT NOT NULL,
  city TEXT NOT NULL,
  province TEXT DEFAULT 'BC',
  postal_code TEXT,
  lat NUMERIC,
  lng NUMERIC,
  living_sqft INTEGER,
  lot_sqft INTEGER,
  year_built INTEGER,
  stories INTEGER,
  street_view_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create property_status table
CREATE TABLE IF NOT EXISTS public.property_status (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  roof_condition TEXT DEFAULT 'unknown',
  siding_condition TEXT DEFAULT 'unknown',
  windows_condition TEXT DEFAULT 'unknown',
  gutters_condition TEXT DEFAULT 'unknown',
  driveway_condition TEXT DEFAULT 'unknown',
  last_service_roof DATE,
  last_service_siding DATE,
  last_service_windows DATE,
  last_service_gutters DATE,
  last_service_driveway DATE,
  next_rec_roof DATE,
  next_rec_siding DATE,
  next_rec_windows DATE,
  next_rec_gutters DATE,
  next_rec_driveway DATE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(property_id)
);

-- Create service_records table
CREATE TABLE IF NOT EXISTS public.service_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  service_date DATE NOT NULL,
  services_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  notes TEXT,
  technician_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create photos table
CREATE TABLE IF NOT EXISTS public.service_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_record_id UUID REFERENCES public.service_records(id) ON DELETE CASCADE,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  label TEXT,
  photo_type TEXT DEFAULT 'after',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create reminders table
CREATE TABLE IF NOT EXISTS public.property_reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  channel TEXT NOT NULL CHECK (channel IN ('email', 'sms')),
  target TEXT NOT NULL,
  send_at TIMESTAMPTZ NOT NULL,
  template_key TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'sent', 'failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create property_customers table
CREATE TABLE IF NOT EXISTS public.property_customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  marketing_opt_in BOOLEAN DEFAULT false,
  magic_link_token TEXT UNIQUE,
  token_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(property_id, email)
);

-- Create property_events table
CREATE TABLE IF NOT EXISTS public.property_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  meta_json JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_events ENABLE ROW LEVEL SECURITY;

-- RLS Policies for properties
CREATE POLICY "Admins can manage all properties" ON public.properties FOR ALL USING (is_admin());
CREATE POLICY "Customers can view their property via token" ON public.properties FOR SELECT 
  USING (
    id IN (
      SELECT property_id FROM public.property_customers 
      WHERE magic_link_token IS NOT NULL 
      AND token_expires_at > now()
      AND email = auth.email()
    )
  );
CREATE POLICY "Anyone can create properties" ON public.properties FOR INSERT WITH CHECK (true);

-- RLS Policies for property_status
CREATE POLICY "Admins can manage all property status" ON public.property_status FOR ALL USING (is_admin());
CREATE POLICY "Customers can view their property status" ON public.property_status FOR SELECT 
  USING (
    property_id IN (
      SELECT property_id FROM public.property_customers 
      WHERE email = auth.email()
    )
  );

-- RLS Policies for service_records
CREATE POLICY "Admins can manage all service records" ON public.service_records FOR ALL USING (is_admin());
CREATE POLICY "Customers can view their service records" ON public.service_records FOR SELECT 
  USING (
    property_id IN (
      SELECT property_id FROM public.property_customers 
      WHERE email = auth.email()
    )
  );

-- RLS Policies for service_photos
CREATE POLICY "Admins can manage all photos" ON public.service_photos FOR ALL USING (is_admin());
CREATE POLICY "Customers can view their photos" ON public.service_photos FOR SELECT 
  USING (
    property_id IN (
      SELECT property_id FROM public.property_customers 
      WHERE email = auth.email()
    )
  );

-- RLS Policies for property_reminders
CREATE POLICY "Admins can manage all reminders" ON public.property_reminders FOR ALL USING (is_admin());

-- RLS Policies for property_customers
CREATE POLICY "Admins can manage all property customers" ON public.property_customers FOR ALL USING (is_admin());
CREATE POLICY "Customers can view their own record" ON public.property_customers FOR SELECT 
  USING (email = auth.email());
CREATE POLICY "Anyone can create property customers" ON public.property_customers FOR INSERT WITH CHECK (true);

-- RLS Policies for property_events
CREATE POLICY "Admins can manage all property events" ON public.property_events FOR ALL USING (is_admin());
CREATE POLICY "Anyone can create property events" ON public.property_events FOR INSERT WITH CHECK (true);

-- Create indexes
CREATE INDEX idx_properties_address ON public.properties(address_line1, city);
CREATE INDEX idx_property_status_property_id ON public.property_status(property_id);
CREATE INDEX idx_service_records_property_id ON public.service_records(property_id);
CREATE INDEX idx_service_records_date ON public.service_records(service_date DESC);
CREATE INDEX idx_service_photos_property_id ON public.service_photos(property_id);
CREATE INDEX idx_reminders_send_at ON public.property_reminders(send_at) WHERE status = 'scheduled';
CREATE INDEX idx_property_customers_email ON public.property_customers(email);
CREATE INDEX idx_property_customers_token ON public.property_customers(magic_link_token);

-- Create trigger for updated_at
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON public.properties
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_property_status_updated_at BEFORE UPDATE ON public.property_status
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();