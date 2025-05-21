
import React from 'react';
import SplitBeforeAfterSlider from '../SplitBeforeAfterSlider';

const BeforeAfterSection: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">See The Difference</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="relative">
            <img 
              src="/lovable-uploads/1eaed8db-5d8f-4291-b8a6-cf155569badc.png" 
              alt="Before: Tape and debris stuck to every pane" 
              className="rounded-lg shadow-lg w-full h-72 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4 rounded-b-lg">
              <p className="text-white font-medium text-lg">Before: Tape and debris</p>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="/lovable-uploads/8bfa7c48-74fb-490c-89e1-e15d87fdcc6d.png" 
              alt="During: Careful removal using specialized techniques" 
              className="rounded-lg shadow-lg w-full h-72 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4 rounded-b-lg">
              <p className="text-white font-medium text-lg">During: Careful removal</p>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="/lovable-uploads/a237ac38-d3a7-42b4-853b-65512e02a031.png" 
              alt="Cleaning Windows: Professional window cleaning in progress" 
              className="rounded-lg shadow-lg w-full h-72 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4 rounded-b-lg">
              <p className="text-white font-medium text-lg">Cleaning Windows</p>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="/lovable-uploads/3af05628-d275-4679-9546-12fcc6178d94.png" 
              alt="After: Sparkling, streak-free windows" 
              className="rounded-lg shadow-lg w-full h-72 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4 rounded-b-lg">
              <p className="text-white font-medium text-lg">After: Sparkling clean</p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold mb-4">Ready to make your windows shine?</h3>
          <a 
            href="#booking-section" 
            className="inline-block bg-bc-red text-white px-8 py-4 rounded-md font-medium text-lg hover:bg-red-700 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('booking-section')?.scrollIntoView({behavior: 'smooth'});
            }}
          >
            Get Your Free Quote
          </a>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
