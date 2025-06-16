
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BeforeAfterSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: "/lovable-uploads/1eaed8db-5d8f-4291-b8a6-cf155569badc.png",
      title: "Before: Tape and debris",
      description: "Tape and debris stuck to every pane"
    },
    {
      image: "/lovable-uploads/8bfa7c48-74fb-490c-89e1-e15d87fdcc6d.png", 
      title: "During: Careful removal",
      description: "Careful removal using specialized techniques"
    },
    {
      image: "/lovable-uploads/a237ac38-d3a7-42b4-853b-65512e02a031.png",
      title: "Cleaning Windows",
      description: "Professional window cleaning in progress"
    },
    {
      image: "/lovable-uploads/3af05628-d275-4679-9546-12fcc6178d94.png",
      title: "After: Sparkling clean", 
      description: "Sparkling, streak-free windows"
    }
  ];

  // Auto-advance carousel every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">See The Difference</h2>
        
        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Image Display */}
          <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out h-full"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="w-full h-full flex-shrink-0 relative">
                  <img 
                    src={slide.image}
                    alt={slide.description}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <h3 className="text-white font-bold text-xl mb-2">{slide.title}</h3>
                    <p className="text-white/90">{slide.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-3 mt-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-bc-red scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold mb-4">Ready to make your windows shine?</h3>
          <a 
            href="#booking-section" 
            className="inline-block bg-bc-red text-white px-8 py-4 rounded-md font-medium text-lg hover:bg-red-700 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('booking-section')?.scrollIntoView({behavior: 'smooth'});
            }}
          >
            Get Your Free Quote
          </a>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
