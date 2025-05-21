
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const SlidingOverlapSection = () => {
  return (
    <div className="py-12 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 justify-between items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Experience the BC Pressure Washing Difference
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              Our professional team delivers outstanding results that transform your property's appearance. 
              We use industry-leading equipment and eco-friendly solutions for superior cleaning.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
              <div className="flex items-center">
                <div className="bg-bc-red/10 rounded-full p-1 mr-3">
                  <Check className="w-4 h-4 text-bc-red" />
                </div>
                <span className="text-gray-700">100% Satisfaction Guarantee</span>
              </div>
              <div className="flex items-center">
                <div className="bg-bc-red/10 rounded-full p-1 mr-3">
                  <Check className="w-4 h-4 text-bc-red" />
                </div>
                <span className="text-gray-700">Fully Licensed & Insured</span>
              </div>
              <div className="flex items-center">
                <div className="bg-bc-red/10 rounded-full p-1 mr-3">
                  <Check className="w-4 h-4 text-bc-red" />
                </div>
                <span className="text-gray-700">Eco-Friendly Solutions</span>
              </div>
              <div className="flex items-center">
                <div className="bg-bc-red/10 rounded-full p-1 mr-3">
                  <Check className="w-4 h-4 text-bc-red" />
                </div>
                <span className="text-gray-700">5-Star Service</span>
              </div>
            </div>
            
            <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row">
              <Button asChild size="lg" className="bg-bc-red hover:bg-red-700 text-white">
                <Link to="/calculator">Get Free Quote <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-bc-red text-bc-red hover:bg-bc-red/10">
                <Link to="/services">View Our Services</Link>
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/lovable-uploads/3af05628-d275-4679-9546-12fcc6178d94.png" 
                alt="Professional cleaning services" 
                className="w-full h-auto rounded-lg" 
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="flex items-center">
                  <div className="bg-white rounded-full p-1 mr-3">
                    <img 
                      src="/lovable-uploads/069112d9-e61f-4def-94ed-7f1c34172bfd.png" 
                      alt="Owner" 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-white text-sm">Every job is personally checked by me</p>
                    <p className="text-white/80 text-xs">— Jayden Fisher, Owner</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlidingOverlapSection;
