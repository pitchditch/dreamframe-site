
import { useState, useRef } from 'react';

interface SplitBeforeAfterSliderProps {
  image: string;
  altText: string;
}

const SplitBeforeAfterSlider = ({ image, altText }: SplitBeforeAfterSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(x, 0), 100));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(x, 0), 100));
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[400px] overflow-hidden rounded-lg shadow-lg cursor-ew-resize"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* Before (top half) */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="w-full h-full overflow-hidden">
          <img 
            src={image} 
            alt={`Before ${altText}`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      {/* After (bottom half) */}
      <div 
        className="absolute top-0 left-0 h-full overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <div className="w-full h-full overflow-hidden">
          <img 
            src={image} 
            alt={`After ${altText}`}
            className="w-full h-[400px] object-cover object-bottom transform translate-y-[-200px]"
          />
        </div>
      </div>
      
      {/* Slider control */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center">
          <div className="flex flex-col">
            <span className="transform -rotate-90">&lt;</span>
            <span className="transform rotate-90">&gt;</span>
          </div>
        </div>
      </div>
      
      {/* Labels */}
      <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded">Before</div>
      <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded">After</div>
    </div>
  );
};

export default SplitBeforeAfterSlider;
