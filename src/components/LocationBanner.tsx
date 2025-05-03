
import { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

const LocationBanner = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const cities = [
    "White Rock", "Surrey", "South Surrey", "Langley", "Delta", "Tsawwassen", 
    "Ladner", "Richmond", "Vancouver", "North Vancouver", "West Vancouver", 
    "Burnaby", "New Westminster", "Coquitlam", "Port Coquitlam", "Port Moody", 
    "Pitt Meadows", "Maple Ridge", "Mission", "Abbotsford"
  ];

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
    <section className="py-4 bg-gradient-to-r from-gray-900 to-black text-white overflow-hidden">
      <div className="container mx-auto">
        <div className="flex items-center mb-2">
          <MapPin className="text-bc-red mr-2" size={20} />
          <h3 className="text-lg font-semibold">Our Service Areas</h3>
        </div>
        
        <div className="relative">
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto no-scrollbar whitespace-nowrap"
          >
            {cities.map((city, index) => (
              <div 
                key={index} 
                className="inline-flex px-4 py-2 mx-1 rounded-full bg-white/10 text-white"
              >
                {city}
              </div>
            ))}
            {/* Duplicate cities to create infinite scroll effect */}
            {cities.map((city, index) => (
              <div 
                key={`duplicate-${index}`} 
                className="inline-flex px-4 py-2 mx-1 rounded-full bg-white/10 text-white"
              >
                {city}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationBanner;
