
import React from 'react';
import { MapPin, CheckCircle } from 'lucide-react';

const ServiceAreasMap = () => {
  const areas = [
    "Surrey", "White Rock", "Langley", "Delta", "Richmond", 
    "Vancouver", "Burnaby", "Coquitlam", "Port Moody", "New Westminster"
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Serving Gutter Cleaning Throughout Metro Vancouver
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Professional gutter cleaning services across Surrey, White Rock, and surrounding communities
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {areas.map((area) => (
              <div key={area} className="flex items-center gap-2 bg-white p-3 rounded-lg shadow">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="font-medium text-sm">{area}</span>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="w-6 h-6 text-bc-red" />
              <h3 className="text-xl font-bold">Based in White Rock</h3>
            </div>
            <p className="text-gray-600">
              As local Surrey and White Rock gutter cleaning experts, we understand the unique challenges 
              of Pacific Northwest weather. Our team knows which areas are prone to heavy leaf buildup 
              and how different neighborhoods require specialized gutter maintenance approaches.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreasMap;
