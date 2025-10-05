import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AddressDetails {
  formatted_address: string;
  latitude: number;
  longitude: number;
  city: string;
  postalCode: string;
  street_number?: string;
  route?: string;
  street_address?: string;
  province?: string;
  country?: string;
  place_id?: string;
}

export function useAddressAutocomplete() {
  const [suggestions, setSuggestions] = useState<AddressDetails[]>([]);
  const [loading, setLoading] = useState(false);

  const searchAddresses = useCallback(async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('google-places-autocomplete', {
        body: { input: query }
      });

      if (error) {
        console.error('Error fetching address suggestions:', error);
        setSuggestions([]);
        return;
      }

      if (data && data.predictions) {
        const formattedSuggestions = data.predictions.map((pred: any) => ({
          formatted_address: pred.formatted_address,
          latitude: pred.latitude,
          longitude: pred.longitude,
          city: pred.city,
          postalCode: pred.postal_code,
          street_number: pred.street_number,
          route: pred.route,
          street_address: pred.street_address,
          province: pred.province,
          country: pred.country,
          place_id: pred.place_id
        }));
        setSuggestions(formattedSuggestions);
      }
    } catch (error) {
      console.error('Error fetching address suggestions:', error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    suggestions,
    loading,
    searchAddresses,
    clearSuggestions: () => setSuggestions([])
  };
}
