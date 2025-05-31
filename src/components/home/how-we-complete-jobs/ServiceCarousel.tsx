
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import ServiceSlide from './ServiceSlide';
import type { Service } from './types';

interface ServiceCarouselProps {
  services: Service[];
}

const ServiceCarousel = ({ services }: ServiceCarouselProps) => {
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [services.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + services.length) % services.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full">
      <div className="overflow-hidden rounded-lg">
        <div className="relative h-[500px] md:h-[600px] w-full">
          {services.map((service, index) => (
            <ServiceSlide
              key={service.id}
              service={service}
              isActive={index === currentIndex}
            />
          ))}
        </div>
      </div>
      
      {/* Navigation arrows */}
      <Button 
        variant="outline" 
        size="icon" 
        className={`absolute top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white border-0 shadow-lg ${
          isMobile ? 'left-2 w-8 h-8' : 'left-4 w-10 h-10'
        }`} 
        onClick={prevSlide}
      >
        <ArrowLeft className={isMobile ? "h-4 w-4" : "h-5 w-5"} />
      </Button>
      
      <Button 
        variant="outline" 
        size="icon" 
        className={`absolute top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white border-0 shadow-lg ${
          isMobile ? 'right-2 w-8 h-8' : 'right-4 w-10 h-10'
        }`} 
        onClick={nextSlide}
      >
        <ArrowRight className={isMobile ? "h-4 w-4" : "h-5 w-5"} />
      </Button>

      {/* Dots navigation */}
      <div className="flex justify-center mt-6 gap-2">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-bc-red w-8' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to service ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceCarousel;
