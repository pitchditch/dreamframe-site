
import React from 'react';
import { trackFormFieldInteraction } from '@/utils/analytics';
import { Button } from '@/components/ui/button';

interface StepServicesInputProps {
  size: string;
  services: string[];
  setServices: (services: string[]) => void;
  addOns: string[];
  setAddOns: (addOns: string[]) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
}

// Placeholder service options
const SERVICE_OPTIONS = [
  { id: 'window-cleaning', label: 'Window Cleaning', basePrice: 175 },
  { id: 'gutter-cleaning', label: 'Gutter Cleaning', basePrice: 150 },
  { id: 'pressure-washing', label: 'Pressure Washing', basePrice: 200 },
  { id: 'roof-cleaning', label: 'Roof Cleaning', basePrice: 350 }
];

// Placeholder add-on options
const ADDON_OPTIONS = [
  { id: 'screen-cleaning', label: 'Screen Cleaning', price: 50 },
  { id: 'track-cleaning', label: 'Track Cleaning', price: 40 },
  { id: 'gutter-guards', label: 'Gutter Guards', price: 75 },
  { id: 'moss-treatment', label: 'Moss Treatment', price: 125 }
];

const StepServicesInput: React.FC<StepServicesInputProps> = ({
  size,
  services,
  setServices,
  addOns,
  setAddOns,
  onNextStep,
  onPrevStep
}) => {
  const handleServiceToggle = (serviceId: string) => {
    setServices(
      services.includes(serviceId)
        ? services.filter(id => id !== serviceId)
        : [...services, serviceId]
    );
    trackFormFieldInteraction('PriceCalculator', `Service: ${serviceId}`, 'click');
  };

  const handleAddonToggle = (addonId: string) => {
    setAddOns(
      addOns.includes(addonId)
        ? addOns.filter(id => id !== addonId)
        : [...addOns, addonId]
    );
    trackFormFieldInteraction('PriceCalculator', `Add-on: ${addonId}`, 'click');
  };

  const getSizeMultiplier = () => {
    switch (size) {
      case 'small': return '0.8x';
      case 'medium': return '1x';
      case 'large': return '1.3x';
      case 'extra-large': return '1.6x';
      default: return '1x';
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Step 3: Select Your Services</h3>
      <p className="mb-6 text-gray-600">
        Choose the services you're interested in. Your home size multiplier: {getSizeMultiplier()}
      </p>
      
      <div className="mb-6">
        <h4 className="font-medium mb-3">Primary Services</h4>
        <div className="space-y-3">
          {SERVICE_OPTIONS.map(service => (
            <div key={service.id} className="flex items-center">
              <input
                type="checkbox"
                id={service.id}
                checked={services.includes(service.id)}
                onChange={() => handleServiceToggle(service.id)}
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor={service.id} className="ml-2 block text-sm">
                <span className="font-medium">{service.label}</span>
                <span className="text-gray-500 ml-2">from ${service.basePrice}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="font-medium mb-3">Add-On Services</h4>
        <div className="space-y-3">
          {ADDON_OPTIONS.map(addon => (
            <div key={addon.id} className="flex items-center">
              <input
                type="checkbox"
                id={addon.id}
                checked={addOns.includes(addon.id)}
                onChange={() => handleAddonToggle(addon.id)}
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor={addon.id} className="ml-2 block text-sm">
                <span className="font-medium">{addon.label}</span>
                <span className="text-gray-500 ml-2">+${addon.price}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
      
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
