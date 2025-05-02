
import React from 'react';
import ServiceHeader from '../ServiceHeader';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <div className="relative">
      <ServiceHeader
        title="Post-Construction Window Cleaning"
        description="We specialize in removing paint, plaster, tape, and dust—leaving your windows spotless and streak-free in Surrey, White Rock & Metro Vancouver."
        imagePath="/lovable-uploads/1eaed8db-5d8f-4291-b8a6-cf155569badc.png"
        darkOverlay={false} // Remove dark overlay
      />
      <div className="absolute bottom-10 w-full flex justify-center z-10">
        <Button 
          variant="bc-red" 
          size="lg"
          className="text-lg px-8 py-6 font-medium shadow-lg hover:shadow-xl transition-all"
          onClick={() => document.getElementById('booking-section')?.scrollIntoView({behavior: 'smooth'})}
        >
          Check Prices & Availability <ArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
