
import React from 'react';
import PriceCalculatorIntro from './PriceCalculatorIntro';
import { usePriceCalculatorForm } from './hooks/usePriceCalculatorForm';
import StepRenderer from './StepRenderer';

interface PriceCalculatorFormProps {
  onComplete?: () => void;
  initialStep?: string;
}

const PriceCalculatorForm: React.FC<PriceCalculatorFormProps> = ({
  onComplete,
  initialStep
}) => {
  // Convert string initialStep to number
  const getInitialStep = (): number => {
    if (initialStep === 'services') return 2;
    else if (initialStep === 'contact') return 3;
    else if (initialStep === 'summary') return 4;
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
    address,
    setAddress,
    contact,
    setContact,
    submitting,
    estimateTotal,
    handleFormSubmit,
    resetForm
  } = usePriceCalculatorForm(getInitialStep(), onComplete);

  const handleNextStep = (nextStep: number) => setStep(nextStep);
  const handlePrevStep = (prevStep: number) => setStep(prevStep);

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
          contact={contact}
          setContact={setContact}
          onNextStep={handleNextStep}
          onPrevStep={handlePrevStep}
          onSubmit={handleFormSubmit}
          submitting={submitting}
          estimateTotal={estimateTotal}
          onStartNew={resetForm}
        />
      </div>
    </div>
  );
};

export default PriceCalculatorForm;
