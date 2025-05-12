
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Phone, Calendar } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const CTABanner: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="bg-bc-red text-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Ready to Transform Your Property?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            Get a free quote today and see the difference professional cleaning makes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="outline" className="bg-white text-bc-red border-white hover:bg-gray-100 hover:text-bc-red">
              <Link to="/calculator" className="flex items-center gap-2 px-6 py-6 text-lg font-semibold">
                <Calendar className="w-5 h-5" /> Check Availability
              </Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
              <a href="tel:7788087620" className="flex items-center gap-2 px-6 py-6 text-lg font-semibold">
                <Phone className="w-5 h-5" /> Call: 778-808-7620
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
