
import { useState, useEffect, useRef } from 'react';
import { Phone } from 'lucide-react';
import { trackPageView } from '@/utils/analytics';

const PhoneButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showCompact, setShowCompact] = useState(false);
  const [iconOnly, setIconOnly] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      // Only show call button after scrolling past the hero section
      const heroSectionHeight = window.innerHeight * 0.8;
      
      if (window.scrollY > heroSectionHeight) {
        setIsVisible(true);
        
        // Check if we're in the FAQ section to use compact view
        const faqSection = document.querySelector('[id*="faq"], [class*="faq"], [data-component="faq"]');
        if (faqSection) {
          const faqRect = faqSection.getBoundingClientRect();
          setShowCompact(faqRect.top < window.innerHeight && faqRect.bottom > 0);
        }
        
        // Show icon-only when scrolled more than 30% down the page height
        setIconOnly(window.scrollY > window.innerHeight * 1.3);
      } else {
        setIsVisible(false);
        setShowCompact(false);
        setIconOnly(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleCallClick = () => {
    // Track phone call events
    trackPageView('/virtual/phone-call-button');
  };
  
  return (
    <>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-50">
          <a
            href="tel:7788087620"
            onClick={handleCallClick}
            className={`flex items-center justify-center gap-2 bg-bc-red hover:bg-red-700 text-white ${
              iconOnly ? 'p-3 rounded-full w-12 h-12' : showCompact ? 'px-3 py-3 rounded-full' : 'px-6 py-4 rounded-full'
            } shadow-lg transition-all duration-300`}
            aria-label="Call us now"
          >
            <Phone size={20} />
            {!iconOnly && !showCompact && (
              <span className="font-semibold">Call Jayden: 778-808-7620</span>
            )}
          </a>
        </div>
      )}
    </>
  );
};

export default PhoneButton;
