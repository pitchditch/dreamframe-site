
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface CallToActionProps {
  title: string;
  subtitle: string | React.ReactNode;
  backgroundImage?: string;
}

const CallToAction = ({ title, subtitle, backgroundImage }: CallToActionProps) => {
  return (
    <section 
      className="py-20 bg-cover bg-center relative"
      style={{ 
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)' 
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
          <div className="text-lg md:text-xl mb-8 opacity-90">
            {subtitle}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-bc-red hover:bg-gray-100">
              <Link to="/contact">Get Free Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-bc-red">
              <a href="tel:7788087620">Call (778) 808-7620</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
