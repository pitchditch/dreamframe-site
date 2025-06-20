
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
  }, [isMobile, isHomePage]);

  // Don't render hero section if not on home page
  if (!isHomePage) return null;

  return (
    <section className="hero-section relative h-screen w-full overflow-hidden">
      <HeroBackground videoLoaded={videoLoaded} isLoading={isLoading} />
      
      {/* Hero Content */}
      <div className={`container mx-auto px-4 h-full flex flex-col justify-center relative z-10 text-white ${isMobile ? 'pt-16 sm:pt-20' : 'pt-20 sm:pt-24 md:pt-28'} ${videoLoaded && !isLoading ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}>
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
