
import { useRef, useEffect } from 'react';

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
    <div className="py-6 bg-transparent">
      <div className="container mx-auto">
        <h3 className="text-xl font-semibold text-center mb-4 text-white">Our Service Areas</h3>
        <div className="relative overflow-hidden">
          <div 
            ref={carouselRef}
            className="flex overflow-x-hidden scrollbar-none whitespace-nowrap"
          >
            {/* Duplicate the service areas to create seamless loop */}
            {[...serviceAreas, ...serviceAreas, ...serviceAreas].map((area, index) => (
              <div key={index} className="inline-flex px-4 py-2 mx-1 rounded-full bg-white/20 backdrop-blur-sm text-white">
                {area}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceAreasCarousel;
