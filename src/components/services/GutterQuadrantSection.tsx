
import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/use-translation';

interface QuadrantDetail {
  title: string;
  description: string;
  features: string[];
  image: string;
}

const GutterQuadrantSection = () => {
  const { t } = useTranslation();
  const [activeQuadrant, setActiveQuadrant] = useState(0);
  
  const quadrants: QuadrantDetail[] = [
    {
      title: t("Roof Assessment & Safety"),
      description: t("We start by carefully assessing the roof structure and setting up proper safety equipment before beginning any gutter work."),
      features: [
        t("Thorough roof inspection"), 
        t("Ladder safety protocols"), 
        t("Equipment positioning"), 
        t("Weather condition assessment")
      ],
      image: "/lovable-uploads/572f285b-b3cc-4a5c-93e3-637ee1015659.jpg"
    },
    {
      title: t("Debris Removal Process"),
      description: t("Manual removal of all leaves, twigs, and accumulated debris from gutters and downspouts using professional tools."),
      features: [
        t("Hand removal of debris"), 
        t("Specialized gutter tools"), 
        t("Complete debris bagging"), 
        t("Downspout inspection")
      ],
      image: "/lovable-uploads/3f5a834d-b684-4522-a2a6-e877e036ccd8.png"
    },
    {
      title: t("Water Flow Testing"),
      description: t("Testing water flow through the entire gutter system to ensure proper drainage and identify any blockages."),
      features: [
        t("Downspout flow testing"), 
        t("Blockage identification"), 
        t("Drainage assessment"), 
        t("System functionality check")
      ],
      image: "/lovable-uploads/17615bf7-9c4b-4eea-84a3-791bd34ef4a3.png"
    },
    {
      title: t("Final Cleaning & Inspection"),
      description: t("Complete exterior gutter cleaning and final quality inspection to ensure everything meets our high standards."),
      features: [
        t("Gutter face cleaning"), 
        t("Streak removal"), 
        t("Final quality check"), 
        t("Customer walkthrough")
      ],
      image: "/lovable-uploads/063bab0f-d6c4-4c42-9610-0aa6307eae88.jpg"
    }
  ];

  // Auto-rotate quadrants
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuadrant(prev => (prev + 1) % quadrants.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [quadrants.length]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Gutter Cleaning Process</h2>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <img 
                src={quadrants[activeQuadrant].image} 
                alt={quadrants[activeQuadrant].title}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
            
            <div className="order-1 md:order-2">
              <h3 className="text-2xl font-bold mb-4">{quadrants[activeQuadrant].title}</h3>
              <p className="text-gray-700 mb-6">{quadrants[activeQuadrant].description}</p>
              
              <ul className="space-y-3">
                {quadrants[activeQuadrant].features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-green-600 mr-3">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              {/* Step indicators */}
              <div className="flex space-x-2 mt-6">
                {quadrants.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveQuadrant(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === activeQuadrant ? 'bg-bc-red' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GutterQuadrantSection;
