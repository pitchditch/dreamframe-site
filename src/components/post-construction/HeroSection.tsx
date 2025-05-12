
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ServiceHeader from '@/components/ServiceHeader';

const HeroSection = () => {
  return (
    <ServiceHeader 
      title="Post Construction Window Cleaning"
      description="Professional cleaning for newly constructed or renovated properties"
      imagePath="/lovable-uploads/a2e65aef-c23d-4e15-87b4-3269f1dceede.png"
      darkOverlay={true}
      buttonPosition="bottom"
    />
  );
};

export default HeroSection;
