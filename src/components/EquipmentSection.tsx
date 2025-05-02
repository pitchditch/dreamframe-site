
import React from 'react';
import { Card, CardContent } from './ui/card';
import { BadgeCheck, Gauge, Droplets, Shield, Leaf } from 'lucide-react';

const EquipmentSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Professional Equipment & Products</h2>
          <p className="text-gray-600 text-lg">
            We invest in commercial-grade equipment and eco-friendly products to ensure exceptional results for every project.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {/* Pressure Washing Equipment */}
          <Card className="overflow-hidden border-0 shadow-lg">
            <div className="relative h-64">
              <img 
                src="/lovable-uploads/6e463050-a822-420e-8227-6bc3306b6832.png"
                alt="Industrial Grade Pressure Washer" 
                className="w-full h-full object-contain p-4"
              />
              <div className="absolute top-0 right-0 bg-bc-red text-white py-2 px-4 rounded-bl-lg font-semibold">
                <div className="flex items-center">
                  <Gauge className="mr-1" size={18} />
                  <span>4500 PSI</span>
                </div>
              </div>
            </div>
            
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Industrial-Grade Pressure Washing</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <BadgeCheck className="text-bc-red mr-2" size={20} />
                  <span>Professional LIFAN 4500 PSI unit</span>
                </li>
                <li className="flex items-center">
                  <BadgeCheck className="text-bc-red mr-2" size={20} />
                  <span>Hot water capability</span>
                </li>
                <li className="flex items-center">
                  <BadgeCheck className="text-bc-red mr-2" size={20} />
                  <span>High-efficiency cleaning</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          {/* Surface Cleaner Equipment */}
          <Card className="overflow-hidden border-0 shadow-lg">
            <div className="relative h-64">
              <img 
                src="/lovable-uploads/08b3e837-f205-42f8-894f-b96933f86b7f.png"
                alt="Surface Cleaner" 
                className="w-full h-full object-contain p-4"
              />
              <div className="absolute top-0 right-0 bg-blue-500 text-white py-2 px-4 rounded-bl-lg font-semibold">
                <div className="flex items-center">
                  <Droplets className="mr-1" size={18} />
                  <span>Pro-Grade</span>
                </div>
              </div>
            </div>
            
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Surface Cleaners</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <BadgeCheck className="text-blue-500 mr-2" size={20} />
                  <span>Even pressure distribution</span>
                </li>
                <li className="flex items-center">
                  <BadgeCheck className="text-blue-500 mr-2" size={20} />
                  <span>Perfect for driveways & patios</span>
                </li>
                <li className="flex items-center">
                  <BadgeCheck className="text-blue-500 mr-2" size={20} />
                  <span>Streak-free results</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          {/* Water Fed Pole System */}
          <Card className="overflow-hidden border-0 shadow-lg">
            <div className="relative h-64">
              <img 
                src="/lovable-uploads/c8d5a001-21d5-40a1-9e30-79297ea6e4a6.png"
                alt="Water Fed Pole System" 
                className="w-full h-full object-contain p-4"
              />
              <div className="absolute top-0 right-0 bg-green-500 text-white py-2 px-4 rounded-bl-lg font-semibold">
                <div className="flex items-center">
                  <Leaf className="mr-1" size={18} />
                  <span>Eco-Friendly</span>
                </div>
              </div>
            </div>
            
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Water Fed Pole System</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <BadgeCheck className="text-green-500 mr-2" size={20} />
                  <span>Reaches up to 60 feet</span>
                </li>
                <li className="flex items-center">
                  <BadgeCheck className="text-green-500 mr-2" size={20} />
                  <span>Pure water technology</span>
                </li>
                <li className="flex items-center">
                  <BadgeCheck className="text-green-500 mr-2" size={20} />
                  <span>Spot-free drying</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        {/* Eco-Friendly Products Section */}
        <div className="mt-16 max-w-5xl mx-auto">
          <Card className="overflow-hidden border-0 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4">Eco-Friendly Cleaning Solutions</h3>
                <p className="text-gray-600 mb-4">
                  We use environmentally responsible cleaning products that effectively remove dirt, grime, and organic growth while minimizing impact on your landscape and the environment.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Shield className="text-green-600 mr-2" size={20} />
                    <span>Safe for plants and pets</span>
                  </li>
                  <li className="flex items-center">
                    <Shield className="text-green-600 mr-2" size={20} />
                    <span>Biodegradable formulations</span>
                  </li>
                  <li className="flex items-center">
                    <Shield className="text-green-600 mr-2" size={20} />
                    <span>Professional-grade results without harsh chemicals</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-100 flex items-center justify-center p-6">
                <img 
                  src="/lovable-uploads/f008fab5-05a9-4b20-8297-0d8674099588.png"
                  alt="Eco-Friendly Cleaning Solutions" 
                  className="w-full max-h-72 object-contain"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EquipmentSection;
