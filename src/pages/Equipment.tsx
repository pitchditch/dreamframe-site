
import React from 'react';
import Layout from '../components/Layout';
import EquipmentSection from '../components/EquipmentSection';
import { Shield, Leaf } from 'lucide-react';

const Equipment = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-12 text-center">Our Professional Equipment</h1>
        
        {/* Professional Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Pressure Washer */}
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/6e463050-a822-420e-8227-6bc3306b6832.png"
              alt="Industrial Grade Pressure Washer"
              className="rounded-lg shadow-lg w-full"
            />
            <h2 className="text-2xl font-bold">Industrial Grade Pressure Washer</h2>
            <p className="text-gray-700">Our Lifan Hydro Pro 4500 PSI pressure washer is capable of tackling any job, from delicate siding to tough concrete cleaning.</p>
          </div>

          {/* Surface Cleaner */}
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/08b3e837-f205-42f8-894f-b96933f86b7f.png"
              alt="Professional Surface Cleaner"
              className="rounded-lg shadow-lg w-full"
            />
            <h2 className="text-2xl font-bold">Professional Surface Cleaner</h2>
            <p className="text-gray-700">Our surface cleaner ensures perfect, streak-free results on driveways and large flat surfaces, saving time while delivering superior results.</p>
          </div>

          {/* Water Fed Pole System */}
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/c8d5a001-21d5-40a1-9e30-79297ea6e4a6.png"
              alt="Water Fed Pole System"
              className="rounded-lg shadow-lg w-full"
            />
            <h2 className="text-2xl font-bold">Water Fed Pole System</h2>
            <p className="text-gray-700">Our professional water fed pole system allows us to safely clean windows up to 60 feet high while keeping both feet firmly on the ground.</p>
          </div>
        </div>
        
        {/* Eco-Friendly Products Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Leaf className="text-green-500 mr-3" size={28} />
              <h2 className="text-2xl font-bold">Eco-Friendly Cleaning Solutions</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-700 mb-4">
                  We use environmentally responsible cleaning products that effectively remove dirt, grime, and organic growth while minimizing impact on your landscape and the environment.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Shield className="text-green-600 mr-2 flex-shrink-0" size={20} />
                    <span>Safe for plants, pets and property</span>
                  </li>
                  <li className="flex items-center">
                    <Shield className="text-green-600 mr-2 flex-shrink-0" size={20} />
                    <span>Biodegradable formulations</span>
                  </li>
                  <li className="flex items-center">
                    <Shield className="text-green-600 mr-2 flex-shrink-0" size={20} />
                    <span>Effective results without harsh chemicals</span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <img 
                  src="/lovable-uploads/f008fab5-05a9-4b20-8297-0d8674099588.png"
                  alt="Eco-Friendly Cleaning Solutions"
                  className="max-h-64 object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Company Vehicle */}
        <div className="mt-16 max-w-4xl mx-auto">
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
