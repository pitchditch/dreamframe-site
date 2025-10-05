import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import HeroBackground from './hero/HeroBackground';
import HeroQuoteForm from './hero/HeroQuoteForm';
import HeroPersonalSection from './hero/HeroPersonalSection';
import HeroTrustBadges from './hero/HeroTrustBadges';

const HeroSection = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Only load video on home page
  const isHomePage = location.pathname === '/' || location.pathname === '/home';
  
  useEffect(() => {
    if (!isHomePage) return;
    
    const timer = setTimeout(() => {
      setVideoLoaded(true);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [isHomePage]);
  
  // Don't render hero section if not on home page
  if (!isHomePage) return null;

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <HeroBackground videoLoaded={videoLoaded} isLoading={isLoading} />
      
      {/* Main Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Title */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                <span className="block mb-2">Professional</span>
                <span className="text-red-600 drop-shadow-lg">
                  Exterior Cleaning
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white font-medium max-w-3xl mx-auto drop-shadow-lg">
                White Rock & Surrey's most trusted pressure washing and window cleaning service
              </p>
            </div>
            
            {/* Quote Form */}
            <div className="mb-6">
              <HeroQuoteForm />
            </div>
            
            {/* Personal Section */}
            <div className="mb-4">
              <HeroPersonalSection />
            </div>
            
            {/* Trust Badges */}
            <HeroTrustBadges />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;