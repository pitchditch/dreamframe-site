-- Add lead and customer tracking columns to properties table
ALTER TABLE public.properties
ADD COLUMN IF NOT EXISTS customer_name TEXT,
ADD COLUMN IF NOT EXISTS phone_number TEXT,
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS notes TEXT,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'interested',
ADD COLUMN IF NOT EXISTS lead_source TEXT DEFAULT 'door-to-door',
ADD COLUMN IF NOT EXISTS follow_up_date DATE,
ADD COLUMN IF NOT EXISTS lead_score TEXT,
ADD COLUMN IF NOT EXISTS last_contact_date TIMESTAMPTZ;