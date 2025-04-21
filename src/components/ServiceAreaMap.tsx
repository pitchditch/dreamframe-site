
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
        
        <div className="bg-navy/80 p-6 rounded-xl shadow-2xl overflow-hidden border border-white/10">
          <div className="h-[400px] w-full rounded-lg overflow-hidden relative">
            <iframe
              src={`https://www.google.com/maps/d/embed?mid=${mapId}`}
              width="100%"
              height="100%"
              title="BC Pressure Washing Service Area"
              style={{
                border: 0,
                filter: "contrast(1.08) saturate(1.1) brightness(0.96) drop-shadow(2px 2px 12px #15181e)",
                background: "#202d3a"
              }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Overlay for better text readability (optional) */}
            <div className="absolute bottom-2 left-2 bg-black/70 px-4 py-2 rounded text-white text-base font-semibold shadow-lg" style={{ pointerEvents: 'none', textShadow: '0 1px 8px #000', letterSpacing: '0.5px' }}>
              Service Area: Surrey, White Rock, Langley, Metro Vancouver
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreaMap;
