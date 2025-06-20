
import React from 'react';

const BeforeAfterSection: React.FC = () => {
  const services = [
    {
      title: "Window Cleaning",
      beforeImage: "/lovable-uploads/1eaed8db-5d8f-4291-b8a6-cf155569badc.png",
      afterImage: "/lovable-uploads/3af05628-d275-4679-9546-12fcc6178d94.png",
      beforeAlt: "Dirty windows with tape and debris",
      afterAlt: "Clean, sparkling windows"
    },
    {
      title: "Pressure Washing",
      beforeImage: "/lovable-uploads/8bfa7c48-74fb-490c-89e1-e15d87fdcc6d.png",
      afterImage: "/lovable-uploads/a237ac38-d3a7-42b4-853b-65512e02a031.png",
      beforeAlt: "Dirty driveway before pressure washing",
      afterAlt: "Clean driveway after pressure washing"
    },
    {
      title: "Gutter Cleaning",
      beforeImage: "/lovable-uploads/1eaed8db-5d8f-4291-b8a6-cf155569badc.png",
      afterImage: "/lovable-uploads/3af05628-d275-4679-9546-12fcc6178d94.png",
      beforeAlt: "Clogged gutters with debris",
      afterAlt: "Clean, flowing gutters"
    }
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">What We Clean</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <h3 className="text-xl font-semibold text-center py-4 bg-bc-red text-white">
                {service.title}
              </h3>
              
              {/* Before Image */}
              <div className="relative">
                <img 
                  src={service.beforeImage}
                  alt={service.beforeAlt}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded text-sm font-medium">
                  Before
                </div>
              </div>
              
              {/* After Image */}
              <div className="relative">
                <img 
                  src={service.afterImage}
                  alt={service.afterAlt}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 bg-green-500 text-white px-3 py-1 rounded text-sm font-medium">
                  After
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold mb-4">Ready to make your property shine?</h3>
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
