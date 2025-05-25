
import React from 'react';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import ServiceAreasCarousel from '@/components/ServiceAreasCarousel';

const ServiceAreasSection = () => {
  return (
    <section className="py-12 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Areas We Service</h2>
        <ServiceAreaMap />
        <ServiceAreasCarousel isDarkBackground={true} />
      </div>
    </section>
  );
};

export default ServiceAreasSection;
