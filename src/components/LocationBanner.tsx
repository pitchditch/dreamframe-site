
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const LocationBanner = () => {
  const cities = [
    "White Rock", "Surrey", "South Surrey", "Langley", "Delta", 
    "Tsawwassen", "Ladner", "Richmond", "Vancouver", "North Vancouver", 
    "West Vancouver", "Burnaby", "New Westminster", "Coquitlam", 
    "Port Coquitlam", "Port Moody", "Pitt Meadows", "Maple Ridge", 
    "Mission", "Abbotsford"
  ];

  const [emblaRef] = useEmblaCarousel({ 
    loop: true,
    align: "start", 
    skipSnaps: false,
    dragFree: true,
    containScroll: "trimSnaps"
  }, [
    Autoplay({ delay: 2000, stopOnInteraction: false, playOnInit: true })
  ]);

  return (
    <section className="w-full bg-gradient-to-b from-navy to-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col text-center">
          <h3 className="text-2xl md:text-3xl font-bold flex items-center justify-center mb-6 text-white">
            <MapPin className="h-6 w-6 md:h-7 md:w-7 text-bc-red mr-2" />
            Areas We Service
          </h3>
          
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex" style={{ backfaceVisibility: 'hidden' }}>
              {cities.map((city, index) => (
                <div key={index} className="flex-none mx-4">
                  <Link 
                    to={`/locations/${city.toLowerCase().replace(/\s+/g, '-')}`}
                    className="whitespace-nowrap text-xl font-medium text-white hover:text-bc-red transition-colors"
                  >
                    {city}, BC
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationBanner;
