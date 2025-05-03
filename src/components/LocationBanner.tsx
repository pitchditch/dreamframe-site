
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
    <div className="bg-bc-red py-3 text-white overflow-hidden">
      <div className="flex items-center">
        <div className="flex-none px-4 hidden sm:flex items-center">
          <MapPin className="mr-2" size={20} />
          <span className="font-medium">Service Areas:</span>
        </div>
        <div ref={carouselRef} className="flex overflow-x-auto scrollbar-hide whitespace-nowrap py-1">
          {cities.map((city, index) => (
            <div key={index} className="mx-3 flex items-center text-sm">
              <span className="mr-2 text-bc-red bg-white rounded-full w-1.5 h-1.5 inline-block"></span>
              {city}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationBanner;
