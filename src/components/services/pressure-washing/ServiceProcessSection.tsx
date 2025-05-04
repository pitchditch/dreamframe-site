
import React, { ReactNode } from 'react';
import ServiceProcess from '@/components/ServiceProcess';
import { Search, Droplets, Sparkles } from 'lucide-react';

const ServiceProcessSection = () => {
  const processes = [
    {
      title: "Surface Inspection",
      description: "We thoroughly inspect every surface to identify stains, dirt, and areas requiring special attention.",
      icon: <Search size={32} />
    },
    {
      title: "Customized Cleaning",
      description: "Using the right pressure and cleaning solutions for each surface type to ensure effective and safe cleaning.",
      icon: <Droplets size={32} />
    },
    {
      title: "Finishing Touch",
      description: "Final rinse and inspection to ensure all areas are thoroughly cleaned and no residue remains.",
      icon: <Sparkles size={32} />
    }
  ];
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Our 3-Step Process</h2>
        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          Our systematic approach ensures exceptional results every time
        </p>
        <ServiceProcess processes={processes} />
      </div>
    </section>
  );
};

export default ServiceProcessSection;
