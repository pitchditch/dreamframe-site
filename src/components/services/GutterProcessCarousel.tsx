
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Shield, Droplets, CheckCircle, Home } from 'lucide-react';

const processSteps = [
  {
    id: 1,
    title: "Initial Assessment",
    description: "We start with a thorough assessment of your gutter system, identifying problem areas, checking for damage, and determining the best cleaning approach for your specific needs.",
    icon: Shield,
    features: [
      "Complete gutter system inspection",
      "Identification of clogs and damage",
      "Safety equipment setup",
      "Access point evaluation"
    ],
    image: "/lovable-uploads/389a6f18-1725-449e-9461-22e9e46dab29.png"
  },
  {
    id: 2,
    title: "Debris Removal",
    description: "Using professional tools and techniques, we carefully remove all leaves, twigs, dirt, and accumulated debris from your gutters and downspouts.",
    icon: Droplets,
    features: [
      "Hand removal of all debris",
      "Specialized gutter cleaning tools",
      "Downspout clearing and flushing",
      "Proper debris collection and bagging"
    ],
    image: "/lovable-uploads/389a6f18-1725-449e-9461-22e9e46dab29.png"
  },
  {
    id: 3,
    title: "Water Flow Testing",
    description: "We test the entire gutter system with water to ensure proper drainage, identify any remaining blockages, and verify that water flows correctly through downspouts.",
    icon: CheckCircle,
    features: [
      "Complete system water testing",
      "Downspout flow verification",
      "Leak detection and reporting",
      "Drainage pattern assessment"
    ],
    image: "/lovable-uploads/389a6f18-1725-449e-9461-22e9e46dab29.png"
  },
  {
    id: 4,
    title: "Final Cleanup & Inspection",
    description: "We complete the service with thorough cleanup of your property and provide a final inspection report with maintenance recommendations.",
    icon: Home,
    features: [
      "Complete property cleanup",
      "Debris removal and disposal",
      "Final quality inspection",
      "Maintenance recommendations"
    ],
    image: "/lovable-uploads/389a6f18-1725-449e-9461-22e9e46dab29.png"
  }
];

const GutterProcessCarousel = () => {
  const [currentStep, setCurrentStep] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % processSteps.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % processSteps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + processSteps.length) % processSteps.length);
  };

  const currentStepData = processSteps[currentStep];
  const IconComponent = currentStepData.icon;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Gutter Cleaning Process</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Every step of our process is designed to ensure thorough cleaning and maximum protection for your home.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="overflow-hidden shadow-xl">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">
                {/* Image Section */}
                <div className="relative h-64 md:h-auto">
                  <img 
                    src={currentStepData.image}
                    alt={currentStepData.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-bc-red rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {currentStepData.id}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center mb-4">
                    <IconComponent className="w-8 h-8 text-bc-red mr-3" />
                    <h3 className="text-2xl font-bold">{currentStepData.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {currentStepData.description}
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    <h4 className="font-semibold text-gray-800">Key Features:</h4>
                    {currentStepData.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-bc-red rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Navigation Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      {processSteps.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentStep(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentStep 
                              ? 'bg-bc-red w-8' 
                              : 'bg-gray-300 hover:bg-gray-400'
                          }`}
                          aria-label={`Go to step ${index + 1}`}
                        />
                      ))}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={prevStep}
                        className="w-10 h-10 p-0"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={nextStep}
                        className="w-10 h-10 p-0"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step Numbers Display */}
          <div className="grid grid-cols-4 gap-4 mt-8">
            {processSteps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(index)}
                className={`p-4 rounded-lg text-center transition-all duration-300 ${
                  index === currentStep
                    ? 'bg-bc-red text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50 shadow'
                }`}
              >
                <div className="font-bold text-lg mb-1">Step {step.id}</div>
                <div className="text-sm">{step.title}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GutterProcessCarousel;
