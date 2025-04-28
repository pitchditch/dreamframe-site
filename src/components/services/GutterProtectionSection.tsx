
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const GutterProtectionSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Gutter Protection Solutions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Leaf Guard Protection</h3>
            <img 
              src="/lovable-uploads/d3256a2f-faba-4282-be37-ff41afa3c789.png" 
              alt="Leaf Guard Protection - Before and After" 
              className="w-full h-auto rounded-lg shadow-md mb-4"
            />
            <p className="text-gray-700 mb-4">
              Our premium leaf guard system prevents leaves, debris, and pests from entering your gutters 
              while allowing water to flow freely. This system provides long-term protection and 
              significantly reduces the need for regular gutter cleaning.
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>Prevents clogs and water damage</li>
              <li>Protects against pest infestation</li>
              <li>Extends the life of your gutter system</li>
              <li>Professional installation</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              <span className="line-through text-red-500 mr-3">Gutter Netting - Not Recommended</span>
            </h3>
            <div className="relative">
              <img 
                src="/lovable-uploads/ab19acba-55ba-4a72-bfb1-8f76c61f7c4b.png" 
                alt="Gutter Netting - Not Recommended" 
                className="w-full h-auto rounded-lg shadow-md mb-4"
              />
              <div className="absolute inset-0 bg-red-500 bg-opacity-20 flex items-center justify-center">
                <div className="bg-red-500 text-white py-2 px-4 rounded-lg font-bold transform -rotate-12 shadow-lg">
                  NOT RECOMMENDED
                </div>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              We <strong>do not recommend</strong> gutter netting as a solution. While it's less expensive initially, it has serious drawbacks:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>Leaves and debris get caught in the netting, creating clogs</li>
              <li>Requires frequent maintenance and cleaning</li>
              <li>Deteriorates quickly when exposed to weather</li>
              <li>Can collapse under heavy debris, causing gutter damage</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-gray-50 p-8 rounded-xl shadow-sm mb-16">
          <h3 className="text-2xl font-semibold mb-6">Affordable Alternative: Gutter Sticks</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img 
                src="/lovable-uploads/09124eef-7f15-45a7-af76-6653813f4e96.png" 
                alt="Gutter Stick Installation" 
                className="w-full h-auto rounded-lg shadow-md mb-4"
              />
              <img 
                src="/lovable-uploads/aa9d4806-a259-43b0-9719-144ff1b60a22.png" 
                alt="Gutter Stick in Action" 
                className="w-full h-auto rounded-lg shadow-md mb-4"
              />
            </div>
            <div>
              <p className="text-gray-700 mb-4">
                If you can't afford a full leaf guard system, we offer gutter sticks as an economical alternative. 
                These simple yet effective devices prevent clogs at the downspout, which is where most gutter 
                blockages occur.
              </p>
              <div className="bg-bc-red/10 border border-bc-red/30 rounded-lg p-4 mb-6">
                <h4 className="font-bold text-xl mb-2">Special Offer</h4>
                <p className="text-gray-800">
                  Gutter stick installation: <span className="font-bold text-bc-red">$70 per drain</span>
                </p>
              </div>
              <h4 className="font-semibold text-lg mb-2">Benefits of Gutter Sticks:</h4>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Prevents clogging at the most critical point - the downspout</li>
                <li>Easy installation and maintenance</li>
                <li>Cost-effective solution</li>
                <li>Durable plastic construction that lasts for years</li>
                <li>Can be combined with regular cleaning for optimal protection</li>
              </ul>
              <div className="mt-4">
                <Button asChild variant="bc-red">
                  <Link to="/calculator">Get a Quote for Gutter Protection</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GutterProtectionSection;
