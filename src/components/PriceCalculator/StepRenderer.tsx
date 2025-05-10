
import React from 'react';
import StepAddressInput from './steps/StepAddressInput';
import StepSizeInput from './steps/StepSizeInput';
import StepServicesInput from './steps/StepServicesInput';
import StepContactInput from './steps/StepContactInput';
import StepSummary from './steps/StepSummary';
import StepThankYou from './steps/StepThankYou';
import { ContactInfo } from './hooks/usePriceCalculatorForm';

interface StepRendererProps {
  step: number;
  address: string;
  setAddress: (address: string) => void;
  size: string;
  setSize: (size: string) => void;
  services: string[];
  setServices: (services: string[]) => void;
  addOns: string[];
  setAddOns: (addOns: string[]) => void;
  contact: ContactInfo;
  setContact: (contact: ContactInfo) => void;
  onNextStep: (step: number) => void;
  onPrevStep: (step: number) => void;
  onSubmit: () => void;
  submitting: boolean;
  estimateTotal: number | null;
  onStartNew: () => void;
}

const StepRenderer: React.FC<StepRendererProps> = ({
  step,
  address,
  setAddress,
  size,
  setSize,
  services,
  setServices,
  addOns,
  setAddOns,
  contact,
  setContact,
  onNextStep,
  onPrevStep,
  onSubmit,
  submitting,
  estimateTotal,
  onStartNew
}) => {
  switch (step) {
    case 0:
      return <StepAddressInput 
        address={address} 
        setAddress={setAddress}
        contact={contact}
        setContact={setContact}
        onNextStep={() => onNextStep(1)} 
      />;
    case 1:
      return <StepSizeInput 
        size={size} 
        setSize={setSize} 
        onNextStep={() => onNextStep(2)} 
        onPrevStep={() => onPrevStep(0)} 
      />;
    case 2:
      return <StepServicesInput
        size={size}
        services={services} 
        setServices={setServices} 
        addOns={addOns}
        setAddOns={setAddOns}
        onNextStep={() => onNextStep(3)} 
        onPrevStep={() => onPrevStep(1)} 
      />;
    case 3:
      return <StepContactInput 
        contact={contact} 
        setContact={setContact} 
        onNextStep={() => onNextStep(4)} 
        onPrevStep={() => onPrevStep(2)} 
      />;
    case 4:
      return <StepSummary 
        address={address}
        size={size}
        services={services}
        addOns={addOns}
        contact={contact}
        onPrevStep={() => onPrevStep(3)}
        onSubmit={onSubmit}
        submitting={submitting}
        estimateTotal={estimateTotal}
      />;
    case 5:
      return <StepThankYou 
        estimateTotal={estimateTotal} 
        onStartNew={onStartNew} 
      />;
    default:
      return null;
  }
};

export default StepRenderer;
