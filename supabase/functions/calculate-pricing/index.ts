
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PricingZone {
  id: string;
  name: string;
  postalCodePrefixes: string[];
  priceMultiplier: number;
  serviceFees: Record<string, number>;
  activePromotions?: Promotion[];
}

interface Promotion {
  id: string;
  name: string;
  discountPercent: number;
  validUntil: string;
  applicableServices: string[];
  minOrderValue?: number;
}

interface PricingRequest {
  postalCode: string;
  serviceType: string;
  houseSize: string;
  squareFootage?: number;
  additionalServices?: string[];
}

// Define pricing zones with current promotions
const PRICING_ZONES: PricingZone[] = [
  {
    id: 'vancouver-premium',
    name: 'Vancouver Premium',
    postalCodePrefixes: ['V5', 'V6'],
    priceMultiplier: 1.15,
    serviceFees: {
      'House Washing': 25,
      'Window Cleaning': 15
    },
    activePromotions: [
      {
        id: 'spring-special-vancouver',
        name: 'Vancouver Spring Special',
        discountPercent: 15,
        validUntil: '2024-08-31',
        applicableServices: ['House Washing', 'Window Cleaning']
      }
    ]
  },
  {
    id: 'white-rock-premium',
    name: 'White Rock',
    postalCodePrefixes: ['V4B'],
    priceMultiplier: 1.1,
    serviceFees: {
      'Window Cleaning': 20
    },
    activePromotions: [
      {
        id: 'summer-sale-whiterock',
        name: 'White Rock Beach Special',
        discountPercent: 20,
        validUntil: '2024-09-15',
        applicableServices: ['Window Cleaning', 'House Washing']
      }
    ]
  },
  {
    id: 'richmond-standard',
    name: 'Richmond',
    postalCodePrefixes: ['V6V', 'V6W', 'V6X', 'V6Y', 'V7A', 'V7B', 'V7C', 'V7E'],
    priceMultiplier: 1.05,
    serviceFees: {},
    activePromotions: [
      {
        id: 'richmond-bulk-discount',
        name: 'Richmond Bulk Service Discount',
        discountPercent: 10,
        validUntil: '2024-12-31',
        applicableServices: ['House Washing', 'Driveway Washing'],
        minOrderValue: 500
      }
    ]
  },
  {
    id: 'surrey-standard',
    name: 'Surrey',
    postalCodePrefixes: ['V3R', 'V3S', 'V3T', 'V3V', 'V3W', 'V3X', 'V4A', 'V4N', 'V4P'],
    priceMultiplier: 1.0,
    serviceFees: {}
  }
];

const BASE_PRICING = {
  small: {
    'Window Cleaning': 250,
    'House Washing': 350,
    'Driveway Washing': 200,
    'Deck Washing': 180,
    'Gutter Cleaning': 150
  },
  medium: {
    'Window Cleaning': 350,
    'House Washing': 500,
    'Driveway Washing': 280,
    'Deck Washing': 250,
    'Gutter Cleaning': 200
  },
  large: {
    'Window Cleaning': 450,
    'House Washing': 700,
    'Driveway Washing': 350,
    'Deck Washing': 320,
    'Gutter Cleaning': 280
  },
  xlarge: {
    'Window Cleaning': 600,
    'House Washing': 950,
    'Driveway Washing': 450,
    'Deck Washing': 400,
    'Gutter Cleaning': 350
  }
};

function findZoneByPostalCode(postalCode: string): PricingZone | null {
  const cleanPostal = postalCode.replace(/\s+/g, '').toUpperCase();
  
  for (const zone of PRICING_ZONES) {
    for (const prefix of zone.postalCodePrefixes) {
      if (cleanPostal.startsWith(prefix)) {
        return zone;
      }
    }
  }
  
  // Default to Surrey pricing if no match
  return PRICING_ZONES.find(z => z.id === 'surrey-standard') || null;
}

function calculatePrice(request: PricingRequest) {
  const zone = findZoneByPostalCode(request.postalCode);
  const basePrice = BASE_PRICING[request.houseSize as keyof typeof BASE_PRICING]?.[request.serviceType] || 0;
  
  if (!zone || !basePrice) {
    throw new Error('Invalid pricing request');
  }

  // Apply zone multiplier
  const zoneAdjustment = basePrice * (zone.priceMultiplier - 1);
  const serviceFee = zone.serviceFees[request.serviceType] || 0;
  
  // Calculate promotions
  const now = new Date();
  const applicablePromotions = zone.activePromotions?.filter(promo => 
    promo.applicableServices.includes(request.serviceType) &&
    new Date(promo.validUntil) > now
  ) || [];
  
  const bestPromotion = applicablePromotions.reduce((best, current) => 
    current.discountPercent > (best?.discountPercent || 0) ? current : best, 
    null as Promotion | null
  );
  
  const adjustedPrice = basePrice + zoneAdjustment + serviceFee;
  const promotionDiscount = bestPromotion ? (adjustedPrice * bestPromotion.discountPercent / 100) : 0;
  const finalPrice = Math.max(adjustedPrice - promotionDiscount, basePrice * 0.5); // Minimum 50% of base price

  return {
    basePrice,
    adjustedPrice: finalPrice,
    zoneMultiplier: zone.priceMultiplier,
    zoneName: zone.name,
    applicablePromotions,
    breakdown: {
      baseService: basePrice,
      zoneAdjustment,
      promotionDiscount,
      additionalFees: serviceFee,
      total: finalPrice
    }
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const request: PricingRequest = await req.json();
    
    console.log('Pricing request received:', {
      postalCode: request.postalCode,
      serviceType: request.serviceType,
      houseSize: request.houseSize
    });

    const result = calculatePrice(request);
    
    console.log('Pricing calculated:', {
      basePrice: result.basePrice,
      finalPrice: result.adjustedPrice,
      zone: result.zoneName
    });

    return new Response(JSON.stringify(result), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  } catch (error) {
    console.error('Pricing calculation error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        fallbackPrice: 300 // Provide fallback pricing
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
});
