
import { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

const LocationBanner = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const cities = ["White Rock", "Surrey", "South Surrey", "Langley", "Delta", "Tsawwassen", "Ladner", "Richmond", "Vancouver", "North Vancouver", "West Vancouver", "Burnaby", "New Westminster", "Coquitlam", "Port Coquitlam", "Port Moody", "Pitt Meadows", "Maple Ridge", "Mission", "Abbotsford"];
  
  useEffect(() => {
    const scrollContent = carouselRef.current;
    let animationId: number;
    let isHovering = false;
    
    const scroll = () => {
      if (scrollContent && !isHovering) {
        scrollContent.scrollLeft += 1;

        // Reset to beginning when we reach the end
        if (scrollContent.scrollLeft >= scrollContent.scrollWidth - scrollContent.clientWidth) {
          scrollContent.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };
    
    animationId = requestAnimationFrame(scroll);
    
    const handleMouseEnter = () => {
      isHovering = true;
    };
    
    const handleMouseLeave = () => {
      isHovering = false;
    };
    
    if (scrollContent) {
      scrollContent.addEventListener('mouseenter', handleMouseEnter);
      scrollContent.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      cancelAnimationFrame(animationId);
      if (scrollContent) {
        scrollContent.removeEventListener('mouseenter', handleMouseEnter);
        scrollContent.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);
  
  return (
    <div className="bg-white py-4 border-t border-b border-gray-200 overflow-hidden">
      <div 
        ref={carouselRef}
        className="flex overflow-x-auto gap-4 whitespace-nowrap no-scrollbar" 
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {cities.map((city, index) => (
          <div key={index} className="inline-flex items-center mx-4 min-w-max">
            <MapPin size={16} className="text-bc-red mr-1" />
            <span className="text-sm font-medium">{city}</span>
          </div>
        ))}
        {cities.map((city, index) => (
          <div key={`repeat-${index}`} className="inline-flex items-center mx-4 min-w-max">
            <MapPin size={16} className="text-bc-red mr-1" />
            <span className="text-sm font-medium">{city}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationBanner;
