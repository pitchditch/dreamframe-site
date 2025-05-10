
import React from 'react';
import { Button } from '@/components/ui/button';
import { ContactData } from '../hooks/usePriceCalculatorForm';
import { formatAddOns } from '../utils/calculatorUtils';
import { Loader } from 'lucide-react';

interface StepSummaryProps {
  address: any;
  size: any;
  services: string[];
  addOns: string[];
  contact: ContactData;
  onPrevStep: () => void;
  onSubmit: () => void;
  submitting: boolean;
  estimateTotal: number | null;
}

const StepSummary: React.FC<StepSummaryProps> = ({
  address,
  size,
  services,
  addOns,
  contact,
  onPrevStep,
  onSubmit,
  submitting,
  estimateTotal
}) => {
  const formattedAddOns = formatAddOns ? formatAddOns(addOns) : addOns.join(', ') || 'None';
  
  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Step 5: Review & Submit</h3>
      <p className="mb-4 text-gray-600">Please review your information before submitting.</p>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h4 className="font-bold text-lg border-b pb-2 mb-3">Contact Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <span className="font-medium">Name:</span> <span className="text-gray-700">{contact.name || 'Not provided'}</span>
          </div>
          <div>
            <span className="font-medium">Phone:</span> <span className="text-gray-700">{contact.phone || 'Not provided'}</span>
          </div>
          <div>
            <span className="font-medium">Email:</span> <span className="text-gray-700">{contact.email || 'Not provided'}</span>
          </div>
          <div>
            <span className="font-medium">Referral:</span> <span className="text-gray-700">{contact.notes || 'None'}</span>
          </div>
        </div>
        
        <h4 className="font-bold text-lg border-b pb-2 mb-3 mt-4">Service Details</h4>
        <div className="space-y-2">
          <div>
            <span className="font-medium">Address:</span> <span className="text-gray-700">{typeof address === 'string' ? address : (address?.street ? `${address.street}, ${address.city}, ${address.postalCode}` : 'Not provided')}</span>
          </div>
          <div>
            <span className="font-medium">Property Size:</span> <span className="text-gray-700">{typeof size === 'string' ? size : (size?.houseSize ? size.houseSize : 'Not selected')}</span>
          </div>
          <div>
            <span className="font-medium">Services:</span> <span className="text-gray-700">{services.join(', ') || 'None selected'}</span>
          </div>
          <div>
            <span className="font-medium">Add-ons:</span> <span className="text-gray-700">{formattedAddOns}</span>
          </div>
          <div>
            <span className="font-medium">Notes:</span> <span className="text-gray-700">{contact.notes || 'None'}</span>
          </div>
        </div>
        
        {estimateTotal !== null && (
          <div className="mt-4 p-3 bg-white rounded-md border">
            <h4 className="font-bold text-lg mb-1">Estimate Total</h4>
            <p className="text-2xl font-bold text-bc-red">${estimateTotal.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">*Final price may vary based on property assessment</p>
          </div>
        )}
      </div>
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onPrevStep} disabled={submitting}>
          Back
        </Button>
        <Button 
          onClick={onSubmit} 
          disabled={submitting || !contact.name || !contact.phone}
          className={!submitting ? "bg-bc-red hover:bg-red-700 text-white" : "bg-bc-red/70 text-white cursor-not-allowed"}
        >
          {submitting ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Quote Request'
          )}
        </Button>
      </div>
    </div>
  );
};

export default StepSummary;
