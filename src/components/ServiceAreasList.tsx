
import React from 'react';
import { MapPin } from 'lucide-react';

const ServiceAreasList = () => {
  const serviceAreas = [
    "White Rock", "Surrey", "South Surrey", "Langley", "Delta", "Tsawwassen",
    "Ladner", "Richmond", "Vancouver", "North Vancouver", "West Vancouver",
    "Burnaby", "New Westminster", "Coquitlam", "Port Coquitlam", "Port Moody",
    "Pitt Meadows", "Maple Ridge", "Mission", "Abbotsford"
  ];

  return (
    <div className="w-full">
      {/* Map visualization */}
      <div className="mb-10 bg-gradient-to-tr from-blue-950/90 to-bc-red/40 p-2 rounded-xl shadow-2xl overflow-hidden border-2 border-yellow-400 w-full mx-auto">
        <div className="relative h-[450px] w-full rounded-xl overflow-hidden">
          <div className="absolute top-4 left-4 z-10 bg-yellow-400/90 text-black px-4 py-2 rounded-lg font-semibold shadow-lg">
            <MapPin className="inline-block mr-2 h-5 w-5" />
            Based in White Rock, Serving Metro Vancouver
          </div>
          <iframe
            src="https://www.google.com/maps/d/embed?mid=1EFqLJEb-CuHik9j9h2e0iuzKHJwFD30"
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

      {/* Service areas list */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold mb-6 text-center">Communities We Serve</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {serviceAreas.map((area, index) => (
            <div key={index} className="bg-white/10 rounded-lg px-4 py-3 flex items-center">
              <MapPin size={16} className="text-bc-red mr-2 flex-shrink-0" />
              <span className="text-sm md:text-base">{area}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-10 bg-white/5 p-6 rounded-lg">
        <p className="text-lg mb-4">
          Based in White Rock, we proudly serve the entire Metro Vancouver region. Whether you're in South Surrey, 
          Cloverdale, or as far as Coquitlam or Port Moody, we're able to provide our premium window cleaning services to your location.
        </p>
        <p className="text-lg">
          Not sure if we service your specific area? Give us a call at <a href="tel:7788087620" className="text-bc-red hover:underline">778-808-7620</a> to confirm availability for your address.
        </p>
      </div>
    </div>
  );
};

export default ServiceAreasList;
