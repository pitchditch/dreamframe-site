
import React from 'react';
import { Button } from './ui/button';
import { Gift, Users, DollarSign, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const ReferralProgramSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
              <Gift className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h2 className="text-4xl font-bold mb-6 text-gray-900">
            Refer a Friend & Save 50%!
          </h2>
          
          <p className="text-xl text-gray-700 mb-8">
            Love our service? Share it with friends and family. When they book, you both save!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Users className="w-12 h-12 text-bc-red mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">1. Refer a Friend</h3>
              <p className="text-gray-600">Share our services with someone you know who needs exterior cleaning</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Star className="w-12 h-12 text-bc-red mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">2. They Book Service</h3>
              <p className="text-gray-600">Your friend schedules any of our cleaning services</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <DollarSign className="w-12 h-12 text-bc-red mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">3. You Both Save 50%</h3>
              <p className="text-gray-600">Both you and your friend get 50% off your next service!</p>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">How It Works</h3>
            <div className="text-left max-w-2xl mx-auto space-y-4">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-bc-red text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">1</div>
                <div>
                  <h4 className="font-semibold">Give us their contact info</h4>
                  <p className="text-gray-600">Call us at (778) 808-7620 or mention them when booking online</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-bc-red text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">2</div>
                <div>
                  <h4 className="font-semibold">We'll reach out to them</h4>
                  <p className="text-gray-600">We'll contact your friend with a special referral offer</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-bc-red text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">3</div>
                <div>
                  <h4 className="font-semibold">Both get 50% off next service</h4>
                  <p className="text-gray-600">Once they book, you both receive a 50% discount on your next cleaning</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-6 mb-8">
            <h4 className="font-bold text-yellow-800 mb-2">🎉 Limited Time Bonus!</h4>
            <p className="text-yellow-700">
              Refer 3 friends in one month and get a <strong>FREE complete house wash</strong> (up to $500 value)!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-bc-red hover:bg-red-700 text-white font-bold">
              <a href="tel:778-808-7620">Call to Refer: (778) 808-7620</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-bc-red text-bc-red hover:bg-bc-red hover:text-white">
              <Link to="/contact">Submit Referral Online</Link>
            </Button>
          </div>
          
          <p className="text-sm text-gray-500 mt-6">
            * Referral discount applies to services over $100. Cannot be combined with other offers. Valid for new customers only.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReferralProgramSection;
