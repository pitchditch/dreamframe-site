import React, { useEffect, useRef } from 'react';

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Create a simple embedded Google Maps iframe
    const mapFrame = document.createElement('iframe');
    mapFrame.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2612.0!2d-122.8!3d49.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDnCsDAwJzAwLjAiTiAxMjLCsDQ4JzAwLjAiVw!5e0!3m2!1sen!2sca!4v1634567890123!5m2!1sen!2sca";
    mapFrame.width = "100%";
    mapFrame.height = "100%";
    mapFrame.style.border = "0";
    mapFrame.allowFullscreen = true;
    mapFrame.loading = "lazy";
    mapFrame.referrerPolicy = "no-referrer-when-downgrade";

    mapContainer.current.appendChild(mapFrame);

    return () => {
      if (mapContainer.current?.contains(mapFrame)) {
        mapContainer.current.removeChild(mapFrame);
      }
    };
  }, []);

  return (
    <div className="w-full h-96 rounded-lg shadow-lg">
      <div ref={mapContainer} className="w-full h-full rounded-lg" />
    </div>
  );
};

export default Map;