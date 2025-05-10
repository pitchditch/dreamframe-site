
// StepRenderer.tsx
import React from 'react';
import AddressStep from './steps/AddressStep';
import SizeStep from './steps/SizeStep';
import ServicesStep from './steps/ServicesStep';
import ContactStep from './steps/ContactStep';
import SummaryStep from './steps/SummaryStep';
import CompletionStep from './steps/CompletionStep';
import DateStep from './steps/DateStep';
import { AddressData, ContactData, SizeData } from './hooks/usePriceCalculatorForm';

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
        <AddressStep 
          address={address} 
          setAddress={setAddress} 
          onNextStep={() => onNextStep(1)}
        />
      );
    case 1:
      return (
        <SizeStep 
          size={size} 
          setSize={setSize} 
          onPrevStep={() => onPrevStep(0)} 
          onNextStep={() => onNextStep(2)}
        />
      );
    case 2:
      return (
        <ServicesStep 
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
        <ContactStep 
          contact={contact}
          setContact={setContact}
          onPrevStep={() => onPrevStep(3)}
          onNextStep={() => onNextStep(5)}
        />
      );
    case 5:
      return (
        <SummaryStep 
          address={address}
          size={size}
          services={services}
          addOns={addOns}
          contact={contact}
          preferredDate={preferredDate}
          estimatedTotal={estimateTotal()}
          onPrevStep={() => onPrevStep(4)}
          onSubmit={onSubmit}
          submitting={submitting}
        />
      );
    case 6:
      return <CompletionStep onStartNew={onStartNew} />;
    default:
      return null;
  }
};

export default StepRenderer;
