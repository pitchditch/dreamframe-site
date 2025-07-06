
import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const MobileStickyBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldShow = scrollY > 800; // Show after scrolling down 800px
      setIsVisible(shouldShow);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isMobile || !isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-2xl p-3 animate-slide-up">
      <div className="flex gap-2">
        <Button 
          asChild 
          className="flex-1 bg-bc-red hover:bg-red-700 h-12 font-bold"
        >
          <a href="tel:7788087620" className="flex items-center justify-center">
            <Phone className="mr-2" size={18} />
            CALL NOW
          </a>
        </Button>
        
        <Button 
          asChild 
          variant="outline" 
          className="flex-1 border-bc-red text-bc-red hover:bg-bc-red hover:text-white h-12 font-bold"
        >
          <Link to="/calculator" className="flex items-center justify-center">
            <MessageSquare className="mr-2" size={18} />
            FREE QUOTE
          </Link>
        </Button>
      </div>
      
      <div className="text-center mt-2">
        <div className="text-xs text-gray-600">
          ⭐ 4.9/5 Stars • Same Day Service Available
        </div>
      </div>
    </div>
  );
};

export default MobileStickyBar;
