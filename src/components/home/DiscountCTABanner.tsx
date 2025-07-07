
import React from 'react';
import { Phone, MessageSquare, Shield, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const DiscountCTABanner = () => {
  return (
    <section className="bg-gradient-to-r from-bc-red to-red-700 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
            <span className="font-bold text-lg">🎉 LIMITED TIME OFFER</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Save 15% on Your First Service!
          </h2>
          <p className="text-xl mb-2 opacity-90 max-w-3xl mx-auto">
            Professional exterior cleaning services with same-day availability throughout Metro Vancouver
          </p>
          <p className="text-lg opacity-80">
            Call now to claim your discount - mention this offer when booking
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12">
          <Button 
            asChild 
            size="lg" 
            className="bg-white text-bc-red hover:bg-gray-100 font-bold text-xl px-10 py-6 h-auto shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
          >
            <a href="tel:7788087620" className="flex items-center">
              <Phone className="mr-3" size={24} />
              CALL NOW: (778) 808-7620
            </a>
          </Button>
          
          <Button 
            asChild 
            size="lg" 
            variant="outline" 
            className="border-2 border-white text-white hover:bg-white hover:text-bc-red font-bold text-xl px-10 py-6 h-auto shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
          >
            <Link to="/calculator" className="flex items-center">
              <MessageSquare className="mr-3" size={24} />
              GET FREE INSTANT QUOTE
            </Link>
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <Shield className="w-8 h-8 mr-4 text-green-300" />
            <div>
              <div className="font-bold text-lg">Fully Insured</div>
              <div className="text-sm opacity-80">WCB & $2M liability coverage</div>
            </div>
          </div>
          
          <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <Star className="w-8 h-8 mr-4 text-yellow-300 fill-yellow-300" />
            <div>
              <div className="font-bold text-lg">5-Star Rated</div>
              <div className="text-sm opacity-80">500+ Google & BBB reviews</div>
            </div>
          </div>
          
          <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <Clock className="w-8 h-8 mr-4 text-blue-300" />
            <div>
              <div className="font-bold text-lg">Same-Day Service</div>
              <div className="text-sm opacity-80">Available most days</div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm opacity-75">
            *Offer valid for new customers only. Cannot be combined with other offers. Valid through end of month.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DiscountCTABanner;
