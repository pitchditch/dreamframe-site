
import React from 'react';

const LocationBanner: React.FC = () => {
  const serviceAreas = [
    "White Rock", "Surrey", "South Surrey", "Langley", "Delta", "Tsawwassen", "Ladner", 
    "Richmond", "Vancouver", "North Vancouver", "West Vancouver", "Burnaby", "New Westminster", 
    "Coquitlam", "Port Coquitlam", "Port Moody", "Pitt Meadows", "Maple Ridge", "Mission", "Abbotsford"
  ];

  return (
    <div className="bg-gray-100 py-4 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          <div className="overflow-x-auto whitespace-nowrap scrollbar-hide flex gap-4 animate-scroll">
            {serviceAreas.map((area, index) => (
              <div key={index} className="inline-block px-3 py-2 bg-white/80 rounded-full text-sm font-medium shadow-sm">
                {area}
              </div>
            ))}
            {/* Duplicate for seamless scrolling */}
            {serviceAreas.map((area, index) => (
              <div key={`duplicate-${index}`} className="inline-block px-3 py-2 bg-white/80 rounded-full text-sm font-medium shadow-sm">
                {area}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationBanner;
