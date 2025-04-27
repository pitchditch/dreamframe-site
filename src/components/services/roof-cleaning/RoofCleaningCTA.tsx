
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const RoofCleaningCTA = () => {
  return (
    <section className="relative h-[80vh] w-full">
      <img
        src="/lovable-uploads/84fe2633-71d7-44b6-9b9b-31ee0cf7ae27.png"
        alt="Clean, Beautiful Roof"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl font-bold mb-6 text-white drop-shadow-lg">Ready for a Clean, Beautiful Roof?</h2>
        <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
          Our roof cleaning service is safe, effective, and guaranteed to transform your home's appearance.
        </p>
        <Button 
          variant="default" 
          size="lg" 
          className="bg-white text-bc-red hover:bg-gray-100 text-lg font-semibold px-8 py-6"
          asChild
        >
          <Link to="/calculator">Get Your Free Quote Today</Link>
        </Button>
      </div>
    </section>
  );
};

export default RoofCleaningCTA;
