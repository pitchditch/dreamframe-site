
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GutterCleaningQuoteOverlay from '@/components/forms/GutterCleaningQuoteOverlay';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      before: "/lovable-uploads/3312e648-cdca-4c6c-8369-bcf99dd6db02.png",
      after: "/lovable-uploads/5ccb5fa4-0911-43f2-9ea9-ad1336cbcbe9.png",
      title: "Clogged to Crystal Clear"
    },
    {
      before: "/lovable-uploads/b746ec68-b615-4294-b8f8-a19b14a4606c.png",
      after: "/lovable-uploads/4a9921b9-2dd2-42b8-ade9-61bbeeb18898.png",
      title: "Professional Results"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

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

          {/* Before/After Slider Column */}
          <div className="relative">
            <div className="bg-white p-6 rounded-xl shadow-2xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                {slides[currentSlide].title}
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-red-600 font-semibold mb-2">BEFORE</p>
                  <img 
                    src={slides[currentSlide].before} 
                    alt="Before gutter cleaning"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                </div>
                <div className="text-center">
                  <p className="text-green-600 font-semibold mb-2">AFTER</p>
                  <img 
                    src={slides[currentSlide].after} 
                    alt="After gutter cleaning"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                </div>
              </div>

              {/* Slider Controls */}
              <div className="flex justify-between items-center mt-4">
                <button onClick={prevSlide} className="p-2 text-gray-600 hover:text-gray-900">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <div className="flex gap-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full ${
                        index === currentSlide ? 'bg-bc-red' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <button onClick={nextSlide} className="p-2 text-gray-600 hover:text-gray-900">
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
