
import React from 'react';
import ServiceHeader from '../ServiceHeader';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import CallToAction from '../CallToAction';

const HeroSection: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="relative">
      <ServiceHeader 
        title="Post-Construction Window Cleaning" 
        description="We specialize in removing paint, plaster, tape, and dust—leaving your windows spotless and streak-free in Surrey, White Rock & Metro Vancouver." 
        imagePath="/lovable-uploads/1eaed8db-5d8f-4291-b8a6-cf155569badc.png" 
        darkOverlay={false} // Remove dark overlay
      />
      
      <div className="container mx-auto px-4 py-8 -mt-24 md:-mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between max-w-5xl mx-auto bg-white rounded-lg shadow-xl p-6">
          <div className="md:w-2/3">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Expert Post-Construction Window Cleaning</h2>
            <p className="text-gray-700 mb-4">
              After the construction crew leaves, we handle the detailed cleanup of all window surfaces. Our specialized team removes:
            </p>
            
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Construction labels and stickers</li>
              <li>Paint overspray and splatters</li>
              <li>Concrete and grout residue</li>
              <li>Silicone and caulking marks</li>
              <li>Adhesive from protective films</li>
            </ul>
            
            <Button className="bg-bc-red hover:bg-red-700 text-white transition-all hover:scale-105" size="lg">
              Get Started <ArrowRight className="ml-2" size={20} />
            </Button>
            
            <div className="mt-4 text-gray-700 font-medium block md:hidden">
              "Every job is personally checked by me"
            </div>
          </div>
          
          <div className="md:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
              <h3 className="text-lg font-bold mb-3 text-bc-red">Why Choose Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-bc-red/10 rounded-full p-1 mr-3 mt-1">
                    <svg className="w-4 h-4 text-bc-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </span>
                  <span>Specialized tools for construction residue</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bc-red/10 rounded-full p-1 mr-3 mt-1">
                    <svg className="w-4 h-4 text-bc-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </span>
                  <span>Safe chemicals for all window types</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bc-red/10 rounded-full p-1 mr-3 mt-1">
                    <svg className="w-4 h-4 text-bc-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </span>
                  <span>Detailed frame and track cleaning</span>
                </li>
              </ul>
              <div className="mt-4 text-gray-700 font-medium hidden md:block">
                "Every job is personally checked by me"
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
