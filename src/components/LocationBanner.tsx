
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
    <div className="bg-gray-900 text-white py-4 overflow-hidden">
      <div className="flex items-center justify-center mb-2">
        <MapPin size={20} className="mr-2 text-bc-red" />
        <h3 className="text-lg font-semibold">Serving the Greater Vancouver Area</h3>
      </div>
      <div 
        ref={carouselRef}
        className="flex space-x-4 overflow-x-auto no-scrollbar whitespace-nowrap px-4"
        style={{ scrollBehavior: 'smooth' }}
      >
        {cities.map((city, index) => (
          <div key={index} className="bg-gray-800 px-4 py-2 rounded-full text-sm flex-shrink-0">
            {city}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationBanner;
