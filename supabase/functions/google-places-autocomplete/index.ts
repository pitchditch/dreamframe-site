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
    const { input } = await req.json();
    
    if (!input || input.length < 3) {
      return new Response(
        JSON.stringify({ predictions: [] }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('GOOGLE_STREET_API');
    
    if (!apiKey) {
      throw new Error('Google API key not configured');
    }

    // Call Google Places Autocomplete API
    const autocompleteUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&components=country:ca&types=address&key=${apiKey}`;
    
    const autocompleteResponse = await fetch(autocompleteUrl);
    const autocompleteData = await autocompleteResponse.json();

    if (autocompleteData.status !== 'OK' && autocompleteData.status !== 'ZERO_RESULTS') {
      console.error('Google Places API error:', autocompleteData);
      throw new Error(`Google Places API error: ${autocompleteData.status}`);
    }

    // Get place details for each prediction
    const predictions = await Promise.all(
      (autocompleteData.predictions || []).slice(0, 5).map(async (prediction: any) => {
        try {
          const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${prediction.place_id}&fields=formatted_address,geometry,address_components&key=${apiKey}`;
          const detailsResponse = await fetch(detailsUrl);
          const detailsData = await detailsResponse.json();

          if (detailsData.status === 'OK' && detailsData.result) {
            const result = detailsData.result;
            const addressComponents = result.address_components || [];

            // Extract address components
            let streetNumber = '';
            let route = '';
            let city = '';
            let province = '';
            let postalCode = '';
            let country = '';

            addressComponents.forEach((component: any) => {
              const types = component.types;
              if (types.includes('street_number')) streetNumber = component.long_name;
              if (types.includes('route')) route = component.long_name;
              if (types.includes('locality')) city = component.long_name;
              if (types.includes('administrative_area_level_1')) province = component.short_name;
              if (types.includes('postal_code')) postalCode = component.long_name;
              if (types.includes('country')) country = component.long_name;
            });

            return {
              formatted_address: result.formatted_address,
              latitude: result.geometry.location.lat,
              longitude: result.geometry.location.lng,
              street_number: streetNumber,
              route: route,
              street_address: `${streetNumber} ${route}`.trim(),
              city: city,
              province: province,
              postal_code: postalCode,
              country: country,
              place_id: prediction.place_id
            };
          }
          return null;
        } catch (error) {
          console.error('Error fetching place details:', error);
          return null;
        }
      })
    );

    const validPredictions = predictions.filter(p => p !== null);

    return new Response(
      JSON.stringify({ predictions: validPredictions }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in google-places-autocomplete:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
