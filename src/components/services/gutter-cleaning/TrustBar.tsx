
import React from 'react';
import { Shield, Users, Star, Award } from 'lucide-react';

const TrustBar = () => {
  return (
    <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6" />
            <span className="font-semibold">Licensed & Insured</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6" />
            <span className="font-semibold">100+ Happy Customers</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">5-Star Google Rating</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6" />
            <span className="font-semibold">Local Experts Since 2020</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
