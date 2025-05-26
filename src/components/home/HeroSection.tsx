
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Phone, Calendar, ArrowDown, Play } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroSection = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const isMobile = useIsMobile();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleLoadedData = () => {
        setIsVideoLoaded(true);
      };
      
      video.addEventListener('loadeddata', handleLoadedData);
      return () => video.removeEventListener('loadeddata', handleLoadedData);
    }
  }, []);

  const handlePlayVideo = () => {
    const video = videoRef.current;
    if (video) {
      video.play();
      setShowPlayButton(false);
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay={!isMobile}
          muted
          loop
          playsInline
          poster="/lovable-uploads/5608bf56-7f0e-4f7f-9bb0-5ba81b9d267e.png"
        >
          <source src="/lovable-uploads/hero-video.mp4" type="video/mp4" />
        </video>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Play button overlay for mobile */}
      {isMobile && showPlayButton && (
        <button
          onClick={handlePlayVideo}
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/20"
        >
          <div className="bg-white/90 rounded-full p-4 shadow-lg hover:bg-white transition-colors">
            <Play className="w-8 h-8 text-bc-red ml-1" />
          </div>
        </button>
      )}
      
      {/* Content */}
      <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
        {/* Enhanced text with better shadow and background for readability */}
        <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-shadow-lg">Ready to Transform</span>
            <span className="block text-shadow-lg">Your Property?</span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed text-shadow-sm">
            Professional pressure washing, window cleaning, and exterior maintenance services in White Rock & Metro Vancouver
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-bc-red hover:bg-red-700 text-white font-bold px-8 py-4 text-lg shadow-xl">
              <Link to="/contact">
                <Calendar className="mr-2 h-5 w-5" />
                Get Free Quote
              </Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="bg-white/90 text-bc-red border-2 border-white hover:bg-white font-bold px-8 py-4 text-lg shadow-xl">
              <a href="tel:+17788087620">
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </a>
            </Button>
          </div>
          
          <div className="mt-8 text-sm md:text-base text-white/90">
            <p className="text-shadow-sm">✓ Fully Insured & Licensed</p>
            <p className="text-shadow-sm">✓ 100% Satisfaction Guarantee</p>
            <p className="text-shadow-sm">✓ Same-Day Response</p>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-white/80" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
