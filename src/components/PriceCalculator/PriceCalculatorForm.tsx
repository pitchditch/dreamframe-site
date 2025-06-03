
import React from 'react';
import PriceCalculatorIntro from './PriceCalculatorIntro';
import PricingBreakdown from './PricingBreakdown';
import { usePriceCalculatorForm } from './hooks/usePriceCalculatorForm';
import StepRenderer from './StepRenderer';

interface PriceCalculatorFormProps {
  onComplete?: () => void;
  initialStep?: string;
  prefillData?: {
    postalCode?: string;
    houseSize?: string;
  };
}

const PriceCalculatorForm: React.FC<PriceCalculatorFormProps> = ({
  onComplete,
  initialStep,
  prefillData = {}
}) => {
  // Convert string initialStep to number
  const getInitialStep = (): number => {
    if (initialStep === 'services') return 2;
    else if (initialStep === 'contact') return 3;
    else if (initialStep === 'summary') return 4;
    else if (initialStep === 'address') return 1;
    else return 0;
  };

  const {
    step,
    setStep,
    size,
    setSize,
    services,
    setServices,
    addOns,
    setAddOns,
    photos,
    setPhotos,
    address,
    setAddress,
    contact,
    setContact,
    preferredDate,
    setPreferredDate,
    submitting,
    estimateTotal,
    handleFormSubmit,
    resetForm
  } = usePriceCalculatorForm(getInitialStep(), onComplete, prefillData);

  const handleNextStep = (nextStep: number) => setStep(nextStep);
  const handlePrevStep = (prevStep: number) => setStep(prevStep);

  // Function to pass as prop that returns the current estimate total
  const getEstimateTotal = () => estimateTotal;

  // Calculate pricing breakdown for display
  const getPricingBreakdown = () => {
    const basePrice = 150; // Base service price
    const adjustments = [];
    const addOnList = [];
    
    // Size adjustments
    if (size === 'large') {
      adjustments.push({
        factor: 'Large Home',
        multiplier: 1.3,
        description: 'Additional time and materials'
      });
    } else if (size === 'small') {
      adjustments.push({
        factor: 'Small Home',
        multiplier: 0.8,
        description: 'Reduced scope'
      });
    }

    // Service-specific adjustments
    if (services.includes('pressure-washing')) {
      addOnList.push({ name: 'Pressure Washing', price: 100 });
    }
    if (services.includes('gutter-cleaning')) {
      addOnList.push({ name: 'Gutter Cleaning', price: 80 });
    }

    return {
      basePrice,
      adjustments,
      addOns: addOnList,
      total: getEstimateTotal()
    };
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
      <PriceCalculatorIntro />
      <div className="flex flex-col lg:flex-row">
        {/* Main Form */}
        <div className="flex-1 p-4 lg:p-6">
          <StepRenderer
            step={step}
            address={address}
            setAddress={setAddress}
            size={size}
            setSize={setSize}
            services={services}
            setServices={setServices}
            addOns={addOns}
            setAddOns={setAddOns}
            photos={photos}
            setPhotos={setPhotos}
            contact={contact}
            setContact={setContact}
            preferredDate={preferredDate}
            setPreferredDate={setPreferredDate}
            onNextStep={handleNextStep}
            onPrevStep={handlePrevStep}
            onSubmit={handleFormSubmit}
            submitting={submitting}
            estimateTotal={getEstimateTotal}
            onStartNew={resetForm}
          />
        </div>

        {/* Pricing Breakdown Sidebar - Desktop */}
        {step > 1 && step < 7 && (
          <div className="hidden lg:block w-80 p-6 bg-gray-50 border-l">
            <PricingBreakdown {...getPricingBreakdown()} />
          </div>
        )}
      </div>

      {/* Mobile Pricing Summary */}
      {step > 1 && step < 7 && (
        <div className="lg:hidden p-4 bg-gray-50 border-t">
          <div className="text-center">
            <span className="text-sm text-gray-600">Current Estimate: </span>
            <span className="text-xl font-bold text-green-600">${getEstimateTotal()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceCalculatorForm;
