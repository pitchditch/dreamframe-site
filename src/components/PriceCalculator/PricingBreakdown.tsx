
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Shield, Star, Clock } from 'lucide-react';

interface PricingBreakdownProps {
  basePrice: number;
  adjustments: Array<{
    factor: string;
    multiplier: number;
    description: string;
  }>;
  addOns: Array<{
    name: string;
    price: number;
  }>;
  total: number;
}

const PricingBreakdown: React.FC<PricingBreakdownProps> = ({
  basePrice,
  adjustments,
  addOns,
  total
}) => {
  return (
    <Card className="sticky top-4">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-green-600" />
          Pricing Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Base Price */}
        <div className="flex justify-between items-center py-2 border-b">
          <span className="text-sm">Base Service</span>
          <span className="font-medium">${basePrice}</span>
        </div>

        {/* Adjustments */}
        {adjustments.map((adjustment, index) => (
          <div key={index} className="flex justify-between items-center py-1">
            <div className="flex-1">
              <span className="text-sm">{adjustment.factor}</span>
              <p className="text-xs text-gray-500">{adjustment.description}</p>
            </div>
            <Badge variant={adjustment.multiplier > 1 ? "destructive" : "secondary"} className="text-xs">
              {adjustment.multiplier > 1 ? '+' : ''}{((adjustment.multiplier - 1) * 100).toFixed(0)}%
            </Badge>
          </div>
        ))}

        {/* Add-ons */}
        {addOns.length > 0 && (
          <>
            <div className="border-t pt-3">
              <span className="text-sm font-medium">Additional Services:</span>
            </div>
            {addOns.map((addOn, index) => (
              <div key={index} className="flex justify-between items-center py-1">
                <span className="text-sm">{addOn.name}</span>
                <span className="font-medium">+${addOn.price}</span>
              </div>
            ))}
          </>
        )}

        {/* Total */}
        <div className="border-t pt-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total Estimate</span>
            <span className="text-2xl font-bold text-green-600">${total}</span>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="bg-gray-50 p-3 rounded-lg space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Shield className="w-4 h-4 text-blue-600" />
            <span>Licensed & Insured</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>5-Star Google Rated</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-green-600" />
            <span>Same-Day Service Available</span>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center">
          Final price confirmed by Jayden after on-site assessment
        </p>
      </CardContent>
    </Card>
  );
};

export default PricingBreakdown;
