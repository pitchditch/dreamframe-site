
import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceAreasCarousel: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const cities = [
    "White Rock", "Surrey", "South Surrey", "Langley", "Cloverdale", "Delta", 
    "Tsawwassen", "Ladner", "Richmond", "Vancouver", "North Vancouver", 
    "West Vancouver", "Burnaby", "New Westminster", "Coquitlam", 
    "Port Coquitlam", "Port Moody", "Pitt Meadows", "Maple Ridge", 
    "Mission", "Abbotsford"
  ];
  
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % cities.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [cities.length]);

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Check if We Serve Your Area</h2>
            <p className="text-lg mb-6">
              BC Pressure Washing serves communities across the Lower Mainland. Find out if we're available in your area and get a free quote today.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg mb-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="text-bc-red" size={24} />
                <h3 className="text-xl font-semibold">Currently serving:</h3>
              </div>
              
              <div className="relative h-10 overflow-hidden mb-4">
                <div className="absolute w-full flex items-center justify-center">
                  {cities.map((city, index) => (
                    <div
                      key={city}
                      className={`absolute transition-all duration-500 w-full text-center ${
                        index === activeIndex 
                          ? "opacity-100 transform-none" 
                          : "opacity-0 translate-y-8"
                      }`}
                    >
                      <span className="text-xl font-medium">{city}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        Math.floor(activeIndex / (cities.length / 5)) === i 
                          ? "bg-bc-red" 
                          : "bg-white/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <Button asChild variant="bc-red" size="lg" className="w-full py-6 text-lg font-medium hover:scale-105 transition-transform">
              <Link to="/calculator">
                Check Prices & Availability <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
          </div>
          
          <div className="relative rounded-lg overflow-hidden h-[400px]">
            <img 
              src="/lovable-uploads/d9a25e78-57fd-4f2c-a481-734029cf4067.png" 
              alt="Marine Drive in White Rock" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Marine Drive</h3>
                <p className="text-gray-300">White Rock, BC</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreasCarousel;
