import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface PropertyData {
  id: string;
  address_line1: string;
  city: string;
  province: string;
  postal_code: string;
  lat: number | null;
  lng: number | null;
  living_sqft: number | null;
  lot_sqft: number | null;
  year_built: number | null;
  stories: number | null;
}

export const usePropertyData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchProperty = async (address: string): Promise<PropertyData | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: fetchError } = await supabase
        .from('properties')
        .select('*')
        .ilike('address_line1', `%${address}%`)
        .limit(1)
        .maybeSingle();

      if (fetchError) throw fetchError;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search property');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createProperty = async (address: string): Promise<PropertyData | null> => {
    setLoading(true);
    setError(null);
    
    try {
      // Parse address (simple version)
      const parts = address.split(',').map(s => s.trim());
      const address_line1 = parts[0] || address;
      const city = parts[1] || 'White Rock';
      const province = 'BC';
      const postal_code = parts[2] || '';

      const { data, error: createError } = await supabase
        .from('properties')
        .insert({
          address_line1,
          city,
          province,
          postal_code,
        })
        .select()
        .single();

      if (createError) throw createError;

      // Initialize property status
      if (data) {
        await supabase.from('property_status').insert({
          property_id: data.id,
        });
      }

      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create property');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getPropertyById = async (id: string): Promise<PropertyData | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: fetchError } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (fetchError) throw fetchError;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch property');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    searchProperty,
    createProperty,
    getPropertyById,
  };
};
