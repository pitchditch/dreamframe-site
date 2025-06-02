
import React, { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';
import GutterCleaningQuoteOverlay from '@/components/forms/GutterCleaningQuoteOverlay';

const StickyQuoteButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
      <div className="relative">
        <GutterCleaningQuoteOverlay 
          buttonText={
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              <span className="hidden sm:inline">Get Instant Price</span>
              <span className="sm:hidden">Price</span>
            </div>
          }
          variant="bc-red"
        />
        <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold animate-pulse">
          FREE
        </div>
      </div>
    </div>
  );
};

export default StickyQuoteButton;
