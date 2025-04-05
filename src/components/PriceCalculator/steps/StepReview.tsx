
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { services } from './services/serviceData';
import { Card, CardContent } from '@/components/ui/card';
import { Check, X, Percent } from 'lucide-react';

interface StepReviewProps {
  form: UseFormReturn<any>;
  onBack: () => void;
  selectedPackage?: any;
  isSpringSale?: boolean;
}

const StepReview = ({ form, onBack, selectedPackage, isSpringSale = false }: StepReviewProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formValues = form.getValues();
  
  // Find the selected services
  const selectedServices = formValues.services.map((serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    return {
      name: service?.title || serviceId,
      id: serviceId
    };
  });
  
  // Calculate base price based on selected services and property size
  const basePrice = selectedServices.reduce((total, service) => {
    const serviceData = services.find(s => s.id === service.id);
    if (serviceData && serviceData.pricing) {
      // Find appropriate price based on property size
      let price = 0;
      if (formValues.size === 'small') {
        price = serviceData.pricing.small || 0;
      } else if (formValues.size === 'medium') {
        price = serviceData.pricing.medium || 0;
      } else if (formValues.size === 'large') {
        price = serviceData.pricing.large || 0;
      }
      return total + price;
    }
    return total;
  }, 0);
  
  // Apply package discount if applicable
  let discount = 0;
  let finalPrice = basePrice;
  
  if (selectedPackage && selectedPackage.discountApplied) {
    discount = (basePrice * (selectedPackage.discountPercent || 10)) / 100;
    finalPrice = basePrice - discount;
  }
  
  // Apply Spring Sale discount if applicable
  if (isSpringSale) {
    discount = (basePrice * 20) / 100; // 20% discount
    finalPrice = basePrice - discount;
  }
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await form.handleSubmit((data) => {
        console.log('Form submitted with data:', data);
        // Submission is handled by the parent component
      })();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Review Your Selection</h2>
        <p className="text-gray-600 mb-6">Please review your selections before submitting your request</p>
      </div>
      
      {isSpringSale && (
        <Card className="border-yellow-300 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-yellow-800">
              <Percent className="h-5 w-5" />
              <h3 className="font-bold">Spring Sale: 20% Off</h3>
            </div>
            <p className="text-sm text-yellow-700 mt-2">
              Your 20% Spring Sale discount will be applied to your final quote.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="font-semibold text-lg mb-4">Service Summary</h3>
        
        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Property Type:</span>
            <span className="font-medium">{formValues.propertyType === 'residential' ? 'Residential' : 'Commercial'}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Property Size:</span>
            <span className="font-medium">
              {formValues.size === 'small' ? 'Small (0-1800 sqft)' : 
               formValues.size === 'medium' ? 'Medium (1800-2800 sqft)' : 
               'Large (2800-3500 sqft)'}
            </span>
          </div>
          
          <Separator />
          
          <div>
            <p className="text-gray-600 mb-2">Services Selected:</p>
            <ul className="space-y-2">
              {selectedServices.map((service, idx) => (
                <li key={idx} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{service.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="space-y-3 border-t pt-4">
          <div className="flex justify-between text-lg">
            <span>Base Price:</span>
            <span>${basePrice.toFixed(2)}</span>
          </div>
          
          {(isSpringSale || (selectedPackage && selectedPackage.discountApplied)) && (
            <div className="flex justify-between text-green-600">
              <span>
                {isSpringSale ? 'Spring Sale Discount (20%):' : 
                 `Package Discount (${selectedPackage.discountPercent || 10}%):`}
              </span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
          
          <div className="flex justify-between font-bold text-xl border-t pt-3">
            <span>Estimated Total:</span>
            <span>${finalPrice.toFixed(2)}</span>
          </div>
          
          <p className="text-xs text-gray-500 mt-2">
            * Final price may vary based on an on-site assessment or additional services requested.
          </p>
        </div>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Name:</span>
            <span className="font-medium">{formValues.fullName}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Email:</span>
            <span className="font-medium">{formValues.email}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Phone:</span>
            <span className="font-medium">{formValues.phone}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Preferred Date:</span>
            <span className="font-medium">{formValues.date ? new Date(formValues.date).toLocaleDateString() : 'Not specified'}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Address:</span>
            <span className="font-medium">{formValues.address}</span>
          </div>
          
          {formValues.notes && (
            <div>
              <span className="text-gray-600 block mb-1">Additional Notes:</span>
              <p className="bg-white p-3 rounded border text-sm">{formValues.notes}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex flex-col-reverse sm:flex-row gap-3 justify-between">
        <Button 
          type="button" 
          onClick={onBack} 
          variant="outline"
          disabled={isSubmitting}
        >
          Back
        </Button>
        
        <Button 
          type="submit" 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-blue-500 hover:bg-blue-600"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </Button>
      </div>
    </div>
  );
};

export default StepReview;
