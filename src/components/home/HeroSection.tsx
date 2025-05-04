
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Shield, Star, Home, Phone, MessageSquare } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroSection = () => {
  const { t, language } = useTranslation();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const isMobile = useIsMobile();
  
  // Use different YouTube video IDs for mobile and desktop
  const videoId = isMobile ? "sAjdWDNtFQw" : "GJZpuELGJpI";
  
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
    
    return () => {
      if (video) {
        video.removeEventListener('loadeddata', handleVideoLoad);
      }
    };
  }, []);

  return (
    <section className="hero-section relative h-screen w-full overflow-hidden">
      {/* YouTube Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full overflow-hidden">
          <iframe 
            id="hero-video"
            className={`absolute w-full h-full top-0 left-0 scale-[1.5] ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&showinfo=0&rel=0&enablejsapi=1&version=3&playerapiid=ytplayer&si=78zvVAKO5SoskBj8`}
            title="Pressure Washing Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            loading="eager"
            onLoad={() => setVideoLoaded(true)}
          ></iframe>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/60"></div>
      </div>
      
      {/* Hero Content */}
      <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10 text-white pt-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-bc-red/20 backdrop-blur-sm px-4 py-1 rounded-full mb-4 animate-on-scroll">
            <span className="text-white font-medium text-sm md:text-base">Professional Exterior Cleaning Services</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-on-scroll">
            <span className="bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent">Transform Your Property's Appearance</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-6 animate-on-scroll delay-100 max-w-3xl mx-auto">
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
        
        <div className="flex flex-col sm:flex-row justify-center gap-5 mb-10 animate-on-scroll delay-300 mt-2">
          <Button asChild variant="bc-red" size="lg" className="text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all ease-in-out duration-200 hover:scale-105 hover:brightness-110">
            <Link to="/calculator">
              <MessageSquare className="mr-2" size={18} />
              Get a Free Quote
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg border-2 border-white/80 text-white bg-white/5 hover:bg-white/20 shadow-lg rounded-full hover:shadow-xl transition-all ease-in-out duration-200 hover:scale-105">
            <a href="tel:7788087620">
              <Phone className="mr-2" size={18} />
              Call Jayden: 778-808-7620
            </a>
          </Button>
        </div>
        
        {/* Personal Touch Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 animate-on-scroll delay-400 bg-white/10 backdrop-blur-sm p-4 rounded-xl max-w-md mx-auto border border-white/20">
          <img 
            src="/lovable-uploads/10e953e1-c5f0-4899-a3b7-944cf15bca76.png"
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
