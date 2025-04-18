
import React from 'react';

const FounderSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Founder</h2>
          <div className="w-24 h-1 bg-bc-red mx-auto"></div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-8 max-w-5xl mx-auto">
          <div className="md:w-1/2">
            <img 
              src="/lovable-uploads/4b5d343d-9019-4709-9661-a5341edd7db7.png"
              alt="BC Pressure Washing Founder" 
              className="rounded-lg shadow-xl w-full h-auto object-cover"
            />
          </div>
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold mb-4">John Smith</h3>
            <p className="text-gray-700 mb-4">
              With over 15 years of experience in the exterior cleaning industry, I founded BC Pressure Washing with a simple mission: to deliver exceptional cleaning services with honesty and integrity.
            </p>
            <p className="text-gray-700 mb-4">
              My journey began when I noticed how many homeowners struggled to find reliable, professional cleaning services. I knew there had to be a better way—one that combined cutting-edge equipment, environmentally friendly techniques, and genuine customer service.
            </p>
            <p className="text-gray-700 mb-4">
              Today, our team serves hundreds of residential and commercial clients throughout the Lower Mainland. We take pride in transforming properties and exceeding expectations with every job.
            </p>
            <div className="mt-6">
              <p className="text-lg font-semibold">Our Guarantee:</p>
              <p className="text-bc-red font-bold text-lg italic">"If you're not completely satisfied, we'll re-clean for free."</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
