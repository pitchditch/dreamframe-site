import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';
import { trackFormSubmission } from '@/lib/analytics';
import { Phone } from 'lucide-react';

const HeroQuoteForm = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [postalCode, setPostalCode] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handlePostalCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postalCode.trim()) {
      sessionStorage.setItem('postalCode', postalCode);
      localStorage.setItem('postalCode', postalCode);
      trackFormSubmission('hero_postal_code', { postalCode });
      navigate('/calculator');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md mx-auto">
      {/* Instant Estimate Badge */}
      <div className="bg-green-500 text-white px-4 py-2 rounded-lg inline-block mb-4 font-semibold text-sm">
        📊 Instant Estimate
      </div>
      
      {/* Form Header */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Get Your Free Quote in 30 Seconds
      </h2>
      <p className="text-gray-600 text-sm mb-6">
        No obligation • Satisfied customers
      </p>
      
      {/* Postal Code Form */}
      <form onSubmit={handlePostalCodeSubmit} className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Enter Your Postal Code
        </label>
        <Input
          ref={inputRef}
          type="text"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          placeholder="e.g., V5K 2A1"
          className="w-full mb-4 h-12 text-gray-700 border-2 border-gray-200 focus:border-blue-500"
          required
        />
        <Button
          type="submit"
          className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
        >
          Get My Free Quote →
        </Button>
      </form>
      
      {/* Call Option */}
      <p className="text-center text-gray-600 text-sm mb-4">
        Or call now for instant pricing
      </p>
      
      <Button
        variant="outline"
        className="w-full h-12 border-2 border-blue-500 text-blue-500 hover:bg-blue-50 font-semibold rounded-lg flex items-center justify-center gap-2"
        onClick={() => window.open('tel:(778) 808-7620', '_self')}
      >
        <Phone size={16} />
        (778) 808-7620
      </Button>
      
      {/* Jayden's Personal Message */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
        <div className="flex items-center gap-3">
          <img 
            src="/lovable-uploads/069112d9-e61f-4def-94ed-7f1c34172bfd.png"
            alt="Jayden Fisher - Owner" 
            className="w-12 h-12 rounded-full border-2 border-green-500"
          />
          <div>
            <p className="font-semibold text-gray-800 text-sm">
              Every job personally checked by Jayden
            </p>
            <div className="flex items-center gap-1 mt-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-green-600">Online now</span>
            </div>
          </div>
          <div className="text-green-500 text-xl">✓</div>
        </div>
      </div>
      
      {/* Trust indicators */}
      <div className="mt-4 space-y-1">
        <div className="flex items-center gap-2 text-gray-600 text-xs">
          <span className="text-green-500">✓</span>
          <span>Free estimates</span>
          <span>•</span>
          <span>✓ Same-day service available</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 text-xs">
          <span className="text-green-500">✓</span>
          <span>100% satisfaction guaranteed</span>
        </div>
      </div>
    </div>
  );
};

export default HeroQuoteForm;