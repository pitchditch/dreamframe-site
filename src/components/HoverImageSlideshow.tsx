
import { useState, useEffect, useRef } from 'react';

interface HoverImageSlideshowProps {
  images: string[];
  interval: number;
  children: React.ReactNode;
  altText: string;
}

const HoverImageSlideshow = ({ images, interval, children, altText }: HoverImageSlideshowProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Clear interval when unmounting to prevent memory leaks
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Start/stop slideshow on hover
  useEffect(() => {
    if (!images.length) return;
    
    if (isHovered) {
      timerRef.current = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % images.length);
      }, interval);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, images, interval]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentImageIndex(0); // Reset to first image
  };

  // Don't render anything if no images provided
  if (!images.length) return children;

  return (
    <div 
      className="relative w-full h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Base content (usually an image) */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
      
      {/* Image slideshow (visible on hover) */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        {images.map((image, index) => (
          <div 
            key={index} 
            className={`absolute inset-0 transition-opacity duration-300 ${currentImageIndex === index ? 'opacity-100' : 'opacity-0'}`}
          >
            <img 
              src={image} 
              alt={`${altText} - view ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HoverImageSlideshow;
