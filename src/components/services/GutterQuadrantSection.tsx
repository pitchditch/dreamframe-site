
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
      features: [t("Thorough roof inspection"), t("Ladder safety protocols"), t("Equipment positioning"), t("Weather condition assessment")],
      image: "/lovable-uploads/572f285b-b3cc-4a5c-93e3-637ee1015659.jpg"
    },
    {
      title: t("Debris Removal Process"),
      description: t("Manual removal of all leaves, twigs, and accumulated debris from gutters and downspouts using professional tools."),
      features: [t("Hand removal of debris"), t("Specialized gutter tools"), t("Complete debris bagging"), t("Downspout inspection")],
      image: "/lovable-uploads/3f5a834d-b684-4522-a2a6-e877e036ccd8.png"
    },
    {
      title: t("Water Flow Testing"),
      description: t("Testing water flow through the entire gutter system to ensure proper drainage and identify any blockages."),
      features: [t("Downspout flow testing"), t("Blockage identification"), t("Drainage assessment"), t("System functionality check")],
      image: "/lovable-uploads/17615bf7-9c4b-4eea-84a3-791bd34ef4a3.png"
    },
    {
      title: t("Final Cleaning & Inspection"),
      description: t("Complete exterior gutter cleaning and final quality inspection to ensure everything meets our high standards."),
      features: [t("Gutter face cleaning"), t("Streak removal"), t("Final quality check"), t("Customer walkthrough")],
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
        <h2 className="text-3xl font-bold text-center mb-12">{t("Our Detailed Gutter Cleaning Process")}</h2>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative">
            <img 
              src="/lovable-uploads/a2a1376b-3da7-4c9d-9a85-60ba24418d4f.png"
              alt="Recent Gutter Cleaning Project"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            
            {quadrants.map((quadrant, index) => (
              <div
                key={index}
                className={`absolute cursor-pointer transition-all duration-500 ${
                  index === activeQuadrant ? 'scale-110 z-10' : 'scale-100 hover:scale-105'
                } ${
                  index === 0 ? 'top-4 left-4 w-24 h-24' :
                  index === 1 ? 'top-4 right-4 w-24 h-24' :
                  index === 2 ? 'bottom-4 left-4 w-24 h-24' :
                  'bottom-4 right-4 w-24 h-24'
                }`}
                onClick={() => setActiveQuadrant(index)}
              >
                <img 
                  src={quadrant.image}
                  alt={quadrant.title}
                  className="w-full h-full object-cover rounded-lg border-4 border-white shadow-lg"
                />
                <div className={`absolute inset-0 bg-bc-red/20 rounded-lg transition-opacity duration-300 ${
                  index === activeQuadrant ? 'opacity-0' : 'opacity-60'
                }`} />
              </div>
            ))}
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">
              {quadrants[activeQuadrant].title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {quadrants[activeQuadrant].description}
            </p>
            <ul className="space-y-2">
              {quadrants[activeQuadrant].features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-bc-red rounded-full mr-3" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GutterQuadrantSection;
