
import React, { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ServiceVideoOverlayProps {
  youtubeId?: string;
  mobileImageUrl?: string;
  className?: string;
}

const ServiceVideoOverlay = ({ 
  youtubeId, 
  mobileImageUrl,
  className = "absolute inset-0 w-full h-full object-cover"
}: ServiceVideoOverlayProps) => {
  const isMobile = useIsMobile();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set a timeout to show content after a brief delay
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isMobile && mobileImageUrl) {
    return (
      <img
        src={mobileImageUrl}
        alt="Service background"
        className={`${className} transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        loading="eager"
      />
    );
  }

  if (youtubeId) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&showinfo=0&rel=0&enablejsapi=1&version=3&playerapiid=ytplayer`}
        className={`${className} transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          border: 'none',
          outline: 'none'
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={false}
        loading="eager"
      />
    );
  }

  return null;
};

export default ServiceVideoOverlay;
