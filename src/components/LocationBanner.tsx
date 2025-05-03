
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
    <div className="bg-gradient-to-r from-gray-900 to-black py-6 overflow-hidden">
      <div className="container mx-auto">
        <h3 className="text-white text-center mb-4 font-medium flex items-center justify-center">
          <MapPin size={18} className="mr-2 text-bc-red" />
          Service Areas
        </h3>
        
        <div 
          ref={carouselRef} 
          className="flex overflow-x-auto whitespace-nowrap gap-2 py-2 scrollbar-none"
        >
          {cities.map((city, index) => (
            <div 
              key={index} 
              className="inline-flex items-center px-4 py-1 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm mx-1 transition-all hover:bg-white/20"
            >
              {city}
            </div>
          ))}
          {/* Duplicate the cities to ensure smooth looping */}
          {cities.map((city, index) => (
            <div 
              key={`duplicate-${index}`} 
              className="inline-flex items-center px-4 py-1 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm mx-1 transition-all hover:bg-white/20"
            >
              {city}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationBanner;
