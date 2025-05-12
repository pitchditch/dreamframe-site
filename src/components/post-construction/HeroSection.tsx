
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ServiceHeader from '@/components/ServiceHeader';

const HeroSection = () => {
  return (
    <ServiceHeader 
      title="Post Construction Window Cleaning"
      description="Professional cleaning for newly constructed or renovated properties"
      imagePath="/lovable-uploads/1f54ff74-e94a-413b-a279-55efad21b29a.png"
      darkOverlay={true}
      buttonPosition="bottom"
    />
  );
};

export default HeroSection;
