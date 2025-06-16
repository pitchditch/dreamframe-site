
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { address } = await req.json();
    
    if (!address) {
      return new Response(
        JSON.stringify({ error: 'Address is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Fetching square footage for address:', address);

    const API_KEY = "079c00ac95576cb21af1e0b13ee914aa";
    
    const response = await fetch(
      `https://apis.estated.com/v4/property?token=${API_KEY}&address=${encodeURIComponent(address)}`
    );
    
    if (!response.ok) {
      console.error('Estated API error:', response.status, response.statusText);
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Estated API response:', data);
    
    // Extract square footage from the response
    const squareFootage = data?.data?.building_area || 
                         data?.data?.living_area || 
                         data?.data?.structure?.building_area ||
                         data?.data?.structure?.living_area;
    
    const result = squareFootage ? parseInt(squareFootage) : null;
    console.log('Extracted square footage:', result);
    
    return new Response(
      JSON.stringify({ squareFootage: result }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error fetching square footage:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch square footage' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
