
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
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
    <div className="bg-gray-900 text-white py-3 overflow-hidden">
      <div className="container mx-auto px-4">
        <div 
          ref={carouselRef} 
          className="flex overflow-x-hidden whitespace-nowrap"
        >
          {cities.map((city, index) => (
            <div key={index} className="inline-flex items-center mx-4 first:ml-0">
              <MapPin className="h-4 w-4 text-bc-red mr-1" />
              <span className="text-sm">{city} Service Area</span>
            </div>
          ))}
          {/* Duplicate cities to ensure smooth looping */}
          {cities.map((city, index) => (
            <div key={`dup-${index}`} className="inline-flex items-center mx-4">
              <MapPin className="h-4 w-4 text-bc-red mr-1" />
              <span className="text-sm">{city} Service Area</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationBanner;
