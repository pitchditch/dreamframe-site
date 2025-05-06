
import React from 'react';
import { Droplets, Home, CloudRain, Car, Building, Warehouse } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { trackFormFieldInteraction } from '@/utils/analytics';
import { SERVICE_CATEGORIES, ADD_ONS } from '../data/constants';
import { isServiceDisabled, formatCurrency, getPricing } from '../utils/pricingUtils';

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
  // Service icons mapping
  const SERVICE_ICONS = {
    'Window Cleaning (Outside)': <Droplets className="h-5 w-5" />,
    'Window Cleaning (Inside)': <Droplets className="h-5 w-5" />,
    'Both Window Sides': <Droplets className="h-5 w-5" />,
    'House Washing': <Home className="h-5 w-5" />,
    'House Wash + Windows': <Home className="h-5 w-5" />,
    'Driveway Washing': <Car className="h-5 w-5" />,
    'Driveway + House Washing': <Home className="h-5 w-5" />,
    'Deck Washing': <CloudRain className="h-5 w-5" />,
    'Gutter Cleaning (Inside)': <Home className="h-5 w-5" />,
    'Gutter Cleaning (Outside)': <Home className="h-5 w-5" />,
    'Gutter Cleaning (Both)': <Home className="h-5 w-5" />,
    'Roof Cleaning': <CloudRain className="h-5 w-5" />
  };

  // Function to handle service selection changes
  function handleServiceChange(service: string) {
    if (isServiceDisabled(service, services, size)) return;
    
    // Uncheck mutually exclusive services
    const updated = services.includes(service) 
      ? services.filter(s => s !== service) 
      : [...services.filter(s => {
          if (service === 'Both Window Sides' && (s === 'Window Cleaning (Outside)' || s === 'Window Cleaning (Inside)')) return false;
          if ((service === 'Window Cleaning (Outside)' || service === 'Window Cleaning (Inside)') && s === 'Both Window Sides') return false;
          if (service === 'House Wash + Windows' && (s === 'House Washing' || s === 'Both Window Sides')) return false;
          if ((service === 'House Washing' || s === 'Both Window Sides') && s === 'House Wash + Windows') return false;
          if (service === 'Driveway + House Washing' && (s === 'Driveway Washing' || s === 'House Washing')) return false;
          if ((service === 'Driveway Washing' || s === 'House Washing') && s === 'Driveway + House Washing') return false;
          if (service === 'Gutter Cleaning (Both)' && (s === 'Gutter Cleaning (Inside)' || s === 'Gutter Cleaning (Outside)')) return false;
          if ((service === 'Gutter Cleaning (Inside)' || s === 'Gutter Cleaning (Outside)') && s === 'Gutter Cleaning (Both)') return false;
          return true;
        }), service];
    
    setServices(updated);
    
    // Track service selection
    trackFormFieldInteraction('PriceCalculator', `Service: ${service}`, 'change');
  }
  
  // Function to handle add-on selection changes
  function handleAddOnChange(addonId: string) {
    setAddOns(prev => prev.includes(addonId) ? prev.filter(id => id !== addonId) : [...prev, addonId]);
    
    // Track addon selection
    const addon = ADD_ONS.find(a => a.id === addonId);
    if (addon) {
      trackFormFieldInteraction('PriceCalculator', `Add-on: ${addon.name}`, 'change');
    }
  }
  
  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Step 3: Choose Your Services</h3>
      <p className="mb-4 text-gray-600">
        Choose all that apply. Prices update based on your home size.
      </p>
      
      {/* Service Categories Accordion */}
      <Accordion type="single" collapsible className="w-full mb-4">
        {SERVICE_CATEGORIES.map((category, idx) => (
          <AccordionItem key={idx} value={`item-${idx}`}>
            <AccordionTrigger className="text-lg font-medium py-3">
              {category.name}
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 gap-2 pt-2">
                {category.services.map(service => (
                  <label 
                    key={service} 
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all select-none 
                    ${isServiceDisabled(service, services, size) ? 
                      'opacity-40 bg-gray-100 pointer-events-none' : 
                      services.includes(service) ? 
                        'border-blue-500 bg-blue-50' : 
                        'hover:border-blue-300'}`}
                  >
                    <input 
                      type="checkbox" 
                      checked={services.includes(service)} 
                      disabled={isServiceDisabled(service, services, size)} 
                      className="form-checkbox accent-blue-600" 
                      onChange={() => handleServiceChange(service)} 
                      style={{
                        width: 20,
                        height: 20
                      }} 
                    />
                    <div className="flex items-center gap-2">
                      {SERVICE_ICONS[service as keyof typeof SERVICE_ICONS]}
                      <span className="font-medium">{service}</span>
                    </div>
                    <span className="ml-auto font-semibold text-blue-700 text-sm">
                      {service === 'Roof Cleaning' || size === 'xlarge' ? 
                        'On-site quote required' : 
                        `Starting at ${formatCurrency(getPricing(size, service))}`}
                    </span>
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}

        {/* Add-ons Section */}
        <AccordionItem value="add-ons">
          <AccordionTrigger className="text-lg font-medium py-3">
            Request Add-ons
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 gap-2 pt-2">
              {ADD_ONS.map(addon => (
                <label 
                  key={addon.id} 
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all select-none
                  ${addOns.includes(addon.id) ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-300'}`}
                >
                  <input 
                    type="checkbox" 
                    checked={addOns.includes(addon.id)} 
                    className="form-checkbox accent-blue-600" 
                    onChange={() => handleAddOnChange(addon.id)} 
                    style={{
                      width: 20,
                      height: 20
                    }} 
                  />
                  <span className="font-medium">{addon.name}</span>
                  <span className="ml-auto font-semibold text-blue-700 text-sm">
                    Starting at ${addon.price.toFixed(2)}
                  </span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onPrevStep}>
          Back
        </Button>
        <Button onClick={onNextStep} disabled={services.length === 0}>
          Next
        </Button>
      </div>
      <div className="mt-3 text-xs text-gray-500">
        <p>
          <strong>How We Create Your Custom Quote:</strong>
        </p>
        <ul className="list-disc list-inside pl-2">
          <li>
            <strong>Google Maps Estimate:</strong> For standard homes, we'll generate your estimate using Google Maps and your provided address.
          </li>
          <li>
            <strong>On-Site Estimate:</strong> For roof cleaning or homes over 3500 sq. ft., we'll provide an on-site quote for best accuracy.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StepServicesInput;
