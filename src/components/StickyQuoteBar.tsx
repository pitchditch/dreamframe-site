
import React, { useState, useEffect } from 'react';
import { Calculator, Phone, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const StickyQuoteBar = () => {
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Show bar after scrolling past 30% of viewport height
      if (scrollY > windowHeight * 0.3) {
        setShowBar(true);
      } else {
        setShowBar(false);
      }
      
      // Hide when at the very bottom to avoid overlap with footer
      const documentHeight = document.documentElement.scrollHeight;
      const scrolledToBottom = scrollY + windowHeight >= documentHeight - 150;
      
      if (scrolledToBottom) {
        setShowBar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!showBar) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-bc-red via-red-600 to-bc-red text-white shadow-lg border-t-2 border-red-700 md:hidden">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-sm font-bold">📍 Get My White Rock Estimate</h3>
            <p className="text-xs opacity-90">Same-day quotes available</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Link to="/calculator">
              <Button size="sm" className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 px-3 py-2">
                <Calculator className="w-4 h-4 mr-1" />
                Quote
              </Button>
            </Link>
            
            <a href="tel:778-808-7620">
              <Button size="sm" variant="outline" className="bg-white text-bc-red border-white hover:bg-gray-100 px-3 py-2">
                <Phone className="w-4 h-4 mr-1" />
                Call
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyQuoteBar;
