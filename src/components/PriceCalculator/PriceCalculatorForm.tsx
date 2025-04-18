
import React from 'react';

export interface StepProps {
  onNext: () => void;
  onBack: () => void;
  formData: any;
  updateFormData: (data: any) => void;
  onComplete?: () => void;
}

const PriceCalculatorForm: React.FC<{onComplete?: () => void}> = ({ onComplete }) => {
  return (
    <div className="price-calculator-form">
      <div className="text-center p-4">
        Price Calculator Form Content
      </div>
    </div>
  );
};

export default PriceCalculatorForm;
