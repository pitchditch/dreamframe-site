
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const WhatWeCleanSection = () => {
  const isMobile = useIsMobile();

  const cleaningServices = [
    {
      title: "Residential Windows",
      description: "Interior and exterior window cleaning for homes, condos, and townhouses",
      image: "/lovable-uploads/104fb195-8227-4f8c-af68-5406acc5388a.png"
    },
    {
      title: "Patio Glass Doors",
      description: "Sliding glass doors, French doors, and patio entrances",
      image: "/lovable-uploads/7fd77226-1d57-4c52-a870-871532745a3f.png"
    },
    {
      title: "Glass Awnings",
      description: "Glass canopies, awnings, and overhead glass structures",
      image: "/lovable-uploads/26f6a625-a200-4106-8f94-579be5c566b6.png"
    },
    {
      title: "Glass Railings",
      description: "Balcony glass panels, deck railings, and safety glass barriers",
      image: "/lovable-uploads/43f837f2-f6f3-404b-85de-ba0901296f83.png"
    },
    {
      title: "Commercial Windows",
      description: "Office buildings, storefronts, and high-rise commercial properties",
      image: "/lovable-uploads/b5f7b3b1-4a41-4e10-963f-72eef95a03c4.png"
    },
    {
      title: "Skylights",
      description: "Roof skylights, glass ceiling panels, and light wells",
      image: "/lovable-uploads/481b70c0-733d-4cc9-9629-3628731d87e4.png"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-bold mb-4 text-gray-900`}>
            What We Clean
          </h2>
          <p className={`${isMobile ? 'text-base' : 'text-lg'} text-gray-600 max-w-3xl mx-auto`}>
            We provide professional window cleaning services for all types of glass surfaces
          </p>
        </div>
        
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-2 md:grid-cols-3 gap-8'}`}>
          {cleaningServices.map((service, index) => (
            <div key={index} className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className={`w-full ${isMobile ? 'h-48' : 'h-56'} object-cover transition-transform duration-300 group-hover:scale-105`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className={`${isMobile ? 'p-4' : 'p-6'}`}>
                <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold mb-2 text-gray-900 group-hover:text-bc-red transition-colors`}>
                  {service.title}
                </h3>
                <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600 leading-relaxed`}>
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className={`${isMobile ? 'text-base' : 'text-lg'} text-gray-600 mb-6`}>
            Don't see your glass type listed? We clean all types of glass surfaces!
          </p>
          <a 
            href="/calculator" 
            className="inline-block bg-bc-red text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Get Free Quote
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhatWeCleanSection;
