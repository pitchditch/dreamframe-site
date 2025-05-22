
import { useState, useEffect, useRef, useCallback } from 'react';

interface AnimatedPressureWashingProps {
  image: string;
  altText: string;
}

const AnimatedPressureWashing = ({ image, altText }: AnimatedPressureWashingProps) => {
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [direction, setDirection] = useState({ dx: 1, dy: 0.5 });
  const [cleaned, setCleanedArea] = useState<{[key: string]: boolean}>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(false);
  const GRID_SIZE = 10; // Size of cleaning segments
  const CLEAN_RADIUS = 20; // Radius of cleaning effect

  // Check if component is visible in viewport
  const checkVisibility = useCallback(() => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const isVisible = 
      rect.top < window.innerHeight &&
      rect.bottom > 0;
      
    isVisibleRef.current = isVisible;
    
    // Start or stop animation based on visibility
    if (isVisible && !animationRef.current) {
      animationRef.current = requestAnimationFrame(animate);
    } else if (!isVisible && animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  // Animation effect
  const animate = useCallback(() => {
    if (!isVisibleRef.current) {
      animationRef.current = null;
      return;
    }
    
    setPosition(prev => {
      const container = containerRef.current;
      if (!container) return prev;

      const { width, height } = container.getBoundingClientRect();
      let { x, y } = prev;
      let { dx, dy } = direction;

      // Update position
      x += dx * 2;
      y += dy * 2;

      // Bounce off walls
      if (x >= width - 30) {
        x = width - 30;
        setDirection(prev => ({ ...prev, dx: -Math.abs(prev.dx) }));
      } else if (x <= 30) {
        x = 30;
        setDirection(prev => ({ ...prev, dx: Math.abs(prev.dx) }));
      }

      if (y >= height - 30) {
        y = height - 30;
        setDirection(prev => ({ ...prev, dy: -Math.abs(prev.dy) }));
      } else if (y <= 30) {
        y = 30; 
        setDirection(prev => ({ ...prev, dy: Math.abs(prev.dy) }));
      }

      // Mark area as cleaned
      const gridX = Math.floor(x / GRID_SIZE);
      const gridY = Math.floor(y / GRID_SIZE);
      
      // Mark surrounding area as cleaned (in a radius)
      const newCleanedAreas: {[key: string]: boolean} = {};
      for (let i = -CLEAN_RADIUS; i <= CLEAN_RADIUS; i++) {
        for (let j = -CLEAN_RADIUS; j <= CLEAN_RADIUS; j++) {
          const distance = Math.sqrt(i*i + j*j);
          if (distance <= CLEAN_RADIUS) {
            const key = `${gridX + i},${gridY + j}`;
            newCleanedAreas[key] = true;
          }
        }
      }
      
      // Batch update for better performance
      setCleanedArea(prev => ({ ...prev, ...newCleanedAreas }));

      return { x, y };
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [direction]);

  // Setup intersection observer for performance
  useEffect(() => {
    checkVisibility();
    
    // Add event listeners
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, [checkVisibility]);

  // Create the mask for the cleaned areas
  const renderCleanedMask = () => {
    const gridPoints = Object.keys(cleaned);
    if (gridPoints.length === 0) return null;

    const pathData = gridPoints.map(key => {
      const [x, y] = key.split(',').map(Number);
      return `M${x * GRID_SIZE} ${y * GRID_SIZE}h${GRID_SIZE}v${GRID_SIZE}h-${GRID_SIZE}z`;
    }).join(' ');

    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <path 
          d={pathData} 
          fill="white" 
          fillOpacity="1"
        />
      </svg>
    );
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[400px] overflow-hidden rounded-lg shadow-lg"
    >
      {/* Dirty image (background) */}
      <img 
        src={image} 
        alt={`Before ${altText}`}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />

      {/* Clean image (revealed through mask) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={image} 
            alt={`After ${altText}`}
            className="w-full h-full object-cover"
            loading="lazy"
            style={{
              filter: "brightness(1.2) contrast(1.05) saturate(1.05)",
              mixBlendMode: "normal",
            }}
          />
          {renderCleanedMask()}
        </div>
      </div>

      {/* Spray wand position */}
      <div 
        className="absolute w-6 h-6 bg-blue-100 rounded-full shadow-lg z-10"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          boxShadow: "0 0 10px 5px rgba(0, 150, 255, 0.5)",
          background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(173,216,230,0.6) 70%)",
          willChange: "left, top",
          transform: "translate3d(0, 0, 0)",
        }}
      ></div>

      {/* Label */}
      <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded">
        {altText}
      </div>
    </div>
  );
};

export default AnimatedPressureWashing;
