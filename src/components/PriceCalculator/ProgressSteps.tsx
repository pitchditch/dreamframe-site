
import React from 'react';

interface ProgressStepsProps {
  currentStep: number;
  totalSteps?: number;
}

const ProgressSteps = ({ currentStep, totalSteps = 5 }: ProgressStepsProps) => {
  const steps = [
    { number: 1, label: 'Service' },
    { number: 2, label: 'Property' },
    { number: 3, label: 'Size' },
    { number: 4, label: 'Add-ons' },
    { number: 5, label: 'Contact' },
    { number: 6, label: 'Review' },
  ].slice(0, totalSteps);

  return (
    <div className="mb-8">
      <div className="flex justify-between relative">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center z-10">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm mb-2 ${
                currentStep >= step.number
                  ? 'bg-bc-red text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step.number}
            </div>
            <span className="text-xs text-center">{step.label}</span>
          </div>
        ))}
        
        {/* Progress line */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-0 transform -translate-y-1/2">
          <div 
            className="h-full bg-bc-red transition-all duration-300" 
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressSteps;
