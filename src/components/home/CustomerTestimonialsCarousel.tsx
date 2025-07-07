
import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    city: "White Rock",
    rating: 5,
    quote: "Exceptional service! They transformed our salt-stained windows into crystal clear perfection. The team was professional and thorough.",
    image: "/lovable-uploads/9ab5a05b-8db4-45b1-b31f-73f16bbc49a0.png"
  },
  {
    id: 2,
    name: "James Thompson",
    city: "Surrey",
    rating: 5,
    quote: "Best pressure washing service in Surrey! Our driveway looks brand new. Highly recommend BC Pressure Washing.",
    image: "/lovable-uploads/7950561a-0da2-4ea2-9881-59e5b3ae27f0.png"
  },
  {
    id: 3,
    name: "Michael Chen",
    city: "Vancouver",
    rating: 5,
    quote: "Professional window cleaning for our downtown condo. They work efficiently and the results are amazing every time.",
    image: "/lovable-uploads/3e2ccffc-4b8a-4ad3-a5d5-8181d964327b.png"
  },
  {
    id: 4,
    name: "Jennifer Martinez",
    city: "White Rock",
    rating: 5,
    quote: "BC Pressure Washing transformed our home! Living by the ocean, we get a lot of salt buildup, but they made our siding look brand new.",
    image: "/lovable-uploads/781d0a19-3b5f-4860-af2b-ffe54366a5f7.png"
  },
  {
    id: 5,
    name: "David Kumar",
    city: "Richmond",
    rating: 5,
    quote: "Reliable and trustworthy service. They've been cleaning our townhouse complex for months. Always consistent quality.",
    image: "/lovable-uploads/830ffd22-58bc-4cc2-a4e3-e6ddb4eda92a.png"
  },
  {
    id: 6,
    name: "Lisa Anderson",
    city: "Burnaby",
    rating: 5,
    quote: "Great job on our steep driveway! They handled the challenging terrain with expertise and care. Very impressed.",
    image: "/lovable-uploads/750b883e-0b12-487f-b71a-b9332417de1e.png"
  }
];

const CustomerTestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextTestimonial = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const prevTestimonial = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">What Our Customers Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real feedback from homeowners across Metro Vancouver
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-xl shadow-xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Portrait Image */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-bc-red/20 shadow-lg">
                  <img
                    src={currentTestimonial.image}
                    alt={`${currentTestimonial.name}'s portrait`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Testimonial Content */}
              <div className={`flex-1 text-center md:text-left transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                {/* Star Rating */}
                <div className="flex justify-center md:justify-start mb-4">
                  {[...Array(currentTestimonial.rating)].map((_, index) => (
                    <Star key={index} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                
                {/* Quote */}
                <blockquote className="text-lg md:text-xl text-gray-700 italic mb-4 leading-relaxed">
                  "{currentTestimonial.quote}"
                </blockquote>
                
                {/* Name and Location */}
                <div>
                  <div className="font-bold text-lg text-gray-900">{currentTestimonial.name}</div>
                  <div className="text-gray-600">{currentTestimonial.city}</div>
                </div>
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-gray-200"
              onClick={prevTestimonial}
              disabled={isTransitioning}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-gray-200"
              onClick={nextTestimonial}
              disabled={isTransitioning}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-bc-red' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerTestimonialsCarousel;
