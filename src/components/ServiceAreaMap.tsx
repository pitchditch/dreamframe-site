import React from 'react';
import { MapPin } from 'lucide-react';

const ServiceAreaMap = () => {
  const mapId = "1EFqLJEb-CuHik9j9h2e0iuzKHJwFD30";

  return (
    <div className="w-full flex flex-col items-center">
      <div className="mb-4 text-center">
        {/* Heading and area text are now integrated above the map */}
      </div>
      <div className="bg-gradient-to-tr from-blue-950/90 to-bc-red/40 p-2 rounded-xl shadow-2xl overflow-hidden border-2 border-yellow-400 relative w-full max-w-2xl">
        <div className="h-[320px] w-full rounded-xl overflow-hidden relative">
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
      {/* No duplicate area or whitespace */}
    </div>
  );
};

export default ServiceAreaMap;
