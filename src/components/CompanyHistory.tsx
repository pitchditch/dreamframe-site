
import React from 'react';

const CompanyHistory = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="text-center md:text-left">
            <img
              src="/lovable-uploads/7bdca265-04f1-4e31-b06e-c5b5dbb5f141.png"
              alt="Jayden Fisher - Owner & Lead Technician"
              className="rounded-full w-40 h-40 object-cover mx-auto md:mx-0"
            />
            <h3 className="text-2xl font-semibold mt-4">Jayden Fisher</h3>
            <p className="text-gray-700 font-medium">Owner/Lead Technician</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-8 md:mb-6">About Me</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-700 mb-4">
                  As the owner and lead technician at BC Pressure Washing, I personally handle or oversee every job to ensure the highest quality results for our clients in Surrey, White Rock, and throughout Metro Vancouver.
                </p>
                <p className="text-gray-700">
                  You've probably seen my red company car cruising along Marine Drive at White Rock Beach. That's me, bringing professional exterior cleaning services right to your doorstep!
                </p>
              </div>
              <div className="relative">
                <img
                  src="/lovable-uploads/e4887401-808a-4e4c-8a43-62451346a8a0.png"
                  alt="BC Pressure Washing Company Car"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyHistory;
