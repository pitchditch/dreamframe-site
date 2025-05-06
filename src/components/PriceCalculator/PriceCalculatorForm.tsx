
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import PriceCalculatorIntro from './PriceCalculatorIntro';
import { trackFormSubmission, trackFormStep } from '@/utils/analytics';
import { PROMOS } from './data/constants';
import StepAddressInput from './steps/StepAddressInput';
import StepSizeInput from './steps/StepSizeInput';
import StepServicesInput from './steps/StepServicesInput';
import StepContactInput from './steps/StepContactInput';
import StepSummary from './steps/StepSummary';
import StepThankYou from './steps/StepThankYou';

interface PriceCalculatorFormProps {
  onComplete?: () => void;
  initialStep?: string;
}

const PriceCalculatorForm: React.FC<PriceCalculatorFormProps> = ({
  onComplete,
  initialStep
}) => {
  // Initialize step based on initialStep prop if provided
  const [step, setStep] = useState(initialStep === "address" ? 0 : 0);

  // Step data
  const [size, setSize] = useState<string>('');
  const [services, setServices] = useState<string[]>([]);
  const [addOns, setAddOns] = useState<string[]>([]);
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState({
    name: '',
    phone: '',
    email: '',
    referredBy: '',
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);

  // Use effect to pre-fill the postal code if available
  useEffect(() => {
    const savedPostalCode = sessionStorage.getItem('postalCode') || localStorage.getItem('postalCode');
    if (savedPostalCode) {
      // Pre-fill the postal code field
      setContact(prev => ({
        ...prev,
        phone: savedPostalCode
      }));
    }
  }, []);

  // Track form step changes
  useEffect(() => {
    trackFormStep('PriceCalculator', step + 1, 
      step === 0 ? 'Address' : 
      step === 1 ? 'Property Size' : 
      step === 2 ? 'Services Selection' : 
      step === 3 ? 'Contact Info' : 
      'Summary'
    );
  }, [step]);

  const handleFormSubmit = async () => {
    setSubmitting(true);
    
    // Calculate total estimate for tracking
    let estTotal = 0;
    if (size !== 'xlarge') {
      // Add service prices
      for (const s of services) {
        const price = getPricing(size, s);
        if (typeof price === 'number') estTotal += price;
      }
  
      // Add selected add-ons to the total
      addOns.forEach(addonId => {
        const addon = ADD_ONS.find(a => a.id === addonId);
        if (addon) {
          estTotal += addon.price;
        }
      });
      
      // Apply bundle discount if eligible
      const eligibleBundleDiscount = services.filter(s => s !== 'Roof Cleaning').length >= 3;
      if (eligibleBundleDiscount) {
        estTotal -= 200;
      }
    }
    
    // Track the form submission
    trackFormSubmission('PriceCalculator', {
      form_type: 'PriceCalculator',
      service_type: services.join(', '),
      property_type: size,
      total_estimate: estTotal,
      addons: addOns.length > 0 ? addOns.join(', ') : 'none',
      discount_applied: services.filter(s => s !== 'Roof Cleaning').length >= 3 ? 'yes' : 'no'
    });
    
    // Submit form with a slight delay to simulate processing
    setTimeout(() => {
      setSubmitting(false);
      if (onComplete) onComplete();
      setStep(5);
    }, 1200);
  };

  // Utility functions for pricing
  const getPricing = (size: string, service: string): number | null => {
    // Only handle "Roof Cleaning" as on-site estimate
    if (service === 'Roof Cleaning') {
      return null;
    }
    if (size === 'xlarge') {
      return null;
    }

    // Fix the TypeScript error by using proper type annotations
    const pricingMap = {
      small: {
        'Window Cleaning (Outside)': 300,
        'Window Cleaning (Inside)': 300,
        'Both Window Sides': 547.2,
        'House Washing': 414.3,
        'House Wash + Windows': 664.2,
        'Driveway Washing': 300,
        'Driveway + House Washing': 635.4,
        'Deck Washing': 300,
        'Gutter Cleaning (Inside)': 300,
        'Gutter Cleaning (Outside)': 154,
        'Gutter Cleaning (Both)': 454,
        'Roof Cleaning': null
      },
      medium: {
        'Window Cleaning (Outside)': 357.3,
        'Window Cleaning (Inside)': 411.3,
        'Both Window Sides': 768.6,
        'House Washing': 627.3,
        'House Wash + Windows': 984.6,
        'Driveway Washing': 314.1,
        'Driveway + House Washing': 941.1,
        'Deck Washing': 300,
        'Gutter Cleaning (Inside)': 386.1,
        'Gutter Cleaning (Outside)': 300,
        'Gutter Cleaning (Both)': 682.2,
        'Roof Cleaning': null
      },
      large: {
        'Window Cleaning (Outside)': 431.1,
        'Window Cleaning (Inside)': 521.1,
        'Both Window Sides': 952.2,
        'House Washing': 888.3,
        'House Wash + Windows': 1319.4,
        'Driveway Washing': 384.3,
        'Driveway + House Washing': 1272.6,
        'Deck Washing': 300,
        'Gutter Cleaning (Inside)': 465.3,
        'Gutter Cleaning (Outside)': 357.3,
        'Gutter Cleaning (Both)': 822.6,
        'Roof Cleaning': null
      },
      xlarge: {
        'Roof Cleaning': null
      }
    };

    // Get the pricing from the PRICING object
    const typedPricingMap = pricingMap as Record<string, Record<string, number | null>>;
    return typedPricingMap[size] && typedPricingMap[size][service] || null;
  };

  // Import necessary constants for the add-ons
  const ADD_ONS = [{
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

  // -- Render form
  return (
    <div className="max-w-2xl mx-auto w-full mt-16">
      {/* Main disclaimer at the top */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6 text-sm">
        <p className="font-semibold mb-1">About Our Pricing</p>
        <p>The prices shown are starting estimates based on typical home sizes. After you submit this form, we'll review your property using Google Maps or schedule an on-site assessment for a formal quote based on your specific needs.</p>
      </div>
    
      <PriceCalculatorIntro />

      {/* Banners */}
      <div className="flex flex-col gap-4 mb-8">
        {PROMOS.map((promo, idx) => (
          <div 
            key={idx} 
            className={`rounded-lg px-4 py-3 shadow-sm font-semibold ${promo.color}`} 
            style={{
              fontSize: idx === 0 ? "1.10rem" : undefined
            }}
          >
            <span className="font-bold">{promo.title}</span>
            <span className="block text-sm font-medium">{promo.description}</span>
          </div>
        ))}
      </div>

      {/* Main content with form */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Main form area - takes 4 columns on larger screens */}
        <div className="lg:col-span-4">
          {/* Stepper indicator */}
          <div className="flex items-center justify-center mb-6 gap-2 text-xs">
            {[...Array(5)].map((_, n) => (
              <div 
                key={n} 
                className={`h-2 w-8 rounded-full transition-all duration-300 ${step === n ? 'bg-bc-red' : 'bg-gray-300'}`} 
              />
            ))}
          </div>

          {/* Render step components based on current step */}
          {step === 0 && (
            <StepAddressInput
              address={address}
              setAddress={setAddress}
              contact={contact}
              setContact={setContact}
              onNextStep={() => setStep(1)}
            />
          )}

          {step === 1 && (
            <StepSizeInput
              size={size}
              setSize={setSize}
              onNextStep={() => setStep(2)}
              onPrevStep={() => setStep(0)}
            />
          )}

          {step === 2 && (
            <StepServicesInput
              size={size}
              services={services}
              setServices={setServices}
              addOns={addOns}
              setAddOns={setAddOns}
              onNextStep={() => setStep(3)}
              onPrevStep={() => setStep(1)}
            />
          )}

          {step === 3 && (
            <StepContactInput
              contact={contact}
              setContact={setContact}
              onNextStep={() => setStep(4)}
              onPrevStep={() => setStep(2)}
            />
          )}

          {step === 4 && (
            <StepSummary
              size={size}
              services={services}
              addOns={addOns}
              contact={contact}
              address={address}
              onPrevStep={() => setStep(3)}
              onSubmit={handleFormSubmit}
              submitting={submitting}
            />
          )}

          {step === 5 && <StepThankYou />}
        </div>
      </div>
    </div>
  );
};

export default PriceCalculatorForm;
