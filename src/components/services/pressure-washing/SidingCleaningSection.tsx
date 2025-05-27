
import React from 'react';
import { Shield, Droplets, Sparkles } from 'lucide-react';

const SidingCleaningSection = () => {
  return (
    <section className="relative w-full h-[600px] bg-gray-900">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/790f8c56-e2fe-4e2d-bbf0-c536ca654807.png"
          alt="Professional siding cleaning with pressure washing"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-bc-red/10 text-bc-red mb-6">
              <Sparkles size={16} className="mr-2" />
              Siding Cleaning Specialist
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Professional Siding Cleaning
            </h2>
            
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Restore your home's exterior beauty with our specialized siding cleaning service. We safely remove dirt, 
              mildew, algae, and years of accumulated grime to reveal your siding's original appearance.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-bc-red rounded-full flex items-center justify-center mt-1">
                    <Shield className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Safe Soft Washing</h4>
                    <p className="text-white/80 text-sm">
                      Low-pressure cleaning that won't damage your siding material
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-bc-red rounded-full flex items-center justify-center mt-1">
                    <Droplets className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Complete Coverage</h4>
                    <p className="text-white/80 text-sm">
                      All siding types including vinyl, wood, aluminum, and fiber cement
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-bc-red rounded-full flex items-center justify-center mt-1">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Long-Lasting Results</h4>
                    <p className="text-white/80 text-sm">
                      Professional cleaning solutions that prevent quick re-soiling
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-bc-red rounded-full flex items-center justify-center mt-1">
                    <Shield className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Eco-Friendly Products</h4>
                    <p className="text-white/80 text-sm">
                      Biodegradable cleaning solutions safe for your landscaping
                    </p>
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

export default SidingCleaningSection;
