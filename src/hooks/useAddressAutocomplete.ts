
import { useState, useCallback } from 'react';

interface AddressDetails {
  formatted_address: string;
  latitude: number;
  longitude: number;
  city: string;
  postalCode: string;
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
      // For now, we'll create mock suggestions based on BC postal codes
      // In production, you'd integrate with Google Places API or similar
      const mockSuggestions: AddressDetails[] = [
        {
          formatted_address: `${query} Surrey, BC`,
          latitude: 49.1913,
          longitude: -122.8490,
          city: 'Surrey',
          postalCode: 'V3R 1A1'
        },
        {
          formatted_address: `${query} White Rock, BC`,
          latitude: 49.0258,
          longitude: -122.8030,
          city: 'White Rock',
          postalCode: 'V4B 1C9'
        },
        {
          formatted_address: `${query} Vancouver, BC`,
          latitude: 49.2827,
          longitude: -123.1207,
          city: 'Vancouver',
          postalCode: 'V6B 1A1'
        }
      ].filter(addr => 
        addr.formatted_address.toLowerCase().includes(query.toLowerCase())
      );

      setSuggestions(mockSuggestions);
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
