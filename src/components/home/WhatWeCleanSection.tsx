
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Droplets, Zap, Home, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const WhatWeCleanSection = () => {
  const isMobile = useIsMobile();

  const services = [
    {
      title: "Pressure Washing",
      icon: <Zap className="h-8 w-8 text-bc-red" />,
      image: "/lovable-uploads/8bfa7c48-74fb-490c-89e1-e15d87fdcc6d.png",
      description: "Remove dirt, mold, and grime from your property",
      items: ["Driveways", "Patios", "Decks", "Fences", "Siding", "Walkways", "Concrete", "Brick & Stucco"]
    },
    {
      title: "Window Cleaning",
      icon: <Droplets className="h-8 w-8 text-bc-red" />,
      image: "/lovable-uploads/1eaed8db-5d8f-4291-b8a6-cf155569badc.png",
      description: "Crystal clear windows inside and out",
      items: ["Interior Windows", "Exterior Windows", "Screen Cleaning", "Glass Doors", "Skylights", "Glass Railings"]
    },
    {
      title: "House Washing",
      icon: <Home className="h-8 w-8 text-bc-red" />,
      image: "/lovable-uploads/53939952-27dd-42b6-92d3-7ab137a3b788.png",
      description: "Gentle soft-wash cleaning for your home's exterior",
      items: ["Siding Cleaning", "Roof Cleaning", "Gutter Cleaning", "Soft Washing", "Eco-Friendly Methods"]
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-bold mb-4 text-gray-900`}>
            Exterior Cleaning Services in White Rock, BC
          </h2>
          <p className={`${isMobile ? 'text-base' : 'text-lg'} text-gray-600 max-w-3xl mx-auto`}>
            Our White Rock pressure washing team can remove mold, dirt and grime from driveways, sidewalks, patios, deck railings, fences and more.
          </p>
        </div>
        
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'md:grid-cols-3 gap-8'} max-w-6xl mx-auto`}>
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img 
                  src={service.image} 
                  alt={`${service.title} service in White Rock, BC`}
                  className={`w-full ${isMobile ? 'h-48' : 'h-56'} object-cover`}
                />
                <div className="absolute top-4 left-4 bg-white/90 p-3 rounded-full shadow-md">
                  {service.icon}
                </div>
              </div>
              
              <div className={`${isMobile ? 'p-4' : 'p-6'}`}>
                <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold mb-2 text-gray-900`}>
                  {service.title}
                </h3>
                <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600 mb-4`}>
                  {service.description}
                </p>
                
                <div className="space-y-1 mb-4">
                  {service.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 bg-bc-red rounded-full mr-2 flex-shrink-0"></span>
                      {item}
                    </div>
                  ))}
                </div>
                
                <Button asChild className="w-full bg-bc-red hover:bg-red-700 text-white">
                  <Link to="/calculator">
                    Get Free Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <img 
            src="/lovable-uploads/e57e6764-cc42-4943-8a89-4d56f9c96469.png" 
            alt="House after professional pressure washing in White Rock" 
            className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default WhatWeCleanSection;
