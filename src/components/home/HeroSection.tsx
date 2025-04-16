
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/use-translation';
import PriceCalculatorOverlay from '@/components/PriceCalculatorOverlay';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const { t } = useTranslation();
  
  return (
    <section 
      className="hero-section relative h-[90vh] flex items-center w-full" 
      style={{ 
        backgroundImage: "url('/lovable-uploads/deea00c1-1c27-44fd-b409-09d0f3ff0afa.png')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        maxWidth: "100%"
      }}
    >
      <div className="hero-overlay absolute inset-0 bg-black/40"></div>
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
              className="bg-bc-red hover:bg-red-700 text-white py-4 px-8 text-lg font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all"
            />
            <a 
              href="tel:7788087620"
              className="inline-flex items-center justify-center bg-white text-bc-red py-4 px-8 text-lg font-bold rounded-lg shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call Jayden
            </a>
          </div>
          <p className="text-sm text-gray-200 mt-4 animate-on-scroll">
            No spam. No hassle. Just quick pricing and availability.
          </p>
        </div>
      </div>
      
      {/* Floating Call Button for Mobile */}
      <a 
        href="tel:7788087620"
        className="fixed bottom-6 right-6 md:hidden z-50 bg-bc-red text-white p-4 rounded-full shadow-lg animate-pulse"
      >
        <Phone className="h-6 w-6" />
      </a>
    </section>
  );
};

export default HeroSection;
