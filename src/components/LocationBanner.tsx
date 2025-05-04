
import React from 'react';
import { MapPin } from 'lucide-react';

const LocationBanner: React.FC = () => {
  const serviceAreas = ["White Rock", "Surrey", "South Surrey", "Langley", "Delta", "Tsawwassen", "Ladner", "Richmond", "Vancouver", "North Vancouver", "West Vancouver", "Burnaby", "New Westminster", "Coquitlam", "Port Coquitlam", "Port Moody", "Pitt Meadows", "Maple Ridge", "Mission", "Abbotsford"];
  
  return (
    <div className="py-4 bg-white text-black text-center border-y border-gray-200">
      <div className="container mx-auto overflow-hidden">
        <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-2">
          <p className="font-semibold">Serving:</p>
          {serviceAreas.map((area, index) => (
            <span key={index} className="inline-flex items-center">
              <MapPin className="text-bc-red h-4 w-4 mr-1" />
              {area}{index < serviceAreas.length - 1 ? "" : ""}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationBanner;
