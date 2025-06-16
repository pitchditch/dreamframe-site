
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
    
    // Try the property search endpoint first
    const response = await fetch(
      `https://apis.estated.com/v4/property?token=${API_KEY}&address=${encodeURIComponent(address)}&combined=true`
    );
    
    if (!response.ok) {
      console.error('Estated API error:', response.status, response.statusText);
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Estated API response:', JSON.stringify(data, null, 2));
    
    // Extract square footage from multiple possible locations
    let squareFootage = null;
    
    if (data?.data) {
      const propertyData = data.data;
      
      // Try different paths for square footage
      squareFootage = propertyData.building_area || 
                     propertyData.living_area || 
                     propertyData.total_building_area ||
                     propertyData.structure?.building_area ||
                     propertyData.structure?.living_area ||
                     propertyData.structure?.total_building_area ||
                     propertyData.parcel?.building_area ||
                     propertyData.parcel?.living_area;
                     
      // Also check if it's in assessor data
      if (!squareFootage && propertyData.assessor) {
        squareFootage = propertyData.assessor.building_area ||
                       propertyData.assessor.living_area ||
                       propertyData.assessor.total_building_area;
      }
      
      // Check deed data
      if (!squareFootage && propertyData.deed) {
        squareFootage = propertyData.deed.building_area ||
                       propertyData.deed.living_area;
      }
    }
    
    // If no data found, try a fallback approach with property lookup
    if (!squareFootage && data?.data?.parcel?.apn) {
      console.log('Trying alternative lookup with APN:', data.data.parcel.apn);
      
      const apnResponse = await fetch(
        `https://apis.estated.com/v4/property?token=${API_KEY}&apn=${data.data.parcel.apn}&combined=true`
      );
      
      if (apnResponse.ok) {
        const apnData = await apnResponse.json();
        console.log('APN lookup response:', JSON.stringify(apnData, null, 2));
        
        if (apnData?.data) {
          squareFootage = apnData.data.building_area || 
                         apnData.data.living_area ||
                         apnData.data.assessor?.building_area ||
                         apnData.data.assessor?.living_area;
        }
      }
    }
    
    const result = squareFootage ? parseInt(squareFootage) : null;
    console.log('Final extracted square footage:', result);
    
    // If still no data, return a helpful message
    if (!result) {
      console.log('No square footage data found in API response');
      return new Response(
        JSON.stringify({ 
          squareFootage: null, 
          message: 'Property data not available for this address' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    return new Response(
      JSON.stringify({ squareFootage: result }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error fetching square footage:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch square footage', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
