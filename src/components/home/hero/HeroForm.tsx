
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
    <form onSubmit={handlePostalCodeSubmit} className="w-full mb-4">
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Postal Code
          </label>
          <Input
            ref={inputRef}
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="e.g., V5K 2A1"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-bc-red text-gray-900 placeholder-gray-500 transition-colors"
            required
          />
        </div>
        <Button
          type="submit"
          variant="bc-red"
          size="lg"
          className="w-full py-3 px-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          {t("Get My Free Quote")} →
        </Button>
        <p className="text-center text-xs text-gray-500">
          Or call now for instant pricing
        </p>
        <div className="text-center">
          <a href="tel:+17788087620" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700">
            📞 (778) 808-7620
          </a>
        </div>
      </div>
    </form>
  );
};

export default HeroForm;
