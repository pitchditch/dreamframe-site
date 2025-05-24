
import React from 'react';
import WindowCleaningSimulator from './WindowCleaningAnimation';
import PressureWashingSimulator from './PressureWashingSimulator';
import { useIsMobile } from '@/hooks/use-mobile';

const CombinedSimulatorsSection = () => {
  const isMobile = useIsMobile();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience Our Professional Cleaning</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            {isMobile ? "Drag your finger" : "Click and drag your mouse"} to see the difference our professional equipment makes!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Window Cleaning Simulator */}
          <div>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Window Cleaning Simulator</h3>
              <p className="text-gray-600">Try our water-fed pole system with squeegee technique</p>
            </div>
            <WindowCleaningSimulator />
          </div>
          
          {/* Pressure Washing Simulator */}
          <div>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Pressure Washing Simulator</h3>
              <p className="text-gray-600">Experience our high-pressure cleaning power</p>
            </div>
            <PressureWashingSimulator />
          </div>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            See the dramatic difference professional equipment makes for your property!
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-bold text-lg mb-2">Window Cleaning Features</h4>
              <ul className="text-left text-gray-600 space-y-1">
                <li>• Pure water technology</li>
                <li>• Streak-free results</li>
                <li>• Professional squeegee technique</li>
                <li>• Up to 5 stories high</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-bold text-lg mb-2">Pressure Washing Features</h4>
              <ul className="text-left text-gray-600 space-y-1">
                <li>• High-pressure cleaning</li>
                <li>• Removes stubborn stains</li>
                <li>• Professional equipment</li>
                <li>• Surface restoration</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CombinedSimulatorsSection;
