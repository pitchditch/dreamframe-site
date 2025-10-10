-- Remove public SELECT access from page_views table
DROP POLICY IF EXISTS "Anyone can view page views" ON public.page_views;

-- Add admin-only SELECT policy for page_views
CREATE POLICY "Admins can view page views"
  ON public.page_views
  FOR SELECT
  TO authenticated
  USING (public.is_admin(auth.uid()));