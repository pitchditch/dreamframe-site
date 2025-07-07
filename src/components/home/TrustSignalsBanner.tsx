
import React from 'react';
import { Shield, Star, Home } from 'lucide-react';

const TrustSignalsBanner = () => {
  return (
    <section className="bg-gray-900 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-400" />
            <span className="font-semibold">✅ Insured & Licensed</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="font-semibold">⭐ 5-Star Rated Service</span>
          </div>
          <div className="flex items-center gap-2">
            <Home className="w-5 h-5 text-blue-400" />
            <span className="font-semibold">🏠 Locally Owned</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignalsBanner;
