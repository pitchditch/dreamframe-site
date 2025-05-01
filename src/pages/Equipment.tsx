
import React from 'react';
import Layout from '../components/Layout';
import EquipmentSection from '../components/EquipmentSection';

const Equipment = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-12 text-center">Our Professional Equipment</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Pressure Washer */}
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/62d45663-858d-4425-aeea-85faab98f7ce.png"
              alt="Industrial Grade Pressure Washer"
              className="rounded-lg shadow-lg w-full"
            />
            <h2 className="text-2xl font-bold">Industrial Grade Pressure Washer</h2>
            <p className="text-gray-700">Our Lifan Hydro Pro 4500 PSI pressure washer is capable of tackling any job, from delicate siding to tough concrete cleaning.</p>
          </div>

          {/* Surface Cleaner */}
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/86caf5d0-dfff-45dd-89e6-b01834f794ce.png"
              alt="Professional Surface Cleaner"
              className="rounded-lg shadow-lg w-full"
            />
            <h2 className="text-2xl font-bold">Professional Surface Cleaner</h2>
            <p className="text-gray-700">Our surface cleaner ensures perfect, streak-free results on driveways and large flat surfaces, saving time while delivering superior results.</p>
          </div>

          {/* Water Fed Pole System */}
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/604db6d0-a003-4cc3-9c5b-ab05f338dfd7.png"
              alt="Water Fed Pole System"
              className="rounded-lg shadow-lg w-full"
            />
            <h2 className="text-2xl font-bold">Water Fed Pole System</h2>
            <p className="text-gray-700">Our professional water fed pole system allows us to safely clean windows up to 60 feet high while keeping both feet firmly on the ground.</p>
          </div>

          {/* Company Vehicle */}
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/4054bbd7-3ebd-48d0-845c-3ec712ac612e.png"
              alt="BC Pressure Washing Company Vehicle"
              className="rounded-lg shadow-lg w-full"
            />
            <h2 className="text-2xl font-bold">Our Local Service Vehicle</h2>
            <p className="text-gray-700">You've probably seen our distinctive red vehicle parked at White Rock Beach. As a locally owned business with deep roots in the community, we're proud to serve the area where we grew up.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Equipment;
