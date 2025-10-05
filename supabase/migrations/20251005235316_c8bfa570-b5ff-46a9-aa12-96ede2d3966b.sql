-- Add missing columns to properties table if they don't exist
DO $$ 
BEGIN
  -- Add columns one by one with error handling
  BEGIN
    ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS city TEXT;
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
  
  BEGIN
    ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS postal TEXT;
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
  
  BEGIN
    ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS lat NUMERIC;
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
  
  BEGIN
    ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS lng NUMERIC;
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
  
  BEGIN
    ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'residential';
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
  
  BEGIN
    ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS living_sqft INTEGER;
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
  
  BEGIN
    ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS year_built INTEGER;
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
  
  BEGIN
    ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS stories INTEGER;
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
  
  BEGIN
    ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS property_type_detail TEXT;
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
  
  BEGIN
    ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS lot_size TEXT;
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
  
  BEGIN
    ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS bedrooms INTEGER;
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
  
  BEGIN
    ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS bathrooms INTEGER;
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
  
  BEGIN
    ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS data_source TEXT;
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
  
  BEGIN
    ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS unit_number TEXT;
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
  
  BEGIN
    ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS plaza_name TEXT;
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
  
  BEGIN
    ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS opening_hours TEXT;
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
  
  BEGIN
    ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS frontage_glass_width NUMERIC;
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
  
  BEGIN
    ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
  
  BEGIN
    ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
END $$;

-- Now create indexes safely
CREATE INDEX IF NOT EXISTS idx_properties_postal ON public.properties(postal);
CREATE INDEX IF NOT EXISTS idx_properties_type ON public.properties(type);

-- Enable RLS on properties if not already enabled
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;