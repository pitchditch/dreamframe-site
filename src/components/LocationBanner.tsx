
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
    <div className="bg-bc-red py-4 overflow-hidden">
      <div className="flex items-center space-x-4 overflow-x-auto whitespace-nowrap px-4" ref={carouselRef}>
        {cities.map((city, index) => (
          <div 
            key={index} 
            className="flex items-center shrink-0 text-white font-medium"
          >
            <MapPin size={16} className="mr-1" />
            <span>{city}</span>
            {index < cities.length - 1 && <span className="ml-4 mr-0">•</span>}
          </div>
        ))}
        {/* Duplicate items to create seamless loop */}
        {cities.map((city, index) => (
          <div 
            key={`duplicate-${index}`} 
            className="flex items-center shrink-0 text-white font-medium"
          >
            <MapPin size={16} className="mr-1" />
            <span>{city}</span>
            {index < cities.length - 1 && <span className="ml-4 mr-0">•</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationBanner;
