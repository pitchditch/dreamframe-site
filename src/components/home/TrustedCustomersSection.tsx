
import React from 'react';

const TrustedCustomersSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Real Homeowners</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See the actual transformations we've achieved for homeowners across Surrey, White Rock and Metro Vancouver.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Before/After Gallery - Use higher quality full-sized images */}
          <div className="overflow-hidden rounded-lg shadow-md group relative">
            <img 
              src="/lovable-uploads/0349dfb1-14e8-4659-bd93-89bc41c2fd53.png" 
              alt="Before: Dirty Siding" 
              className="w-full h-64 object-cover object-center hover:scale-110 transition-all duration-500"
            />
            <div className="absolute top-0 left-0 bg-bc-red/70 backdrop-blur-sm text-white px-3 py-1 text-sm font-medium">Before</div>
          </div>
          <div className="overflow-hidden rounded-lg shadow-md group relative">
            <img 
              src="/lovable-uploads/0413d26c-fb32-4ac3-ad1c-8e24f7878b90.png" 
              alt="After: Clean Siding" 
              className="w-full h-64 object-cover object-center hover:scale-110 transition-all duration-500"
            />
            <div className="absolute top-0 left-0 bg-green-600/70 backdrop-blur-sm text-white px-3 py-1 text-sm font-medium">After</div>
          </div>
          <div className="overflow-hidden rounded-lg shadow-md group relative">
            <img 
              src="/lovable-uploads/04bd3905-2c86-4062-9cec-ddbddead79ab.png" 
              alt="Before: Dirty Driveway" 
              className="w-full h-64 object-cover object-center hover:scale-110 transition-all duration-500"
            />
            <div className="absolute top-0 left-0 bg-bc-red/70 backdrop-blur-sm text-white px-3 py-1 text-sm font-medium">Before</div>
          </div>
          <div className="overflow-hidden rounded-lg shadow-md group relative">
            <img 
              src="/lovable-uploads/041945aa-f58d-4820-9af6-0202a0b9b726.png" 
              alt="After: Clean Driveway" 
              className="w-full h-64 object-cover object-center hover:scale-110 transition-all duration-500"
            />
            <div className="absolute top-0 left-0 bg-green-600/70 backdrop-blur-sm text-white px-3 py-1 text-sm font-medium">After</div>
          </div>
        </div>
        
        <div className="text-center mt-10">
          <a href="/services/pressure-washing" className="inline-flex items-center text-bc-red hover:text-bc-red/80 font-medium">
            View More Transformations 
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TrustedCustomersSection;
