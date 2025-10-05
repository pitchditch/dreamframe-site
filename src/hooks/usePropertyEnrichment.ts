import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PropertyData {
  source: 'attom' | 'bc-assessment' | 'none';
  squareFootage: number | null;
  yearBuilt: number | null;
  stories: number | null;
  propertyType: string | null;
  lotSize: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
}

export function usePropertyEnrichment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPropertyData = async (
    address: string,
    latitude?: number,
    longitude?: number
  ): Promise<PropertyData | null> => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke('fetch-property-data', {
        body: { address, latitude, longitude }
      });

      if (functionError) {
        console.error('Error fetching property data:', functionError);
        setError('Failed to fetch property data');
        return null;
      }

      return data as PropertyData;
    } catch (err) {
      console.error('Error in usePropertyEnrichment:', err);
      setError('Failed to fetch property data');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchPropertyData,
    loading,
    error
  };
}
