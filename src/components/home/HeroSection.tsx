
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/use-translation';
import PriceCalculatorOverlay from '@/components/PriceCalculatorOverlay';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const { t } = useTranslation();
  const [zipCode, setZipCode] = useState('');
  
  const handleZipCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipCode) {
      sessionStorage.setItem('userZipCode', zipCode);
    }
    const specialOffersButton = document.querySelector('.special-offers-button');
    if (specialOffersButton) {
      specialOffersButton.dispatchEvent(new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      }));
    }
  };
  
  return (
    <section className="hero-section relative h-screen flex items-center w-full overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <iframe 
          className="absolute inset-0 w-full h-full scale-[1.5]"
          src="https://www.youtube.com/embed/GJZpuELGJpI?autoplay=1&mute=1&loop=1&playlist=GJZpuELGJpI&controls=0&showinfo=0&rel=0"
          title="Background Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          style={{ border: 'none' }}
        ></iframe>
      </div>
      
      <div className="hero-overlay absolute inset-0 bg-black/60"></div>
      <div className="container mx-auto px-4 relative z-10 text-white">
        <div className="max-w-3xl text-right ml-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-on-scroll text-shadow-lg text-white">
            White Rock & Surrey's<br />Trusted Cleaning Pros
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-on-scroll text-shadow-lg max-w-2xl ml-auto text-white">
            Professional window and exterior cleaning with 100% satisfaction guarantee — or we re-clean for free.
          </p>
          <form onSubmit={handleZipCodeSubmit} className="flex flex-col sm:flex-row gap-4 animate-on-scroll justify-end">
            <div className="relative">
              <input 
                type="text"
                placeholder="Enter Your Postal Code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="px-4 py-4 rounded-lg text-black w-full sm:w-56 text-lg font-medium shadow-lg"
                maxLength={7}
              />
            </div>
            <button
              type="submit" 
              className="bg-yellow-500 hover:bg-yellow-600 text-black py-4 px-8 text-lg font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all flex items-center justify-center"
            >
              GET A FREE QUOTE IN 30 SECONDS
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
