
export interface PricingRequest {
  postalCode: string;
  serviceType: string;
  houseSize: string;
  squareFootage?: number;
}

export interface PricingResult {
  adjustedPrice: number;
  zoneName: string;
  breakdown: {
    baseService: number;
    zoneAdjustment: number;
    additionalFees: number;
    promotionDiscount: number;
    total: number;
  };
}

export class PricingEngine {
  private static baseServicePrices = {
    'Window Cleaning': 150,
    'House Washing': 300,
    'Driveway Washing': 200,
    'Deck Washing': 180,
    'Gutter Cleaning': 250
  };

  private static houseSizeMultipliers = {
    'small': 0.8,
    'medium': 1.0,
    'large': 1.3,
    'xlarge': 1.6
  };

  private static zones = {
    'V4B': { name: 'White Rock', multiplier: 1.0 },
    'V3R': { name: 'Surrey Central', multiplier: 1.1 },
    'V3T': { name: 'Surrey', multiplier: 1.05 },
    'V3S': { name: 'Surrey South', multiplier: 1.0 },
    'V6B': { name: 'Vancouver', multiplier: 1.2 },
    'default': { name: 'Metro Vancouver', multiplier: 1.15 }
  };

  static calculatePrice(request: PricingRequest): PricingResult {
    const basePrice = this.baseServicePrices[request.serviceType as keyof typeof this.baseServicePrices] || 200;
    const sizeMultiplier = this.houseSizeMultipliers[request.houseSize as keyof typeof this.houseSizeMultipliers] || 1.0;
    const postalPrefix = request.postalCode.substring(0, 3);
    const zone = this.zones[postalPrefix as keyof typeof this.zones] || this.zones.default;
    
    const baseService = basePrice * sizeMultiplier;
    const zoneAdjustment = baseService * (zone.multiplier - 1);
    const additionalFees = 0;
    const promotionDiscount = 0;
    const total = baseService + zoneAdjustment + additionalFees - promotionDiscount;

    return {
      adjustedPrice: Math.round(total),
      zoneName: zone.name,
      breakdown: {
        baseService: Math.round(baseService),
        zoneAdjustment: Math.round(zoneAdjustment),
        additionalFees,
        promotionDiscount,
        total: Math.round(total)
      }
    };
  }
}
