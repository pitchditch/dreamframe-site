
import { useState } from 'react';
import { Button } from './ui/button';
import ReferralProgramDialog from './ReferralProgramDialog';
import { useTranslation } from '@/hooks/use-translation';

const ReferralButton = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  // Check if we're in view of the owner section to avoid overlapping 
  const [isVisible, setIsVisible] = useState(true);

  // Use an intersection observer to hide the button when owner section is visible
  const setupIntersectionObserver = () => {
    const ownerSection = document.querySelector('[data-component="owner-operated"]');
    
    if (ownerSection) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Hide button when owner section is visible, show when not visible
            setIsVisible(!entry.isIntersecting);
          });
        },
        { threshold: 0.1 } // Trigger when 10% of the element is visible
      );
      
      observer.observe(ownerSection);
      return () => observer.disconnect();
    }
  };
  
  // Set up the observer on mount
  useState(() => {
    const cleanup = setupIntersectionObserver();
    return cleanup;
  });

  return (
    <>
      {isVisible && (
        <Button
          onClick={() => setOpen(true)}
          className="fixed bottom-24 md:bottom-6 right-6 z-40 bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-4 py-2 rounded-lg shadow-lg animate-pulse-slow text-xs md:text-sm flex items-center justify-center gap-1"
        >
          <span>🤝</span> {t("Refer & Save 50%")}
        </Button>
      )}
      
      <ReferralProgramDialog open={open} onOpenChange={setOpen} />
    </>
  );
};

export default ReferralButton;
