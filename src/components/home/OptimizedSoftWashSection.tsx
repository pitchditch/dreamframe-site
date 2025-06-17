
import React from 'react';
import { Droplets, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const OptimizedSoftWashSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            🧼 Soft Washing vs. Pressure Washing
          </h2>
          <p className="text-xl text-gray-600">
            What's the Difference – and Why It Matters for Your Home
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Soft Washing */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Droplets className="text-blue-600 mr-3" size={32} />
              <div>
                <h3 className="text-xl font-bold">Soft Washing</h3>
                <p className="text-blue-600 font-medium">Gentle & Effective</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="font-medium text-gray-700 mb-1">Ideal for:</p>
                <p className="text-sm text-gray-600">Siding, roofs, painted surfaces, vinyl, and wood</p>
              </div>
              
              <div>
                <p className="font-medium text-gray-700 mb-1">Method:</p>
                <p className="text-sm text-gray-600">Low-pressure rinse + eco-safe cleaning solution</p>
              </div>
              
              <div>
                <p className="font-medium text-gray-700 mb-1">Purpose:</p>
                <p className="text-sm text-gray-600">Kills mold, algae, mildew, and organic buildup</p>
              </div>
              
              <div>
                <p className="font-medium text-gray-700 mb-1">Won't damage:</p>
                <p className="text-sm text-gray-600">Paint, shingles, or delicate finishes</p>
              </div>
            </div>
          </div>

          {/* Pressure Washing */}
          <div className="bg-red-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Zap className="text-red-600 mr-3" size={32} />
              <div>
                <h3 className="text-xl font-bold">Pressure Washing</h3>
                <p className="text-red-600 font-medium">Powerful & Deep Cleaning</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="font-medium text-gray-700 mb-1">Ideal for:</p>
                <p className="text-sm text-gray-600">Concrete driveways, patios, pavers, decks</p>
              </div>
              
              <div>
                <p className="font-medium text-gray-700 mb-1">Method:</p>
                <p className="text-sm text-gray-600">High-pressure water spray</p>
              </div>
              
              <div>
                <p className="font-medium text-gray-700 mb-1">Purpose:</p>
                <p className="text-sm text-gray-600">Removes tough dirt, grease, moss, and surface stains</p>
              </div>
              
              <div>
                <p className="font-medium text-gray-700 mb-1">Used with caution:</p>
                <p className="text-sm text-gray-600">Only where safe for hard surfaces</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <h3 className="text-xl font-bold mb-4">Which Is Right for You?</h3>
          <p className="text-gray-600 mb-6">
            Don't worry — we assess every job personally to choose the right method. 
            That's why every job is inspected by Jayden, the owner himself.
          </p>
          <Button asChild className="bg-bc-red hover:bg-red-700">
            <Link to="/calculator">🔎 Get Free Estimate</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OptimizedSoftWashSection;
