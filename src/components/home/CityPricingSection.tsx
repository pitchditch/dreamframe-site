
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const cities = [
  { name: 'White Rock', slug: 'white-rock' },
  { name: 'Surrey', slug: 'surrey' },
  { name: 'Vancouver', slug: 'vancouver' },
  { name: 'Burnaby', slug: 'burnaby' },
  { name: 'Richmond', slug: 'richmond' },
  { name: 'Langley', slug: 'langley-city' },
  { name: 'Delta', slug: 'delta' },
  { name: 'Coquitlam', slug: 'coquitlam' },
  { name: 'New Westminster', slug: 'new-westminster' }
];

const CityPricingSection = () => {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <MapPin className="w-8 h-8 text-bc-red" />
            Click a City for Local Pricing & Services
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get customized pricing and service information for your specific location
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {cities.map((city) => (
            <Link
              key={city.slug}
              to={`/${city.slug}`}
              className="bg-gray-800 hover:bg-bc-red transition-all duration-300 rounded-lg p-4 text-center font-semibold hover:scale-105 transform shadow-lg hover:shadow-xl border border-gray-700 hover:border-bc-red"
            >
              <div className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4" />
                {city.name}
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-400">
            Don't see your city? <Link to="/contact" className="text-bc-red hover:text-red-300 underline">Contact us</Link> for service availability
          </p>
        </div>
      </div>
    </section>
  );
};

export default CityPricingSection;
