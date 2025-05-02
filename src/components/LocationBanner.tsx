
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
    <div className="py-3 bg-gradient-to-r from-blue-600 to-bc-red text-white">
      <div className="container mx-auto">
        <div className="flex items-center">
          <div className="flex-none">
            <MapPin className="mr-2" />
          </div>
          <div 
            ref={carouselRef} 
            className="flex overflow-x-auto scrollbar-none whitespace-nowrap"
          >
            {cities.map((city, index) => (
              <Link 
                key={index} 
                to={`/locations/${city.toLowerCase().replace(/\s+/g, '-')}`} 
                className="mx-2 hover:underline hover:text-white/90"
              >
                {city}
                {index < cities.length - 1 && <span className="ml-2">•</span>}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationBanner;
