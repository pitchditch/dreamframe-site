
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import HeroBackground from './hero/HeroBackground';
import HeroBanner from './hero/HeroBanner';
import HeroHeading from './hero/HeroHeading';
import HeroForm from './hero/HeroForm';
import HeroPersonalTouch from './hero/HeroPersonalTouch';
import HeroScrollIndicator from './hero/HeroScrollIndicator';

const HeroSection = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Only load on home page
  const isHomePage = location.pathname === '/' || location.pathname === '/home';
  
  useEffect(() => {
    if (!isHomePage) return;
    
    // Preload the new hero image
    const img = new Image();
    img.src = "/lovable-uploads/3774dac7-a537-41d3-b86b-eee5ae6dfd89.png";
    img.onload = () => {
      setVideoLoaded(true);
      setIsLoading(false);
      window.dispatchEvent(new CustomEvent('heroLoaded'));
    };
    // Start loading immediately
    img.loading = 'eager';
    
    // Fallback timer for faster loading
    setTimeout(() => {
      setVideoLoaded(true);
      setIsLoading(false);
      window.dispatchEvent(new CustomEvent('heroLoaded'));
    }, 500);
  }, [isMobile, isHomePage]);
  
  // Don't render hero section if not on home page
  if (!isHomePage) return null;

  return (
    <section className="hero-section relative h-screen w-full overflow-hidden">
      <HeroBackground videoLoaded={videoLoaded} isLoading={isLoading} />
      
      {/* Hero Content - Centered vertically */}
      <div className={`container mx-auto px-4 h-full flex flex-col justify-center items-start relative z-10 text-white ${videoLoaded && !isLoading ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}>
        <div className={`${isMobile ? 'max-w-full' : 'max-w-4xl'} text-left`}>
          <HeroBanner />
          <HeroHeading />
        </div>
        
        <HeroForm />
        <HeroPersonalTouch />
      </div>
      
      <HeroScrollIndicator videoLoaded={videoLoaded} isLoading={isLoading} />
    </section>
  );
};

export default HeroSection;
