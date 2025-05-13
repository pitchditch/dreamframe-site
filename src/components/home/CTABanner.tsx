
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Phone, Calendar } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const CTABanner: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="bg-bc-red py-4 sticky bottom-0 z-40 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center mb-2 sm:mb-0">
            <img 
              src="/lovable-uploads/5ab1b520-40ad-4e25-b0d6-6292266b90ea.png"
              alt="Jayden Fisher, Owner" 
              className="w-10 h-10 rounded-full mr-3 border-2 border-white object-cover" 
            />
            <div className="text-white">
              <p className="font-bold text-sm sm:text-base">Ready for a free quote?</p>
              <p className="text-xs sm:text-sm">Get a response within 24 hours</p>
            </div>
          </div>
          
          <div className="flex flex-row gap-3">
            <Button asChild size="sm" variant="secondary" className="gap-1">
              <a href="tel:+16047860399">
                <Phone className="w-4 h-4" />
                <span>Call</span>
              </a>
            </Button>
            
            <Button asChild size="sm" variant="secondary" className="bg-white text-bc-red hover:bg-gray-100 border-none gap-1">
              <Link to="/contact">
                <Calendar className="w-4 h-4" />
                <span>Get Quote</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
