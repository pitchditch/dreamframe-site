
import React from 'react';
import CitiesCarousel from './CitiesCarousel';

const LocationBanner = () => {
  return (
    <section className="bg-gray-100 py-8">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">We Serve the Entire Lower Mainland</h2>
        <CitiesCarousel />
      </div>
    </section>
  );
};

export default LocationBanner;
