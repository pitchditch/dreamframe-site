
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GutterCleaningQuoteOverlay from '@/components/forms/GutterCleaningQuoteOverlay';

const HeroSlider = () => {
  const [currentQuadrant, setCurrentQuadrant] = useState(0);

  // Quadrant positions for animation
  const quadrants = [
    { 
      transform: 'scale(2) translate(-25%, -25%)', 
      title: 'Top Left View',
      description: 'Detailed inspection of gutter condition'
    },
    { 
      transform: 'scale(2) translate(25%, -25%)', 
      title: 'Top Right View',
      description: 'Professional debris removal process'
    },
    { 
      transform: 'scale(2) translate(-25%, 25%)', 
      title: 'Bottom Left View',
      description: 'Complete system assessment'
    },
    { 
      transform: 'scale(2) translate(25%, 25%)', 
      title: 'Bottom Right View',
      description: 'Final quality inspection'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuadrant((prev) => (prev + 1) % quadrants.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const nextQuadrant = () => setCurrentQuadrant((prev) => (prev + 1) % quadrants.length);
  const prevQuadrant = () => setCurrentQuadrant((prev) => (prev - 1 + quadrants.length) % quadrants.length);

  return (
    <div className="relative bg-gradient-to-br from-blue-900 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Column */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Gutter Cleaning in Surrey & White Rock
                <span className="block text-yellow-400">Prevent Costly Water Damage</span>
              </h1>
              <p className="text-xl text-blue-100">
                Affordable, thorough gutter cleaning in Surrey, White Rock, and Metro Vancouver. 
                Protect your home from damage starting at just $129!
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="font-semibold">5.0 Rating</span>
              </div>
              <div className="bg-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                Licensed & Insured
              </div>
              <div className="bg-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                100+ Happy Customers
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <GutterCleaningQuoteOverlay 
                buttonText="Get Instant Price - No Email Required" 
                variant="bc-red" 
              />
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white"
                asChild
              >
                <a href="tel:7788087620">
                  📞 Call Now: (778) 808-7620
                </a>
              </Button>
            </div>

            {/* Urgency Banner */}
            <div className="bg-red-600 p-4 rounded-lg">
              <p className="font-semibold text-center">
                ⚠️ Only 5 fall cleaning slots left this week! Clogged gutters can cause $5,000+ in damages.
              </p>
            </div>
          </div>

          {/* Animated Quadrant Image */}
          <div className="relative">
            <div className="bg-white p-6 rounded-xl shadow-2xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                Professional Gutter Cleaning Process
              </h3>
              
              {/* Quadrant rotating image */}
              <div className="relative overflow-hidden rounded-lg h-64">
                <img 
                  src="/lovable-uploads/d4b8bd58-58f9-4c12-a772-ba4f86bdc3ac.png"
                  alt="Aerial view of professional gutter cleaning process"
                  className="w-full h-full object-cover transition-transform duration-1000 ease-in-out"
                  style={{ 
                    transform: quadrants[currentQuadrant].transform,
                    transformOrigin: 'center'
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <div className="text-white">
                    <p className="text-sm font-medium">{quadrants[currentQuadrant].title}</p>
                    <p className="text-xs opacity-90">{quadrants[currentQuadrant].description}</p>
                  </div>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="flex justify-between items-center mt-4">
                <button onClick={prevQuadrant} className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <div className="flex gap-2">
                  {quadrants.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuadrant(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentQuadrant ? 'w-4 bg-bc-red' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <button onClick={nextQuadrant} className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
