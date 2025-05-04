import React from 'react';
import ServiceHeader from '../ServiceHeader';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
const HeroSection: React.FC = () => {
  const isMobile = useIsMobile();
  return <div className="relative">
      <ServiceHeader title="Post-Construction Window Cleaning" description="We specialize in removing paint, plaster, tape, and dust—leaving your windows spotless and streak-free in Surrey, White Rock & Metro Vancouver." imagePath="/lovable-uploads/1eaed8db-5d8f-4291-b8a6-cf155569badc.png" darkOverlay={false} // Remove dark overlay
    />
      
    </div>;
};
export default HeroSection;