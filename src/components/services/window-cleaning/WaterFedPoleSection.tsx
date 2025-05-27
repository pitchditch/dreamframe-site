
import React from 'react';
import WindowCleaningQuoteOverlay from '../../forms/WindowCleaningQuoteOverlay';

const WaterFedPoleSection = () => {
  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 heading-text">Water Fed Pole System</h2>
            <p className="text-lg text-gray-700 mb-6 content-text">
              Our state-of-the-art water fed pole system revolutionizes window cleaning by using purified water 
              and extending telescopic poles to reach heights up to 60 feet safely from the ground.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-bc-red rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Purified Water Technology</h3>
                  <p className="text-gray-600">
                    Our system uses deionized water that leaves no spots, streaks, or residue, 
                    providing crystal-clear results every time.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-bc-red rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Enhanced Safety</h3>
                  <p className="text-gray-600">
                    No ladders required - our technicians stay safely on the ground while 
                    cleaning windows up to 6 stories high.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-bc-red rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Eco-Friendly Process</h3>
                  <p className="text-gray-600">
                    Uses only pure water - no chemicals or detergents needed, making it 
                    completely safe for your family and the environment.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-bc-red rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Superior Results</h3>
                  <p className="text-gray-600">
                    Windows stay cleaner longer as the purified water removes all minerals 
                    and contaminants that cause rapid re-soiling.
                  </p>
                </div>
              </div>
            </div>
            
            <WindowCleaningQuoteOverlay buttonText="Request Water Fed Pole Cleaning" variant="bc-red" />
          </div>
          
          <div className="relative">
            <img 
              src="/lovable-uploads/b6ea871e-3644-4cb5-86c0-1da34e4db828.png" 
              alt="Water Fed Pole System for Professional Window Cleaning"
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <div className="absolute -bottom-4 -right-4 bg-bc-red text-white p-4 rounded-lg shadow-lg">
              <p className="text-sm font-medium">Up to 60ft Reach</p>
              <p className="text-xs">Safe & Efficient</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaterFedPoleSection;
