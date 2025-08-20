
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import HeroBackground from './hero/HeroBackground';
import HeroQuoteForm from './hero/HeroQuoteForm';
import HeroPersonalSection from './hero/HeroPersonalSection';
import HeroTrustBadges from './hero/HeroTrustBadges';
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
      }, 800);
    }
  }, [isMobile, isHomePage]);
  
  // Don't render hero section if not on home page
  if (!isHomePage) return null;

  return (
    <section className="hero-section relative h-screen w-full overflow-hidden">
      <HeroBackground videoLoaded={videoLoaded} isLoading={isLoading} />
      
      {/* Hero Content - Centered */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center px-4 z-10 ${videoLoaded && !isLoading ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}>
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
            <span className="block">Professional</span>
            <span className="text-bc-red animate-pulse drop-shadow-lg" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.9)' }}>
              Exterior Cleaning
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white font-medium max-w-3xl mx-auto drop-shadow-md" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>
            White Rock & Surrey's most trusted pressure washing and window cleaning service
          </p>
        </div>
        
        <HeroQuoteForm />
        <HeroPersonalSection />
        <HeroTrustBadges />
      </div>
      
      <HeroScrollIndicator videoLoaded={videoLoaded} isLoading={isLoading} />
    </section>
  );
};

export default HeroSection;
