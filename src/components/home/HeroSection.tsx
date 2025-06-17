
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { MessageSquare } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';
import { Input } from "@/components/ui/input";
import { trackFormSubmission } from '@/utils/analytics';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const { t, language } = useTranslation();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [postalCode, setPostalCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Only load video on home page
  const isHomePage = location.pathname === '/' || location.pathname === '/home';
  
  useEffect(() => {
    if (!isHomePage) return;
    
    if (isMobile) {
      // Preload mobile background image
      const img = new Image();
      img.src = "/lovable-uploads/e57e6764-cc42-4943-8a89-4d56f9c96469.png";
      img.onload = () => {
        setVideoLoaded(true);
        setIsLoading(false);
        window.dispatchEvent(new CustomEvent('heroLoaded'));
      };
    } else {
      // For desktop, create iframe with better loading
      const iframe = document.createElement('iframe');
      iframe.src = "https://www.youtube.com/embed/GJZpuELGJpI?autoplay=1&mute=1&controls=0&loop=1&playlist=GJZpuELGJpI&showinfo=0&rel=0&enablejsapi=1&version=3&playerapiid=ytplayer&preload=auto";
      iframe.style.opacity = '0';
      
      iframe.onload = () => {
        setTimeout(() => {
          setVideoLoaded(true);
          setIsLoading(false);
          window.dispatchEvent(new CustomEvent('heroLoaded'));
        }, 1000); // Give video time to start playing
      };
      
      // Fallback timer
      setTimeout(() => {
        setVideoLoaded(true);
        setIsLoading(false);
        window.dispatchEvent(new CustomEvent('heroLoaded'));
      }, 2000);
    }
    
    const savedPostalCode = sessionStorage.getItem('postalCode');
    if (savedPostalCode) {
      setPostalCode(savedPostalCode);
    }
  }, [isMobile, isHomePage]);

  const handlePostalCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    sessionStorage.setItem('postalCode', postalCode);
    localStorage.setItem('postalCode', postalCode);
    
    trackFormSubmission('hero_postal_code', { postalCode });
    
    navigate('/calculator');
  };

  // Don't render hero section if not on home page
  if (!isHomePage) return null;

  return (
    <section className="hero-section relative h-screen w-full overflow-hidden">
      {/* Loading Screen */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/60 z-30 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl font-medium">Loading...</p>
          </div>
        </div>
      )}

      {/* Background - Different for mobile and desktop */}
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full overflow-hidden">
          {isMobile ? (
            <img 
              src="/lovable-uploads/e57e6764-cc42-4943-8a89-4d56f9c96469.png"
              alt="House with palm tree and red BC Pressure Washing car"
              className={`absolute w-full h-full object-cover object-center transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
              loading="eager"
            />
          ) : (
            <iframe 
              id="hero-desktop-video"
              className={`absolute w-full h-full top-0 left-0 scale-[1.5] transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
              src="https://www.youtube.com/embed/GJZpuELGJpI?autoplay=1&mute=1&controls=0&loop=1&playlist=GJZpuELGJpI&showinfo=0&rel=0&enablejsapi=1&version=3&playerapiid=ytplayer&preload=auto"
              title="Pressure Washing Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              loading="eager"
            ></iframe>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/60"></div>
      </div>
      
      {/* Hero Content */}
      <div className={`container mx-auto px-4 h-full flex flex-col justify-center relative z-10 text-white ${isMobile ? 'pt-8 sm:pt-12' : 'pt-16 sm:pt-20 md:pt-24'} ${videoLoaded && !isLoading ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
        <div className={`${isMobile ? 'max-w-full' : 'max-w-4xl'} text-left`}>
          <div className="inline-block bg-bc-red px-4 py-2 rounded mb-4 md:mb-6 animate-on-scroll">
            <span className="text-white font-medium text-lg sm:text-xl md:text-2xl">{t("Professional Pressure Washing Services")}</span>
          </div>
          
          <div className="mb-6 md:mb-8">
            <h1 className={`${isMobile ? 'text-2xl leading-tight' : 'text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl'} font-bold mb-4 md:mb-6 animate-on-scroll leading-tight`}>
              <span className="text-white">
                {isMobile ? (
                  <>
                    {t("The Ultimate")} <span className="text-bc-red">{t("Cleaning Solution")}</span>
                    <br />
                    {t("for Your Property")}
                  </>
                ) : (
                  <>
                    {t("The Ultimate Cleaning")} <span className="text-bc-red">{t("Solution")}</span> {t("for Your Property")}
                  </>
                )}
              </span>
            </h1>
            
            <p className={`${isMobile ? 'text-base leading-relaxed' : 'text-sm sm:text-base md:text-xl lg:text-2xl'} mb-4 md:mb-6 animate-on-scroll delay-100 max-w-3xl font-medium text-white`}>
              {isMobile 
                ? t("Fast, affordable exterior cleaning in Surrey, White Rock & Metro Vancouver.")
                : t("We deliver exceptional cleaning results for residential and commercial properties with our state-of-the-art equipment and professional techniques.")
              }
            </p>
          </div>
        </div>
        
        {/* Postal Code Input Section */}
        <div className={`${isMobile ? 'w-full' : 'max-w-2xl w-full'} mt-2 md:mt-4 mb-4 md:mb-6 animate-on-scroll delay-300`}>
          <form onSubmit={handlePostalCodeSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <Input
                ref={inputRef}
                type="text"
                placeholder={t("Enter Your Postal Code")}
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className={`bg-white border-white text-black ${isMobile ? 'h-14 text-lg rounded-xl' : 'h-12 md:h-16 text-base md:text-xl rounded-lg'} pl-4 pr-10 focus:ring-bc-red focus:border-bc-red placeholder-gray-500 font-medium w-full`}
              />
            </div>
            <Button 
              type="submit" 
              variant="bc-red" 
              size="lg" 
              className={`${isMobile ? 'h-14 text-lg rounded-xl px-6' : 'h-12 md:h-16 text-base md:text-xl rounded-lg px-6 md:px-8'} text-white font-medium shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl w-full sm:w-auto sm:min-w-[200px] md:sm:min-w-[250px]`}
            >
              {isMobile ? t("Check Prices") : t("Check Prices & Availability")} <MessageSquare className="ml-2" size={16} />
            </Button>
          </form>
        </div>

        {/* Personal Touch Section */}
        <div className={`flex flex-col sm:flex-row items-start justify-start gap-4 my-4 md:my-6 animate-on-scroll delay-700 ${isMobile ? 'max-w-full mb-8' : 'mb-16'}`}>
          <div className={`bg-black/40 backdrop-blur-sm ${isMobile ? 'p-4 rounded-xl max-w-full' : 'p-3 md:p-4 lg:p-6 rounded-xl max-w-md'} border border-white/30 shadow-lg w-full sm:w-auto flex flex-row items-center`}>
            <img 
              src="/lovable-uploads/069112d9-e61f-4def-94ed-7f1c34172bfd.png"
              alt="Jayden Fisher - Owner" 
              className={`${isMobile ? 'w-14 h-14' : 'w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20'} rounded-full border-2 border-white shadow-md mr-3 md:mr-4 flex-shrink-0`}
            />
            <div className="text-left">
              <p className={`font-bold text-white ${isMobile ? 'text-sm leading-tight' : 'text-xs sm:text-sm md:text-base lg:text-lg'} drop-shadow-md leading-tight`}>
                {t("Every Job is Personally Checked by Me.")}
              </p>
              <p className={`text-white font-medium ${isMobile ? 'text-xs mt-1' : 'text-xs md:text-sm mt-1'}`}>
                — Jayden Fisher, {t("Owner")}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced scroll indicator with animation and label */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce z-20 ${videoLoaded && !isLoading ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
        <span className="text-white text-sm mb-2 bg-black/50 px-4 py-2 rounded-full font-medium shadow-lg backdrop-blur-sm border border-white/20">
          {t("Scroll Up")}
        </span>
        <div className="h-10 w-6 border-2 border-white rounded-full flex items-center justify-center bg-black/30 backdrop-blur-sm shadow-lg">
          <div className="h-2 w-1 bg-white rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
