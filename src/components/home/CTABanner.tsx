
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Phone, Calendar } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const CTABanner: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="bg-bc-red py-6 sticky bottom-0 z-40 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <img 
              src="/lovable-uploads/5ab1b520-40ad-4e25-b0d6-6292266b90ea.png"
              alt="Jayden Fisher, Owner" 
              className="w-12 h-12 rounded-full mr-3 border-2 border-white object-cover" 
            />
            <div className="text-white">
              <p className="font-bold">Ready for a free quote?</p>
              <p className="text-sm">Get a response within 24 hours</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" variant="secondary" className="gap-2">
              <a href="tel:+16047860399">
                <Phone className="w-5 h-5" />
                <span className="hidden sm:inline">Call Now</span>
                <span className="sm:hidden">Call</span>
              </a>
            </Button>
            
            <Button asChild size="lg" variant="secondary" className="bg-white text-bc-red hover:bg-gray-100 border-none gap-2">
              <Link to="/contact">
                <Calendar className="w-5 h-5" />
                <span className="hidden sm:inline">Get Free Quote</span>
                <span className="sm:hidden">Get Quote</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
