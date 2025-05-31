
import React from 'react';

const LocalMediaSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Professional Window Cleaning in White Rock
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Watch our experienced technicians clean 3-story windows safely from the ground using our 
              advanced water-fed pole system. No ladders needed, just pure water technology for 
              streak-free results every time.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-bc-red rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Safe High-Rise Cleaning</h3>
                  <p className="text-gray-600">
                    Our pole system extends up to 60 feet, allowing us to clean multi-story buildings 
                    safely without ladders or scaffolding.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-bc-red rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Local Surrey & White Rock Service</h3>
                  <p className="text-gray-600">
                    Based in White Rock, we provide fast, reliable window cleaning throughout 
                    Surrey, White Rock, and Greater Vancouver.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-[9/16] max-w-sm mx-auto rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/lovable-uploads/43f837f2-f6f3-404b-85de-ba0901296f83.png"
                alt="Cleaning a 3rd-story window in White Rock using our pole system"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 italic">
                "Cleaning a 3rd-story window in White Rock using our pole system — no ladders, no streaks."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalMediaSection;
