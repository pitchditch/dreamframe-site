import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { address, latitude, longitude } = await req.json();
    
    if (!address && (!latitude || !longitude)) {
      throw new Error('Address or coordinates required');
    }

    const attomApiKey = Deno.env.get('ATTOM_API_KEY');
    
    if (!attomApiKey) {
      console.warn('ATTOM API key not configured');
      return new Response(
        JSON.stringify({ 
          source: 'none',
          squareFootage: null,
          yearBuilt: null,
          stories: null,
          propertyType: null
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let propertyData: any = {};

    try {
      // Try ATTOM API first
      let attomUrl = '';
      if (address) {
        attomUrl = `https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/expandedprofile?address=${encodeURIComponent(address)}`;
      } else {
        attomUrl = `https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/expandedprofile?latitude=${latitude}&longitude=${longitude}`;
      }

      const attomResponse = await fetch(attomUrl, {
        headers: {
          'apikey': attomApiKey,
          'Accept': 'application/json'
        }
      });

      if (attomResponse.ok) {
        const attomData = await attomResponse.json();
        
        if (attomData.property && attomData.property.length > 0) {
          const property = attomData.property[0];
          const building = property.building || {};
          const summary = property.summary || {};

          propertyData = {
            source: 'attom',
            squareFootage: building.size?.livingsize || building.size?.universalsize || null,
            yearBuilt: building.summary?.yearbuilt || null,
            stories: building.summary?.stories || null,
            propertyType: summary.propclass || summary.proptype || null,
            lotSize: summary.lotsize || null,
            bedrooms: building.rooms?.beds || null,
            bathrooms: building.rooms?.bathstotal || null,
            raw_data: property
          };
        }
      } else {
        console.warn('ATTOM API returned non-OK status:', attomResponse.status);
      }
    } catch (attomError) {
      console.error('ATTOM API error:', attomError);
    }

    // If ATTOM didn't return data, return empty result
    if (!propertyData.source) {
      propertyData = {
        source: 'none',
        squareFootage: null,
        yearBuilt: null,
        stories: null,
        propertyType: null
      };
    }

    return new Response(
      JSON.stringify(propertyData),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in fetch-property-data:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
