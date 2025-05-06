
import { useState, useEffect } from 'react';
import { Gift } from 'lucide-react';
import { Button } from './ui/button';
import ReferralProgramDialog from './ReferralProgramDialog';
import { useTranslation } from '@/hooks/use-translation';

const ReferralButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      // Find the residential window cleaning section
      const residentialSection = document.querySelector('h2')?.textContent?.includes('Premium Solutions') ? 
        document.querySelector('h2')?.closest('section') : null;
      
      if (residentialSection) {
        const sectionRect = residentialSection.getBoundingClientRect();
        // Show when scrolled past this section
        if (sectionRect.bottom < 0) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } else {
        // Fallback to show after hero section if specific section not found
        const heroSectionHeight = window.innerHeight * 1.2;
        if (window.scrollY > heroSectionHeight) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <Button 
          onClick={() => setIsOpen(true)} 
          className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full px-5 py-2 flex items-center gap-2 fixed bottom-32 left-6 z-40 md:left-10 transition-all duration-300 hover:scale-105"
        >
          <Gift size={20} />
          <span>{t("Referral Program")}</span>
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
