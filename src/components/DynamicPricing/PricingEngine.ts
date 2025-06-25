
export interface PricingZone {
  id: string;
  name: string;
  postalCodePrefixes: string[];
  priceMultiplier: number; // 1.0 = base price, 1.1 = 10% premium, 0.9 = 10% discount
  serviceFees: {
    [key: string]: number; // Additional fees by service type
  };
  activePromotions?: Promotion[];
}

export interface Promotion {
  id: string;
  name: string;
  discountPercent: number;
  validUntil: string;
  applicableServices: string[];
  minOrderValue?: number;
}

export interface PricingRequest {
  postalCode: string;
  serviceType: string;
  houseSize: string;
  squareFootage?: number;
  additionalServices?: string[];
}

export interface PricingResponse {
  basePrice: number;
  adjustedPrice: number;
  zoneMultiplier: number;
  zoneName: string;
  applicablePromotions: Promotion[];
  breakdown: {
    baseService: number;
    zoneAdjustment: number;
    promotionDiscount: number;
    additionalFees: number;
    total: number;
  };
}

// Pricing zones based on your city data
export const PRICING_ZONES: PricingZone[] = [
  {
    id: 'vancouver-premium',
    name: 'Vancouver Premium',
    postalCodePrefixes: ['V5', 'V6'],
    priceMultiplier: 1.15,
    serviceFees: {
      'House Washing': 25,
      'Window Cleaning': 15
    }
  },
  {
    id: 'surrey-standard',
    name: 'Surrey',
    postalCodePrefixes: ['V3R', 'V3S', 'V3T', 'V3V', 'V3W', 'V3X', 'V4A', 'V4N', 'V4P'],
    priceMultiplier: 1.0,
    serviceFees: {}
  },
  {
    id: 'white-rock-premium',
    name: 'White Rock',
    postalCodePrefixes: ['V4B'],
    priceMultiplier: 1.1,
    serviceFees: {
      'Window Cleaning': 20
    }
  },
  {
    id: 'richmond-standard',
    name: 'Richmond',
    postalCodePrefixes: ['V6V', 'V6W', 'V6X', 'V6Y', 'V7A', 'V7B', 'V7C', 'V7E'],
    priceMultiplier: 1.05,
    serviceFees: {}
  },
  {
    id: 'burnaby-standard',
    name: 'Burnaby',
    postalCodePrefixes: ['V5A', 'V5B', 'V5C', 'V5E', 'V5G', 'V5H', 'V5J'],
    priceMultiplier: 1.0,
    serviceFees: {}
  }
];

// Base pricing matrix
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

export class PricingEngine {
  static findZoneByPostalCode(postalCode: string): PricingZone | null {
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

  static calculatePrice(request: PricingRequest): PricingResponse {
    const zone = this.findZoneByPostalCode(request.postalCode);
    const basePrice = BASE_PRICING[request.houseSize as keyof typeof BASE_PRICING]?.[request.serviceType] || 0;
    
    if (!zone || !basePrice) {
      throw new Error('Invalid pricing request');
    }

    // Apply zone multiplier
    const zoneAdjustment = basePrice * (zone.priceMultiplier - 1);
    const serviceFee = zone.serviceFees[request.serviceType] || 0;
    
    // Calculate promotions
    const applicablePromotions = zone.activePromotions?.filter(promo => 
      promo.applicableServices.includes(request.serviceType) &&
      new Date(promo.validUntil) > new Date()
    ) || [];
    
    const bestPromotion = applicablePromotions.reduce((best, current) => 
      current.discountPercent > (best?.discountPercent || 0) ? current : best, 
      null as Promotion | null
    );
    
    const adjustedPrice = basePrice + zoneAdjustment + serviceFee;
    const promotionDiscount = bestPromotion ? (adjustedPrice * bestPromotion.discountPercent / 100) : 0;
    const finalPrice = adjustedPrice - promotionDiscount;

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

  static getActivePromotions(postalCode: string): Promotion[] {
    const zone = this.findZoneByPostalCode(postalCode);
    return zone?.activePromotions?.filter(promo => 
      new Date(promo.validUntil) > new Date()
    ) || [];
  }
}
