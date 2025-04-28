
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
              src="/lovable-uploads/7a4334e8-e64a-4438-a0db-0319a25f8d0f.png"
              alt="Industrial Grade Pressure Washer"
              className="rounded-lg shadow-lg w-full"
            />
            <h2 className="text-2xl font-bold">Industrial Grade Pressure Washer</h2>
            <p className="text-gray-700">Our Lifan Hydro Pro 4500 PSI pressure washer is capable of tackling any job, from delicate siding to tough concrete cleaning.</p>
          </div>

          {/* Surface Cleaner */}
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/6c45cc15-89d9-4846-9040-98eb1f18e24f.png"
              alt="Professional Surface Cleaner"
              className="rounded-lg shadow-lg w-full"
            />
            <h2 className="text-2xl font-bold">Professional Surface Cleaner</h2>
            <p className="text-gray-700">Our surface cleaner ensures perfect, streak-free results on driveways and large flat surfaces, saving time while delivering superior results.</p>
          </div>

          {/* Eco-Friendly Products */}
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/dc85910b-5a9d-4d47-a400-aa93946bf62e.png"
              alt="Eco-Friendly Cleaning Products"
              className="rounded-lg shadow-lg w-full"
            />
            <h2 className="text-2xl font-bold">Eco-Friendly Products</h2>
            <p className="text-gray-700">We use environmentally responsible cleaning solutions that are both effective and safe for the environment.</p>
          </div>

          {/* Water Fed Pole System */}
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/c5717ab7-6ffd-477f-9518-01adaa2fc3b2.png"
              alt="Water Fed Pole System"
              className="rounded-lg shadow-lg w-full"
            />
            <h2 className="text-2xl font-bold">Water Fed Pole System</h2>
            <p className="text-gray-700">Our professional water fed pole system allows us to safely clean windows up to 60 feet high while keeping both feet firmly on the ground.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Equipment;
