
import React from 'react';
import { Home, Building } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { trackFormFieldInteraction } from '@/utils/analytics';
import { PROPERTY_SIZES } from '../data/constants';

interface StepSizeInputProps {
  size: string;
  setSize: (size: string) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
}

const StepSizeInput: React.FC<StepSizeInputProps> = ({
  size,
  setSize,
  onNextStep,
  onPrevStep
}) => {
  // Helper function to get the appropriate icon
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'home-sm':
        return <Home className="h-4 w-4" />;
      case 'home-md':
        return <Home className="h-5 w-5" />;
      case 'home-lg':
        return <Home className="h-6 w-6" />;
      case 'building':
        return <Building className="h-6 w-6" />;
      default:
        return <Home className="h-5 w-5" />;
    }
  };
  
  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Step 2: What Size Is Your Home?</h3>
      <p className="mb-6 text-gray-600">
        Prices are starting estimates. For homes over 3500 sq. ft., we'll provide an on-site quote.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PROPERTY_SIZES.map(sz => (
          <Card 
            key={sz.id} 
            className={`p-4 cursor-pointer flex items-center justify-between hover:border-blue-500 transition-all ${size === sz.id ? 'border-2 border-blue-500 bg-blue-50' : ''}`} 
            onClick={() => {
              setSize(sz.id);
              trackFormFieldInteraction('PriceCalculator', `Property Size: ${sz.label}`, 'change');
            }}
          >
            <div className="flex items-center gap-3">
              <div className={`text-blue-600 ${size === sz.id ? 'scale-110' : ''}`}>
                {getIcon(sz.icon)}
              </div>
              <span className="font-semibold">{sz.label}</span>
            </div>
            {size === sz.id && <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
              </svg>}
          </Card>
        ))}
      </div>
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onPrevStep}>
          Back
        </Button>
        <Button onClick={onNextStep} disabled={!size}>
          Next
        </Button>
      </div>
      <div className="mt-2 text-xs text-gray-500">
        <strong>"Starting at" Pricing:</strong> The prices shown are starting at rates based on typical home sizes. Once you provide your address, we will calculate a more accurate quote for you. For larger or complex jobs, we may visit in person.
      </div>
    </div>
  );
};

export default StepSizeInput;
