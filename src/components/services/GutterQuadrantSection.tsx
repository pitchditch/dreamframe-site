
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
      setActiveQuadrant((prev) => (prev + 1) % quadrants.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [quadrants.length]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t("Our Recent Gutter Cleaning Project")}</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {t("Every aspect of our gutter cleaning service is methodical and thorough. Click on any section to see detailed photos from our recent work.")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Main project image with interactive quadrants */}
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              {/* Main background image */}
              <img 
                src="/lovable-uploads/b746ec68-b615-4294-b8f8-a19b14a4606c.png" 
                alt="Recent Gutter Cleaning Project"
                className="w-full h-auto object-cover"
              />
              
              {/* Interactive quadrant overlays */}
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1">
                {/* Top Left */}
                <div 
                  className={`cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out ${
                    activeQuadrant === 0 
                      ? 'transform scale-105 z-10 border-4 border-bc-red rounded-lg shadow-2xl' 
                      : 'hover:transform hover:scale-102 hover:z-5'
                  }`}
                  onClick={() => setActiveQuadrant(0)}
                  style={{
                    backgroundImage: `url(${quadrants[0].image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className={`absolute inset-0 transition-all duration-300 ${
                    activeQuadrant === 0 ? 'bg-bc-red/20' : 'bg-black/40 hover:bg-bc-red/30'
                  }`} />
                  <div className="absolute top-2 left-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300 ${
                      activeQuadrant === 0 ? 'bg-bc-red scale-110' : 'bg-black/70'
                    }`}>
                      1
                    </div>
                  </div>
                </div>
                
                {/* Top Right */}
                <div 
                  className={`cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out ${
                    activeQuadrant === 1 
                      ? 'transform scale-105 z-10 border-4 border-bc-red rounded-lg shadow-2xl' 
                      : 'hover:transform hover:scale-102 hover:z-5'
                  }`}
                  onClick={() => setActiveQuadrant(1)}
                  style={{
                    backgroundImage: `url(${quadrants[1].image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className={`absolute inset-0 transition-all duration-300 ${
                    activeQuadrant === 1 ? 'bg-bc-red/20' : 'bg-black/40 hover:bg-bc-red/30'
                  }`} />
                  <div className="absolute top-2 right-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300 ${
                      activeQuadrant === 1 ? 'bg-bc-red scale-110' : 'bg-black/70'
                    }`}>
                      2
                    </div>
                  </div>
                </div>
                
                {/* Bottom Left */}
                <div 
                  className={`cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out ${
                    activeQuadrant === 2 
                      ? 'transform scale-105 z-10 border-4 border-bc-red rounded-lg shadow-2xl' 
                      : 'hover:transform hover:scale-102 hover:z-5'
                  }`}
                  onClick={() => setActiveQuadrant(2)}
                  style={{
                    backgroundImage: `url(${quadrants[2].image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className={`absolute inset-0 transition-all duration-300 ${
                    activeQuadrant === 2 ? 'bg-bc-red/20' : 'bg-black/40 hover:bg-bc-red/30'
                  }`} />
                  <div className="absolute bottom-2 left-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300 ${
                      activeQuadrant === 2 ? 'bg-bc-red scale-110' : 'bg-black/70'
                    }`}>
                      3
                    </div>
                  </div>
                </div>
                
                {/* Bottom Right */}
                <div 
                  className={`cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out ${
                    activeQuadrant === 3 
                      ? 'transform scale-105 z-10 border-4 border-bc-red rounded-lg shadow-2xl' 
                      : 'hover:transform hover:scale-102 hover:z-5'
                  }`}
                  onClick={() => setActiveQuadrant(3)}
                  style={{
                    backgroundImage: `url(${quadrants[3].image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className={`absolute inset-0 transition-all duration-300 ${
                    activeQuadrant === 3 ? 'bg-bc-red/20' : 'bg-black/40 hover:bg-bc-red/30'
                  }`} />
                  <div className="absolute bottom-2 right-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300 ${
                      activeQuadrant === 3 ? 'bg-bc-red scale-110' : 'bg-black/70'
                    }`}>
                      4
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content section */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-lg transform transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-bc-red rounded-full flex items-center justify-center text-white font-bold">
                  {activeQuadrant + 1}
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {quadrants[activeQuadrant].title}
                </h3>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                {quadrants[activeQuadrant].description}
              </p>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800 mb-3">{t("Key Focus Areas:")}</h4>
                {quadrants[activeQuadrant].features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 transform transition-all duration-200 hover:translate-x-1">
                    <div className="w-2 h-2 bg-bc-red rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center gap-2">
              {quadrants.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveQuadrant(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeQuadrant 
                      ? 'bg-bc-red w-8 transform scale-110' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`View step ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GutterQuadrantSection;
