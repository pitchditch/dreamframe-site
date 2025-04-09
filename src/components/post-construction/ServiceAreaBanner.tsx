
import React from 'react';
import { MapPin } from 'lucide-react';
import { Badge } from '../ui/badge';

const ServiceAreaBanner: React.FC = () => {
  return (
    <section className="bg-bc-red text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <MapPin size={32} className="shrink-0" />
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">
              Serving Surrey, White Rock, Langley, and Greater Vancouver
            </h2>
            <p className="text-lg opacity-90">
              Professional post-construction window cleaning for residential & commercial properties
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Badge className="bg-white text-bc-red hover:bg-gray-100">Residential</Badge>
              <Badge className="bg-white text-bc-red hover:bg-gray-100">Commercial</Badge>
              <Badge className="bg-white text-bc-red hover:bg-gray-100">New Construction</Badge>
              <Badge className="bg-white text-bc-red hover:bg-gray-100">Renovation Projects</Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreaBanner;
