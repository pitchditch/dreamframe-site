
import React from 'react';

const LocalCompanySection = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src="/lovable-uploads/0139cad9-098a-441a-9e26-7c7aad7e481d.png" 
                alt="BC Pressure Washing Service Vehicle at White Rock Beach" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Locally Owned & Operated</h2>
              <p className="text-gray-700 mb-4">
                Have you seen our red car along Marine Drive? That's us! As White Rock locals, we take pride in serving our beautiful community with premium pressure washing and window cleaning services.
              </p>
              <p className="text-gray-700 mb-4">
                We're not just another cleaning company—we're your neighbors, committed to making our shared community more beautiful one property at a time.
              </p>
              <div className="flex items-center p-4 bg-gray-100 rounded-lg">
                <img 
                  src="/lovable-uploads/5ab1b520-40ad-4e25-b0d6-6292266b90ea.png"
                  alt="Owner" 
                  className="w-16 h-16 rounded-full mr-4 border-2 border-bc-red object-cover"
                />
                <div>
                  <p className="font-semibold">"We're proud to serve the community where we grew up and live."</p>
                  <p className="text-bc-red">— Jayden Fisher, Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalCompanySection;
