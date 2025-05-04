
import React from 'react';
import { MapPin } from 'lucide-react';

const LocationBanner: React.FC = () => {
  const serviceAreas = ["White Rock", "Surrey", "South Surrey", "Langley", "Delta", "Tsawwassen", "Ladner", "Richmond", "Vancouver", "North Vancouver", "West Vancouver", "Burnaby", "New Westminster", "Coquitlam", "Port Coquitlam", "Port Moody", "Pitt Meadows", "Maple Ridge", "Mission", "Abbotsford"];
  
  return (
    <div className="py-6 bg-gradient-to-r from-gray-100 via-white to-gray-100 overflow-hidden w-full">
      <div className="relative w-full">
        <div className="flex overflow-x-hidden whitespace-nowrap w-full">
          {/* Duplicate the service areas to create seamless loop */}
          {[...serviceAreas, ...serviceAreas, ...serviceAreas].map((area, index) => (
            <div key={index} className="inline-flex px-4 py-2 mx-1">
              <MapPin size={16} className="text-bc-red mr-2" />
              <span>{area}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationBanner;
