
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Shield, Star, Home } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

const HeroSection = () => {
  const { t, language } = useTranslation();
  const [videoLoaded, setVideoLoaded] = useState(false);
  
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
            src="https://www.youtube.com/embed/GJZpuELGJpI?autoplay=1&mute=1&controls=0&loop=1&playlist=GJZpuELGJpI&showinfo=0&rel=0&enablejsapi=1&version=3&playerapiid=ytplayer&si=78zvVAKO5SoskBj8"
            title="Pressure Washing Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            loading="eager"
            onLoad={() => setVideoLoaded(true)}
          ></iframe>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
      </div>
      
      {/* Hero Content */}
      <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10 text-white text-center pt-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-on-scroll">
          Exterior Cleaning You Can Trust
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-6 animate-on-scroll delay-100">
          Serving Surrey, White Rock & the Lower Mainland
        </p>
        
        <div className="text-lg md:text-xl mb-10 animate-on-scroll delay-200 max-w-2xl mx-auto">
          <p>Window Cleaning • Pressure Washing • Gutter Cleaning</p>
          <p className="mt-2">Fully Insured & 5-Star Rated — Backed by Jayden Fisher's Quality Guarantee</p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10 animate-on-scroll delay-300">
          <Button asChild variant="bc-red" size="lg" className="text-lg">
            <Link to="/calculator">Get an Instant Quote</Link>
          </Button>
          <Button 
            asChild 
            variant="outline" 
            size="lg" 
            className="text-lg border-2 border-white text-white bg-white/10 hover:bg-white/30 hover:text-white hover:border-white transition-all shadow-lg animate-pulse"
          >
            <a href="tel:7788087620">Speak With Jayden</a>
          </Button>
        </div>
        
        {/* Personal Touch Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 animate-on-scroll delay-400">
          <img 
            src="/lovable-uploads/10e953e1-c5f0-4899-a3b7-944cf15bca76.png"
            alt="Jayden Fisher - Owner" 
            className="w-16 h-16 rounded-full border-2 border-white"
          />
          <div className="text-center sm:text-left">
            <p className="font-medium">"Every Job is Personally Checked by Me."</p>
            <p>— Jayden Fisher, Owner</p>
          </div>
        </div>
        
        {/* Trust Icons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-2 animate-on-scroll delay-500">
          <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
            <Star className="text-yellow-400 mr-2" size={20} />
            <span className="text-white font-medium">5-Star Google Rated</span>
          </div>
          <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
            <Shield className="text-white mr-2" size={20} />
            <span className="text-white font-medium">Fully Insured</span>
          </div>
          <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
            <Home className="text-white mr-2" size={20} />
            <span className="text-white font-medium">Locally Owned</span>
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
