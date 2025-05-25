
import React, { useRef, useEffect } from 'react';
import { MapPin } from 'lucide-react';

interface ServiceAreasCarouselProps {
  isDarkBackground?: boolean;
}

const ServiceAreasCarousel = ({ isDarkBackground = true }: ServiceAreasCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const serviceAreas = ["White Rock", "Surrey", "South Surrey", "Langley", "Delta", "Tsawwassen", "Ladner", "Richmond", "Vancouver", "North Vancouver", "West Vancouver", "Burnaby", "New Westminster", "Coquitlam", "Port Coquitlam", "Port Moody", "Pitt Meadows", "Maple Ridge", "Mission", "Abbotsford"];

  useEffect(() => {
    const scrollContent = carouselRef.current;
    let animationId: number;

    const scroll = () => {
      if (scrollContent) {
        scrollContent.scrollLeft += 1;

        // Reset to beginning when we reach the end
        if (scrollContent.scrollLeft >= scrollContent.scrollWidth / 2) {
          scrollContent.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className={`py-4 overflow-hidden w-full ${
      isDarkBackground 
        ? 'bg-blue-900' 
        : 'bg-white border-t border-b border-gray-200'
    }`}>
      <div className="relative w-full">
        <div ref={carouselRef} className="flex overflow-x-hidden scrollbar-none whitespace-nowrap w-full">
          {/* Duplicate the service areas to create seamless loop */}
          {[...serviceAreas, ...serviceAreas, ...serviceAreas].map((area, index) => (
            <div 
              key={index} 
              className={`inline-flex px-5 py-2 mx-1 rounded-md ${
                isDarkBackground 
                  ? 'bg-blue-900 text-white' 
                  : 'bg-white text-gray-800'
              }`}
            >
              <MapPin size={16} className={`mr-2 flex-shrink-0 ${
                isDarkBackground ? 'text-bc-red' : 'text-bc-red'
              }`} />
              <span className={`font-medium ${
                isDarkBackground ? 'text-white' : 'text-gray-800'
              }`}>{area}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceAreasCarousel;
