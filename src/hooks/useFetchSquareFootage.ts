
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// Cache to store fetched square footage by address to avoid refetching
const sqftCache = new Map<string, {squareFootage: number | null, isEstimate?: boolean, message?: string}>();

// Server-side fetch function using Supabase Edge Function
async function fetchSquareFootageFromAPI(address: string): Promise<{squareFootage: number | null, isEstimate?: boolean, message?: string}> {
  // Check cache first
  const cacheKey = address.toLowerCase().trim();
  if (sqftCache.has(cacheKey)) {
    console.log('Using cached square footage for:', address);
    return sqftCache.get(cacheKey)!;
  }

  try {
    console.log('Calling edge function for address:', address);
    
    const { data, error } = await supabase.functions.invoke('fetch-square-footage', {
      body: { address }
    });
    
    if (error) {
      console.error('Edge function error:', error);
      throw error;
    }
    
    console.log('Edge function response:', data);
    
    const result = {
      squareFootage: data?.squareFootage || null,
      isEstimate: data?.isEstimate || false,
      message: data?.message || null
    };

    // Cache the result
    sqftCache.set(cacheKey, result);
    
    return result;
    
  } catch (error) {
    console.error('Error calling square footage edge function:', error);
    const fallbackResult = { squareFootage: null };
    sqftCache.set(cacheKey, fallbackResult);
    return fallbackResult;
  }
}

export function useFetchSquareFootage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function getSquareFootage(address: string): Promise<number | null> {
    if (!address || address.trim().length === 0) {
      setError("Address is required");
      return null;
    }

    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching square footage for:', address);
      const result = await fetchSquareFootageFromAPI(address);
      
      if (result.squareFootage === null) {
        setError("Square footage data not available for this property");
      } else {
        console.log('Successfully fetched square footage:', result.squareFootage);
        if (result.isEstimate) {
          setError(`Using consistent estimate: ${result.message}`);
        } else if (result.message) {
          console.log('API message:', result.message);
        }
      }
      
      setLoading(false);
      return result.squareFootage;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      console.error('Error in getSquareFootage:', errorMessage);
      setError(`Could not fetch square footage: ${errorMessage}`);
      setLoading(false);
      return null;
    }
  }

  return { getSquareFootage, loading, error };
}
