
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { trackFormFieldInteraction } from '@/utils/analytics';
import { PROPERTY_SIZES } from '../data/constants';

interface ServiceOption {
  id: string;
  label: string;
  description?: string;
}

interface AddOn {
  id: string;
  name: string;
  price: number;
}

interface StepServicesInputProps {
  size: string;
  services: string[];
  setServices: (services: string[]) => void;
  addOns: string[];
  setAddOns: (addOns: string[]) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
}

const StepServicesInput: React.FC<StepServicesInputProps> = ({
  size,
  services,
  setServices,
  addOns,
  setAddOns,
  onNextStep,
  onPrevStep
}) => {
  // Service options based on property size
  const serviceOptions: ServiceOption[] = [
    { id: 'Window Cleaning (Outside)', label: 'Window Cleaning (Outside)' },
    { id: 'Window Cleaning (Inside)', label: 'Window Cleaning (Inside)' },
    { id: 'Both Window Sides', label: 'Both Window Sides (Inside & Outside)' },
    { id: 'House Washing', label: 'House Washing' },
    { id: 'House Wash + Windows', label: 'House Wash + Window Cleaning' },
    { id: 'Driveway Washing', label: 'Driveway Washing' },
    { id: 'Driveway + House Washing', label: 'Driveway + House Washing' },
    { id: 'Deck Washing', label: 'Deck Washing' },
    { id: 'Gutter Cleaning (Inside)', label: 'Gutter Cleaning (Inside)' },
    { id: 'Gutter Cleaning (Outside)', label: 'Gutter Cleaning (Outside)' },
    { id: 'Gutter Cleaning (Both)', label: 'Gutter Cleaning (Both Inside & Outside)' },
    { id: 'Roof Cleaning', label: 'Roof Cleaning' },
  ];

  // Available add-ons
  const ADD_ONS: AddOn[] = [{
    id: 'moss-treatment',
    name: 'Moss Treatment',
    price: 149
  }, {
    id: 'gutter-guards',
    name: 'Gutter Guards Installation',
    price: 299
  }, {
    id: 'fascia-cleaning',
    name: 'Fascia Cleaning',
    price: 99
  }, {
    id: 'window-track',
    name: 'Window Track Cleaning',
    price: 49
  }, {
    id: 'screen-cleaning',
    name: 'Screen Cleaning',
    price: 39
  }];

  const toggleService = (serviceId: string) => {
    if (services.includes(serviceId)) {
      // Remove service
      setServices(services.filter(id => id !== serviceId));
    } else {
      // Add service
      setServices([...services, serviceId]);
    }
    // Changed from 'toggle' to 'click' to match the allowed interaction types
    trackFormFieldInteraction('PriceCalculator', `Service: ${serviceId}`, 'click');
  };

  const toggleAddOn = (addonId: string) => {
    if (addOns.includes(addonId)) {
      // Remove add-on
      setAddOns(addOns.filter(id => id !== addonId));
    } else {
      // Add add-on
      setAddOns([...addOns, addonId]);
    }
    // Changed from 'toggle' to 'click' to match the allowed interaction types
    trackFormFieldInteraction('PriceCalculator', `Add-on: ${addonId}`, 'click');
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Step 3: Select Services</h3>
      <p className="mb-4 text-gray-600">Choose the services you're interested in. Select all that apply.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {serviceOptions.map(option => (
          <Card 
            key={option.id} 
            className={`p-4 cursor-pointer flex items-center justify-between hover:border-blue-500 transition-all ${services.includes(option.id) ? 'border-2 border-blue-500 bg-blue-50' : ''}`}
            onClick={() => toggleService(option.id)}
          >
            <div>
              <span className="font-semibold">{option.label}</span>
              {option.description && <p className="text-xs text-gray-500">{option.description}</p>}
              {option.id === 'Roof Cleaning' && <p className="text-xs text-gray-500">On-site estimate required</p>}
            </div>
            {services.includes(option.id) && (
              <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
              </svg>
            )}
          </Card>
        ))}
      </div>

      {services.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold mb-3">Add-Ons & Upgrades</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ADD_ONS.map(addon => (
              <Card
                key={addon.id}
                className={`p-3 cursor-pointer flex items-center justify-between hover:border-green-500 transition-all ${addOns.includes(addon.id) ? 'border-2 border-green-500 bg-green-50' : ''}`}
                onClick={() => toggleAddOn(addon.id)}
              >
                <div>
                  <span className="font-medium">{addon.name}</span>
                  <p className="text-xs text-gray-700">${addon.price}</p>
                </div>
                {addOns.includes(addon.id) && (
                  <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onPrevStep}>
          Back
        </Button>
        <Button onClick={onNextStep} disabled={services.length === 0}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default StepServicesInput;
