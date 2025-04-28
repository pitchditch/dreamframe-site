
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const LocationBanner = () => {
  const cities = [
    "White Rock", "Surrey", "South Surrey", "Langley", "Delta", 
    "Tsawwassen", "Ladner", "Richmond", "Vancouver", "North Vancouver", 
    "West Vancouver", "Burnaby", "New Westminster", "Coquitlam", 
    "Port Coquitlam", "Port Moody", "Pitt Meadows", "Maple Ridge", 
    "Mission", "Abbotsford"
  ];

  return (
    <section className="w-full bg-gradient-to-b from-navy to-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col text-center">
          <h3 className="text-2xl md:text-3xl font-bold flex items-center justify-center mb-8 text-white">
            <MapPin className="h-6 w-6 md:h-7 md:w-7 text-bc-red mr-2" />
            Areas We Service
          </h3>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
              skipSnaps: true,
              containScroll: "trimSnaps"
            }}
            className="w-full"
          >
            <CarouselContent className="py-4">
              {cities.map((city, index) => (
                <CarouselItem key={index} className="basis-auto">
                  <Link 
                    to={`/locations/${city.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-block px-6 text-xl font-medium text-white hover:text-bc-red transition-colors"
                  >
                    {city}, BC
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default LocationBanner;
