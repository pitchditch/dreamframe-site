
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// Server-side fetch function using Supabase Edge Function
async function fetchSquareFootageFromAPI(address: string): Promise<number | null> {
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
    
    if (data?.message) {
      console.log('API message:', data.message);
    }
    
    return data?.squareFootage || null;
    
  } catch (error) {
    console.error('Error calling square footage edge function:', error);
    return null;
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
      const sqft = await fetchSquareFootageFromAPI(address);
      
      if (sqft === null) {
        setError("Square footage data not available for this property");
      } else {
        console.log('Successfully fetched square footage:', sqft);
      }
      
      setLoading(false);
      return sqft;
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
