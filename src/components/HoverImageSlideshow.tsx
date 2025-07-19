
import React, { useState, useEffect } from 'react';
import FullscreenImageViewer from './FullscreenImageViewer';

interface HoverImageSlideshowProps {
  images: string[];
  altText?: string;
  children?: React.ReactNode;
  interval?: number;
}

const HoverImageSlideshow: React.FC<HoverImageSlideshowProps> = ({ 
  images, 
  altText = "Image slideshow", 
  children,
  interval = 3000
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    // Only run slideshow if hovering and we have more than one image
    if (isHovering && images.length > 1) {
      intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, interval);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isHovering, images.length, interval]);
  
  // Don't render slideshow if no images or only one image
  if (!images.length) return <>{children}</>;
  
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {children}
      
      {isHovering && images.length > 0 && (
        <FullscreenImageViewer imageSrc={images[currentImageIndex]} altText={altText}>
          <div className="absolute inset-0 bg-black/5 transition-opacity duration-300">
            <img
              src={images[currentImageIndex]}
              alt={altText}
              className="w-full h-full object-cover transition-opacity duration-500"
            />
            {images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                {images.map((_, index) => (
                  <span
                    key={index}
                    className={`h-1.5 rounded-full ${
                      index === currentImageIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
                    } transition-all duration-300`}
                  />
                ))}
              </div>
            )}
          </div>
        </FullscreenImageViewer>
      )}
    </div>
  );
};

export default HoverImageSlideshow;
