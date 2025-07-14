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

  const isHomePage = location.pathname === '/' || location.pathname === '/home';

  useEffect(() => {
    if (!isHomePage) return;

    if (isMobile) {
      const img = new Image();
      img.src = "/hero-bg.png";
      img.onload = () => {
        setVideoLoaded(true);
        setIsLoading(false);
        window.dispatchEvent(new CustomEvent('heroLoaded'));
      };
      img.loading = 'eager';
    } else {
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

  if (!isHomePage) return null;

  return (
    <section className="hero-section relative h-screen w-full overflow-hidden">
      <HeroBackground videoLoaded={videoLoaded} isLoading={isLoading} isMobile={isMobile} />
      
      <div className={`container mx-auto px-4 h-full flex flex-col justify-center items-start relative z-10 text-white ${videoLoaded && !isLoading ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`} style={{ paddingTop: '5vh' }}>
        <div className={`${isMobile ? 'max-w-full' : 'max-w-5xl'} text-left`}>
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
