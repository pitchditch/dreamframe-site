
import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';
import HeroForm from './HeroForm';
import type { CityData } from '@/data/cities';

interface HeroContentProps {
  detectedCity?: CityData | null;
}

const HeroContent = ({ detectedCity }: HeroContentProps) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const getLocationText = () => {
    if (detectedCity) {
      return `${detectedCity.name} & Metro Vancouver`;
    }
    return "White Rock, Surrey & Metro Vancouver";
  };

  return (
    <div className={`relative z-20 text-center text-white px-4 max-w-6xl mx-auto transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className={`${isMobile ? 'space-y-4' : 'space-y-6'} animate-on-scroll`}>
        <h1 className={`font-bold leading-tight ${isMobile ? 'text-3xl sm:text-4xl' : 'text-4xl md:text-5xl lg:text-6xl'} drop-shadow-lg`}>
          <span className="block">Professional Pressure Washing</span>
          <span className="block text-bc-red">& Window Cleaning</span>
          <span className={`block ${isMobile ? 'text-2xl sm:text-3xl' : 'text-3xl md:text-4xl lg:text-5xl'} font-semibold mt-2`}>
            in {getLocationText()}
          </span>
        </h1>
        
        <p className={`${isMobile ? 'text-lg leading-relaxed' : 'text-xl md:text-2xl leading-relaxed'} drop-shadow-md max-w-4xl mx-auto font-medium`}>
          {detectedCity ? (
            <>Transform your {detectedCity.name} property with our expert exterior cleaning services. </>
          ) : (
            <>Transform your property with our expert exterior cleaning services. </>
          )}
          Professional pressure washing, crystal-clear window cleaning, and comprehensive gutter maintenance.
        </p>

        <HeroForm />

        <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'flex-row justify-center items-center space-x-6'} animate-on-scroll delay-500`}>
          <Button 
            asChild
            variant="outline" 
            size={isMobile ? "default" : "lg"}
            className={`bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-105 ${isMobile ? 'text-base py-3' : 'text-lg py-4 px-6'} font-semibolder`}
          >
            <a href="tel:778-808-7620">
              <Phone className="mr-2" size={18} />
              Call Now: (778) 808-7620
            </a>
          </Button>
          
          <div className={`text-center ${isMobile ? 'text-sm' : 'text-base'}`}>
            <p className="text-white/90 font-medium">
              🌟 5-Star Local Service • ✅ Licensed & Insured • 📞 Same-Day Response
            </p>
            {detectedCity && (
              <p className="text-white/80 text-sm mt-1">
                Proudly serving {detectedCity.name} and surrounding areas
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
