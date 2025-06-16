
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
    setLoading(true);
    setError(null);
    
    try {
      const sqft = await fetchSquareFootageFromAPI(address);
      setLoading(false);
      return sqft;
    } catch (err) {
      setError("Could not fetch square footage from property database");
      setLoading(false);
      return null;
    }
  }

  return { getSquareFootage, loading, error };
}
