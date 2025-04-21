
import React from 'react';
import { MapPin } from 'lucide-react';

const ServiceAreaMap = () => {
  const mapId = "1EFqLJEb-CuHik9j9h2e0iuzKHJwFD30";

  return (
    <section className="py-section bg-[#232e3c] text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <MapPin className="text-bc-red" />
            <span style={{ filter: 'drop-shadow(2px 2px 2px #15181e)' }}>Proudly Serving Your Local Community</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#FFF', textShadow: '1px 1px 6px #0C0C0C, 0 2px 14px #000' }}>
            We serve homes and businesses across the Lower Mainland. If you're near a pin, we've got you covered!
          </p>
        </div>
        
        <div className="bg-gradient-to-tr from-blue-950/90 to-bc-red/40 p-6 rounded-xl shadow-2xl overflow-hidden border-2 border-yellow-400 relative">
          <div className="h-[420px] w-full rounded-xl overflow-hidden relative">
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
            {/* Overlay for better text readability */}
            <div
              className="absolute bottom-3 left-3 md:bottom-5 md:left-5 z-10 px-5 py-3 rounded-2xl font-bold text-lg flex flex-col gap-1 shadow-2xl"
              style={{
                background: 'rgba(22,22,22,0.92)',
                color: '#FFD600',
                textShadow: '0 1px 14px #000, 0 2px 16px #000'
              }}
            >
              <span>🗺️ <span className="text-white">Service Area:</span> <span className="font-extrabold text-yellow-400 pl-1">Surrey, White Rock, Langley<br className="block md:hidden" /> & Metro Vancouver</span></span>
              <span className="text-white/80 text-xs mt-1">
                Map pins show areas we actively serve. Ask if you’re unsure!
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreaMap;
