
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <section className="hero-section relative min-h-screen flex items-center justify-center">
      {isMobile ? (
        // Mobile YouTube short video
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/sAjdWDNtFQw?autoplay=1&mute=1&loop=1&playlist=sAjdWDNtFQw&controls=0&disablekb=1&showinfo=0&rel=0"
            title="Window Cleaning Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="w-full h-full object-cover"
            style={{ pointerEvents: 'none' }}
          ></iframe>
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
      ) : (
        // Desktop video
        <>
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute top-0 left-0 w-full h-full object-cover"
            >
              <source src="/lovable-uploads/5d129c1e-f5d7-4fa6-a1f1-78e9ba4b05c5.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        </>
      )}

      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up-in">
            Professional Pressure Washing & Window Cleaning
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-up-in">
            Serving White Rock, Surrey, Langley & Metro Vancouver with top-rated exterior cleaning services.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-up-in">
            <Link to="/calculator">
              <Button variant="bc-red" size="lg" className="text-lg px-8 py-6 font-medium transition-transform duration-300 transform hover:scale-105">
                Check Prices & Availability
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <a href="tel:7788087620">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-white/20 backdrop-blur-sm text-white border-white/40 hover:bg-white/30 transition-transform duration-300 transform hover:scale-105">
                Call Now: 778-808-7620
              </Button>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default HeroSection;
