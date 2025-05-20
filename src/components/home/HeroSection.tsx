
import React from 'react';
import { Button } from '../ui/button';
import { Phone, ArrowRight, ChevronDown } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import { useTranslation } from '@/hooks/use-translation';

const HeroSection = () => {
  const { t } = useTranslation();
  
  return (
    <div className="relative h-screen max-h-[800px] md:max-h-[900px] w-full overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video 
          className="absolute h-full w-full object-cover"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src="/lovable-uploads/a644a02a-f827-4fde-99a2-d9acedf6dd29.png" type="video/mp4" />
        </video>
        
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Text overlay */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="container mx-auto px-4 pt-32 md:pt-28">
          <div className="max-w-3xl animate-fade-in">
            <div className="mb-2 md:mb-3">
              <div className="bg-bc-red inline-block px-2 py-1 text-white text-xs md:text-sm font-semibold rounded">
                {t("Professional Pressure Washing Services")}
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-extrabold mb-2 md:mb-4">
              <span className="block">{t("The Ultimate Cleaning")}</span>
              <span className="block">
                <span className="text-bc-red">{t("Solution")}</span> {t("for Your Property")}
              </span>
            </h1>
            <p className="text-white text-lg md:text-xl opacity-90 mb-6 md:mb-8 max-w-2xl">
              {t("We deliver exceptional cleaning results for residential and commercial properties with our state-of-the-art equipment and professional techniques.")}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="tel:7788087620" className="no-underline">
                <Button size="lg" className="bg-bc-red hover:bg-red-700 text-white px-6 py-6 text-base md:text-lg group transition-all duration-300 hover:scale-105">
                  <Phone className="mr-2 h-5 w-5" />
                  {t("Call Now")}
                </Button>
              </a>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 px-6 py-6 text-base md:text-lg group">
                  {t("Get a Free Quote")}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <ScrollLink to="owner-operated" smooth={true} duration={800} className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 text-white flex flex-col items-center cursor-pointer hover:text-bc-red transition-colors">
        <span className="text-sm mb-2">{t("Scroll Down")}</span>
        <ChevronDown className="animate-bounce" />
      </ScrollLink>
    </div>
  );
};

export default HeroSection;
