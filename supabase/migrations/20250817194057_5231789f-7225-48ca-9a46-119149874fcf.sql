-- CRITICAL SECURITY FIX: Replace overly permissive RLS policies with secure ones

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Anyone can view quotes" ON quotes;
DROP POLICY IF EXISTS "Anyone can insert quotes" ON quotes;
DROP POLICY IF EXISTS "Anyone can view customers" ON customers;
DROP POLICY IF EXISTS "Anyone can create customers" ON customers;
DROP POLICY IF EXISTS "Anyone can update customers" ON customers;
DROP POLICY IF EXISTS "Anyone can delete customers" ON customers;
DROP POLICY IF EXISTS "Anyone can view leads" ON leads;
DROP POLICY IF EXISTS "Anyone can create leads" ON leads;
DROP POLICY IF EXISTS "Anyone can update leads" ON leads;
DROP POLICY IF EXISTS "Anyone can delete leads" ON leads;
DROP POLICY IF EXISTS "Anyone can view invoices" ON invoices;
DROP POLICY IF EXISTS "Anyone can create invoices" ON invoices;
DROP POLICY IF EXISTS "Anyone can update invoices" ON invoices;
DROP POLICY IF EXISTS "Anyone can delete invoices" ON invoices;
DROP POLICY IF EXISTS "Anyone can view jobs" ON jobs;
DROP POLICY IF EXISTS "Anyone can create jobs" ON jobs;
DROP POLICY IF EXISTS "Anyone can update jobs" ON jobs;
DROP POLICY IF EXISTS "Anyone can delete jobs" ON jobs;
DROP POLICY IF EXISTS "Anyone can view call logs" ON call_logs;
DROP POLICY IF EXISTS "Anyone can insert call logs" ON call_logs;
DROP POLICY IF EXISTS "Anyone can update call logs" ON call_logs;
DROP POLICY IF EXISTS "Anyone can view storefronts" ON storefronts;
DROP POLICY IF EXISTS "Anyone can create storefronts" ON storefronts;
DROP POLICY IF EXISTS "Anyone can update storefronts" ON storefronts;
DROP POLICY IF EXISTS "Anyone can delete storefronts" ON storefronts;

-- Create admin role enum and admin_users table for secure access
CREATE TYPE user_role AS ENUM ('admin', 'customer');

CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  role user_role NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_users 
    WHERE id = user_id AND role = 'admin'
  );
$$;

-- SECURE POLICIES FOR CRITICAL BUSINESS DATA

-- Quotes: Admin access only
CREATE POLICY "Admins can view all quotes" ON quotes FOR SELECT TO authenticated USING (is_admin());
CREATE POLICY "Admins can insert quotes" ON quotes FOR INSERT TO authenticated WITH CHECK (is_admin());
CREATE POLICY "Admins can update quotes" ON quotes FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admins can delete quotes" ON quotes FOR DELETE TO authenticated USING (is_admin());

-- Customers: Admin access only
CREATE POLICY "Admins can view all customers" ON customers FOR SELECT TO authenticated USING (is_admin());
CREATE POLICY "Admins can insert customers" ON customers FOR INSERT TO authenticated WITH CHECK (is_admin());
CREATE POLICY "Admins can update customers" ON customers FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admins can delete customers" ON customers FOR DELETE TO authenticated USING (is_admin());

-- Leads: Admin access only
CREATE POLICY "Admins can view all leads" ON leads FOR SELECT TO authenticated USING (is_admin());
CREATE POLICY "Admins can update leads" ON leads FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admins can delete leads" ON leads FOR DELETE TO authenticated USING (is_admin());
-- Keep public insert for contact forms
CREATE POLICY "Anyone can create leads" ON leads FOR INSERT WITH CHECK (true);

-- Invoices: Admin access only
CREATE POLICY "Admins can view all invoices" ON invoices FOR SELECT TO authenticated USING (is_admin());
CREATE POLICY "Admins can create invoices" ON invoices FOR INSERT TO authenticated WITH CHECK (is_admin());
CREATE POLICY "Admins can update invoices" ON invoices FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admins can delete invoices" ON invoices FOR DELETE TO authenticated USING (is_admin());

-- Jobs: Admin access only
CREATE POLICY "Admins can view all jobs" ON jobs FOR SELECT TO authenticated USING (is_admin());
CREATE POLICY "Admins can create jobs" ON jobs FOR INSERT TO authenticated WITH CHECK (is_admin());
CREATE POLICY "Admins can update jobs" ON jobs FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admins can delete jobs" ON jobs FOR DELETE TO authenticated USING (is_admin());

-- Call logs: Admin access only
CREATE POLICY "Admins can view call logs" ON call_logs FOR SELECT TO authenticated USING (is_admin());
CREATE POLICY "System can insert call logs" ON call_logs FOR INSERT WITH CHECK (true); -- For automated systems
CREATE POLICY "Admins can update call logs" ON call_logs FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- Storefronts: Admin access only
CREATE POLICY "Admins can view storefronts" ON storefronts FOR SELECT TO authenticated USING (is_admin());
CREATE POLICY "Admins can create storefronts" ON storefronts FOR INSERT TO authenticated WITH CHECK (is_admin());
CREATE POLICY "Admins can update storefronts" ON storefronts FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admins can delete storefronts" ON storefronts FOR DELETE TO authenticated USING (is_admin());

-- Admin users policies
CREATE POLICY "Admins can view admin users" ON admin_users FOR SELECT TO authenticated USING (is_admin());
CREATE POLICY "Admins can manage admin users" ON admin_users FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- Contact requests: Keep insert public for forms, restrict read to admins
DROP POLICY IF EXISTS "Anyone can view contact requests" ON contact_requests;
CREATE POLICY "Admins can view contact requests" ON contact_requests FOR SELECT TO authenticated USING (is_admin());

-- Fix function search paths
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.cleanup_old_typing_indicators()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  DELETE FROM public.typing_indicators 
  WHERE updated_at < now() - INTERVAL '30 seconds';
END;
$function$;

CREATE OR REPLACE FUNCTION public.archive_daily_chats()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  INSERT INTO public.archived_chats (archive_date, messages)
  SELECT 
    CURRENT_DATE - INTERVAL '1 day',
    COALESCE(json_agg(
      json_build_object(
        'id', id,
        'sender', sender,
        'message', message,
        'message_type', message_type,
        'created_at', created_at,
        'image_url', image_url,
        'reactions', reactions
      ) ORDER BY created_at
    ), '[]'::json)
  FROM public.chat_messages 
  WHERE DATE(created_at) = CURRENT_DATE - INTERVAL '1 day'
  ON CONFLICT (archive_date) DO UPDATE SET messages = EXCLUDED.messages;
END;
$function$;