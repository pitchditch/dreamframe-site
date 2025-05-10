
// StepRenderer.tsx
import React from 'react';
import { AddressData, ContactData, SizeData } from './hooks/usePriceCalculatorForm';
import StepAddressInput from './steps/StepAddressInput';
import StepSizeInput from './steps/StepSizeInput';
import StepServicesInput from './steps/StepServicesInput';
import StepContactInput from './steps/StepContactInput';
import StepSummary from './steps/StepSummary';
import StepThankYou from './steps/StepThankYou';
import DateStep from './steps/DateStep';

interface StepRendererProps {
  step: number;
  address: AddressData;
  setAddress: (address: AddressData) => void;
  size: SizeData;
  setSize: (size: SizeData) => void;
  services: string[];
  setServices: (services: string[]) => void;
  addOns: string[];
  setAddOns: (addOns: string[]) => void;
  contact: ContactData;
  setContact: (contact: ContactData) => void;
  preferredDate?: Date;
  setPreferredDate: (date: Date | undefined) => void;
  onNextStep: (nextStep: number) => void;
  onPrevStep: (prevStep: number) => void;
  onSubmit: () => void;
  submitting: boolean;
  estimateTotal: () => number;
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
  preferredDate,
  setPreferredDate,
  onNextStep,
  onPrevStep,
  onSubmit,
  submitting,
  estimateTotal,
  onStartNew
}) => {
  switch(step) {
    case 0:
      return (
        <StepAddressInput 
          address={address} 
          setAddress={setAddress} 
          contact={contact}
          setContact={setContact}
          onNextStep={() => onNextStep(1)}
        />
      );
    case 1:
      return (
        <StepSizeInput 
          size={size} 
          setSize={setSize} 
          onPrevStep={() => onPrevStep(0)} 
          onNextStep={() => onNextStep(2)}
        />
      );
    case 2:
      return (
        <StepServicesInput 
          size={size}
          services={services}
          setServices={setServices}
          addOns={addOns}
          setAddOns={setAddOns}
          onPrevStep={() => onPrevStep(1)}
          onNextStep={() => onNextStep(3)}
        />
      );
    case 3:
      return (
        <DateStep
          preferredDate={preferredDate}
          setPreferredDate={setPreferredDate}
          onPrevStep={() => onPrevStep(2)}
          onNextStep={() => onNextStep(4)}
        />
      );
    case 4:
      return (
        <StepContactInput 
          contact={contact}
          setContact={setContact}
          onPrevStep={() => onPrevStep(3)}
          onNextStep={() => onNextStep(5)}
        />
      );
    case 5:
      return (
        <StepSummary 
          address={address}
          size={size}
          services={services}
          addOns={addOns}
          contact={contact}
          estimateTotal={estimateTotal()}
          onPrevStep={() => onPrevStep(4)}
          onSubmit={onSubmit}
          submitting={submitting}
        />
      );
    case 6:
      return <StepThankYou estimateTotal={estimateTotal()} onStartNew={onStartNew} />;
    default:
      return null;
  }
};

export default StepRenderer;
