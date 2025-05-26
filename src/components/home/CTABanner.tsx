
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
      const premiumSection = document.querySelector('[data-section="premium-solutions"]');
      const faqSection = document.querySelector('[id*="faq"], [class*="faq"], [data-component="faq"]');
      
      let shouldShow = false;
      
      if (premiumSection) {
        const premiumRect = premiumSection.getBoundingClientRect();
        // Show banner when premium section is fully visible and scrolled past
        shouldShow = premiumRect.bottom <= window.innerHeight;
      }
      
      // Hide before FAQ section
      if (faqSection && shouldShow) {
        const faqRect = faqSection.getBoundingClientRect();
        if (faqRect.top <= window.innerHeight + 100) {
          shouldShow = false;
        }
      }
      
      // Hide near footer
      const footer = document.querySelector('footer');
      if (footer && shouldShow) {
        const footerRect = footer.getBoundingClientRect();
        if (footerRect.top <= window.innerHeight + 100) {
          shouldShow = false;
        }
      }
      
      setIsVisible(shouldShow);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <section className="bg-bc-red py-4 fixed bottom-0 left-0 right-0 z-[1000] shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center flex-1 min-w-0">
            <img 
              src="/lovable-uploads/5f0b8643-4703-4237-9723-b6f07a39a74b.png"
              alt="Jayden Fisher, Owner" 
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white object-cover flex-shrink-0" 
            />
            
            <div className="text-white ml-3 min-w-0 flex-1">
              <p className="font-bold text-sm sm:text-base lg:text-lg truncate">Ready for a free quote?</p>
              <p className="text-xs sm:text-sm text-white/90 truncate">Get a response within 24 hours</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <Button asChild size="sm" variant="secondary" className="gap-1 px-3 py-2 h-auto text-xs sm:text-sm font-medium whitespace-nowrap bg-white text-bc-red hover:bg-gray-100">
              <a href="tel:+17788087620">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="hidden xs:inline">Call</span>
              </a>
            </Button>
            
            <Button asChild size="sm" variant="secondary" className="bg-white text-bc-red hover:bg-gray-100 border-none gap-1 px-3 py-2 h-auto text-xs sm:text-sm font-medium whitespace-nowrap">
              <Link to="/contact">
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span className="hidden xs:inline">Quote</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
