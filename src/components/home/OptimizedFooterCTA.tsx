
import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const OptimizedFooterCTA = () => {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Transform Your Home?
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Get your free quote now or call (778) 808-7620 for Surrey pressure washing & White Rock house washing services
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button asChild size="lg" className="bg-bc-red hover:bg-red-700 text-lg px-8">
            <Link to="/calculator">Get Free Quote Now</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg px-8 border-white text-white hover:bg-white hover:text-gray-900">
            <a href="tel:778-808-7620" className="flex items-center">
              <Phone className="mr-2" size={20} />
              Call (778) 808-7620
            </a>
          </Button>
        </div>
        
        <div className="flex items-center justify-center text-gray-400">
          <MapPin className="mr-2" size={16} />
          <Link to="/service-areas" className="hover:text-white transition-colors">
            View our complete service area list
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OptimizedFooterCTA;
