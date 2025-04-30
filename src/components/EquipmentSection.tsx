
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
                src="/lovable-uploads/2682ab04-b546-443d-b6dd-7fcea5484204.png"
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
          
          {/* Window Cleaning Equipment */}
          <Card className="overflow-hidden border-0 shadow-lg">
            <div className="relative h-64">
              <img 
                src="/lovable-uploads/14476791-d668-49f3-a789-7df623e0e440.png"
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
                  <span>Faster cleaning with better results</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        {/* Cleaning Solutions Section */}
        <div className="mt-16 max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 bg-gradient-to-br from-green-50 to-green-100 p-8 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/ef6f4ba6-c84e-480f-8ad1-fd172381ca69.png"
                  alt="SH Cleaning Solution"
                  className="w-full h-auto object-contain max-w-md"
                />
              </div>
              <div className="md:w-2/3 p-8">
                <h3 className="text-2xl font-bold mb-4">Professional-Grade Solutions</h3>
                <p className="text-gray-600 mb-6">
                  We use commercial-grade sodium hypochlorite (SH) and other professional cleaning solutions to achieve the best results while being safe for your property.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <BadgeCheck className="text-green-600 mt-1 mr-2" size={20} />
                    <div>
                      <p className="font-semibold">Safe & Effective</p>
                      <p className="text-gray-600 text-sm">Professional-grade solutions that get results</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <BadgeCheck className="text-green-600 mt-1 mr-2" size={20} />
                    <div>
                      <p className="font-semibold">Expert Application</p>
                      <p className="text-gray-600 text-sm">Proper dilution and application techniques</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <BadgeCheck className="text-green-600 mt-1 mr-2" size={20} />
                    <div>
                      <p className="font-semibold">Property Safe</p>
                      <p className="text-gray-600 text-sm">Won't damage surfaces or landscaping</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EquipmentSection;
