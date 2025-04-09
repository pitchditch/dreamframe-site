
import React from 'react';
import { MapPin } from 'lucide-react';

const ServiceAreaBanner: React.FC = () => {
  return (
    <section className="bg-bc-red text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <MapPin size={32} className="shrink-0" />
          <h2 className="text-2xl font-bold text-center">
            Serving Surrey, White Rock, Langley, and Greater Vancouver
          </h2>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreaBanner;
