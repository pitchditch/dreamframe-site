
import React from 'react';
import { CircleCheck, Star, Shield, Wrench } from 'lucide-react';

const FounderSection = () => {
  return (
    <section className="py-32 bg-white relative founder-section">
      <div className="container mx-auto px-4">
        <div className="text-right mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Owner-Operated for Quality You Can Trust</h2>
          <div className="w-24 h-1 bg-bc-red ml-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-6xl mx-auto">
          <div className="md:col-span-5 order-2 md:order-1">
            <div className="relative">
              <img 
                src="/lovable-uploads/c5219e28-4a09-4d72-bef9-e96193360fa6.png" 
                alt="Jayden Fisher - Founder" 
                className="w-full max-w-[200px] h-auto rounded-2xl border-4 border-bc-red shadow-lg relative z-10 mx-auto"
              />
              <div className="mt-4 text-center">
                <h3 className="text-2xl font-bold text-gray-800">Jayden Fisher</h3>
                <p className="text-gray-600">Founder & Owner</p>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-7 order-1 md:order-2">
            <div className="space-y-6 bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="text-gray-700 text-lg">
                Every job is personally handled or overseen by Jayden, the founder — no shortcuts, no subpar results.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Star className="w-6 h-6 text-bc-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">100% Satisfaction Guarantee</h3>
                    <p className="text-gray-700">If you're not happy, we'll re-clean it for free. No stress, no hassle.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Wrench className="w-6 h-6 text-bc-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">State-of-the-Art Equipment</h3>
                    <p className="text-gray-700">From industrial pressure washers to specialized cleaning solutions, we use the best tools for superior results.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 text-bc-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Fully Licensed & Insured</h3>
                    <p className="text-gray-700">Peace of mind comes standard. We're covered, so you're covered.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CircleCheck className="w-6 h-6 text-bc-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Friendly, Local, and Transparent</h3>
                    <p className="text-gray-700">No upsells. No pressure. Just honest, dependable service from a neighbor who cares.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
