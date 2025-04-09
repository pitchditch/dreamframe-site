
import React from 'react';

const BeforeAfterSection: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">See The Difference</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative">
            <img 
              src="/lovable-uploads/82ddca9a-cf9a-4171-a2c6-d00a6c80dc6f.png" 
              alt="Before: Tape and debris stuck to every pane" 
              className="rounded-lg shadow-lg w-full h-80 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4 rounded-b-lg">
              <p className="text-white font-medium text-lg">Before: Tape and debris stuck to every pane</p>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="/lovable-uploads/f8911c9e-2d37-4b05-b34b-6c4b288548a9.png" 
              alt="During: Careful removal using safe tools & ladders" 
              className="rounded-lg shadow-lg w-full h-80 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4 rounded-b-lg">
              <p className="text-white font-medium text-lg">During: Careful removal using safe tools & ladders</p>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="/lovable-uploads/48b0b9b8-0002-4168-8285-65f972c1f873.png" 
              alt="After: Sparkling, streak-free windows" 
              className="rounded-lg shadow-lg w-full h-80 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4 rounded-b-lg">
              <p className="text-white font-medium text-lg">After: Sparkling, streak-free windows</p>
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
