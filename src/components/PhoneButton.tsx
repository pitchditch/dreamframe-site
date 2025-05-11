
import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { trackPageView } from '@/utils/analytics';

const PhoneButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showCompact, setShowCompact] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      // Only show call button after scrolling past the hero section
      const heroSectionHeight = window.innerHeight * 0.8;
      
      if (window.scrollY > heroSectionHeight) {
        setIsVisible(true);
        
        // Check if we're in the FAQ section to use compact view
        const faqSection = document.querySelector('section [id*="faq"], section [class*="faq"]');
        if (faqSection) {
          const faqRect = faqSection.getBoundingClientRect();
          setShowCompact(faqRect.top < window.innerHeight && faqRect.bottom > 0);
        }
      } else {
        setIsVisible(false);
        setShowCompact(false);
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
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30 md:hidden">
          <a
            href="tel:7788087620"
            onClick={handleCallClick}
            className={`flex items-center gap-2 bg-bc-red hover:bg-red-700 text-white ${showCompact ? 'px-3 py-3 rounded-full' : 'px-6 py-4 rounded-full'} shadow-lg transition-all duration-300`}
            aria-label="Call us now"
          >
            <Phone size={20} />
            {!showCompact && (
              <span className="font-semibold">Call Jayden: 778-808-7620</span>
            )}
          </a>
        </div>
      )}
    </>
  );
};

export default PhoneButton;
