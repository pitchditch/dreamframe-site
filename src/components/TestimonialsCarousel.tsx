
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
  
  console.log('TestimonialsCarousel: Component rendered');
  
  // Initialize testimonials with prioritized before/after images
  useEffect(() => {
    console.log('TestimonialsCarousel: Initializing testimonials');
    
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
    
    console.log('TestimonialsCarousel: Setting testimonials', sortedTestimonials.length);
    setAllTestimonials(sortedTestimonials);
  }, []);

  // Auto-rotate testimonials continuously without stopping on hover
  useEffect(() => {
    if (allTestimonials.length === 0) return;
    
    console.log('TestimonialsCarousel: Setting up auto-rotation');
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % allTestimonials.length;
        console.log('TestimonialsCarousel: Auto-rotating to index', nextIndex);
        return nextIndex;
      });
    }, 5000);
    
    // Update carousel scroll position when currentIndex changes
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth;
      carouselRef.current.scrollTo({
        left: scrollAmount * currentIndex,
        behavior: 'smooth'
      });
    }
    
    return () => {
      console.log('TestimonialsCarousel: Cleaning up auto-rotation');
      clearInterval(interval);
    };
  }, [allTestimonials.length, currentIndex]);

  const handleDotClick = (testimonialIndex: number) => {
    console.log('TestimonialsCarousel: Dot clicked for index', testimonialIndex);
    setCurrentIndex(testimonialIndex);
    
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth;
      carouselRef.current.scrollTo({
        left: scrollAmount * testimonialIndex,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="bg-gray-50 py-20 w-full">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">What Our Clients Say</h2>
        <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto text-lg">
          Don't just take our word for it. Here's what our satisfied customers have to say about our services.
        </p>
        
        <div className="relative max-w-7xl mx-auto mb-16">
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
                <div className="max-w-5xl mx-auto">
                  <TestimonialCard
                    quote={testimonial.quote}
                    name={testimonial.name}
                    location={testimonial.location}
                    rating={testimonial.rating}
                    beforeAfterImage={testimonial.beforeAfterImage}
                    profileImage={testimonial.profileImage}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            {allTestimonials.map((_, dotIndex) => (
              <button
                key={dotIndex}
                onClick={() => handleDotClick(dotIndex)}
                className={`w-4 h-4 mx-1 rounded-full ${
                  dotIndex === currentIndex ? 'bg-bc-red' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${dotIndex + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <Button asChild variant="bc-red" size="lg">
            <Link to="/testimonials">View All Testimonials</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
