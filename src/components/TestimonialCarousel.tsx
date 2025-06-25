
import { useEffect, useState, useRef } from 'react';
import { testimonials } from '@/data/testimonials';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import TestimonialCard from './TestimonialCard';

interface TestimonialWithProfile {
  id: number;
  quote: string;
  name: string;
  location?: string;
  rating: number;
  beforeAfterImage?: string;
  profileImage?: string;
  service?: "gutter-cleaning" | "window-cleaning" | "pressure-washing" | "roof-cleaning";
}

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allTestimonials, setAllTestimonials] = useState<TestimonialWithProfile[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Initialize testimonials with prioritized before/after images
  useEffect(() => {
    // Filter out testimonials with beforeAfterImages first
    const testimonialsWithBeforeAfter = testimonials
      .filter(Boolean)
      .filter(testimonial => testimonial.beforeAfterImage)
      .sort((a, b) => a.id - b.id); // Sort by ID to maintain consistency
      
    // Then get testimonials with profile images (but no before/after)
    const testimonialsWithProfileOnly = testimonials
      .filter(Boolean)
      .filter(testimonial => testimonial.profileImage && !testimonial.beforeAfterImage);
    
    // Combine them with before/after images first
    const sortedTestimonials = [...testimonialsWithBeforeAfter, ...testimonialsWithProfileOnly];
    
    setAllTestimonials(sortedTestimonials);
  }, []);

  // Auto-rotate testimonials continuously without stopping on hover
  useEffect(() => {
    if (allTestimonials.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % allTestimonials.length;
        
        // Use setTimeout to ensure state update is complete before scrolling
        setTimeout(() => {
          if (carouselRef.current) {
            const scrollAmount = carouselRef.current.clientWidth;
            carouselRef.current.scrollTo({
              left: scrollAmount * nextIndex,
              behavior: 'smooth'
            });
          }
        }, 0);
        
        return nextIndex;
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, [allTestimonials.length]);

  return (
    <section className="bg-gray-50 py-16 w-full">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">What Our Clients Say</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Don't just take our word for it. Here's what our satisfied customers have to say about our services.
        </p>
        
        <div className="relative max-w-6xl mx-auto mb-8 md:mb-12">
          <div 
            ref={carouselRef}
            className="flex overflow-x-hidden snap-x snap-mandatory"
            style={{ scrollBehavior: 'smooth' }}
          >
            {allTestimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="min-w-full snap-center px-4"
              >
                <div className="max-w-4xl mx-auto">
                  <div className="relative bg-white rounded-xl shadow-lg p-6 md:p-8 overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-bc-red/10 rounded-full z-0"></div>
                    
                    <div className="grid md:grid-cols-2 gap-6 relative z-10">
                      <div className="flex flex-col justify-center">
                        {/* Quote */}
                        <div className="mb-4">
                          <svg className="w-8 h-8 text-bc-red" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 8v6c0 3.314-2.686 6-6 6H4v2c0 3.314 2.686 6 6 6h2c3.314 0 6-2.686 6-6v-8c0-3.314-2.686-6-6-6h-2zm16 0v6c0 3.314-2.686 6-6 6h0v2c0 3.314 2.686 6 6 6h2c3.314 0 6-2.686 6-6v-8c0-3.314-2.686-6-6-6h-2z" />
                          </svg>
                        </div>
                        <p className="text-gray-700 italic mb-6 text-lg">{testimonial.quote}</p>
                        
                        {/* Profile */}
                        <div className="flex items-center">
                          {testimonial.profileImage ? (
                            <div className="mr-4">
                              <div className="h-20 w-20 border-2 border-gray-200 rounded-full overflow-hidden">
                                <img 
                                  src={testimonial.profileImage} 
                                  alt={`${testimonial.name}'s portrait`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="mr-4">
                              <div className="h-20 w-20 bg-bc-red/20 text-bc-red border-2 border-gray-200 rounded-full flex items-center justify-center">
                                <span className="text-xl font-bold">{testimonial.name.charAt(0)}</span>
                              </div>
                            </div>
                          )}
                          <div>
                            <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                            {testimonial.location && <p className="text-gray-500">{testimonial.location}</p>}
                            
                            {/* Rating stars */}
                            <div className="flex mt-1">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <svg key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" viewBox="0 0 24 24">
                                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                              ))}
                              {[...Array(5 - testimonial.rating)].map((_, i) => (
                                <svg key={i + testimonial.rating} className="w-4 h-4 text-gray-300" viewBox="0 0 24 24">
                                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Before/After Image - Fixed mobile sizing */}
                      {testimonial.beforeAfterImage && (
                        <div className="h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden">
                          <img 
                            src={testimonial.beforeAfterImage} 
                            alt="Before and after cleaning" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-6">
            {allTestimonials.map((_, testimonialIndex) => (
              <button
                key={testimonialIndex}
                onClick={() => {
                  setCurrentIndex(testimonialIndex);
                  if (carouselRef.current) {
                    const scrollAmount = carouselRef.current.clientWidth;
                    carouselRef.current.scrollTo({
                      left: scrollAmount * testimonialIndex,
                      behavior: 'smooth'
                    });
                  }
                }}
                className={`w-3 h-3 mx-1 rounded-full ${
                  testimonialIndex === currentIndex ? 'bg-bc-red' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${testimonialIndex + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <Button asChild variant="bc-red">
            <Link to="/testimonials">View All Testimonials</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
