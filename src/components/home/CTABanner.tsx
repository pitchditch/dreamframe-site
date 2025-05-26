
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Phone, Calendar } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const CTABanner: React.FC = () => {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      // Find the Premium Solutions section
      const premiumSection = document.querySelector('[data-section="premium-solutions"]') || 
                           document.querySelector('h2')?.textContent?.includes('Premium Cleaning Solutions') ? 
                           document.querySelector('h2')?.closest('section') : null;
      
      // Find the Satisfaction Guarantee section
      const satisfactionSection = document.querySelector('h2')?.textContent?.includes('100% Satisfaction Guarantee') ? 
                                 document.querySelector('h2')?.closest('section') : null;
      
      let shouldShow = false;
      
      if (premiumSection) {
        const premiumRect = premiumSection.getBoundingClientRect();
        // Show banner when Premium Solutions section enters viewport
        shouldShow = premiumRect.top <= window.innerHeight;
      } else {
        // Fallback: show after scrolling 80% of viewport height
        shouldShow = window.scrollY > window.innerHeight * 0.8;
      }
      
      // Hide banner when satisfaction guarantee section enters viewport
      if (satisfactionSection && shouldShow) {
        const satisfactionRect = satisfactionSection.getBoundingClientRect();
        if (satisfactionRect.top <= window.innerHeight) {
          shouldShow = false;
        }
      }
      
      setIsVisible(shouldShow);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <section className="bg-bc-red py-3 fixed bottom-0 left-0 right-0 z-[1000] shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/5f0b8643-4703-4237-9723-b6f07a39a74b.png"
            alt="Jayden Fisher, Owner" 
            className="w-10 h-10 rounded-full mr-3 border-2 border-white object-cover" 
          />
          
          <div className="flex-1 flex flex-row items-center justify-between">
            <div className="text-white">
              <p className="font-bold text-sm sm:text-base">Ready for a free quote?</p>
              <p className="text-xs sm:text-sm">Get a response within 24 hours</p>
            </div>
            
            <div className="flex flex-row gap-2">
              <Button asChild size="sm" variant="secondary" className="gap-1 whitespace-nowrap">
                <a href="tel:+16047860399">
                  <Phone className="w-4 h-4" />
                  <span className="text-xs sm:text-sm">Call</span>
                </a>
              </Button>
              
              <Button asChild size="sm" variant="secondary" className="bg-white text-bc-red hover:bg-gray-100 border-none gap-1 whitespace-nowrap">
                <Link to="/contact">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs sm:text-sm">Get Quote</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
