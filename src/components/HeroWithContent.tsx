
import { useEffect, useState } from 'react';
import HeroBackground from './home/hero/HeroBackground';
import HeroContent from './home/hero/HeroContent';
import { LocationBanner } from './home/LocationBanner';
import { useLocationDetection } from '@/hooks/use-location-detection';

interface HeroWithContentProps {
  children: React.ReactNode;
}

const HeroWithContent = ({ children }: HeroWithContentProps) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { location, detectedCity, loading: locationLoading } = useLocationDetection();

  useEffect(() => {
    const timer = setTimeout(() => {
      setVideoLoaded(true);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const shouldShowLocationBanner = !locationLoading && detectedCity && location;

  return (
    <>
      {shouldShowLocationBanner && (
        <LocationBanner 
          detectedCity={detectedCity} 
          currentCity={location.city}
        />
      )}
      
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        <HeroBackground videoLoaded={videoLoaded} isLoading={isLoading} />
        <HeroContent detectedCity={detectedCity} />
      </section>
      
      {children}
    </>
  );
};

export default HeroWithContent;
