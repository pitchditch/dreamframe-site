
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { getNavigationCities } from '@/data/cities';

const CityNavigation = () => {
  const cities = getNavigationCities();
  
  return (
    <section className="py-8 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-bold text-center mb-6 flex items-center justify-center">
          <MapPin className="mr-2" size={24} />
          Service Locations
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 max-w-6xl mx-auto">
          {cities.map((city) => (
            <Link
              key={city.slug}
              to={`/${city.slug}`}
              className="bg-gray-800 hover:bg-bc-red transition-colors duration-200 rounded-lg p-3 text-center text-sm font-medium hover:scale-105 transform transition-transform"
            >
              {city.name}
            </Link>
          ))}
        </div>
        
        <p className="text-center mt-6 text-gray-400">
          Click any city above for location-specific services and pricing
        </p>
      </div>
    </section>
  );
};

export default CityNavigation;
