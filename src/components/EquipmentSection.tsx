import React from 'react';
import { Card, CardContent } from './ui/card';
import { BadgeCheck, Gauge, Droplets, Shield } from 'lucide-react';

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Pressure Washing Equipment */}
          <Card className="overflow-hidden border-0 shadow-lg">
            <div className="relative h-64">
              <img 
                src="/lovable-uploads/62d45663-858d-4425-aeea-85faab98f7ce.png"
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
                  <span>Surface cleaner attachment</span>
                </li>
                <li className="flex items-center">
                  <BadgeCheck className="text-bc-red mr-2" size={20} />
                  <span>Hot water capability for enhanced cleaning</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          {/* Surface Cleaner Equipment */}
          <Card className="overflow-hidden border-0 shadow-lg">
            <div className="relative h-64">
              <img 
                src="/lovable-uploads/86caf5d0-dfff-45dd-89e6-b01834f794ce.png"
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
              <h3 className="text-xl font-bold mb-2">Advanced Surface Cleaning</h3>
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
                  <span>Water fed pole system</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EquipmentSection;
