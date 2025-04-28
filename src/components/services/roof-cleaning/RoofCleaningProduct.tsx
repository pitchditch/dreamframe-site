
import React from 'react';
import { Button } from '@/components/ui/button';

const RoofCleaningProduct = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Trusted Roof Washing Solution</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div>
            <img 
              src="/lovable-uploads/4e682dd6-9b70-4e97-9cee-c45a3f256ee3.png" 
              alt="Wash Safe Roof Wash Product" 
              className="mx-auto w-full max-w-md h-auto rounded-lg shadow-md"
            />
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-4">Wash Safe Roof Wash</h3>
            <p className="text-gray-700 mb-6">
              For every roof cleaning job, we trust Wash Safe Roof Wash - a premium, eco-friendly cleaning solution 
              that effectively removes moss, algae, lichen, and other organic growth without harming your roof 
              or the environment.
            </p>
            
            <h4 className="font-semibold text-lg mb-2">Why We Choose This Product:</h4>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>Gentle yet effective cleaning action</li>
              <li>Safe for asphalt, tile, metal, and composite roofs</li>
              <li>Eco-friendly formulation</li>
              <li>Helps prevent regrowth of moss and algae</li>
              <li>Won't damage landscaping or plants below</li>
            </ul>
            
            <p className="text-gray-700 mb-6">
              We combine this premium cleaning solution with our soft washing technique to ensure your 
              roof is thoroughly cleaned without causing any damage to the shingles or underlying structure.
            </p>
            
            <Button className="bg-bc-red hover:bg-red-700">
              <a href="https://washsafe.com/roof-wash/" target="_blank" rel="noopener noreferrer">
                Learn More About Wash Safe
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoofCleaningProduct;
