
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CTABanner = () => {
  return (
    <section className="relative py-16 bg-bc-red">
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-0"></div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="/lovable-uploads/5f513861-3c9c-4e8c-a0f1-254574396881.png" 
            alt="Background pattern" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Property?</h2>
          <p className="text-lg mb-8">
            Experience the BC Pressure Washing difference with our premium cleaning services.
            Get your free, no-obligation quote today and see why we're the trusted choice for homeowners across Metro Vancouver.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/calculator">
              <Button className="bg-white text-bc-red hover:bg-gray-100 font-semibold px-6 py-3 text-base">
                Get a Free Quote
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-6 py-3 text-base">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
