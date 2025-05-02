
import { useState } from 'react';
import { useTranslation } from '@/hooks/use-translation';
import PriceCalculatorOverlay from '@/components/PriceCalculatorOverlay';
import { ArrowRight, Shield, Star, Check, Phone } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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
    <section className="hero-section relative min-h-screen flex items-center justify-center w-full overflow-hidden">
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

      <div className="container mx-auto px-4 relative z-10 text-white text-center animate-fade-in">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-shadow-lg">
            Trusted Exterior Cleaning in Surrey & White Rock – Backed by a 5-Star Guarantee
          </h1>
          
          <h2 className="text-xl md:text-2xl mb-8 text-shadow-lg">
            Professional Window Cleaning, Gutter Cleaning, and Pressure Washing – Fully Insured & Locally Owned
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              onClick={() => window.location.href = '/calculator'} 
              className="bg-bc-red hover:bg-red-700 text-white py-4 px-6 text-lg font-bold rounded-lg shadow-lg flex items-center justify-center"
            >
              Get a Free Quote in 30 Seconds
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button
              asChild
              className="bg-green-600 hover:bg-green-700 text-white py-4 px-6 text-lg font-bold rounded-lg shadow-lg flex items-center justify-center"
            >
              <a href="tel:7788087620">
                <Phone className="mr-2 w-5 h-5" /> Call Jayden Now
              </a>
            </Button>
          </div>
          
          {/* Trust section with Jayden's image */}
          <div className="flex flex-col items-center mb-8">
            <div className="rounded-full border-4 border-white overflow-hidden w-24 h-24 mb-2">
              <img 
                src="/lovable-uploads/10e953e1-c5f0-4899-a3b7-944cf15bca76.png"
                alt="Jayden Fisher"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg">Jayden Fisher</h3>
              <p className="text-gray-200">Owner & Lead Technician</p>
              <p className="text-sm">✅ "Every Job Is Personally Checked by Me"</p>
            </div>
          </div>

          {/* Trust Icons Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center">
              <Star className="w-6 h-6 text-yellow-400 mb-1" />
              <span className="text-sm font-medium">⭐ 5-Star Rated</span>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="w-6 h-6 text-yellow-400 mb-1" />
              <span className="text-sm font-medium">✅ Fully Insured</span>
            </div>
            <div className="flex flex-col items-center">
              <Check className="w-6 h-6 text-yellow-400 mb-1" />
              <span className="text-sm font-medium">🏠 Locally Owned</span>
            </div>
            <div className="flex flex-col items-center">
              <Check className="w-6 h-6 text-yellow-400 mb-1" />
              <span className="text-sm font-medium">📅 Satisfaction Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
