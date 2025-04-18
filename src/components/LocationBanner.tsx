
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const LocationBanner = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const cities = [
    "White Rock", "Surrey", "South Surrey", "Langley", "Delta", 
    "Tsawwassen", "Ladner", "Richmond", "Vancouver", "North Vancouver", 
    "West Vancouver", "Burnaby", "New Westminster", "Coquitlam", 
    "Port Coquitlam", "Port Moody", "Pitt Meadows", "Maple Ridge", 
    "Mission", "Abbotsford"
  ];

  useEffect(() => {
    const scrollContent = carouselRef.current;
    let animationId: number;
    let isHovering = false;

    const scroll = () => {
      if (scrollContent && !isHovering) {
        scrollContent.scrollLeft += 1;
        
        // Reset to beginning when we reach the end
        if (scrollContent.scrollLeft >= (scrollContent.scrollWidth - scrollContent.clientWidth)) {
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
    <section className="bg-gray-900 text-white py-8 location-banner">
      <div className="container mx-auto px-4">
        <div className="flex flex-col text-center">
          <h3 className="text-2xl md:text-3xl font-bold flex items-center justify-center mb-6">
            <MapPin className="h-6 w-6 md:h-7 md:w-7 text-bc-red mr-2" />
            Areas We Service
          </h3>
          
          <div 
            ref={carouselRef}
            className="flex overflow-x-hidden whitespace-nowrap gap-8 py-2"
          >
            {cities.map((city, index) => (
              <div key={index} className="inline-block min-w-max px-6">
                <Link 
                  to={`/locations/${city.toLowerCase().replace(/\s+/g, '-')}`} 
                  className="text-xl font-medium text-white hover:text-bc-red transition-colors"
                >
                  {city}, BC
                </Link>
              </div>
            ))}
            {/* Duplicate first few items for seamless loop */}
            {cities.slice(0, 5).map((city, index) => (
              <div key={`repeat-${index}`} className="inline-block min-w-max px-6">
                <Link 
                  to={`/locations/${city.toLowerCase().replace(/\s+/g, '-')}`} 
                  className="text-xl font-medium text-white hover:text-bc-red transition-colors"
                >
                  {city}, BC
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationBanner;
