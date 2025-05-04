
import React from 'react';
import Layout from '../components/Layout';
import EquipmentSection from '../components/EquipmentSection';
import { Shield, Leaf, MapPin } from 'lucide-react';

const Equipment = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-24">
        <h1 className="text-4xl font-bold mb-12 text-center">Our Professional Equipment</h1>
        
        {/* Professional Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Pressure Washer */}
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/6e463050-a822-420e-8227-6bc3306b6832.png"
              alt="Industrial Grade Pressure Washer"
              className="rounded-lg shadow-lg w-full h-64 object-cover"
            />
            <h2 className="text-2xl font-bold">Industrial Grade Pressure Washer</h2>
            <p className="text-gray-700">Our Lifan Hydro Pro 4500 PSI pressure washer is capable of tackling any job, from delicate siding to tough concrete cleaning.</p>
          </div>

          {/* Surface Cleaner */}
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/08b3e837-f205-42f8-894f-b96933f86b7f.png"
              alt="Professional Surface Cleaner"
              className="rounded-lg shadow-lg w-full h-64 object-cover"
            />
            <h2 className="text-2xl font-bold">Professional Surface Cleaner</h2>
            <p className="text-gray-700">Our surface cleaner ensures perfect, streak-free results on driveways and large flat surfaces, saving time while delivering superior results.</p>
          </div>

          {/* Water Fed Pole System */}
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/c8d5a001-21d5-40a1-9e30-79297ea6e4a6.png"
              alt="Water Fed Pole System"
              className="rounded-lg shadow-lg w-full h-64 object-cover"
            />
            <h2 className="text-2xl font-bold">Water Fed Pole System</h2>
            <p className="text-gray-700">Our professional water fed pole system allows us to safely clean windows up to 60 feet high while keeping both feet firmly on the ground.</p>
          </div>
        </div>
        
        {/* Company Vehicle Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Our Company Vehicle</h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2 items-center">
              <div className="p-0">
                <img 
                  src="/lovable-uploads/c9dabc2c-c2ad-4bde-9f7b-4df8b3a689c0.png" 
                  alt="BC Pressure Washing Service Vehicle" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">Look for Our Red Car!</h3>
                <p className="text-gray-700 mb-4">
                  You've probably seen our distinctive red company vehicle parked at White Rock Beach or driving around the community. We take pride in being easily recognizable as your local cleaning professionals.
                </p>
                <p className="text-gray-700">
                  Our vehicle is fully outfitted with all the professional equipment needed to handle any cleaning job, and our uniformed team members are always ready to provide exceptional service throughout White Rock, Surrey, and the entire Metro Vancouver area.
                </p>
              </div>
            </div>
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

        {/* Locally Operated Section */}
        <div className="mt-16 max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 items-center">
            <div className="p-0">
              <img 
                src="/lovable-uploads/d8cafee6-2600-4290-9874-200435673474.png"
                alt="Owner's vehicle at White Rock beach"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4">Locally Owned & Operated</h2>
              <p className="text-gray-700">
                Seen our red car along Marine Drive? That's me! As a White Rock local, I take pride in serving our beautiful community and surrounding areas. When you choose BC Pressure Washing, you're supporting a local business that truly cares about our neighborhood.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Equipment;
