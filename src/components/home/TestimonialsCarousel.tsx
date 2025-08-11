
import React, { useEffect, useState } from 'react';
import { testimonials } from '../../data/testimonials';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const TestimonialsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-cycle through testimonials
  useEffect(() => {
    const intervalId = setInterval(() => {
      goToNextTestimonial();
    }, 8000); // Change every 8 seconds

    return () => clearInterval(intervalId);
  }, [activeIndex]);

  const goToPrevTestimonial = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const goToNextTestimonial = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const currentTestimonial = testimonials[activeIndex];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="relative bg-white rounded-xl shadow-lg p-12 md:p-16">
        <div className="flex flex-col items-center">
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden mb-8 border-4 border-gray-100 shadow-lg">
            <img
              src={currentTestimonial.profileImage || '/lovable-uploads/9ab5a05b-8db4-45b1-b31f-73f16bbc49a0.png'}
              alt={`${currentTestimonial.name}'s avatar`}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className={`text-center transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-gray-700 italic leading-relaxed">
              "{currentTestimonial.quote}"
            </p>
            
            <div>
              <div className="font-bold text-xl md:text-2xl">{currentTestimonial.name}</div>
              <div className="text-gray-500 text-lg md:text-xl">{currentTestimonial.location}</div>
              <div className="flex justify-center mt-4">
                {[...Array(currentTestimonial.rating)].map((_, starIndex) => (
                  <svg key={starIndex} className="w-6 h-6 md:w-7 md:h-7 text-yellow-500 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-10 space-x-3">
            {testimonials.map((_, dotIndex) => (
              <button
                key={dotIndex}
                onClick={() => setActiveIndex(dotIndex)}
                className={`w-3 h-3 rounded-full transition-all ${
                  dotIndex === activeIndex ? 'bg-bc-red scale-125' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${dotIndex + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Navigation buttons */}
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white border-gray-200 hover:bg-gray-50 w-12 h-12"
          onClick={goToPrevTestimonial}
          disabled={isTransitioning}
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Previous testimonial</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white border-gray-200 hover:bg-gray-50 w-12 h-12"
          onClick={goToNextTestimonial}
          disabled={isTransitioning}
        >
          <ArrowRight className="h-5 w-5" />
          <span className="sr-only">Next testimonial</span>
        </Button>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
