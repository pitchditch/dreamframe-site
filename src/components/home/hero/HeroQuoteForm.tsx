
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Phone, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { trackFormSubmission } from '@/utils/analytics';

const HeroQuoteForm = () => {
  const { t } = useTranslation();
  const [postalCode, setPostalCode] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postalCode.trim()) {
      sessionStorage.setItem('postalCode', postalCode);
      localStorage.setItem('postalCode', postalCode);
      trackFormSubmission('hero_postal_code', { postalCode });
      navigate('/calculator');
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-auto border border-gray-200">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Get Your Free Quote
        </h2>
        <p className="text-gray-600">
          Enter your postal code for instant pricing
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            ref={inputRef}
            type="text"
            placeholder="Enter Your Postal Code (e.g. V4B 3X2)"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value.toUpperCase())}
            className="h-14 text-lg text-center font-medium border-2 border-gray-200 focus:border-bc-red rounded-xl"
          />
        </div>
        
        <Button 
          type="submit" 
          variant="bc-red" 
          size="lg"
          className="w-full h-14 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Get Instant Quote <ArrowRight className="ml-2" size={20} />
        </Button>
      </form>

      <div className="flex items-center justify-center mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center text-gray-600">
          <Phone className="mr-2" size={18} />
          <span className="text-sm">Or call: </span>
          <a href="tel:778-808-7620" className="text-bc-red font-bold ml-1 hover:underline">
            778-808-7620
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroQuoteForm;
