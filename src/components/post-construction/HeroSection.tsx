
import React from 'react';
import ServiceHeader from '../ServiceHeader';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <div className="relative">
      <ServiceHeader
        title="Crystal Clear After Construction"
        description="We specialize in removing paint, plaster, tape, and dust—leaving your windows spotless and streak-free in Surrey, White Rock & Metro Vancouver."
        imagePath="/lovable-uploads/46bdd024-275a-4b16-ae57-e690113dae3f.png"
      />
      <div className="absolute bottom-10 left-0 right-0 flex justify-center z-10">
        <Button 
          variant="bc-red" 
          size="lg"
          className="text-lg px-8 py-6 font-medium shadow-lg hover:shadow-xl transition-all"
          onClick={() => document.getElementById('booking-section')?.scrollIntoView({behavior: 'smooth'})}
        >
          Get a Free Quote <ArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
