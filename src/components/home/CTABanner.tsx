
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Phone, Calendar } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const CTABanner: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="bg-bc-red py-3 sticky bottom-0 z-40 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/72766780-6dc1-42de-8971-3a11add4daad.png"
            alt="Jayden Fisher, Owner" 
            className="w-10 h-10 rounded-full mr-3 border-2 border-white object-cover" 
          />
          
          <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <div className="text-white mb-1 sm:mb-0">
              <p className="font-bold text-sm sm:text-base">Ready for a free quote?</p>
              <p className="text-xs sm:text-sm">Get a response within 24 hours</p>
            </div>
            
            <div className="flex flex-row gap-2 mt-1 sm:mt-0">
              <Button asChild size="sm" variant="secondary" className="gap-1">
                <a href="tel:+16047860399">
                  <Phone className="w-4 h-4" />
                  <span className="text-xs sm:text-sm">Call</span>
                </a>
              </Button>
              
              <Button asChild size="sm" variant="secondary" className="bg-white text-bc-red hover:bg-gray-100 border-none gap-1">
                <Link to="/contact">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs sm:text-sm">Get Quote</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
