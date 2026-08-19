import React, { useState } from 'react';
import GutterCleaningForm from './GutterCleaningForm';

interface GutterCleaningQuoteOverlayProps {
  buttonText: string | React.ReactNode;
  variant?: 'bc-red' | 'default';
}

const GutterCleaningQuoteOverlay = ({ buttonText, variant = 'bc-red' }: GutterCleaningQuoteOverlayProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonClasses = variant === 'bc-red'
    ? 'bg-bc-red hover:bg-red-700 text-white'
    : 'bg-gray-600 hover:bg-gray-700 text-white';

  return (
    <div className="relative inline-block group">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-label="Open gutter cleaning price and quote form"
        onClick={() => setIsOpen((open) => !open)}
        className={`${buttonClasses} px-8 py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105`}
      >
        {buttonText}
      </button>

      <div
        className={`absolute top-full left-1/2 z-50 mt-4 -translate-x-1/2 transition-all duration-300 sm:group-hover:visible sm:group-hover:opacity-100 ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="relative w-[min(24rem,calc(100vw-2rem))] rounded-lg border-2 border-gray-100 bg-white p-6 shadow-2xl">
          <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l-2 border-t-2 border-gray-100 bg-white" />
          <GutterCleaningForm />
        </div>
      </div>
    </div>
  );
};

export default GutterCleaningQuoteOverlay;
