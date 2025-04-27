
import React from 'react';

const RoofCleaningProcess = () => {
  return (
    <section className="py-16 bg-white relative z-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Roof Cleaning Process</h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div>
            <img 
              src="/lovable-uploads/89f521bb-edb4-4193-a254-c88e4968fa9f.png"
              alt="Professional Roof Cleaning Process" 
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-bold text-2xl mb-4 text-bc-red">1. Assessment & Protection</h3>
              <p className="text-gray-700 mb-3">
                We start by inspecting your roof to determine the appropriate cleaning approach and protect surrounding plants and landscaping.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-bold text-2xl mb-4 text-bc-red">2. Treatment Application</h3>
              <p className="text-gray-700 mb-3">
                We apply our eco-friendly cleaning solution to kill moss, algae, and bacteria while loosening debris.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold text-2xl mb-4 text-bc-red">3. Low-Pressure Cleaning</h3>
              <p className="text-gray-700 mb-3">
                Using specialized equipment, we safely rinse away contaminants with low pressure to protect your shingles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoofCleaningProcess;
