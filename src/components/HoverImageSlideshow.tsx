
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
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  
  // Preload images
  useEffect(() => {
    if (!images.length) return;
    
    // Create refs array with the correct length
    imageRefs.current = Array(images.length).fill(null);
    
    // Preload images when component mounts
    images.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      imageRefs.current[index] = img;
    });
    
    // Clear interval when unmounting
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [images]);

  // Start/stop slideshow on hover
  useEffect(() => {
    if (!images.length || !isHovered) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }
    
    timerRef.current = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % images.length);
    }, interval);
    
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
      <div 
        className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        style={{ willChange: isHovered ? 'opacity' : 'auto' }}
      >
        {children}
      </div>
      
      {/* Image slideshow (visible on hover) */}
      {isHovered && (
        <div className="absolute inset-0 transition-opacity duration-500 opacity-100">
          {images.map((image, index) => (
            <div 
              key={index} 
              className={`absolute inset-0 transition-opacity duration-300 ${currentImageIndex === index ? 'opacity-100' : 'opacity-0'}`}
              style={{ willChange: 'opacity' }}
            >
              <img 
                src={image} 
                alt={`${altText} - view ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HoverImageSlideshow;
