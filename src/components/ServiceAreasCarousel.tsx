
import React, { useRef, useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';

const ServiceAreasCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const serviceAreas = ["White Rock", "Surrey", "South Surrey", "Langley", "Delta", "Tsawwassen", "Ladner", "Richmond", "Vancouver", "North Vancouver", "West Vancouver", "Burnaby", "New Westminster", "Coquitlam", "Port Coquitlam", "Port Moody", "Pitt Meadows", "Maple Ridge", "Mission", "Abbotsford"];

  useEffect(() => {
    const scrollContent = carouselRef.current;
    
    // Check if element is in viewport
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        if (frameRef.current) {
          cancelAnimationFrame(frameRef.current);
          frameRef.current = null;
        }
      }
    }, { threshold: 0.1 });
    
    if (scrollContent) {
      observer.observe(scrollContent);
    }

    return () => {
      if (scrollContent) observer.unobserve(scrollContent);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  // Only scroll when visible
  useEffect(() => {
    if (!isVisible || !carouselRef.current) return;
    
    let lastTimestamp = 0;
    const FRAME_RATE = 16; // about 60fps

    const scroll = (timestamp: number) => {
      const scrollContent = carouselRef.current;
      if (!scrollContent || !isVisible) return;
      
      // Throttle animation to reduce CPU load
      if (timestamp - lastTimestamp < FRAME_RATE) {
        frameRef.current = requestAnimationFrame(scroll);
        return;
      }
      
      lastTimestamp = timestamp;
      scrollContent.scrollLeft += 0.5; // Slow down the speed

      // Reset to beginning when we reach the end
      if (scrollContent.scrollLeft >= scrollContent.scrollWidth / 2) {
        scrollContent.scrollLeft = 0;
      }
      
      frameRef.current = requestAnimationFrame(scroll);
    };

    frameRef.current = requestAnimationFrame(scroll);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [isVisible]);

  return (
    <div className="py-4 bg-blue-900 overflow-hidden w-full">
      <div className="relative w-full">
        <div 
          ref={carouselRef} 
          className="flex overflow-x-hidden scrollbar-none whitespace-nowrap w-full"
          style={{ willChange: "scroll-position" }}
        >
          {/* Duplicate the service areas to create seamless loop */}
          {[...serviceAreas, ...serviceAreas, ...serviceAreas].map((area, index) => (
            <div 
              key={index} 
              className="inline-flex px-5 py-2 mx-1"
              style={{ transform: 'translate3d(0,0,0)' }}
            >
              <MapPin size={16} className="text-bc-red mr-2 flex-shrink-0" />
              <span className="text-white font-medium">{area}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceAreasCarousel;
