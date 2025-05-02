
import React, { useState, useEffect } from 'react';

const CitiesCarousel = () => {
  const cities = [
    "Surrey", "White Rock", "South Surrey", "Langley", "Cloverdale", 
    "Abbotsford", "Mission", "Maple Ridge", "Pitt Meadows", "Coquitlam", 
    "Port Coquitlam", "Port Moody", "Burnaby", "New Westminster", 
    "Delta", "Richmond", "Vancouver", "North Vancouver", "West Vancouver"
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cities.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [cities.length]);
  
  return (
    <div className="py-4 bg-gradient-to-r from-blue-600 to-bc-red text-white text-center">
      <div className="container mx-auto overflow-hidden">
        <div className="flex justify-center items-center">
          <p className="text-lg font-semibold mr-2">Serving:</p>
          <div className="relative h-8 overflow-hidden">
            {cities.map((city, index) => (
              <span
                key={index}
                className={`absolute transition-transform duration-500 w-full ${
                  index === currentIndex ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                {city}
              </span>
            ))}
          </div>
          <p className="text-lg font-semibold ml-2">and surrounding areas</p>
        </div>
      </div>
    </div>
  );
};

export default CitiesCarousel;
