
import React from 'react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '../utils/pricingUtils';
import { CheckCircle } from 'lucide-react';

interface StepThankYouProps {
  estimateTotal: number | null;
  onStartNew: () => void;
}

const StepThankYou: React.FC<StepThankYouProps> = ({ estimateTotal, onStartNew }) => {
  return (
    <div className="text-center py-6">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
        <CheckCircle className="h-10 w-10 text-green-600" />
      </div>
      
      <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
      <p className="text-gray-700 mb-6">
        We've received your quote request and will be in touch shortly.
      </p>
      
      {estimateTotal !== null && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6 inline-block">
          <div className="text-gray-600">Estimated Quote Total</div>
          <div className="text-2xl font-bold text-bc-red">{formatCurrency(estimateTotal)}</div>
        </div>
      )}
      
      <p className="text-gray-600 mb-6">
        One of our team members will contact you soon to discuss your service needs in detail and confirm pricing.
      </p>
      
      <div className="space-y-3">
        <Button onClick={onStartNew} className="w-full">
          Get Another Quote
        </Button>
        
        <a 
          href="tel:7788087620" 
          className="block w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
        >
          Call Us Now: 778-808-7620
        </a>
      </div>
    </div>
  );
};

export default StepThankYou;
