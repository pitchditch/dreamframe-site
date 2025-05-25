
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Home, MessageSquare } from 'lucide-react';
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
    // Preload the videos for faster loading
    if (isMobile) {
      const img = new Image();
      img.src = "/lovable-uploads/e57e6764-cc42-4943-8a89-4d56f9c96469.png";
      img.onload = () => setVideoLoaded(true);
    } else {
      const videoElement = document.getElementById('hero-desktop-video') as HTMLIFrameElement;
      if (videoElement) {
        videoElement.onload = () => setVideoLoaded(true);
      }
      // Set video as loaded after a short delay even if onload doesn't trigger
      setTimeout(() => setVideoLoaded(true), 500);
    }
    
    // Check if postal code exists in session storage
    const savedPostalCode = sessionStorage.getItem('postalCode');
    if (savedPostalCode) {
      setPostalCode(savedPostalCode);
    }
    
  }, [isMobile]);

  const handlePostalCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save postal code to session and local storage
    sessionStorage.setItem('postalCode', postalCode);
    localStorage.setItem('postalCode', postalCode);
    
    // Track the submission
    trackFormSubmission('hero_postal_code', { postalCode });
    
    // Navigate to calculator page
    navigate('/calculator');
  };

  return (
    <section className="hero-section relative h-screen w-full overflow-hidden">
      {/* Background - Different for mobile and desktop */}
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full overflow-hidden">
          {isMobile ? (
            // Mobile Image Background
            <img 
              src="/lovable-uploads/e57e6764-cc42-4943-8a89-4d56f9c96469.png"
              alt="House with palm tree and red BC Pressure Washing car"
              className={`absolute w-full h-full object-cover transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          ) : (
            // Desktop YouTube Video
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/60"></div>
      </div>
      
      {/* Hero Content */}
      <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10 text-white pt-16 sm:pt-0">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-bc-red/20 backdrop-blur-sm px-4 py-1 rounded-full mb-4 animate-on-scroll">
            <span className="text-white font-medium text-sm md:text-base">{t("Professional Exterior Cleaning Services")}</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-5 animate-on-scroll text-shadow-lg">
            <span className="text-white">{t("Transform Your Property's Appearance")}</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl mb-5 animate-on-scroll delay-100 max-w-3xl mx-auto text-shadow">
            {t("Serving Surrey, White Rock & the Lower Mainland with premium pressure washing and cleaning solutions")}
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 my-6 animate-on-scroll delay-200">
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <Home className="text-white mr-2" size={20} />
              <span className="text-white font-medium">{t("Locally Owned")}</span>
            </div>
          </div>
        </div>
        
        {/* Postal Code Input Section */}
        <div className="max-w-2xl mx-auto w-full mt-2 mb-4 animate-on-scroll delay-300">
          <form onSubmit={handlePostalCodeSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <Input
                ref={inputRef}
                type="text"
                placeholder={t("Enter Your Postal Code")}
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="bg-white border-white text-black h-16 pl-4 pr-10 rounded-lg focus:ring-bc-red focus:border-bc-red placeholder-gray-500 text-xl font-medium w-full"
              />
            </div>
            <Button 
              type="submit" 
              variant="bc-red" 
              size="lg" 
              className="h-16 text-white text-xl font-medium rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl px-8 w-full sm:w-auto sm:min-w-[250px]"
            >
              {t("Check Prices & Availability")} <MessageSquare className="ml-2" size={20} />
            </Button>
          </form>
        </div>

        {/* Personal Touch Section - Enhanced visibility */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-4 animate-on-scroll delay-500">
          <div className="bg-white/20 backdrop-blur-sm p-4 md:p-5 rounded-xl max-w-md mx-auto border border-white/30 shadow-lg w-full sm:w-auto flex flex-row items-center">
            <img 
              src="/lovable-uploads/069112d9-e61f-4def-94ed-7f1c34172bfd.png"
              alt="Jayden Fisher - Owner" 
              className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white shadow-md mr-4"
            />
            <div className="text-center sm:text-left">
              <p className="font-bold text-white text-sm md:text-xl drop-shadow-md">{t("Every Job is Personally Checked by Me.")}</p>
              <p className="text-white font-medium text-xs md:text-base">— Jayden Fisher, {t("Owner")}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced scroll indicator with animation and label */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-white text-sm mb-1 bg-black/30 px-3 py-1 rounded-full">{t("Scroll Down")}</span>
        <div className="h-10 w-6 border-2 border-white rounded-full flex items-center justify-center">
          <div className="h-2 w-1 bg-white rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
