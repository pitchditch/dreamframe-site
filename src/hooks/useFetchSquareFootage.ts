
import { useState } from "react";

// Real API fetch function using Estated API
async function fetchSquareFootageFromAPI(address: string): Promise<number | null> {
  const API_KEY = "079c00ac95576cb21af1e0b13ee914aa";
  
  try {
    // First, we need to get property data from Estated
    const response = await fetch(
      `https://apis.estated.com/v4/property?token=${API_KEY}&address=${encodeURIComponent(address)}`
    );
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Extract square footage from the response
    // Estated returns building_area or living_area in their property data
    const squareFootage = data?.data?.building_area || 
                         data?.data?.living_area || 
                         data?.data?.structure?.building_area ||
                         data?.data?.structure?.living_area;
    
    return squareFootage ? parseInt(squareFootage) : null;
  } catch (error) {
    console.error('Error fetching square footage from Estated:', error);
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
