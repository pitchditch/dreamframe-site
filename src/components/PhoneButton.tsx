
import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

const PhoneButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    // Function to handle scroll and determine button visibility
    const handleScroll = () => {
      // Check if owner-operated section is visible
      const ownerSection = document.querySelector('[data-component="owner-operated"]');
      
      if (ownerSection) {
        const rect = ownerSection.getBoundingClientRect();
        const isOwnerSectionVisible = (
          rect.top < window.innerHeight &&
          rect.bottom > 0
        );
        
        // Only show button when scrolled past 300px AND the owner section is not visible
        const shouldShowButton = window.scrollY > 300 && !isOwnerSectionVisible;
        setIsVisible(shouldShowButton);
      } else {
        // If owner section doesn't exist, just use the scroll position
        setIsVisible(window.scrollY > 300);
      }
    };

    // Initial check
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return isVisible ? (
    <a 
      href="tel:7788087620" 
      className="fixed bottom-6 left-6 z-40 bg-bc-red hover:bg-red-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300"
      aria-label="Call us"
    >
      <Phone className="w-6 h-6" />
      <span className="sr-only">{t("Call us now: 778 808 7620")}</span>
    </a>
  ) : null;
};

export default PhoneButton;
