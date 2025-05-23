
import React from 'react';
import PriceCalculatorIntro from './PriceCalculatorIntro';
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

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
      <PriceCalculatorIntro />
      <div className="p-6">
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
    </div>
  );
};

export default PriceCalculatorForm;
