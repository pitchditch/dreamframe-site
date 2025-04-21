import React from 'react';

const ServiceAreaMap = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Areas We Service
        </h2>
        <div className="flex justify-center">
          <iframe
            src="https://www.google.com/maps/d/embed?mid=1EFqLJEb-CuHik9j9h2e0iuzKHJwFD30"
            width="600"
            height="320"
            className="rounded-xl shadow max-w-full"
            loading="lazy"
            title="BC Pressure Washing Service Area"
            style={{ border: 0 }}
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};

export default ServiceAreaMap;
