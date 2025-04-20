
import React from 'react';

const ServiceAreaMap = () => {
  // Extract the map ID from the Google Maps URL
  // The URL format is: https://www.google.com/maps/d/u/0/edit?mid=1EFqLJEb-CuHik9j9h2e0iuzKHJwFD30&usp=sharing
  const mapId = "1EFqLJEb-CuHik9j9h2e0iuzKHJwFD30";

  return (
    <div className="h-[300px] w-full rounded-lg overflow-hidden shadow-lg">
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
  );
};

export default ServiceAreaMap;
