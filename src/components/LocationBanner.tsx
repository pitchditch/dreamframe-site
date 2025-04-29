
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
    dragFree: true,
    containScroll: "trimSnaps"
  }, [
    Autoplay({ 
      delay: 0,  // Set to 0 for no delay between slides
      stopOnInteraction: false, 
      playOnInit: true 
    })
  ]);

  useEffect(() => {
    // Continuous rotation with no pauses
    const interval = setInterval(() => {
      const emblaApi = document.querySelector('[data-embla-api]');
      if (emblaApi) {
        const api = (emblaApi as any).__emblaApi;
        if (api && typeof api.scrollNext === 'function') {
          api.scrollNext();
        }
      }
    }, 400); // Even faster rotation speed
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full py-6">
      <div className="container mx-auto px-4">        
        <div className="overflow-hidden" ref={emblaRef} data-embla-api="true">
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
  );
};

export default LocationBanner;
