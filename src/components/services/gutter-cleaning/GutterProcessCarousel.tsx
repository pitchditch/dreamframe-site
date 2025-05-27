
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const GutterProcessCarousel = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "1. Debris Removal",
      description: "We safely remove all leaves, twigs, and debris from your gutters by hand to ensure a thorough cleaning. All collected debris is bagged and removed from your property, leaving no mess behind.",
      image: "/lovable-uploads/3f5a834d-b684-4522-a2a6-e877e036ccd8.png",
      alt: "Gutter Debris Removal"
    },
    {
      title: "2. Downspout Clearing & Testing",
      description: "We check all downspouts for blockages and flush them with water to ensure proper flow. If we encounter stubborn clogs, we use specialized tools to clear them completely.",
      image: "/lovable-uploads/17615bf7-9c4b-4eea-84a3-791bd34ef4a3.png",
      alt: "Downspout Clearing"
    },
    {
      title: "3. Gutter Face Cleaning",
      description: "We clean the exterior faces of your gutters to remove unsightly black streaks, tiger stripes, and algae growth. This not only improves functionality but also enhances your home's curb appeal.",
      image: "/lovable-uploads/063bab0f-d6c4-4c42-9610-0aa6307eae88.jpg",
      alt: "Gutter Face Cleaning"
    },
    {
      title: "4. Final Inspection & Cleanup",
      description: "After allowing the cleaning solution to dwell for the appropriate time, we perform a final water flow test to ensure everything is working properly and clean up any debris that may have fallen during the cleaning process. You'll receive before and after photos showing the work completed.",
      image: "/lovable-uploads/572f285b-b3cc-4a5c-93e3-637ee1015659.jpg",
      alt: "Final Inspection"
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [steps.length]);

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Gutter Cleaning Process</h2>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Image Section */}
            <div className="relative h-96 lg:h-[500px] overflow-hidden rounded-lg shadow-xl">
              <img 
                src={steps[currentStep].image}
                alt={steps[currentStep].alt}
                className="w-full h-full object-cover transition-all duration-500"
              />
              
              {/* Navigation Arrows */}
              <button
                onClick={prevStep}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextStep}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
              >
                <ChevronRight size={20} />
              </button>
              
              {/* Step indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentStep ? 'bg-bc-red' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-bc-red rounded-full flex items-center justify-center text-white font-bold">
                    {currentStep + 1}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {steps[currentStep].title}
                  </h3>
                </div>
                
                <p className="text-gray-700 leading-relaxed text-lg">
                  {steps[currentStep].description}
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-bc-red h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                ></div>
              </div>
              
              {/* Step thumbnails */}
              <div className="grid grid-cols-4 gap-2">
                {steps.map((step, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`p-2 rounded-lg border-2 transition-all ${
                      index === currentStep 
                        ? 'border-bc-red bg-red-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img 
                      src={step.image}
                      alt={step.alt}
                      className="w-full h-12 object-cover rounded"
                    />
                    <p className="text-xs mt-1 font-medium">{step.title.split('.')[1]}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GutterProcessCarousel;
