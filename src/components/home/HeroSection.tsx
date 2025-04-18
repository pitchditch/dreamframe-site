
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/use-translation';
import PriceCalculatorOverlay from '@/components/PriceCalculatorOverlay';

const HeroSection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="hero-section relative h-[90vh] flex items-center w-full overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <iframe 
          className="absolute inset-0 w-full h-full scale-[1.5]"
          src="https://www.youtube.com/embed/hsUJrLXCrN4?autoplay=1&mute=1&loop=1&playlist=hsUJrLXCrN4&controls=0&showinfo=0&rel=0"
          title="Background Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          style={{ border: 'none' }}
        ></iframe>
      </div>
      
      <div className="hero-overlay absolute inset-0 bg-black/60"></div>
      <div className="container mx-auto px-4 relative z-10 text-white">
        <div className="max-w-3xl text-right ml-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-on-scroll text-shadow-lg text-white">
            Clean You Can See.<br />Results You Can Trust.
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-on-scroll text-shadow-lg max-w-2xl ml-auto text-white">
            Professional window and exterior cleaning with 100% satisfaction guarantee — or we re-clean for free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-on-scroll justify-end">
            <PriceCalculatorOverlay 
              buttonText="REQUEST ESTIMATE" 
              className="bg-yellow-500 hover:bg-yellow-600 text-black py-4 px-8 text-lg font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
