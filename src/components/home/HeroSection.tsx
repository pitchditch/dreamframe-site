
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/use-translation';
import PriceCalculatorOverlay from '@/components/PriceCalculatorOverlay';
import { Phone } from 'lucide-react';

const HeroSection = () => {
  const { t } = useTranslation();
  
  return (
    <section 
      className="hero-section relative h-[90vh] flex items-center w-full" 
      style={{ 
        backgroundImage: "url('/lovable-uploads/04bbfdaa-4c0d-4b12-a7c0-d43c13ecfa2e.png')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        maxWidth: "100%"
      }}
    >
      <div className="hero-overlay absolute inset-0 bg-black/50"></div>
      <div className="container mx-auto px-4 relative z-10 text-white">
        <div className="max-w-3xl text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-on-scroll text-shadow">
            Professional Window & Pressure Washing in White Rock & Surrey
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-on-scroll text-shadow-sm max-w-2xl">
            Fast, reliable exterior cleaning — windows, gutters, siding, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-on-scroll">
            <PriceCalculatorOverlay 
              buttonText="Request a Free Quote in 30 Seconds" 
              className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 text-lg font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all"
            />
          </div>
          <p className="text-sm text-gray-200 mt-4 animate-on-scroll">
            Quick and easy process. No obligation.
          </p>
          
          <div className="flex items-center gap-6 mt-8">
            <img 
              src="/lovable-uploads/2aa39f57-d30d-49e2-bfed-a04731da67e7.png" 
              alt="Licensed and Insured" 
              className="h-24 w-24"
            />
            <div className="bg-blue-900/90 rounded-full p-4 backdrop-blur-sm">
              <img 
                src="/lovable-uploads/bc0ef805-203e-473b-a85c-ea359422543e.png" 
                alt="100% Satisfaction Guaranteed" 
                className="h-16 w-16"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Call Button for Mobile */}
      <a 
        href="tel:7788087620"
        className="fixed bottom-6 right-6 md:hidden z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg animate-pulse"
      >
        <Phone className="h-6 w-6" />
      </a>
    </section>
  );
};

export default HeroSection;
