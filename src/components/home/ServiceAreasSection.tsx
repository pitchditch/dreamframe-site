
import React from 'react';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import ServiceAreasCarousel from '@/components/ServiceAreasCarousel';

const ServiceAreasSection = () => {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Areas We Service</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Professional pressure washing and exterior cleaning services throughout Metro Vancouver
          </p>
        </div>
        <ServiceAreaMap />
        <div className="mt-8">
          <ServiceAreasCarousel />
        </div>
      </div>
    </section>
  );
};

export default ServiceAreasSection;
