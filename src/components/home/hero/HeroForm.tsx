
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
    <div className={`${isMobile ? 'w-full' : 'max-w-2xl w-full'} ${isMobile ? 'mt-4 mb-4' : 'mt-6 mb-6'} animate-on-scroll delay-300`}>
      <form onSubmit={handlePostalCodeSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Input
            ref={inputRef}
            type="text"
            placeholder={t("Enter Your Postal Code")}
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className={`bg-white border-white text-black ${isMobile ? 'h-12 text-base rounded-lg' : 'h-12 md:h-14 text-base md:text-lg rounded-lg'} pl-4 pr-10 focus:ring-bc-red focus:border-bc-red placeholder-gray-500 font-medium w-full shadow-lg`}
          />
        </div>
        <Button 
          type="submit" 
          variant="bc-red" 
          size="lg" 
          className={`${isMobile ? 'h-12 text-base rounded-lg px-4' : 'h-12 md:h-14 text-base md:text-lg rounded-lg px-4 md:px-6'} text-white font-bold shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl w-full sm:w-auto sm:min-w-[200px] md:min-w-[240px]`}
        >
          {isMobile ? t("Free Instant Quote") : t("Get Your Free Instant Estimate")} <MessageSquare className="ml-2" size={18} />
        </Button>
      </form>
    </div>
  );
};

export default HeroForm;
