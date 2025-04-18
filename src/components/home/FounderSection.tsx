
import React from 'react';
import { CircleCheck } from 'lucide-react';

const FounderSection = () => {
  return (
    <section className="py-32 bg-white relative mt-32">
      {/* Overlapping Founder Image - positioned to extend into video section */}
      <div className="absolute left-1/3 transform -translate-x-1/2 -top-32 z-20">
        <div className="relative w-64 h-64">
          <img 
            src="/lovable-uploads/c5219e28-4a09-4d72-bef9-e96193360fa6.png" 
            alt="Jayden Fisher - Founder" 
            className="w-full h-full object-cover rounded-full border-4 border-bc-red"
          />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-right mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Owner-Operated for Quality You Can Trust</h2>
          <div className="w-24 h-1 bg-bc-red ml-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-6xl mx-auto">
          <div className="md:col-span-6">
            <div className="space-y-6">
              <p className="text-gray-700 text-lg">
                Every job is personally handled or overseen by Jayden, the founder — no shortcuts, no subpar results.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CircleCheck className="w-6 h-6 text-bc-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">100% Satisfaction Guarantee</h3>
                    <p className="text-gray-700">If you're not happy, we'll re-clean it for free. No stress, no hassle.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CircleCheck className="w-6 h-6 text-bc-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">State-of-the-Art Equipment</h3>
                    <p className="text-gray-700">From water-fed pole systems to high-powered surface cleaners, we use the best tools for safer, more effective results.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CircleCheck className="w-6 h-6 text-bc-red flex-shrink-0 mt-1" />
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
          
          <div className="md:col-span-6 space-y-8">
            <div>
              <h4 className="text-xl font-bold mb-4">Professional Equipment</h4>
              <img 
                src="/lovable-uploads/e92133c8-2729-4d5a-9925-6d701fc1e6e4.png" 
                alt="Water Fed Pole System" 
                className="w-full rounded-lg shadow-lg mb-6"
              />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Company Vehicle</h4>
              <img 
                src="/lovable-uploads/657b41f7-7fc2-489d-bea2-fc4c7d5655ec.png" 
                alt="BC Pressure Washing Company Vehicle" 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
