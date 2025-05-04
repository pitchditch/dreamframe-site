
import React, { useRef, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CitiesCarousel = () => {
  const cities = [
    "Surrey", "White Rock", "South Surrey", "Langley", "Cloverdale", 
    "Abbotsford", "Mission", "Maple Ridge", "Pitt Meadows", "Coquitlam", 
    "Port Coquitlam", "Port Moody", "Burnaby", "New Westminster", 
    "Delta", "Richmond", "Vancouver", "North Vancouver", "West Vancouver"
  ];
  
  const carouselRef = useRef<HTMLDivElement>(null);
  
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
    <div className="py-10 bg-gradient-to-r from-blue-900 to-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Communities We Serve</h2>
          <p className="text-lg opacity-80">Based in White Rock, Serving Metro Vancouver</p>
        </div>
        
        <div className="relative overflow-hidden mb-8">
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto scrollbar-none whitespace-nowrap py-4"
          >
            {/* Duplicate the service areas to create seamless loop */}
            {[...cities, ...cities].map((city, index) => (
              <div key={index} className="inline-flex px-4 py-2 mx-2 rounded-full bg-blue-800/80 text-white">
                <MapPin className="w-4 h-4 mr-2" /> {city}
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-2">Not sure if we service your area?</h3>
            <p className="mb-6">Check our coverage and get a quick quote for your exact location</p>
            <Link to="/calculator">
              <Button 
                variant="bc-red"
                size="lg"
                className="transform hover:scale-105 transition-transform duration-300"
              >
                Check Prices & Availability <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitiesCarousel;
