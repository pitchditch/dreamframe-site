
import React from 'react';
import { Target, Car, Gift, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ReferralRedCarSection = () => {
  return (
    <section className="py-16 bg-yellow-50 border-t-4 border-yellow-400">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Special Offers & Savings
          </h2>
          <p className="text-lg text-gray-600">
            Save money while getting the best cleaning service in Metro Vancouver
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-8 shadow-lg text-center border-2 border-yellow-300">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                <Target className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              🎯 Refer & Save 50%
            </h3>
            <p className="text-gray-600 mb-6">
              Know someone who needs cleaning? Refer them and get 50% off your next service when they book!
            </p>
            <Button asChild variant="bc-red" size="lg">
              <Link to="/contact">
                <Gift className="mr-2" size={18} />
                Start Referring
              </Link>
            </Button>
          </div>
          
          <div className="bg-white rounded-lg p-8 shadow-lg text-center border-2 border-red-300">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <Car className="w-8 h-8 text-red-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              🚗 Spotted Our Red Car?
            </h3>
            <p className="text-gray-600 mb-6">
              Seen our red BC Pressure Washing car around town? Mention it when you book and get 10% off your service!
            </p>
            <Button asChild variant="bc-red" size="lg">
              <a href="tel:7788087620">
                <Phone className="mr-2" size={18} />
                Call & Mention Red Car
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReferralRedCarSection;
