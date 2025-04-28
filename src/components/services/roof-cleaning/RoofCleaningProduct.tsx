
import React from 'react';

const RoofCleaningProduct = () => {
  return (
    <section className="container mx-auto px-4 py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Verified Roof Cleaning Solution</h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <img 
              src="/lovable-uploads/fa15e94b-83b6-4208-bb6c-49a3dd745570.png" 
              alt="Wash Safe Roof Wash Product" 
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold mb-4">Wash Safe Roof Wash</h3>
            <p className="text-gray-700 mb-4">
              We exclusively use Wash Safe Roof Wash for all our roof cleaning projects. This premium roof cleaning solution is specifically formulated to safely and effectively remove moss, algae, and lichen from your roof without damaging shingles or surrounding vegetation.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Eco-friendly and biodegradable</li>
              <li>No pressure washing needed - extends roof life</li>
              <li>Safe for all roof types including asphalt shingles</li>
              <li>Prevents regrowth of moss and algae</li>
              <li>Won't harm plants or landscaping when used as directed</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoofCleaningProduct;
