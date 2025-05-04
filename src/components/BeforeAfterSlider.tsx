
import React, { useState, useRef, useEffect } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  height?: string;
  width?: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  height = '400px',
  width = '100%'
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const containerWidth = containerRef.current.offsetWidth;
    
    // Calculate percentage (constrained between 0-100)
    const percentage = Math.min(Math.max((x / containerWidth) * 100, 0), 100);
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const containerWidth = containerRef.current.offsetWidth;
    
    // Calculate percentage (constrained between 0-100)
    const percentage = Math.min(Math.max((x / containerWidth) * 100, 0), 100);
    setSliderPosition(percentage);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Add global mouse events to handle dragging outside the element
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchmove', handleTouchMove as any);
    container.addEventListener('touchend', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchmove', handleTouchMove as any);
      container.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative overflow-hidden cursor-ew-resize" 
      style={{ height, width }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      {/* After image (full) */}
      <div className="absolute top-0 left-0 w-full h-full">
        <img
          src={afterImage}
          alt="After"
          className="object-cover w-full h-full before-after-image"
        />
      </div>
      
      {/* Before image (clipped) */}
      <div 
        className="absolute top-0 left-0 h-full overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt="Before"
          className="object-cover h-full before-after-image"
          style={{ width: '100vw', maxWidth: `calc(100vw / ${sliderPosition/100})` }}
        />
      </div>
      
      {/* Slider control */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
          <div className="flex items-center justify-center">
            <span className="transform -rotate-90 text-xs font-bold">◄</span>
            <span className="transform rotate-90 text-xs font-bold">►</span>
          </div>
        </div>
      </div>
      
      {/* Labels */}
      <div className="absolute top-2 left-4 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">Before</div>
      <div className="absolute top-2 right-4 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">After</div>
    </div>
  );
};

export default BeforeAfterSlider;
