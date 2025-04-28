
import React from 'react';
import { Card, CardContent } from './ui/card';
import { Gauge, Droplets } from 'lucide-react';

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* Pressure Washer */}
          <Card className="overflow-hidden border-0 shadow-lg">
            <div className="relative h-64">
              <img 
                src="/lovable-uploads/25d2bc7b-7066-4992-841c-05b45e83a962.png"
                alt="Lifan Hydro Pro 4500 PSI Pressure Washer" 
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
              <h3 className="text-xl font-bold mb-2">Industrial-Grade Pressure Washer</h3>
              <p className="text-gray-600">Professional LIFAN 4500 PSI unit for superior cleaning power.</p>
            </CardContent>
          </Card>

          {/* Surface Cleaner */}
          <Card className="overflow-hidden border-0 shadow-lg">
            <div className="relative h-64">
              <img 
                src="/lovable-uploads/6ca7fa89-7f1e-4e4b-ba3c-f506f87d105a.png"
                alt="Professional Surface Cleaner" 
                className="w-full h-full object-contain p-4"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Surface Cleaner</h3>
              <p className="text-gray-600">Even pressure distribution for perfect results on flat surfaces.</p>
            </CardContent>
          </Card>

          {/* Eco-Friendly Products */}
          <Card className="overflow-hidden border-0 shadow-lg">
            <div className="relative h-64">
              <img 
                src="/lovable-uploads/77908f5a-4387-4ea9-80ad-a762ee2b5b1f.png"
                alt="Eco-Friendly Cleaning Solutions" 
                className="w-full h-full object-contain p-4"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Eco-Friendly Cleaning Solutions</h3>
              <p className="text-gray-600">Professional cleaning solutions that are effective yet environmentally responsible.</p>
            </CardContent>
          </Card>

          {/* Water Fed Pole System */}
          <Card className="overflow-hidden border-0 shadow-lg">
            <div className="relative h-64">
              <img 
                src="/lovable-uploads/58002838-ad0d-499b-ba03-6bdc267c5c54.png"
                alt="Professional Water Fed Pole System" 
                className="w-full h-full object-contain p-4"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Water Fed Pole System</h3>
              <p className="text-gray-600">Advanced pure water technology for streak-free window cleaning up to 60 feet.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EquipmentSection;
