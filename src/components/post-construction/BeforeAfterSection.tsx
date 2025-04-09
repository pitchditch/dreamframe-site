
import React from 'react';

const BeforeAfterSection: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="section-title mb-12">See The Difference</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1460574283810-2aab119d8511" 
              alt="Before: Tape and debris stuck to every pane" 
              className="rounded-lg shadow-lg w-full h-80 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 rounded-b-lg">
              <p className="text-white font-medium text-lg">Before: Tape and debris stuck to every pane</p>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1439337153520-7082a56a81f4" 
              alt="After: Spotless, streak-free, and ready to impress" 
              className="rounded-lg shadow-lg w-full h-80 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 rounded-b-lg">
              <p className="text-white font-medium text-lg">After: Spotless, streak-free, and ready to impress</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
