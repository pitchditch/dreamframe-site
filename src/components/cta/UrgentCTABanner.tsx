
import React from 'react';
import { Phone, MessageSquare, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const UrgentCTABanner = () => {
  return (
    <section className="bg-gradient-to-r from-bc-red to-red-700 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <Clock className="w-5 h-5 mr-2" />
            <span className="font-semibold">Limited Time Offer</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Don't Wait - Book Your Free Quote Today!
          </h2>
          <p className="text-xl mb-2 opacity-90">
            Same-day service available • Fully insured • 100% satisfaction guaranteed
          </p>
          <p className="text-lg opacity-80">
            Call now and save 15% on your first service
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
          <Button 
            asChild 
            size="lg" 
            className="bg-white text-bc-red hover:bg-gray-100 font-bold text-lg px-8 py-4 h-auto"
          >
            <a href="tel:7788087620" className="flex items-center">
              <Phone className="mr-3" size={20} />
              CALL NOW: (778) 808-7620
            </a>
          </Button>
          
          <Button 
            asChild 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-bc-red font-bold text-lg px-8 py-4 h-auto"
          >
            <Link to="/calculator" className="flex items-center">
              <MessageSquare className="mr-3" size={20} />
              GET FREE INSTANT QUOTE
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="flex items-center justify-center">
            <Clock className="w-6 h-6 mr-3" />
            <div>
              <div className="font-bold">Same-Day Service</div>
              <div className="text-sm opacity-80">Available most days</div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Shield className="w-6 h-6 mr-3" />
            <div>
              <div className="font-bold">Fully Insured</div>
              <div className="text-sm opacity-80">$2M liability coverage</div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <MessageSquare className="w-6 h-6 mr-3" />
            <div>
              <div className="font-bold">Free Quotes</div>
              <div className="text-sm opacity-80">No obligation estimates</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UrgentCTABanner;
