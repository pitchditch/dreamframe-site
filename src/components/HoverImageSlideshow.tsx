
import React, { useState, useEffect } from 'react';

interface HoverImageSlideshowProps {
  images: string[];
  interval?: number;
  children: React.ReactNode;
  altText?: string;
}

const HoverImageSlideshow: React.FC<HoverImageSlideshowProps> = ({ 
  images, 
  interval = 3000, 
  children,
  altText = "Service image" 
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Reset index when hovering starts
  useEffect(() => {
    if (!isHovering) {
      setCurrentImageIndex(0);
    }
  }, [isHovering]);
  
  // Set up rotation interval when hovering
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isHovering && images.length > 1) {
      timer = setInterval(() => {
        setCurrentImageIndex(prevIndex => 
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, interval);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isHovering, interval, images.length]);
  
  // Shows the default content when not hovering
  if (!isHovering) {
    return (
      <div 
        onMouseEnter={() => setIsHovering(true)} 
        className="h-full cursor-pointer transition-all"
      >
        {children}
      </div>
    );
  }
  
  // Shows the slideshow when hovering
  return (
    <div 
      onMouseLeave={() => setIsHovering(false)}
      className="relative h-full w-full overflow-hidden cursor-pointer"
    >
      {images.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={src}
            alt={`${altText} ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default HoverImageSlideshow;
