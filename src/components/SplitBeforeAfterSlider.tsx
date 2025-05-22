
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
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSliderPosition(Math.min(Math.max(y, 0), 100));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const y = ((e.touches[0].clientY - rect.top) / rect.height) * 100;
    setSliderPosition(Math.min(Math.max(y, 0), 100));
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[400px] overflow-hidden rounded-lg shadow-lg cursor-ns-resize"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* After (clean) image - full view */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="w-full h-full overflow-hidden">
          <img 
            src={image} 
            alt={`After ${altText}`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      {/* Before (dirty) image - partial view based on slider */}
      <div 
        className="absolute top-0 left-0 w-full overflow-hidden"
        style={{ height: `${sliderPosition}%` }}
      >
        <div className="w-full h-full overflow-hidden">
          <img 
            src={image} 
            alt={`Before ${altText}`}
            className="w-full h-[400px] object-cover"
            style={{
              filter: "brightness(0.7) contrast(1.2) saturate(0.8)", // Make the top image look dirty
            }}
          />
        </div>
      </div>
      
      {/* Slider control */}
      <div 
        className="absolute left-0 right-0 h-1 bg-white shadow-lg z-10"
        style={{ top: `${sliderPosition}%` }}
      >
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center">
          <div className="flex">
            <span className="transform rotate-0">&uarr;</span>
            <span className="transform rotate-0">&darr;</span>
          </div>
        </div>
      </div>
      
      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded">Before</div>
      <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded">After</div>
    </div>
  );
};

export default SplitBeforeAfterSlider;
