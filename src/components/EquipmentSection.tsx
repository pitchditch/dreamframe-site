
import React from 'react';
import { Card, CardContent } from './ui/card';
import { BadgeCheck, Droplets, Gauge, Shield } from 'lucide-react';

const EquipmentSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Premium Equipment & Products</h2>
          <p className="text-gray-600 text-lg">
            We invest in top-of-the-line equipment and eco-friendly products to deliver exceptional results for every cleaning project.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Pressure Washing Equipment */}
          <Card className="overflow-hidden border-0 shadow-lg">
            <div className="relative h-64">
              <img 
                src="/lovable-uploads/a047b138-d031-4811-9b48-b46dc707a449.png"
                alt="Industrial Grade Pressure Washer" 
                className="w-full h-full object-cover"
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
              <p className="text-gray-600 mb-4">
                Our commercial-grade pressure washers deliver up to 4500 PSI of cleaning power to remove the most stubborn stains from any surface.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <BadgeCheck className="text-bc-red mr-2" size={20} />
                  <span>Removes tough stains and grime</span>
                </li>
                <li className="flex items-center">
                  <BadgeCheck className="text-bc-red mr-2" size={20} />
                  <span>Adjustable pressure for different surfaces</span>
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
                src="/lovable-uploads/fa16ee2d-1381-4719-80d7-0bec536ba4d8.png"
                alt="Water-Fed Pole System" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 right-0 bg-blue-500 text-white py-2 px-4 rounded-bl-lg font-semibold">
                <div className="flex items-center">
                  <Droplets className="mr-1" size={18} />
                  <span>Streak-Free</span>
                </div>
              </div>
            </div>
            
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Water-Fed Pole System</h3>
              <p className="text-gray-600 mb-4">
                Our specialized water-fed pole systems allow us to clean windows up to 60 feet high from the ground, delivering streak-free results every time.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <BadgeCheck className="text-blue-500 mr-2" size={20} />
                  <span>Reaches high windows safely</span>
                </li>
                <li className="flex items-center">
                  <BadgeCheck className="text-blue-500 mr-2" size={20} />
                  <span>Uses purified water for spot-free finish</span>
                </li>
                <li className="flex items-center">
                  <BadgeCheck className="text-blue-500 mr-2" size={20} />
                  <span>Environmentally friendly with no chemicals</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        {/* Eco-Friendly Products Section */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 bg-gradient-to-br from-green-50 to-green-100 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Shield className="text-green-600" size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-green-800">Eco-Friendly</h3>
                  <p className="text-green-600">Safe for the environment</p>
                </div>
              </div>
              <div className="md:w-2/3 p-8">
                <h3 className="text-2xl font-bold mb-4">Roof Wash: Eco-Friendly Solution</h3>
                <p className="text-gray-600 mb-6">
                  Our proprietary Roof Wash formula is specifically designed to kill moss and algae without harming your roof or the environment. It's biodegradable yet powerful enough to eliminate the toughest organic growth.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <BadgeCheck className="text-green-600 mt-1 mr-2" size={20} />
                    <div>
                      <p className="font-semibold">Biodegradable Formula</p>
                      <p className="text-gray-600 text-sm">Safe for plants, pets, and the environment</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <BadgeCheck className="text-green-600 mt-1 mr-2" size={20} />
                    <div>
                      <p className="font-semibold">Long-Lasting Protection</p>
                      <p className="text-gray-600 text-sm">Prevents regrowth for up to 2 years</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <BadgeCheck className="text-green-600 mt-1 mr-2" size={20} />
                    <div>
                      <p className="font-semibold">Professional-Grade Results</p>
                      <p className="text-gray-600 text-sm">Removes 100% of moss, algae, and lichen</p>
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
