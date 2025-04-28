
import React from 'react';

const CompanyHistory = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Owner & Lead Technician</h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src="/lovable-uploads/c47d9786-e883-4e04-9e43-be7f182735bb.png"
            alt="Jayden Fisher - Owner & Lead Technician"
            className="rounded-full w-24 h-24 object-cover"
          />
          <div>
            <h3 className="text-2xl font-semibold mb-4">Jayden Fisher</h3>
            <p className="text-gray-700">
              Jayden Fisher is the owner and lead technician at BC Pressure Washing. With years of experience in the industry, Jayden is passionate about providing top-quality exterior cleaning services to homeowners and businesses in Surrey, White Rock, and the surrounding areas.
            </p>
            <p className="text-gray-700">
              As a local resident, Jayden takes pride in serving his community and is committed to delivering exceptional results with a focus on customer satisfaction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyHistory;
