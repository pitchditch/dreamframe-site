
import React from 'react';

const TrustedCustomersSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Trusted by Homeowners Across Metro Vancouver</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join hundreds of satisfied customers who trust BC Pressure Washing for their exterior cleaning needs
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">500+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">5⭐</div>
            <div className="text-gray-600">Google Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">100%</div>
            <div className="text-gray-600">Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">7+</div>
            <div className="text-gray-600">Cities Served</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedCustomersSection;
