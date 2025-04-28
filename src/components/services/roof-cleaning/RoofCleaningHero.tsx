
import React from 'react';
import { Droplets } from 'lucide-react';

const RoofCleaningHero = () => {
  return (
    <div className="relative w-full h-screen hero-section">
      <img 
        src="/lovable-uploads/bba21852-c38f-4adc-a87a-cd27a5a26d86.png" 
        alt="Roof cleaning service" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/60" />
      <div className="relative h-full container mx-auto px-4 flex items-center justify-center z-10">
        <div className="text-center max-w-4xl">
          <Droplets className="inline-block text-bc-red mb-4" size={48} />
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white text-shadow">
            Professional Roof Cleaning & Moss Removal
          </h1>
          <p className="text-lg md:text-xl text-white text-shadow-sm">
            Extend the life of your roof and improve your home's curb appeal with our safe and effective roof cleaning services.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoofCleaningHero;
