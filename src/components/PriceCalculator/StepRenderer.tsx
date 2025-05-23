
import React from 'react';
import { ContactInfo } from './types/calculatorTypes';
import StepAddressInput from './steps/StepAddressInput';
import StepSizeInput from './steps/StepSizeInput';
import StepServicesInput from './steps/StepServicesInput';
import StepPhotos from './steps/StepPhotos';
import StepContactInput from './steps/StepContactInput';
import StepSummary from './steps/StepSummary';
import StepThankYou from './steps/StepThankYou';
import DateStep from './steps/DateStep';

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
  photos: File[];
  setPhotos: (photos: File[]) => void;
  contact: ContactInfo;
  setContact: (contact: ContactInfo) => void;
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
  photos,
  setPhotos,
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
        <StepPhotos
          photos={photos}
          setPhotos={setPhotos}
          onPrevStep={() => onPrevStep(2)}
          onNextStep={() => onNextStep(4)}
        />
      );
    case 4:
      return (
        <DateStep
          preferredDate={preferredDate}
          setPreferredDate={setPreferredDate}
          onPrevStep={() => onPrevStep(3)}
          onNextStep={() => onNextStep(5)}
        />
      );
    case 5:
      return (
        <StepContactInput 
          contact={contact}
          setContact={setContact}
          onPrevStep={() => onPrevStep(4)}
          onNextStep={() => onNextStep(6)}
        />
      );
    case 6:
      return (
        <StepSummary 
          address={{ street: address, city: '', postalCode: '' }}
          size={{ houseSize: size }}
          services={services}
          addOns={addOns}
          contact={contact}
          estimateTotal={estimateTotal()}
          onPrevStep={() => onPrevStep(5)}
          onSubmit={onSubmit}
          submitting={submitting}
        />
      );
    case 7:
      return <StepThankYou estimateTotal={estimateTotal()} onStartNew={onStartNew} />;
    default:
      return null;
  }
};

export default StepRenderer;
