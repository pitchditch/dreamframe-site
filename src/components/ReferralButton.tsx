
import { useState, useEffect } from 'react';
import { Gift } from 'lucide-react';
import { Button } from './ui/button';
import ReferralProgramDialog from './ReferralProgramDialog';
import { useTranslation } from '@/hooks/use-translation';

const ReferralButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      // Get the hero section height (approximately 90vh)
      const heroSectionHeight = window.innerHeight * 0.9;
      
      // Hide the button when scrolled past the hero section
      if (window.scrollY > heroSectionHeight) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <Button 
          onClick={() => setIsOpen(true)} 
          className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full px-5 py-2 flex items-center gap-2 fixed bottom-24 left-6 z-30 shadow-lg md:left-10"
        >
          <Gift size={20} />
          <span>{t("Special Offers")}</span>
        </Button>
      )}

      <ReferralProgramDialog 
        open={isOpen}
        onOpenChange={setIsOpen}
      />
    </>
  );
};

export default ReferralButton;
