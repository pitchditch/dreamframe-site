
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
    
    // More comprehensive address cleaning for Canadian addresses
    const cleanAddress = address
      .replace(/,\s*(Canada|British Columbia|BC|Metro Vancouver Regional District)\s*,?/gi, '')
      .replace(/,\s*V\d[A-Z]\s*\d[A-Z]\d\s*,?/gi, '') // Remove postal codes
      .replace(/\s+/g, ' ')
      .trim();
    
    console.log('Cleaned address for API:', cleanAddress);
    
    // Enhanced search strategies for Canadian properties
    const searchQueries = [
      address, // Original full address
      cleanAddress, // Cleaned address
      address.split(',')[0] + ', BC', // Just street + province
      address.split(',')[0] + ', Surrey, BC', // Street + Surrey
      address.split(',')[0] + ', White Rock, BC', // Street + White Rock
      cleanAddress + ', Canada', // Cleaned + country
      address.replace(/,.*$/, '') + ', British Columbia', // Street + full province name
    ];
    
    let foundData = null;
    
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
          
          // Comprehensive search for square footage in all possible locations
          let squareFootage = null;
          
          // All possible square footage field names
          const sqftFields = [
            'building_area',
            'living_area', 
            'total_building_area',
            'gross_building_area',
            'finished_area',
            'total_living_area',
            'floor_area',
            'interior_area',
            'heated_area',
            'total_area',
            'building_size',
            'structure_area'
          ];
          
          // Search in main property data
          for (const field of sqftFields) {
            if (propertyData[field] && propertyData[field] > 0) {
              squareFootage = propertyData[field];
              console.log(`Found square footage in main.${field}:`, squareFootage);
              break;
            }
          }
          
          // Search in nested objects if not found in main
          const nestedObjects = ['structure', 'assessor', 'deed', 'parcel', 'building', 'property', 'details'];
          
          if (!squareFootage) {
            for (const objName of nestedObjects) {
              if (propertyData[objName] && typeof propertyData[objName] === 'object') {
                for (const field of sqftFields) {
                  if (propertyData[objName][field] && propertyData[objName][field] > 0) {
                    squareFootage = propertyData[objName][field];
                    console.log(`Found square footage in ${objName}.${field}:`, squareFootage);
                    break;
                  }
                }
                if (squareFootage) break;
              }
            }
          }
          
          if (squareFootage && squareFootage > 0) {
            foundData = {
              squareFootage: parseInt(squareFootage),
              source: query,
              message: `Found ${parseInt(squareFootage)} sq ft from property records`
            };
            break;
          }
        }
      } catch (err) {
        console.error('Error with query:', query, err);
        continue;
      }
    }
    
    if (foundData) {
      console.log('Successfully found square footage:', foundData.squareFootage, 'for query:', foundData.source);
      
      return new Response(
        JSON.stringify(foundData),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // If no real data found, create a consistent estimate based on address characteristics
    console.log('No square footage data found, creating consistent estimate');
    
    // Create a hash from the address to ensure consistent estimates
    const addressHash = address.split('').reduce((hash, char) => {
      return ((hash << 5) - hash + char.charCodeAt(0)) & 0xffffffff;
    }, 0);
    
    // Use hash to generate consistent estimate within realistic ranges
    const baseEstimate = 1200 + (Math.abs(addressHash) % 1800); // Range: 1200-3000 sq ft
    const roundedEstimate = Math.round(baseEstimate / 50) * 50; // Round to nearest 50
    
    return new Response(
      JSON.stringify({ 
        squareFootage: roundedEstimate,
        isEstimate: true,
        message: `Estimated ${roundedEstimate} sq ft (property data not available)` 
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
