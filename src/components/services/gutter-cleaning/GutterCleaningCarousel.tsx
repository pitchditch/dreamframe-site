
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const GutterCleaningCarousel = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "1. Initial Inspection",
      description: "We begin with a thorough inspection of your gutters and downspouts to identify blockages, damage, and areas that need special attention.",
      image: "/lovable-uploads/3f5a834d-b684-4522-a2a6-e877e036ccd8.png"
    },
    {
      title: "2. Safety Setup",
      description: "Our team sets up proper safety equipment including ladders, harnesses, and protective gear to ensure safe access to all gutter areas.",
      image: "/lovable-uploads/f899a443-8930-4364-b538-916f65545f84.png"
    },
    {
      title: "3. Debris Removal",
      description: "We carefully remove all leaves, twigs, dirt, and other debris from your gutters by hand and with specialized tools.",
      image: "/lovable-uploads/3f5a834d-b684-4522-a2a6-e877e036ccd8.png"
    },
    {
      title: "4. Downspout Clearing",
      description: "We flush out all downspouts to ensure proper water flow and remove any stubborn blockages using professional equipment.",
      image: "/lovable-uploads/f899a443-8930-4364-b538-916f65545f84.png"
    },
    {
      title: "5. Water Flow Testing",
      description: "We test the entire gutter system with water to ensure proper drainage and identify any remaining issues.",
      image: "/lovable-uploads/3f5a834d-b684-4522-a2a6-e877e036ccd8.png"
    },
    {
      title: "6. Final Cleanup",
      description: "We clean up all debris from your property and provide you with a summary of our work and any recommendations.",
      image: "/lovable-uploads/f899a443-8930-4364-b538-916f65545f84.png"
    }
  ];

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  return (
    <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-80 md:h-96">
        <img
          src={steps[currentStep].image}
          alt={steps[currentStep].title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <button
            onClick={prevStep}
            className="bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          
          <button
            onClick={nextStep}
            className="bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3">{steps[currentStep].title}</h3>
        <p className="text-gray-600 mb-4">{steps[currentStep].description}</p>
        
        <div className="flex justify-center space-x-2">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentStep ? 'bg-bc-red' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GutterCleaningCarousel;
