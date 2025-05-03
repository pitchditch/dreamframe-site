
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
    <div className="bg-bc-red text-white py-4 w-full relative overflow-hidden">
      <div className="container mx-auto">
        <h3 className="text-xl font-semibold mb-3 text-center">Areas We Proudly Serve</h3>
        <div 
          ref={carouselRef} 
          className="flex space-x-6 overflow-x-hidden whitespace-nowrap px-4 scrollbar-hide"
        >
          {cities.concat(cities).map((city, index) => (
            <div key={index} className="flex items-center flex-shrink-0">
              <MapPin size={16} className="mr-1" />
              <span>{city}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationBanner;
