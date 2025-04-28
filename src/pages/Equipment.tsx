
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
              src="/lovable-uploads/25d2bc7b-7066-4992-841c-05b45e83a962.png"
              alt="Industrial Grade Pressure Washer"
              className="rounded-lg shadow-lg w-full"
            />
            <h2 className="text-2xl font-bold">Industrial Grade Pressure Washer</h2>
            <p className="text-gray-700">Our Lifan Hydro Pro 4500 PSI pressure washer is capable of tackling any job, from delicate siding to tough concrete cleaning.</p>
          </div>

          {/* Surface Cleaner */}
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/6ca7fa89-7f1e-4e4b-ba3c-f506f87d105a.png"
              alt="Professional Surface Cleaner"
              className="rounded-lg shadow-lg w-full"
            />
            <h2 className="text-2xl font-bold">Professional Surface Cleaner</h2>
            <p className="text-gray-700">Our surface cleaner ensures perfect, streak-free results on driveways and large flat surfaces, saving time while delivering superior results.</p>
          </div>

          {/* Eco-Friendly Products */}
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/77908f5a-4387-4ea9-80ad-a762ee2b5b1f.png"
              alt="Eco-Friendly Cleaning Products"
              className="rounded-lg shadow-lg w-full"
            />
            <h2 className="text-2xl font-bold">Eco-Friendly Products</h2>
            <p className="text-gray-700">We use environmentally responsible cleaning solutions that are both effective and safe for the environment.</p>
          </div>

          {/* Water Fed Pole System */}
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/58002838-ad0d-499b-ba03-6bdc267c5c54.png"
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
