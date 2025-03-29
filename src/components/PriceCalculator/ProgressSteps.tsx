
import React from 'react';

interface ProgressStepsProps {
  currentStep: number;
  totalSteps: number;
  customLabels?: string[];
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ 
  currentStep, 
  totalSteps,
  customLabels
}) => {
  const defaultLabels = ['Services', 'Property', 'Size', 'Contact', 'Review'];
  const labels = customLabels || defaultLabels;
  
  // Only show the labels that are needed based on totalSteps
  const displayLabels = labels.slice(0, totalSteps);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <React.Fragment key={index}>
            <div className="relative">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  index + 1 === currentStep 
                    ? 'bg-blue-500 text-white' 
                    : index + 1 < currentStep 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index + 1 < currentStep ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <div className="mt-2 text-xs text-center font-medium">
                {displayLabels[index]}
              </div>
            </div>
            
            {index < totalSteps - 1 && (
              <div className={`flex-1 h-1 mx-2 ${
                index + 1 < currentStep ? 'bg-green-500' : 'bg-gray-200'
              }`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;
