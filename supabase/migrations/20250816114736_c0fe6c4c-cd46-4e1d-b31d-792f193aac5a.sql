-- Create service_areas table for city slideshow
CREATE TABLE IF NOT EXISTS public.service_areas (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  city text NOT NULL,
  headline text NOT NULL,
  subtext text NOT NULL,
  image_url text NOT NULL,
  cta_url text,
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
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
('Vancouver', 'Now Serving Vancouver', 'Professional Window, Gutter, Roof & Pressure Washing in Vancouver.', '/lovable-uploads/79a46d27-dd03-468e-9df6-4763ae32fb45.png', '/contact', 1),
('Burnaby', 'Now Serving Burnaby', 'Professional Window, Gutter, Roof & Pressure Washing in Burnaby.', '/lovable-uploads/3bf5df59-4049-49dd-8144-d02a1f4c2f65.png', '/contact', 2),
('Richmond', 'Now Serving Richmond', 'Professional Window, Gutter, Roof & Pressure Washing in Richmond.', '/lovable-uploads/6c304d4c-7bcd-4323-a6ac-f73bd89c0f0c.png', '/contact', 3),
('North Delta', 'Now Serving North Delta', 'Professional Window, Gutter, Roof & Pressure Washing in North Delta.', '/lovable-uploads/0ffad826-ed7e-48ec-bcde-97abedf9e2cc.png', '/contact', 4),
('New Westminster', 'Now Serving New Westminster', 'Professional Window, Gutter, Roof & Pressure Washing in New Westminster.', '/lovable-uploads/6c306843-27b9-4a3e-b2de-d4d9682db148.png', '/contact', 5),
('Surrey', 'Now Serving Surrey', 'Professional Window, Gutter, Roof & Pressure Washing in Surrey.', '/lovable-uploads/2ca33d6e-e7b2-4473-976b-dfb083d2c53c.png', '/contact', 6),
('Fort Langley', 'Now Serving Fort Langley', 'Professional Window, Gutter, Roof & Pressure Washing in Fort Langley.', '/lovable-uploads/de657f02-6399-4484-89cf-7502f6488919.png', '/contact', 7),
('White Rock', 'Now Serving White Rock', 'Professional Window, Gutter, Roof & Pressure Washing in White Rock.', '/lovable-uploads/f79316ed-05d4-45df-a1ec-c218eb4b30f5.png', '/contact', 8);