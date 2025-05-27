
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { MessageSquare, Phone } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';
import { Input } from "@/components/ui/input";
import { trackFormSubmission } from '@/utils/analytics';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const { t, language } = useTranslation();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [postalCode, setPostalCode] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isMobile) {
      const img = new Image();
      img.src = "/lovable-uploads/e57e6764-cc42-4943-8a89-4d56f9c96469.png";
      img.onload = () => setVideoLoaded(true);
    } else {
      const videoElement = document.getElementById('hero-desktop-video') as HTMLIFrameElement;
      if (videoElement) {
        videoElement.onload = () => setVideoLoaded(true);
      }
      setTimeout(() => setVideoLoaded(true), 500);
    }
    
    const savedPostalCode = sessionStorage.getItem('postalCode');
    if (savedPostalCode) {
      setPostalCode(savedPostalCode);
    }
  }, [isMobile]);

  const handlePostalCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    sessionStorage.setItem('postalCode', postalCode);
    localStorage.setItem('postalCode', postalCode);
    
    trackFormSubmission('hero_postal_code', { postalCode });
    
    navigate('/calculator');
  };

  return (
    <section className="hero-section relative h-screen w-full overflow-hidden">
      {/* Background - Different for mobile and desktop */}
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full overflow-hidden">
          {isMobile ? (
            <img 
              src="/lovable-uploads/e57e6764-cc42-4943-8a89-4d56f9c96469.png"
              alt="House with palm tree and red BC Pressure Washing car"
              className={`absolute w-full h-full object-cover object-center transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          ) : (
            <iframe 
              id="hero-desktop-video"
              className={`absolute w-full h-full top-0 left-0 scale-[1.5] transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
              src="https://www.youtube.com/embed/GJZpuELGJpI?autoplay=1&mute=1&controls=0&loop=1&playlist=GJZpuELGJpI&showinfo=0&rel=0&enablejsapi=1&version=3&playerapiid=ytplayer&si=78zvVAKO5SoskBj8&preload=auto"
              title="Pressure Washing Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              loading="eager"
            ></iframe>
          )}
        </div>
        {/* Enhanced overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/70"></div>
      </div>
      
      {/* Hero Content - Mobile Optimized */}
      <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10 text-white pt-24 sm:pt-28 md:pt-32">
        <div className="max-w-4xl text-center mx-auto">
          {/* Service Badge */}
          <div className="inline-block bg-bc-red px-4 py-2 rounded mb-4 animate-on-scroll">
            <span className="text-white font-medium text-xs sm:text-sm">{t("Professional Pressure Washing Services")}</span>
          </div>
          
          {/* Main Headline - Shortened for mobile */}
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 animate-on-scroll leading-tight">
            <span className="text-white">
              {isMobile ? t("The Ultimate Exterior Cleaning Service") : t("The Ultimate Cleaning")} 
              {!isMobile && <span className="text-bc-red"> {t("Solution")}</span>}
              {!isMobile && t(" for Your Property")}
            </span>
          </h1>
          
          {/* Subtext - Shortened for mobile */}
          <p className="text-sm sm:text-base md:text-xl lg:text-2xl mb-6 animate-on-scroll delay-100 max-w-3xl font-medium text-white mx-auto">
            {isMobile 
              ? t("Fast, affordable results in Surrey, Langley, and more.")
              : t("We deliver exceptional cleaning results for residential and commercial properties with our state-of-the-art equipment and professional techniques.")
            }
          </p>
          
          {/* Postal Code Input - Full width on mobile */}
          <div className="w-full mt-6 mb-6 animate-on-scroll delay-300">
            <form onSubmit={handlePostalCodeSubmit} className="flex flex-col gap-3">
              <div className="relative w-full">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder={t("Enter Your Postal Code")}
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="bg-white border-white text-black h-12 md:h-14 px-4 rounded-lg focus:ring-bc-red focus:border-bc-red placeholder-gray-500 text-base md:text-lg font-medium w-full"
                />
              </div>
            </form>
          </div>

          {/* CTA Buttons - Stacked on mobile */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-6 animate-on-scroll delay-500">
            <Button 
              onClick={handlePostalCodeSubmit}
              variant="bc-red" 
              size="lg" 
              className="h-12 md:h-14 text-white text-base md:text-lg font-medium rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl px-6 w-full sm:w-auto"
            >
              🔴 {t("Check Prices & Availability")}
            </Button>
            <Link to="/calculator" className="w-full sm:w-auto">
              <Button 
                variant="secondary" 
                size="lg" 
                className="h-12 md:h-14 bg-green-500 hover:bg-green-600 text-white text-base md:text-lg font-medium rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl px-6 w-full"
              >
                🟢 {t("Get Free Quote Online")}
              </Button>
            </Link>
          </div>

          {/* Owner Badge - Centered with max width */}
          <div className="flex justify-center mt-6 animate-on-scroll delay-700">
            <div className="bg-black/50 backdrop-blur-sm p-3 md:p-4 rounded-xl max-w-[85%] border border-white/30 shadow-lg flex flex-row items-center">
              <img 
                src="/lovable-uploads/069112d9-e61f-4def-94ed-7f1c34172bfd.png"
                alt="Jayden Fisher - Owner" 
                className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-white shadow-md mr-3 flex-shrink-0"
              />
              <div className="text-left">
                <p className="font-bold text-white text-xs sm:text-sm md:text-base drop-shadow-md leading-tight">{t("Every Job is Personally Checked by Me.")}</p>
                <p className="text-white font-medium text-xs md:text-sm mt-1">— Jayden Fisher, {t("Owner")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced scroll indicator - Updated text */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-white text-sm mb-1 bg-black/30 px-3 py-1 rounded-full">{t("Scroll Up")}</span>
        <div className="h-10 w-6 border-2 border-white rounded-full flex items-center justify-center">
          <div className="h-2 w-1 bg-white rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
