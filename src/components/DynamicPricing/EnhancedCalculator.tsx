import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Calculator, Percent, Phone } from 'lucide-react';
import { PricingEngine, PricingRequest, PricingResponse } from './PricingEngine';
import { getCityBySlug, CityData } from '@/data/cities';

interface EnhancedCalculatorProps {
  defaultCity?: string;
  onQuoteGenerated?: (quote: PricingResponse) => void;
}

export const EnhancedCalculator: React.FC<EnhancedCalculatorProps> = ({
  defaultCity,
  onQuoteGenerated
}) => {
  const [formData, setFormData] = useState({
    postalCode: '',
    serviceType: '',
    houseSize: '',
    name: '',
    phone: '',
    email: ''
  });
  
  const [quote, setQuote] = useState<PricingResponse | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [detectedZone, setDetectedZone] = useState<string>('');

  // Auto-populate postal code if city is detected
  useEffect(() => {
    if (defaultCity) {
      const cityData = getCityBySlug(defaultCity) as CityData;
      if (cityData && cityData.postalCodePrefix) {
        const firstPostalCode = cityData.postalCodePrefix.split(',')[0].trim();
        setFormData(prev => ({ ...prev, postalCode: firstPostalCode }));
      }
    }
  }, [defaultCity]);

  // Update detected zone when postal code changes
  useEffect(() => {
    if (formData.postalCode.length >= 3) {
      const zone = PricingEngine.findZoneByPostalCode(formData.postalCode);
      setDetectedZone(zone ? zone.name : 'Standard Pricing Zone');
    }
  }, [formData.postalCode]);

  const handleCalculate = () => {
    if (!formData.postalCode || !formData.serviceType || !formData.houseSize) {
      return;
    }

    setIsCalculating(true);
    
    try {
      const request: PricingRequest = {
        postalCode: formData.postalCode,
        serviceType: formData.serviceType,
        houseSize: formData.houseSize
      };
      
      const result = PricingEngine.calculatePrice(request);
      setQuote(result);
      onQuoteGenerated?.(result);
      
      // Track analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'quote_calculated', {
          service_type: formData.serviceType,
          house_size: formData.houseSize,
          zone: result.zoneName,
          quote_amount: result.adjustedPrice
        });
      }
    } catch (error) {
      console.error('Pricing calculation error:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center text-3xl font-bold text-gray-900">
            <Calculator className="mr-3" />
            Dynamic Pricing Calculator
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Get location-specific pricing tailored to your area
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Location Detection */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <MapPin className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="font-semibold text-blue-900">Service Location</h3>
            </div>
            <Input
              placeholder="Enter your postal code (e.g., V4B 1C9)"
              value={formData.postalCode}
              onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
              className="mb-2"
            />
            {detectedZone && (
              <p className="text-sm text-blue-700">
                📍 Detected pricing zone: <strong>{detectedZone}</strong>
              </p>
            )}
          </div>

          {/* Service Selection */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Service Type</label>
              <Select
                value={formData.serviceType}
                onValueChange={(value) => setFormData({...formData, serviceType: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Window Cleaning">Window Cleaning</SelectItem>
                  <SelectItem value="House Washing">House Washing</SelectItem>
                  <SelectItem value="Driveway Washing">Driveway Washing</SelectItem>
                  <SelectItem value="Deck Washing">Deck Washing</SelectItem>
                  <SelectItem value="Gutter Cleaning">Gutter Cleaning</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Property Size</label>
              <Select
                value={formData.houseSize}
                onValueChange={(value) => setFormData({...formData, houseSize: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (Under 1,500 sq ft)</SelectItem>
                  <SelectItem value="medium">Medium (1,500-2,500 sq ft)</SelectItem>
                  <SelectItem value="large">Large (2,500-4,000 sq ft)</SelectItem>
                  <SelectItem value="xlarge">Extra Large (4,000+ sq ft)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Calculate Button */}
          <Button 
            onClick={handleCalculate}
            disabled={!formData.postalCode || !formData.serviceType || !formData.houseSize || isCalculating}
            className="w-full bg-bc-red hover:bg-red-700 text-white py-3 text-lg font-semibold"
          >
            {isCalculating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Calculating...
              </>
            ) : (
              'Calculate My Quote'
            )}
          </Button>

          {/* Quote Results */}
          {quote && (
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Your Custom Quote
                  </h3>
                  <div className="text-4xl font-bold text-bc-red">
                    {formatCurrency(quote.adjustedPrice)}
                  </div>
                  <p className="text-gray-600">
                    for {formData.serviceType} in {quote.zoneName}
                  </p>
                </div>

                {/* Pricing Breakdown */}
                <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                  <h4 className="font-semibold mb-3">Pricing Breakdown</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Base Service Price:</span>
                      <span>{formatCurrency(quote.breakdown.baseService)}</span>
                    </div>
                    {quote.breakdown.zoneAdjustment !== 0 && (
                      <div className="flex justify-between">
                        <span>Location Adjustment ({quote.zoneName}):</span>
                        <span className={quote.breakdown.zoneAdjustment > 0 ? 'text-red-600' : 'text-green-600'}>
                          {quote.breakdown.zoneAdjustment > 0 ? '+' : ''}{formatCurrency(quote.breakdown.zoneAdjustment)}
                        </span>
                      </div>
                    )}
                    {quote.breakdown.additionalFees > 0 && (
                      <div className="flex justify-between">
                        <span>Service Fees:</span>
                        <span>{formatCurrency(quote.breakdown.additionalFees)}</span>
                      </div>
                    )}
                    {quote.breakdown.promotionDiscount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span className="flex items-center">
                          <Percent className="w-4 h-4 mr-1" />
                          Promotional Discount:
                        </span>
                        <span>-{formatCurrency(quote.breakdown.promotionDiscount)}</span>
                      </div>
                    )}
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Total:</span>
                      <span>{formatCurrency(quote.breakdown.total)}</span>
                    </div>
                  </div>
                </div>

                {/* Active Promotions */}
                {quote.applicablePromotions.length > 0 && (
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-6">
                    <h4 className="font-semibold text-yellow-800 mb-2">🎉 Active Promotions</h4>
                    {quote.applicablePromotions.map((promo, index) => (
                      <div key={index} className="text-sm text-yellow-700">
                        <strong>{promo.name}</strong> - {promo.discountPercent}% off
                      </div>
                    ))}
                  </div>
                )}

                {/* Contact Form */}
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <Input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  <Input
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <Input
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="mb-4"
                />

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="flex-1 bg-bc-red hover:bg-red-700">
                    Book This Service
                  </Button>
                  <Button variant="outline" className="flex-1" asChild>
                    <a href="tel:778-808-7620" className="flex items-center justify-center">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
