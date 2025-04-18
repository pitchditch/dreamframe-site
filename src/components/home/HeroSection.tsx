
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/use-translation';
import PriceCalculatorOverlay from '@/components/PriceCalculatorOverlay';
import { Phone } from 'lucide-react';

const HeroSection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="hero-section relative h-[90vh] flex items-center w-full overflow-hidden">
      {/* YouTube Video Background */}
      <div className="absolute inset-0 pointer-events-none">
        <iframe 
          className="absolute inset-0 w-full h-full scale-[1.5]"
          src="https://www.youtube.com/embed/gyIh2HU2tGE?autoplay=1&mute=1&loop=1&playlist=gyIh2HU2tGE&controls=0&showinfo=0&rel=0"
          title="Background Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          style={{ border: 'none' }}
        ></iframe>
      </div>
      
      <div className="hero-overlay absolute inset-0 bg-black/60"></div>
      <div className="container mx-auto px-4 relative z-10 text-white">
        <div className="max-w-3xl text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-on-scroll text-shadow-lg">
            Professional Window & Pressure Washing in White Rock & Surrey
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-on-scroll text-shadow-lg max-w-2xl">
            Fast, reliable exterior cleaning — windows, gutters, siding, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-on-scroll">
            <PriceCalculatorOverlay 
              buttonText="Request a Free Quote in 30 Seconds" 
              className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 text-lg font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all"
            />
          </div>
          <p className="text-sm text-gray-200 mt-4 animate-on-scroll text-shadow-lg">
            Quick and easy process. No obligation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
