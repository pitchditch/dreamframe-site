
import React, { useRef, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

const ServiceCleaningCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const cleaningServices = [
    "House Exteriors", "Driveways", "Patios", "Decks", "Fences", 
    "Gutters", "Windows", "Roofs", "Commercial Buildings", 
    "Sidewalks", "Parking Lots", "Storefronts", "Solar Panels", 
    "Awnings", "Garbage Areas", "Pool Decks", "Concrete Surfaces", 
    "Vinyl Siding", "Cedar Siding", "Stucco"
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
    <div className="py-3 bg-gray-100 overflow-hidden w-full border-b border-gray-200">
      <div className="relative w-full">
        <div ref={carouselRef} className="flex overflow-x-hidden scrollbar-none whitespace-nowrap w-full">
          {/* Duplicate the services to create seamless loop */}
          {[...cleaningServices, ...cleaningServices, ...cleaningServices].map((service, index) => (
            <div key={index} className="inline-flex px-5 py-1 mx-1">
              <Sparkles size={16} className="text-bc-red mr-2 flex-shrink-0" />
              <span className="text-gray-800 font-medium">{service}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceCleaningCarousel;
