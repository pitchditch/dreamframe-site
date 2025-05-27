
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import GutterCleaningForm from '@/components/forms/GutterCleaningForm';

interface GutterCleaningQuoteOverlayProps {
  children: React.ReactNode;
}

const GutterCleaningQuoteOverlay = ({ children }: GutterCleaningQuoteOverlayProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div 
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      
      {isVisible && (
        <div 
          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50"
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
        >
          <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-6 w-96">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-bc-red mb-2">Request Gutter Cleaning Quote</h3>
              <p className="text-gray-600 text-sm">Get a free estimate for professional gutter cleaning</p>
            </div>
            <GutterCleaningForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default GutterCleaningQuoteOverlay;
