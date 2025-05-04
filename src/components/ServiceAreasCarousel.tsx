
import React, { useRef, useEffect } from 'react';
import { MapPin } from 'lucide-react';

const ServiceAreasCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const serviceAreas = [
    "White Rock", "Surrey", "South Surrey", "Langley", "Delta", "Tsawwassen", "Ladner", 
    "Richmond", "Vancouver", "North Vancouver", "West Vancouver", "Burnaby", "New Westminster", 
    "Coquitlam", "Port Coquitlam", "Port Moody", "Pitt Meadows", "Maple Ridge", "Mission", "Abbotsford"
  ];

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
    <div className="py-6 bg-gradient-to-r from-gray-100 via-white to-gray-100 overflow-hidden w-full">
      <div className="relative w-full">
        <div 
          ref={carouselRef}
          className="flex overflow-x-hidden scrollbar-none whitespace-nowrap w-full"
        >
          {/* Duplicate the service areas to create seamless loop */}
          {[...serviceAreas, ...serviceAreas, ...serviceAreas].map((area, index) => (
            <div key={index} className="inline-flex px-4 py-2 mx-1">
              <MapPin size={16} className="text-bc-red mr-2" />
              <span>{area}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceAreasCarousel;
