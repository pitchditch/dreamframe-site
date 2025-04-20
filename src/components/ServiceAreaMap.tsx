
import React from 'react';
import { MapPin } from 'lucide-react';

const ServiceAreaMap = () => {
  const mapId = "1EFqLJEb-CuHik9j9h2e0iuzKHJwFD30";

  return (
    <section className="py-section bg-charcoal text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <MapPin className="text-bc-red" />
            Proudly Serving Your Local Community
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            We serve homes and businesses across the Lower Mainland. If you're near a pin, we've got you covered!
          </p>
        </div>
        
        <div className="bg-navy/50 p-6 rounded-xl shadow-lg overflow-hidden">
          <div className="h-[400px] w-full rounded-lg overflow-hidden">
            <iframe
              src={`https://www.google.com/maps/d/embed?mid=${mapId}`}
              width="100%"
              height="100%"
              title="BC Pressure Washing Service Area"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreaMap;
