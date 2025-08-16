
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
      }, 1400); // Give YouTube a bit more time to avoid showing title
    }
  }, [isMobile, isHomePage]);
  
  // Don't render hero section if not on home page
  if (!isHomePage) return null;

  return (
    <section className="hero-section relative w-full min-h-screen h-screen overflow-hidden z-10">
      <HeroBackground videoLoaded={videoLoaded} isLoading={isLoading} />
      
      {/* Hero Content - Redesigned layout */}
      <div className={`container mx-auto px-4 h-full relative z-50 text-white ${videoLoaded && !isLoading ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`} style={{ paddingTop: 'calc(var(--header-h) + 2rem)', paddingBottom: '2rem' }}>
        <div className={`h-full flex ${isMobile ? 'flex-col' : 'flex-row'} items-center justify-between gap-8`}>
          {/* Left side - Text content */}
          <div className={`${isMobile ? 'w-full text-center mb-6' : 'w-1/2 text-left'} space-y-4`}>
            <HeroBanner />
            <HeroHeading />
          </div>
          
          {/* Right side - Form card */}
          <div className={`${isMobile ? 'w-full' : 'w-1/2 max-w-md'}`}>
            <div className="bg-white rounded-lg p-6 shadow-2xl">
              <div className="text-center mb-4">
                <div className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-2">
                  ⚡ Instant Estimate
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Get Your Free Quote in 30 Seconds
                </h3>
                <p className="text-sm text-gray-600">No obligation • Satisfied customers</p>
              </div>
              
              <HeroForm />
              
              <HeroPersonalTouch />
              
              <div className="text-center text-sm text-gray-600 mt-4 space-y-1">
                <div className="flex items-center justify-center gap-4">
                  <span>✓ Free estimates</span>
                  <span>✓ Same-day service available</span>
                </div>
                <div>✓ 100% satisfaction guaranteed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <HeroScrollIndicator videoLoaded={videoLoaded} isLoading={isLoading} />
    </section>
  );
};

export default HeroSection;
