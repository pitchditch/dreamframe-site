
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import HeroBackground from './hero/HeroBackground';
import HeroHeading from './hero/HeroHeading';
import HeroPersonalTouch from './hero/HeroPersonalTouch';
import HeroQuoteForm from './hero/HeroQuoteForm';

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
      img.src = "/lovable-uploads/153cea1e-00de-4f89-8419-beef4ce2c857.png";
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
        }, 300);
      };
      
      // Fallback timer
      setTimeout(() => {
        setVideoLoaded(true);
        setIsLoading(false);
        window.dispatchEvent(new CustomEvent('heroLoaded'));
        if (document.body.contains(videoPreloader)) {
          document.body.removeChild(videoPreloader);
        }
      }, 1400);
    }
  }, [isMobile, isHomePage]);
  
  // Don't render hero section if not on home page
  if (!isHomePage) return null;

  return (
    <section className="hero-section relative w-full h-screen overflow-hidden">
      <HeroBackground videoLoaded={videoLoaded} isLoading={isLoading} />
      
      {/* Hero Content - Two column layout for desktop */}
      <div className={`container mx-auto ${isMobile ? 'px-6' : 'px-4'} h-full flex ${isMobile ? 'flex-col justify-center' : 'flex-row items-center'} relative z-50 ${videoLoaded && !isLoading ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`} style={{ paddingTop: `calc(var(--header-h) + 1rem)`, paddingBottom: '2rem' }}>
        {/* Left side - Content */}
        <div className={`${isMobile ? 'w-full mb-6' : 'w-1/2 pr-8'}`}>
          <HeroHeading />
          <HeroPersonalTouch />
        </div>
        
        {/* Right side - Quote Form */}
        <div className={`${isMobile ? 'w-full' : 'w-1/2'}`}>
          <HeroQuoteForm />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
