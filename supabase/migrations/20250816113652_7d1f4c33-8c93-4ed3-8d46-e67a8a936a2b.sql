-- Create service_areas table for city slideshow data
CREATE TABLE public.service_areas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  city TEXT NOT NULL,
  headline TEXT NOT NULL,
  subtext TEXT NOT NULL,
  image_url TEXT NOT NULL,
  cta_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.service_areas ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Anyone can view service areas" 
ON public.service_areas 
FOR SELECT 
USING (is_active = true);

-- Insert initial city data
INSERT INTO public.service_areas (city, headline, subtext, image_url, cta_url, sort_order) VALUES
('Vancouver', 'Now Serving Vancouver', 'Professional Window, Gutter, Roof & Pressure Washing in Vancouver.', '/lovable-uploads/c5308ef7-c7a3-472c-b7d6-8d9efdf866fe.png', '/quote', 1),
('Burnaby', 'Now Serving Burnaby', 'Professional Window, Gutter, Roof & Pressure Washing in Burnaby.', '/lovable-uploads/982f87f9-8961-45d0-b785-85c6c7117bfa.png', '/quote', 2),
('Richmond', 'Now Serving Richmond', 'Professional Window, Gutter, Roof & Pressure Washing in Richmond.', '/lovable-uploads/d355dc46-7a85-476c-a9d6-34b9ae9c3d14.png', '/quote', 3),
('North Delta', 'Now Serving North Delta', 'Professional Window, Gutter, Roof & Pressure Washing in North Delta.', '/lovable-uploads/eef89893-f3f9-4760-a1bf-cedded20f47a.png', '/quote', 4),
('New Westminster', 'Now Serving New Westminster', 'Professional Window, Gutter, Roof & Pressure Washing in New Westminster.', '/lovable-uploads/6e1ab9f5-63f6-4d21-9107-4812c1385cf2.png', '/quote', 5),
('Surrey', 'Now Serving Surrey', 'Professional Window, Gutter, Roof & Pressure Washing in Surrey.', '/lovable-uploads/220ff15a-dd52-4e94-8d88-d7c88f7251f2.png', '/quote', 6),
('Fort Langley', 'Now Serving Fort Langley', 'Professional Window, Gutter, Roof & Pressure Washing in Fort Langley.', '/lovable-uploads/b08faae5-a074-4bb2-9881-00294ce360ef.png', '/quote', 7),
('White Rock', 'Now Serving White Rock', 'Professional Window, Gutter, Roof & Pressure Washing in White Rock.', '/lovable-uploads/2f4a453b-6379-4e20-8520-abff6ad88516.png', '/quote', 8);

-- Create trigger for updating timestamps
CREATE TRIGGER update_service_areas_updated_at
BEFORE UPDATE ON public.service_areas
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();