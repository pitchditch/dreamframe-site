
import React from 'react';
import { MapPin } from 'lucide-react';

const ServiceAreaMap = () => {
  const mapId = "1EFqLJEb-CuHik9j9h2e0iuzKHJwFD30";

  return (
    <section className="bg-gradient-to-b from-gray-900 to-black pt-8 pb-16">      
      <div className="container mx-auto px-4 mt-8">
        <div className="relative bg-gradient-to-tr from-blue-950/90 to-bc-red/40 p-2 rounded-xl shadow-2xl overflow-hidden border-2 border-yellow-400 w-full mx-auto">
          <div className="absolute top-4 left-4 z-10 bg-yellow-400/90 text-black px-4 py-2 rounded-lg font-semibold shadow-lg">
            <MapPin className="inline-block mr-2 h-5 w-5" />
            Based in White Rock, Serving Metro Vancouver
          </div>
          <div className="h-[450px] w-full rounded-xl overflow-hidden relative">
            <iframe
              src={`https://www.google.com/maps/d/embed?mid=${mapId}`}
              width="100%"
              height="100%"
              title="BC Pressure Washing Service Area"
              style={{
                border: 0,
                filter: "saturate(1.18) brightness(0.96) drop-shadow(2px 2px 12px #15181e)",
                background: "#202d3a"
              }}
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
