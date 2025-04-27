
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const RoofCleaningCTA = () => {
  return (
    <section className="py-16 bg-bc-red text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for a Clean, Beautiful Roof?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
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
