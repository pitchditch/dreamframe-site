
import React, { useEffect, useRef, useState } from 'react';

interface RotatingImageQuadrantsProps {
  image: string;
  altText: string;
}

const RotatingImageQuadrants = ({ image, altText }: RotatingImageQuadrantsProps) => {
  const [activeQuadrant, setActiveQuadrant] = useState(0);
  const animationRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Quadrant positions: top-left, top-right, bottom-right, bottom-left
  const quadrants = [
    { objectPosition: 'left top' },    // Top-left
    { objectPosition: 'right top' },   // Top-right
    { objectPosition: 'right bottom' },// Bottom-right
    { objectPosition: 'left bottom' }  // Bottom-left
  ];
  
  // Start animation cycle
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Cycle through quadrants every 2 seconds
    intervalRef.current = setInterval(() => {
      setActiveQuadrant(prev => (prev + 1) % 4);
    }, 3000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[400px] overflow-hidden rounded-lg shadow-lg bg-gray-100"
    >
      {/* Full image (always visible) */}
      <div className="absolute inset-0 opacity-30">
        <img 
          src={image} 
          alt={altText} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Animated Quadrants */}
      {quadrants.map((quadrant, index) => (
        <div 
          key={index}
          className={`absolute w-1/2 h-1/2 transition-all duration-1000 overflow-hidden
            ${index === 0 ? 'top-0 left-0' : ''}
            ${index === 1 ? 'top-0 right-0' : ''}
            ${index === 2 ? 'bottom-0 right-0' : ''}
            ${index === 3 ? 'bottom-0 left-0' : ''}
            ${activeQuadrant === index ? 'scale-150 z-10' : 'scale-100 z-0'}
          `}
          style={{
            transformOrigin: 
              index === 0 ? 'top left' :
              index === 1 ? 'top right' :
              index === 2 ? 'bottom right' : 'bottom left'
          }}
        >
          <div className="w-full h-full overflow-hidden">
            <img 
              src={image} 
              alt={`${altText} section ${index + 1}`}
              className="w-[200%] h-[200%] object-cover"
              style={{ 
                objectPosition: quadrant.objectPosition,
                transform: `scale(${activeQuadrant === index ? 1.2 : 1})`,
                transition: 'transform 3s ease'
              }}
            />
          </div>
        </div>
      ))}
      
      {/* Label */}
      <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded">
        Gutter Cleaning
      </div>
    </div>
  );
};

export default RotatingImageQuadrants;
