
import React from 'react';
import RoofCleaningForm from './RoofCleaningForm';

interface RoofCleaningQuoteOverlayProps {
  buttonText: string | React.ReactNode;
  variant?: 'bc-red' | 'default';
}

const RoofCleaningQuoteOverlay = ({ buttonText, variant = 'bc-red' }: RoofCleaningQuoteOverlayProps) => {
  const buttonClasses = variant === 'bc-red' 
    ? 'bg-bc-red hover:bg-red-700 text-white' 
    : 'bg-gray-600 hover:bg-gray-700 text-white';

  return (
    <div className="relative inline-block group">
      <button className={`${buttonClasses} px-8 py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105`}>
        {buttonText}
      </button>
      
      {/* Overlay that appears on hover */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
        <div className="bg-white rounded-lg shadow-2xl p-6 border-2 border-gray-100 w-96 max-w-screen-sm">
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-l-2 border-t-2 border-gray-100 rotate-45"></div>
          <RoofCleaningForm />
        </div>
      </div>
    </div>
  );
};

export default RoofCleaningQuoteOverlay;
