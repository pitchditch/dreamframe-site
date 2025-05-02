
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
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
    <section className="bg-bc-red text-white py-6">
      <div className="container mx-auto">
        <div className="flex items-center justify-center mb-2">
          <MapPin className="mr-2" />
          <h3 className="text-xl font-semibold">Areas We Service</h3>
        </div>
        
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto whitespace-nowrap py-3 scrollbar-none"
          style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
        >
          <div className="flex space-x-4 px-4">
            {cities.map((city, index) => (
              <Link 
                key={index}
                to={`/calculator?location=${city.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-all text-sm font-medium flex items-center"
              >
                <MapPin className="w-4 h-4 mr-1" />
                {city}
              </Link>
            ))}
            {/* Duplicate first few cities to make the loop seamless */}
            {cities.slice(0, 5).map((city, index) => (
              <Link 
                key={`duplicate-${index}`}
                to={`/calculator?location=${city.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-all text-sm font-medium flex items-center"
              >
                <MapPin className="w-4 h-4 mr-1" />
                {city}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationBanner;
