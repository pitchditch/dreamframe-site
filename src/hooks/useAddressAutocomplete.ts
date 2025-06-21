
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
      // Create mock suggestions based on the query
      const cleanQuery = query.trim();
      
      // Generate realistic BC addresses based on the input
      const mockSuggestions: AddressDetails[] = [];
      
      // If it starts with a number, treat it as a street address
      if (/^\d/.test(cleanQuery)) {
        const streetNumber = cleanQuery.split(' ')[0];
        mockSuggestions.push(
          {
            formatted_address: `${streetNumber} Main Street, Surrey, BC`,
            latitude: 49.1913,
            longitude: -122.8490,
            city: 'Surrey',
            postalCode: 'V3R 1A1'
          },
          {
            formatted_address: `${streetNumber} King George Boulevard, Surrey, BC`,
            latitude: 49.1913,
            longitude: -122.8490,
            city: 'Surrey',
            postalCode: 'V3T 2W1'
          },
          {
            formatted_address: `${streetNumber} Marine Drive, White Rock, BC`,
            latitude: 49.0258,
            longitude: -122.8030,
            city: 'White Rock',
            postalCode: 'V4B 1C9'
          }
        );
      } else {
        // If it's a postal code or area name
        mockSuggestions.push(
          {
            formatted_address: `${cleanQuery}, Surrey, BC`,
            latitude: 49.1913,
            longitude: -122.8490,
            city: 'Surrey',
            postalCode: 'V3R 1A1'
          },
          {
            formatted_address: `${cleanQuery}, White Rock, BC`,
            latitude: 49.0258,
            longitude: -122.8030,
            city: 'White Rock',
            postalCode: 'V4B 1C9'
          },
          {
            formatted_address: `${cleanQuery}, Vancouver, BC`,
            latitude: 49.2827,
            longitude: -123.1207,
            city: 'Vancouver',
            postalCode: 'V6B 1A1'
          }
        );
      }
      
      // Filter suggestions that match the query
      const filteredSuggestions = mockSuggestions.filter(addr => 
        addr.formatted_address.toLowerCase().includes(cleanQuery.toLowerCase())
      );

      setSuggestions(filteredSuggestions);
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
