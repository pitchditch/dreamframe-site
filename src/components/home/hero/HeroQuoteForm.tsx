
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Phone, ArrowRight } from 'lucide-react';

const HeroQuoteForm = () => {
  const [postalCode, setPostalCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postalCode.trim()) {
      sessionStorage.setItem('postalCode', postalCode);
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
        <Input
          type="text"
          placeholder="Enter Your Postal Code (e.g. V4B 3X2)"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value.toUpperCase())}
          className="h-14 text-lg text-center font-medium border-2 border-gray-200 focus:border-red-600 rounded-xl"
        />
        
        <Button 
          type="submit" 
          className="w-full h-14 text-lg font-bold rounded-xl bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Get Instant Quote <ArrowRight className="ml-2" size={20} />
        </Button>
      </form>

      <div className="flex items-center justify-center mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center text-gray-600">
          <Phone className="mr-2" size={18} />
          <span className="text-sm">Or call: </span>
          <a href="tel:778-808-7620" className="text-red-600 font-bold ml-1 hover:underline">
            778-808-7620
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroQuoteForm;
