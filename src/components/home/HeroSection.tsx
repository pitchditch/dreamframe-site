
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Shield } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

const HeroSection = () => {
  const { t, language } = useTranslation();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  
  // Array of video sources
  const videos = [
    "/lovable-uploads/5dc551e8-8c04-4092-8262-c5c6f0526745.png",
    "/lovable-uploads/95690760-6960-4c61-bf22-5b66e2eab0cf.png",
    "/lovable-uploads/76968d4f-c862-4989-a3e3-b74ac31968e2.png"
  ];

  // Auto-rotate background videos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={videos[currentVideoIndex]}
          alt="BC Pressure Washing Services"
          className="w-full h-full object-cover transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
      </div>
      
      {/* Licensed & Insured badge, top-right */}
      <img 
        src="/lovable-uploads/a1f01b41-c73a-4644-8580-6399a42951bf.png"
        alt="Licensed & Insured"
        className="absolute top-32 right-8 w-32 h-32 md:w-40 md:h-40 object-contain z-20 drop-shadow-lg"
        style={{ pointerEvents: 'none' }}
      />
      
      {/* Hero Content */}
      <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10 text-white text-center pt-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-on-scroll">
          {t("Professional Exterior Cleaning Services")}
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 animate-on-scroll delay-100">
          {t("Serving Surrey, White Rock & Metro Vancouver")}
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-10 animate-on-scroll delay-200">
          <Button asChild variant="bc-red" size="lg" className="text-lg">
            <Link to="/calculator">Get a Free Quote</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg border-white text-white hover:bg-white/10">
            <Link to="/services">See All Services</Link>
          </Button>
        </div>
        
        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8 animate-on-scroll delay-300">
          <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
            <div className="mr-2 text-white">
              <Shield size={24} />
            </div>
            <span className="text-white font-medium">Fully Insured</span>
          </div>
          <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
            <img src="/lovable-uploads/0889ee32-e298-45b5-91f8-825360447c0b.png" alt="5-star rated" className="w-5 h-5 mr-2" />
            <span className="text-white font-medium">5-Star Rated</span>
          </div>
          <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
            <img src="/lovable-uploads/0c2175e3-0c77-4b8a-8670-db9aa6ff6e63.png" alt="Since 2019" className="w-5 h-5 mr-2" />
            <span className="text-white font-medium">Since 2019</span>
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
