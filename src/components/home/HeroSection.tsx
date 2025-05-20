
import React from 'react';
import { Button } from '../ui/button';
import { Phone, ArrowRight, ChevronDown } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

const HeroSection = () => {
  const { t, language } = useTranslation();
  
  const handleScrollDown = () => {
    window.scrollBy({
      top: window.innerHeight * 0.8,
      behavior: 'smooth'
    });
  };
  
  return (
    <div className="relative h-screen max-h-[800px] md:max-h-[900px] w-full overflow-hidden">
      {/* Video Background */}
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
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Hero Content */}
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
                <Button 
                  size="lg"
                  className="bg-bc-red hover:bg-red-700 text-white px-6 py-6 text-base md:text-lg group transition-all duration-300 hover:scale-105"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  {t("Call Now")}: 778 808 7620
                </Button>
              </a>
              
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/20 px-6 py-6 text-base md:text-lg transition-all duration-300 hover:scale-105"
                onClick={handleScrollDown}
              >
                {t("Scroll Down")}
                <ChevronDown className="ml-2 h-5 w-5 animate-bounce" />
              </Button>
            </div>
            
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
              <div className="flex items-center space-x-2">
                <div className="bg-white rounded-full h-8 w-8 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-bc-red" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-white font-medium text-sm">{t("Fully Insured")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-white rounded-full h-8 w-8 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-bc-red" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span className="text-white font-medium text-sm">{t("5-Star Service")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-white rounded-full h-8 w-8 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-bc-red" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-white font-medium text-sm">{t("Locally Owned")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Owner Badge */}
      <div className="absolute right-4 bottom-4 md:right-8 md:bottom-8 z-20 flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
        <img 
          src="/lovable-uploads/b05d1af5-48fb-4bed-a580-f986d22828be.png" 
          alt="Owner" 
          className="h-12 w-12 rounded-full border-2 border-bc-red"
        />
        <div>
          <p className="text-sm font-medium text-gray-900">{t("Every Job is Personally Checked by Me.")}</p>
          <p className="text-xs text-gray-600">Jayden Fisher, {t("Owner")}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
