-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admins have full access to properties" ON public.properties;
DROP POLICY IF EXISTS "Authenticated users can view properties" ON public.properties;
DROP POLICY IF EXISTS "Public can create properties" ON public.properties;

-- Create new policies
CREATE POLICY "Admins have full access to properties" ON public.properties
  FOR ALL USING (is_admin());

CREATE POLICY "Authenticated users can view properties" ON public.properties
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Public can create properties" ON public.properties
  FOR INSERT WITH CHECK (true);