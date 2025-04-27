
import React from 'react';
import ServiceHeader from '@/components/ServiceHeader';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const RoofCleaningHero = () => {
  return (
    <div className="w-full h-screen relative bg-black overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-0">
        <iframe 
          className="absolute inset-0 w-full h-full"
          src="https://www.youtube.com/embed/eQSgdx9ujcc?autoplay=1&mute=1&loop=1&playlist=eQSgdx9ujcc&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1"
          title="Roof Cleaning Process"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          style={{ 
            border: 'none',
            width: '100vw',
            height: '100vh',
            objectFit: 'cover'
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center">
          <div className="text-center px-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Professional Roof Cleaning & Moss Removal
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto drop-shadow-md">
              Safe, effective roof cleaning that extends the life of your roof while improving your home's appearance.
            </p>
            <Button 
              variant="bc-red" 
              size="lg" 
              className="text-lg font-medium px-8 py-6"
              asChild
            >
              <Link to="/calculator">Get Your Free Quote</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoofCleaningHero;
