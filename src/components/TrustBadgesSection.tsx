
import React from 'react';
import { Shield, Award, Users, CreditCard } from 'lucide-react';

const TrustBadgesSection = () => {
  return (
    <section className="py-12 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Trusted by White Rock Homeowners</h2>
          <p className="text-gray-300">Licensed, insured, and committed to excellence</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <Shield className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="font-semibold mb-1">Licensed & Insured</h3>
            <p className="text-sm text-gray-300">WCB & liability coverage</p>
          </div>
          
          <div className="text-center">
            <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <Award className="w-8 h-8 text-yellow-400" />
            </div>
            <h3 className="font-semibold mb-1">5-Star Rated</h3>
            <p className="text-sm text-gray-300">Google & BBB reviews</p>
          </div>
          
          <div className="text-center">
            <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <Users className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="font-semibold mb-1">Local Owner</h3>
            <p className="text-sm text-gray-300">Jayden Fisher verified</p>
          </div>
          
          <div className="text-center">
            <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <CreditCard className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="font-semibold mb-1">Easy Payment</h3>
            <p className="text-sm text-gray-300">Card & e-transfer</p>
          </div>
        </div>
        
        <div className="flex justify-center items-center space-x-6 mt-8 pt-8 border-t border-gray-700">
          <img src="/lovable-uploads/c7a06e2a-86f1-4622-81b0-513491105641.png" alt="Google Reviews" className="h-8 opacity-80" />
          <img src="/lovable-uploads/8f646c66-5a09-4335-a82d-e15a1d86a4c4.png" alt="BBB Accredited" className="h-8 opacity-80" />
          <img src="/lovable-uploads/e8c22c20-e153-4bde-aeb8-f0ae12a4eae0.png" alt="Yelp Reviews" className="h-8 opacity-80" />
        </div>
      </div>
    </section>
  );
};

export default TrustBadgesSection;
