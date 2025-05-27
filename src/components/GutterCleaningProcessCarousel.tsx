
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GutterCleaningProcessCarousel = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "1. Debris Removal",
      image: "/lovable-uploads/3f5a834d-b684-4522-a2a6-e877e036ccd8.png",
      description: "We safely remove all leaves, twigs, and debris from your gutters by hand to ensure a thorough cleaning. All collected debris is bagged and removed from your property, leaving no mess behind."
    },
    {
      title: "2. Downspout Clearing & Testing",
      image: "/lovable-uploads/17615bf7-9c4b-4eea-84a3-791bd34ef4a3.png",
      description: "We check all downspouts for blockages and flush them with water to ensure proper flow. If we encounter stubborn clogs, we use specialized tools to clear them completely."
    },
    {
      title: "3. Gutter Face Cleaning",
      image: "/lovable-uploads/063bab0f-d6c4-4c42-9610-0aa6307eae88.jpg",
      description: "We clean the exterior faces of your gutters to remove unsightly black streaks, tiger stripes, and algae growth. This not only improves functionality but also enhances your home's curb appeal."
    },
    {
      title: "4. Final Inspection & Cleanup",
      image: "/lovable-uploads/572f285b-b3cc-4a5c-93e3-637ee1015659.jpg",
      description: "After allowing the cleaning solution to dwell for the appropriate time, we perform a final water flow test to ensure everything is working properly and clean up any debris that may have fallen during the cleaning process."
    }
  ];

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Our Gutter Cleaning Process</h2>
          
          <div className="relative bg-gray-50 rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-2xl font-bold mb-4 text-bc-red">{steps[currentStep].title}</h3>
                <p className="text-gray-700 text-lg leading-relaxed">{steps[currentStep].description}</p>
              </div>
              <div className="order-1 md:order-2">
                <img 
                  src={steps[currentStep].image} 
                  alt={steps[currentStep].title}
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              </div>
            </div>
            
            {/* Navigation Controls */}
            <div className="flex justify-between items-center mt-8">
              <Button
                onClick={prevStep}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <ChevronLeft size={16} />
                Previous
              </Button>
              
              {/* Step Indicators */}
              <div className="flex space-x-2">
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
              
              <Button
                onClick={nextStep}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight size={16} />
              </Button>
            </div>
            
            {/* Step Counter */}
            <div className="text-center mt-4 text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GutterCleaningProcessCarousel;
