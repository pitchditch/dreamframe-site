
import React from 'react';

const WaterFedPoleSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="/lovable-uploads/37f3d956-ce31-4e5d-92db-678535fdd9f2.png"
              alt="Water Fed Pole System Equipment"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Water Fed Pole System</h2>
            <p className="text-lg text-gray-700 mb-6">
              Our state-of-the-art water fed pole system revolutionizes window cleaning by using purified water delivered through telescopic poles that can reach up to 5 stories high.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-3 h-3 bg-bc-red rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Pure Water Technology</h3>
                  <p className="text-gray-600">Deionized water leaves no streaks or water spots, drying completely clear</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-3 h-3 bg-bc-red rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Safe & Efficient</h3>
                  <p className="text-gray-600">Clean windows up to 5 stories without ladders, reducing safety risks</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-3 h-3 bg-bc-red rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Eco-Friendly</h3>
                  <p className="text-gray-600">No chemicals needed - just pure water for exceptional results</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaterFedPoleSection;
