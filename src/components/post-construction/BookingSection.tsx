
import React from 'react';
import { Button } from '../ui/button';
import { Shield, Star, Check } from 'lucide-react';

const BookingSection: React.FC = () => {
  return (
    <section id="booking-section" className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4 text-center">Get a Post-Construction Window Cleaning Estimate</h2>
          <p className="text-center text-gray-600 mb-8">
            Every job is checked personally by our team lead. We're fully insured and trusted by local builders.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="inline-flex items-center bg-green-50 text-green-800 px-4 py-2 rounded-full">
              <Shield className="mr-2 h-5 w-5" />
              <span className="font-medium">100% Satisfaction Guaranteed</span>
            </div>
            <div className="inline-flex items-center bg-yellow-50 text-yellow-800 px-4 py-2 rounded-full">
              <Star className="mr-2 h-5 w-5 fill-yellow-500 text-yellow-500" />
              <span className="font-medium">5-Star Google Rating</span>
            </div>
            <div className="inline-flex items-center bg-blue-50 text-blue-800 px-4 py-2 rounded-full">
              <Check className="mr-2 h-5 w-5" />
              <span className="font-medium">Fully Insured & Bonded</span>
            </div>
          </div>
          
          <div className="text-center">
            <Button 
              variant="bc-red" 
              size="lg" 
              onClick={() => window.location.href = '/contact'}
              className="text-lg px-8 py-6"
            >
              Get Your Free Estimate
            </Button>
            <p className="mt-4 text-sm text-gray-500">
              We'll respond within 24 hours to schedule your service.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
