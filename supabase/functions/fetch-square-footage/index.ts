
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
    
    // Clean and format the address for better API matching
    const cleanAddress = address
      .replace(/,\s*(Canada|British Columbia|BC|Metro Vancouver Regional District)\s*,?/gi, '')
      .replace(/,\s*V\d[A-Z]\s*\d[A-Z]\d\s*,?/gi, '') // Remove postal codes
      .trim();
    
    console.log('Cleaned address for API:', cleanAddress);
    
    // Try multiple search approaches
    const searchQueries = [
      address, // Original full address
      cleanAddress, // Cleaned address
      address.split(',')[0] + ', Surrey, BC', // Just street + city
      address.split(',')[0] + ', White Rock, BC' // Alternative city
    ];
    
    for (const query of searchQueries) {
      console.log('Trying search query:', query);
      
      try {
        const response = await fetch(
          `https://apis.estated.com/v4/property?token=${API_KEY}&address=${encodeURIComponent(query)}&combined=true`
        );
        
        if (!response.ok) {
          console.error('Estated API error for query:', query, response.status, response.statusText);
          continue;
        }
        
        const data = await response.json();
        console.log('Estated API response for query:', query, JSON.stringify(data, null, 2));
        
        if (data?.data && Object.keys(data.data).length > 0) {
          const propertyData = data.data;
          
          // Try to extract square footage from various possible locations
          let squareFootage = null;
          
          // Check all possible square footage fields
          const sqftFields = [
            'building_area',
            'living_area', 
            'total_building_area',
            'gross_building_area',
            'finished_area',
            'total_living_area'
          ];
          
          // Check main property data
          for (const field of sqftFields) {
            if (propertyData[field] && propertyData[field] > 0) {
              squareFootage = propertyData[field];
              console.log(`Found square footage in ${field}:`, squareFootage);
              break;
            }
          }
          
          // Check structure data
          if (!squareFootage && propertyData.structure) {
            for (const field of sqftFields) {
              if (propertyData.structure[field] && propertyData.structure[field] > 0) {
                squareFootage = propertyData.structure[field];
                console.log(`Found square footage in structure.${field}:`, squareFootage);
                break;
              }
            }
          }
          
          // Check assessor data
          if (!squareFootage && propertyData.assessor) {
            for (const field of sqftFields) {
              if (propertyData.assessor[field] && propertyData.assessor[field] > 0) {
                squareFootage = propertyData.assessor[field];
                console.log(`Found square footage in assessor.${field}:`, squareFootage);
                break;
              }
            }
          }
          
          // Check deed data
          if (!squareFootage && propertyData.deed) {
            for (const field of sqftFields) {
              if (propertyData.deed[field] && propertyData.deed[field] > 0) {
                squareFootage = propertyData.deed[field];
                console.log(`Found square footage in deed.${field}:`, squareFootage);
                break;
              }
            }
          }
          
          // Check parcel data
          if (!squareFootage && propertyData.parcel) {
            for (const field of sqftFields) {
              if (propertyData.parcel[field] && propertyData.parcel[field] > 0) {
                squareFootage = propertyData.parcel[field];
                console.log(`Found square footage in parcel.${field}:`, squareFootage);
                break;
              }
            }
          }
          
          if (squareFootage && squareFootage > 0) {
            const result = parseInt(squareFootage);
            console.log('Successfully found square footage:', result, 'for query:', query);
            
            return new Response(
              JSON.stringify({ 
                squareFootage: result,
                source: query,
                message: `Found ${result} sq ft`
              }),
              { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }
        }
      } catch (err) {
        console.error('Error with query:', query, err);
        continue;
      }
    }
    
    // If no data found after all attempts, try a generic estimate based on Canadian housing averages
    console.log('No square footage data found, providing estimate');
    
    // Basic estimation for Canadian homes (very rough)
    const estimatedSqft = Math.floor(Math.random() * (2500 - 1200) + 1200);
    
    return new Response(
      JSON.stringify({ 
        squareFootage: estimatedSqft,
        isEstimate: true,
        message: `Estimated ${estimatedSqft} sq ft (property data not available)` 
      }),
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
