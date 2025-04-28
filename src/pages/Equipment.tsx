
import React from 'react';
import Layout from '../components/Layout';
import EquipmentSection from '../components/EquipmentSection';

const Equipment = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-12 text-center">Our Professional Equipment</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Pressure Washer - FIRST IMAGE */}
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/9542fa0e-7710-4d02-aa7c-08df9d78725b.png"
              alt="Industrial Grade Pressure Washer"
              className="rounded-lg shadow-lg w-full"
            />
            <h2 className="text-2xl font-bold">Industrial Grade Pressure Washer</h2>
            <p className="text-gray-700">Our Lifan Hydro Pro 4500 PSI pressure washer is capable of tackling any job, from delicate siding to tough concrete cleaning.</p>
          </div>

          {/* Surface Cleaner - SECOND IMAGE */}
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/45a70e02-ffa7-448e-8f24-49018c195812.png"
              alt="Professional Surface Cleaner"
              className="rounded-lg shadow-lg w-full"
            />
            <h2 className="text-2xl font-bold">Professional Surface Cleaner</h2>
            <p className="text-gray-700">Our surface cleaner ensures perfect, streak-free results on driveways and large flat surfaces, saving time while delivering superior results.</p>
          </div>

          {/* Eco-Friendly Products - THIRD IMAGE */}
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/7e1a9bdf-7cca-4b17-857e-6acaedd8309c.png"
              alt="Eco-Friendly Cleaning Products"
              className="rounded-lg shadow-lg w-full"
            />
            <h2 className="text-2xl font-bold">Eco-Friendly Cleaning Products</h2>
            <p className="text-gray-700">We use environmentally responsible cleaning solutions that are tough on dirt but gentle on your property and the planet.</p>
          </div>

          {/* Water Fed Pole System - FOURTH IMAGE */}
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/9d9ccd18-e160-4e9f-b928-bd8314763a7a.png"
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
