
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';
import { Input } from "@/components/ui/input";
import { trackFormSubmission } from '@/utils/analytics';

const HeroForm = () => {
  const { t } = useTranslation();
  const [postalCode, setPostalCode] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  useEffect(() => {
    const savedPostalCode = sessionStorage.getItem('postalCode');
    if (savedPostalCode) {
      setPostalCode(savedPostalCode);
    }
  }, []);

  const handlePostalCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    sessionStorage.setItem('postalCode', postalCode);
    localStorage.setItem('postalCode', postalCode);
    
    trackFormSubmission('hero_postal_code', { postalCode });
    
    navigate('/calculator');
  };

  return (
    <div className={`${isMobile ? 'w-full' : 'max-w-2xl w-full'} ${isMobile ? 'mt-4 mb-4' : 'mt-8 mb-6'} animate-on-scroll delay-300 bg-white/95 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-2xl text-black`}>
      <form onSubmit={handlePostalCodeSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Input
            ref={inputRef}
            type="text"
            placeholder={t("Enter your postal code (e.g., V5K 2A1)")}
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className={`bg-white border-white text-black ${isMobile ? 'h-14 text-lg rounded-lg' : 'h-16 md:h-17 text-xl md:text-2xl rounded-lg'} pl-4 pr-10 focus:ring-bc-red focus:border-bc-red placeholder-gray-500 font-medium w-full shadow-lg`}
          />
        </div>
        <Button 
          type="submit" 
          variant="bc-red" 
          size="lg" 
          className={`${isMobile ? 'h-14 text-base rounded-lg px-4' : 'h-16 md:h-17 text-lg md:text-xl rounded-lg px-5 md:px-6'} text-white font-bold shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl w-full sm:w-auto sm:min-w-[220px] md:min-w-[260px] whitespace-nowrap`}
        >
          {t("Get My Free Quote")} <MessageSquare className="ml-2" size={18} />
        </Button>
      </form>
    </div>
  );
};

export default HeroForm;
