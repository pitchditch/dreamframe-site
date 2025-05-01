
import { useState } from 'react';
import { useTranslation } from '@/hooks/use-translation';
import PriceCalculatorOverlay from '@/components/PriceCalculatorOverlay';
import { ArrowRight, Shield, Star, Check } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const DESKTOP_VIDEO = "https://www.youtube.com/embed/GJZpuELGJpI?autoplay=1&mute=1&loop=1&playlist=GJZpuELGJpI&controls=0&showinfo=0&rel=0";
const MOBILE_VIDEO = "https://www.youtube.com/embed/sAjdWDNtFQw?autoplay=1&mute=1&loop=1&playlist=sAjdWDNtFQw&controls=0&showinfo=0&rel=0";

const HeroSection = () => {
  const { t } = useTranslation();
  const [zipCode, setZipCode] = useState('');
  const isMobile = useIsMobile();

  const handleZipCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipCode) {
      sessionStorage.setItem('userZipCode', zipCode);
    }
    window.location.href = '/calculator';
  };

  return (
    <section className="hero-section relative min-h-screen flex items-center w-full overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        {/* Mobile video fills full width and height with object-fit: cover, no black bars */}
        {isMobile ? (
          <div className="w-full h-full">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={MOBILE_VIDEO}
              title="Background Mobile Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              style={{ 
                border: 'none', 
                width: '100vw', 
                height: '100vh',
                objectFit: 'cover',
                transform: 'scale(1.5)'
              }}
            />
          </div>
        ) : (
          <iframe 
            className="absolute inset-0 w-full h-full md:scale-[1.5]"
            src={DESKTOP_VIDEO}
            title="Background Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            style={{ border: 'none' }}
          />
        )}
      </div>
      
      <div className="hero-overlay absolute inset-0 bg-black/60"></div>

      <div className="container mx-auto px-4 relative z-10 text-white">
        <div className="max-w-3xl text-right ml-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-on-scroll text-shadow-lg text-white">
            Exterior Cleaning You Can Trust – Backed by a 5-Star Guarantee
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-on-scroll text-shadow-lg max-w-2xl ml-auto text-white">
            Professional Window Cleaning, Pressure Washing & Gutter Services in Surrey, White Rock & Nearby – All Jobs Personally Checked by Jayden Fisher.
          </p>

          <div className="mt-4 mb-8">
            <div className="inline-flex items-center bg-black/30 px-4 py-2 rounded-full">
              <img 
                src="/lovable-uploads/10e953e1-c5f0-4899-a3b7-944cf15bca76.png"
                alt="Jayden Fisher"
                className="w-12 h-12 rounded-full mr-3 border-2 border-white"
              />
              <div className="text-left">
                <h3 className="font-semibold text-lg">Jayden Fisher</h3>
                <p className="text-sm text-gray-200">Owner & Lead Technician</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleZipCodeSubmit} className="flex flex-col sm:flex-row gap-4 animate-on-scroll justify-end mb-8">
            <div className="relative">
              <input 
                type="text"
                placeholder="🔴 Enter Your Postal Code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="px-4 py-4 rounded-lg text-black w-full sm:w-56 text-lg font-medium shadow-lg"
                maxLength={7}
              />
            </div>
            <button
              type="submit" 
              className="bg-bc-red hover:bg-red-700 text-white py-4 px-8 text-lg font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all flex items-center justify-center"
            >
              🟥 Get a Free Quote in 30 Seconds
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </form>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center">
              <Shield className="w-8 h-8 text-yellow-400 mb-2" />
              <span className="text-sm font-medium">✔️ Fully Insured</span>
            </div>
            <div className="flex flex-col items-center">
              <Star className="w-8 h-8 text-yellow-400 mb-2" />
              <span className="text-sm font-medium">✔️ Locally Owned</span>
            </div>
            <div className="flex flex-col items-center">
              <Star className="w-8 h-8 text-yellow-400 mb-2" />
              <span className="text-sm font-medium">✔️ 5-Star Rated</span>
            </div>
            <div className="flex flex-col items-center">
              <Check className="w-8 h-8 text-yellow-400 mb-2" />
              <span className="text-sm font-medium">✔️ Satisfaction Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
