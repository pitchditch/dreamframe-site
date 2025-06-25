
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageSquare, Sparkles } from 'lucide-react';
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
    <div className={`${isMobile ? 'w-full' : 'max-w-2xl w-full'} ${isMobile ? 'mt-6 mb-6' : 'mt-6 mb-8'} animate-on-scroll delay-300`}>
      <form onSubmit={handlePostalCodeSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Input
            ref={inputRef}
            type="text"
            placeholder={t("Enter Your Postal Code")}
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className={`bg-white/95 backdrop-blur-sm border-3 border-white/50 text-black ${isMobile ? 'h-16 text-xl rounded-2xl' : 'h-16 md:h-18 text-xl md:text-2xl rounded-2xl'} pl-6 pr-12 focus:ring-4 focus:ring-bc-red/50 focus:border-bc-red placeholder-gray-600 font-bold w-full shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl focus:scale-105`}
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)'
            }}
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <Sparkles className="w-6 h-6 text-bc-red animate-pulse" />
          </div>
        </div>
        <Button 
          type="submit" 
          variant="bc-red" 
          size="lg" 
          className={`${isMobile ? 'h-16 text-xl rounded-2xl px-8' : 'h-16 md:h-18 text-xl md:text-2xl rounded-2xl px-10 md:px-12'} text-white font-black shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-3xl active:scale-95 w-full sm:w-auto sm:min-w-[280px] md:min-w-[320px] bg-gradient-to-r from-bc-red to-red-600 hover:from-red-600 hover:to-red-700 border-2 border-white/20`}
          style={{
            boxShadow: '0 25px 50px -12px rgba(220, 38, 127, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}
        >
          <span className="flex items-center gap-3">
            {isMobile ? t("Get FREE Quote") : t("Get Your FREE Instant Quote")} 
            <MessageSquare className="ml-1" size={24} />
          </span>
        </Button>
      </form>
    </div>
  );
};

export default HeroForm;
