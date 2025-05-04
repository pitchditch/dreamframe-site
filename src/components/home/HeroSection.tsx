import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Shield, Star, Home, MessageSquare } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';
import { Input } from "@/components/ui/input";
import { trackFormSubmission } from '@/utils/analytics';

// List of Lower Mainland postal codes to ghost type
const lowerMainlandPostalCodes = [
  'V5T 1Z7', 'V6E 1M3', 'V7Y 1C6', 'V3S 2K7', 'V3R 4N2', 
  'V8X 1W2', 'V4C 5L8', 'V2X 9V4', 'V1M 0B2', 'V4A 9E3'
];

const HeroSection = () => {
  const { t, language } = useTranslation();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [postalCode, setPostalCode] = useState('');
  const [ghostText, setGhostText] = useState('');
  const [ghostIndex, setGhostIndex] = useState(0);
  const [currentGhostChar, setCurrentGhostChar] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  useEffect(() => {
    const video = document.getElementById('hero-video') as HTMLVideoElement;
    
    const handleVideoLoad = () => {
      setVideoLoaded(true);
    };
    
    if (video) {
      if (video.readyState >= 3) {
        setVideoLoaded(true);
      } else {
        video.addEventListener('loadeddata', handleVideoLoad);
      }
    }
    
    // Check if postal code exists in session storage
    const savedPostalCode = sessionStorage.getItem('postalCode');
    if (savedPostalCode) {
      setPostalCode(savedPostalCode);
    }
    
    return () => {
      if (video) {
        video.removeEventListener('loadeddata', handleVideoLoad);
      }
    };
  }, []);

  // Ghost writer effect for postal code input
  useEffect(() => {
    if (inputRef.current !== document.activeElement && !postalCode) {
      const timer = setTimeout(() => {
        if (isTyping && !isPaused) {
          // Typing forward
          if (currentGhostChar < lowerMainlandPostalCodes[ghostIndex].length) {
            setGhostText(lowerMainlandPostalCodes[ghostIndex].substring(0, currentGhostChar + 1));
            setCurrentGhostChar(prev => prev + 1);
          } else {
            // Pause at the end of typing
            setIsPaused(true);
            setTimeout(() => {
              setIsPaused(false);
              setIsTyping(false);
            }, 2000);
          }
        } else if (!isTyping && !isPaused) {
          // Deleting
          if (currentGhostChar > 0) {
            setGhostText(lowerMainlandPostalCodes[ghostIndex].substring(0, currentGhostChar - 1));
            setCurrentGhostChar(prev => prev - 1);
          } else {
            // Move to next postal code
            setIsTyping(true);
            setGhostIndex((prev) => (prev + 1) % lowerMainlandPostalCodes.length);
          }
        }
      }, isTyping ? 150 : 50);
      
      return () => clearTimeout(timer);
    }
    
    return () => {};
  }, [ghostText, currentGhostChar, isTyping, ghostIndex, isPaused, postalCode]);

  // Clear ghost text on focus
  const handleInputFocus = () => {
    setGhostText('');
  };

  // Show ghost text on blur if input is empty
  const handleInputBlur = () => {
    if (!postalCode) {
      setCurrentGhostChar(0);
      setIsTyping(true);
    }
  };

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
      {/* YouTube Video Background - Different videos for mobile and desktop */}
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full overflow-hidden">
          {isMobile ? (
            // Mobile YouTube Video
            <iframe 
              id="hero-video"
              className={`absolute w-full h-full top-0 left-0 scale-[1.5] ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
              src="https://www.youtube.com/embed/sAjdWDNtFQw?autoplay=1&mute=1&controls=0&loop=1&playlist=sAjdWDNtFQw&showinfo=0&rel=0&enablejsapi=1&version=3&playerapiid=ytplayer"
              title="Pressure Washing Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              loading="eager"
              onLoad={() => setVideoLoaded(true)}
            ></iframe>
          ) : (
            // Desktop YouTube Video
            <iframe 
              id="hero-video"
              className={`absolute w-full h-full top-0 left-0 scale-[1.5] ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
              src="https://www.youtube.com/embed/GJZpuELGJpI?autoplay=1&mute=1&controls=0&loop=1&playlist=GJZpuELGJpI&showinfo=0&rel=0&enablejsapi=1&version=3&playerapiid=ytplayer&si=78zvVAKO5SoskBj8"
              title="Pressure Washing Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              loading="eager"
              onLoad={() => setVideoLoaded(true)}
            ></iframe>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/60"></div>
      </div>
      
      {/* Hero Content */}
      <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10 text-white pt-24 sm:pt-16 md:pt-0">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-bc-red/20 backdrop-blur-sm px-4 py-1 rounded-full mb-4 animate-on-scroll">
            <span className="text-white font-medium text-sm md:text-base">Professional Exterior Cleaning Services</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-on-scroll text-shadow-lg">
            <span className="bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent">Transform Your Property's Appearance</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl mb-6 animate-on-scroll delay-100 max-w-3xl mx-auto text-shadow">
            Serving Surrey, White Rock & the Lower Mainland with premium pressure washing and cleaning solutions
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 my-8 animate-on-scroll delay-200">
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <Shield className="text-white mr-2" size={20} />
              <span className="text-white font-medium">Fully Insured</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <Star className="text-yellow-400 mr-2" size={20} />
              <span className="text-white font-medium">5-Star Rated</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <Home className="text-white mr-2" size={20} />
              <span className="text-white font-medium">Locally Owned</span>
            </div>
          </div>
        </div>
        
        {/* Postal Code Input Section - Enhanced visibility */}
        <div className="max-w-xl mx-auto w-full mt-4 mb-8 animate-on-scroll delay-300">
          <form onSubmit={handlePostalCodeSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Enter Your Postal Code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                className="bg-white/40 backdrop-blur-md border-white/40 text-white h-16 pl-4 pr-10 rounded-lg focus:ring-bc-red focus:border-bc-red placeholder-white text-xl font-medium"
              />
              {!postalCode && ghostText && (
                <div className="absolute top-0 left-0 h-full flex items-center pointer-events-none">
                  <span className="text-gray-300/70 pl-4 text-xl">{ghostText}</span>
                </div>
              )}
            </div>
            <Button 
              type="submit" 
              variant="bc-red" 
              size="lg" 
              className="h-16 text-white text-xl font-medium rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl px-8 min-w-[250px]"
            >
              Check Prices & Availability <MessageSquare className="ml-2" size={20} />
            </Button>
          </form>
        </div>
        
        {/* Personal Touch Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 animate-on-scroll delay-400 bg-white/10 backdrop-blur-sm p-4 rounded-xl max-w-md mx-auto border border-white/20">
          <img 
            src="/lovable-uploads/069112d9-e61f-4def-94ed-7f1c34172bfd.png"
            alt="Jayden Fisher - Owner" 
            className="w-16 h-16 rounded-full border-2 border-white"
          />
          <div className="text-center sm:text-left">
            <p className="font-medium">"Every Job is Personally Checked by Me."</p>
            <p className="text-white/80">— Jayden Fisher, Owner</p>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-white text-sm mb-2">Scroll</span>
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
