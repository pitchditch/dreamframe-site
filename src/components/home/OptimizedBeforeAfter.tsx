
import React from 'react';

const OptimizedBeforeAfter = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-bc-red font-medium mb-2">Real Results in Surrey & White Rock</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">See the Difference</h2>
          <p className="text-xl text-gray-600">
            Swipe or click to view our BC exterior cleaning transformations
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative group">
              <img 
                src="/lovable-uploads/73ff1153-6589-4537-996a-1ff5f512cbea.png"
                alt="Before window cleaning"
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
              <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                BEFORE
              </div>
              <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
                Window Cleaning - White Rock, Marine Drive
              </div>
            </div>
            
            <div className="relative group">
              <img 
                src="/lovable-uploads/c349ee7a-bdd4-43c8-a168-a68aa3b007e3.png"
                alt="After window cleaning"
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
              <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                AFTER
              </div>
              <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
                Crystal clear window restoration
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">📍 Featured: White Rock, Marine Drive</p>
            <div className="flex justify-center gap-2">
              <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">All Services (5)</span>
              <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">Windows (1)</span>
              <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">Roofs (1)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OptimizedBeforeAfter;
