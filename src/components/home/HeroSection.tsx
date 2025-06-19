
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
      // Preload mobile background image immediately
      const img = new Image();
      img.src = "/lovable-uploads/e57e6764-cc42-4943-8a89-4d56f9c96469.png";
      img.onload = () => {
        setVideoLoaded(true);
        setIsLoading(false);
        window.dispatchEvent(new CustomEvent('heroLoaded'));
      };
      // Start loading immediately
      img.loading = 'eager';
    } else {
      // For desktop, preload the video with aggressive settings
      const videoPreloader = document.createElement('iframe');
      videoPreloader.src = "https://www.youtube.com/embed/GJZpuELGJpI?autoplay=1&mute=1&controls=0&loop=1&playlist=GJZpuELGJpI&showinfo=0&rel=0&enablejsapi=1&version=3&playerapiid=ytplayer&preload=metadata";
      videoPreloader.style.position = 'absolute';
      videoPreloader.style.opacity = '0';
      videoPreloader.style.pointerEvents = 'none';
      document.body.appendChild(videoPreloader);
      
      videoPreloader.onload = () => {
        setTimeout(() => {
          setVideoLoaded(true);
          setIsLoading(false);
          window.dispatchEvent(new CustomEvent('heroLoaded'));
          document.body.removeChild(videoPreloader);
        }, 300); // Reduced delay for faster loading
      };
      
      // Fallback timer - much faster
      setTimeout(() => {
        setVideoLoaded(true);
        setIsLoading(false);
        window.dispatchEvent(new CustomEvent('heroLoaded'));
        if (document.body.contains(videoPreloader)) {
          document.body.removeChild(videoPreloader);
        }
      }, 800); // Reduced from 1500ms
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
              className={`absolute w-full h-full object-cover object-center transition-opacity duration-700 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
              loading="eager"
              fetchPriority="high"
            />
          ) : (
            <>
              {/* Poster image for instant loading */}
              <img 
                src="/lovable-uploads/e57e6764-cc42-4943-8a89-4d56f9c96469.png"
                alt="BC Pressure Washing Service"
                className={`absolute w-full h-full object-cover object-center transition-opacity duration-300 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`}
                loading="eager"
                fetchPriority="high"
              />
              <iframe 
                id="hero-desktop-video"
                className={`absolute w-full h-full top-0 left-0 scale-[1.5] transition-opacity duration-700 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
                src="https://www.youtube.com/embed/GJZpuELGJpI?autoplay=1&mute=1&controls=0&loop=1&playlist=GJZpuELGJpI&showinfo=0&rel=0&enablejsapi=1&version=3&playerapiid=ytplayer&preload=metadata"
                title="Pressure Washing Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                loading="eager"
              ></iframe>
            </>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/60"></div>
      </div>
      
      {/* Hero Content */}
      <div className={`container mx-auto px-4 h-full flex flex-col justify-center relative z-10 text-white ${isMobile ? 'pt-8 sm:pt-12' : 'pt-16 sm:pt-20 md:pt-24'} ${videoLoaded && !isLoading ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}>
        <div className={`${isMobile ? 'max-w-full' : 'max-w-4xl'} text-left`}>
          {/* Updated banner with better sizing and positioning */}
          <div className="inline-block bg-bc-red px-6 py-3 rounded-lg mb-6 md:mb-8 animate-on-scroll">
            <span className="text-white font-bold text-xl sm:text-2xl md:text-3xl leading-tight">{t("Tired of Dirty Siding & Grimy Driveways?")}</span>
          </div>
          
          <div className="mb-8 md:mb-10">
            {/* Increased text sizes significantly */}
            <h1 className={`${isMobile ? 'text-3xl leading-tight' : 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl'} font-bold mb-6 md:mb-8 animate-on-scroll leading-tight`}>
              <span className="text-white">
                {isMobile ? (
                  <>
                    {t("Make Your Home")} <span className="text-bc-red drop-shadow-lg" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.9), 0 0 0 2px rgba(255,255,255,0.1)' }}>{t("Shine Instantly")}</span>
                  </>
                ) : (
                  <>
                    {t("Make Your Home")} <span className="text-bc-red drop-shadow-lg" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.9), 0 0 0 2px rgba(255,255,255,0.1)' }}>{t("Shine Instantly")}</span>
                  </>
                )}
              </span>
            </h1>
            
            {/* Increased subtitle text size */}
            <p className={`${isMobile ? 'text-lg leading-relaxed' : 'text-lg sm:text-xl md:text-2xl lg:text-3xl'} mb-6 md:mb-8 animate-on-scroll delay-100 max-w-4xl font-medium text-white drop-shadow-md`} style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
              {isMobile 
                ? t("Fast, friendly pressure washing for homes & businesses in White Rock, Surrey & Metro Vancouver. We'll blast away dirt, mold & grime!")
                : t("Fast, fully insured service backed by a satisfaction guarantee. We'll make your property sparkle!")
              }
            </p>
          </div>
        </div>
        
        {/* Postal Code Input Section */}
        <div className={`${isMobile ? 'w-full' : 'max-w-2xl w-full'} mt-4 md:mt-6 mb-6 md:mb-8 animate-on-scroll delay-300`}>
          <form onSubmit={handlePostalCodeSubmit} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Input
                ref={inputRef}
                type="text"
                placeholder={t("Enter Your Postal Code")}
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className={`bg-white border-white text-black ${isMobile ? 'h-16 text-xl rounded-xl' : 'h-14 md:h-18 text-lg md:text-2xl rounded-lg'} pl-4 pr-10 focus:ring-bc-red focus:border-bc-red placeholder-gray-500 font-medium w-full`}
              />
            </div>
            <Button 
              type="submit" 
              variant="bc-red" 
              size="lg" 
              className={`${isMobile ? 'h-16 text-xl rounded-xl px-8' : 'h-14 md:h-18 text-lg md:text-2xl rounded-lg px-8 md:px-10'} text-white font-medium shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl w-full sm:w-auto sm:min-w-[250px] md:sm:min-w-[300px]`}
            >
              {isMobile ? t("Free Instant Quote") : t("Get Your Free Instant Estimate")} <MessageSquare className="ml-2" size={20} />
            </Button>
          </form>
        </div>

        {/* Personal Touch Section */}
        <div className={`flex flex-col sm:flex-row items-start justify-start gap-4 my-6 md:my-8 animate-on-scroll delay-700 ${isMobile ? 'max-w-full mb-10' : 'mb-20'}`}>
          <div className={`bg-black/40 backdrop-blur-sm ${isMobile ? 'p-5 rounded-xl max-w-full' : 'p-4 md:p-5 lg:p-7 rounded-xl max-w-lg'} border border-white/30 shadow-lg w-full sm:w-auto flex flex-row items-center`}>
            <img 
              src="/lovable-uploads/069112d9-e61f-4def-94ed-7f1c34172bfd.png"
              alt="Jayden Fisher - Owner" 
              className={`${isMobile ? 'w-16 h-16' : 'w-14 h-14 md:w-18 md:h-18 lg:w-22 lg:h-22'} rounded-full border-2 border-white shadow-md mr-4 md:mr-5 flex-shrink-0`}
            />
            <div className="text-left">
              <p className={`font-bold text-white ${isMobile ? 'text-base leading-tight' : 'text-sm sm:text-base md:text-lg lg:text-xl'} drop-shadow-md leading-tight`} style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                {t("Every Job is Personally Checked by Me.")}
              </p>
              <p className={`text-white font-medium ${isMobile ? 'text-sm mt-1' : 'text-sm md:text-base mt-1'}`} style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                — Jayden Fisher, {t("Owner")}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced scroll indicator with animation and label */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce z-20 ${videoLoaded && !isLoading ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}>
        <span className="text-white text-sm mb-2 bg-black/50 px-4 py-2 rounded-full font-medium shadow-lg backdrop-blur-sm border border-white/20" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
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
