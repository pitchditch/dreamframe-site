
import React, { useState, useEffect } from 'react';
import { Calculator, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const StickyQuoteBar = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Show after scrolling past 50% of viewport
      if (scrollY > windowHeight * 0.5) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      
      // Hide when at bottom to avoid footer overlap
      const documentHeight = document.documentElement.scrollHeight;
      const scrolledToBottom = scrollY + windowHeight >= documentHeight - 100;
      
      if (scrolledToBottom) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-bc-red to-red-700 text-white shadow-lg border-t-2 border-red-800 md:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex-1">
          <p className="text-sm font-semibold">Ready for a quote?</p>
          <p className="text-xs opacity-90">Free estimates • Same day service</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="bg-white text-bc-red hover:bg-gray-100 font-semibold">
            <Link to="/calculator" className="flex items-center gap-1">
              <Calculator size={16} />
              Quote
            </Link>
          </Button>
          
          <Button asChild size="sm" className="bg-green-600 hover:bg-green-700 text-white font-semibold">
            <a href="tel:778-808-7620" className="flex items-center gap-1">
              <Phone size={16} />
              Call
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StickyQuoteBar;
