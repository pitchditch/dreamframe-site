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
  profileImage?: string;
  beforeAfterImage?: string;
  service?: "gutter-cleaning" | "window-cleaning" | "pressure-washing" | "roof-cleaning";
}

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allTestimonials, setAllTestimonials] = useState<TestimonialWithProfile[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Update testimonials with corrected names and profile pictures
  useEffect(() => {
    const updatedTestimonials = testimonials.map((testimonial) => {
      // Replace specific names as requested
      let updatedName = testimonial.name;
      
      if (testimonial.name === "Robert Anderson") {
        updatedName = "Rebecca Anderson";
      } else if (testimonial.name === "Thomas Clark") {
        updatedName = "Tina Clark";
      } else if (testimonial.name === "David Wilson") {
        updatedName = "Raj Patel";
      }
      
      // Keep Michael Johnson with no profile picture
      if (testimonial.name === "Michael Johnson") {
        return {
          ...testimonial,
          name: updatedName,
          profileImage: undefined
        };
      }
      
      // Skip adding profile pictures for deleted profiles
      if (
        ["Emily Johnson", "Christopher Lee", "Patricia Chen", 
        "Daniel Lewis", "Jennifer Davis", "Olivia Robinson"].includes(testimonial.name)
      ) {
        return null;
      }
      
      // Add profile images to other testimonials
      const imageIndex = Math.floor(Math.random() * profileImages.length);
      return {
        ...testimonial,
        name: updatedName,
        profileImage: profileImages[imageIndex]
      };
    }).filter(Boolean) as TestimonialWithProfile[]; // Filter out null values
    
    // Remove any duplicates (by name)
    const uniqueTestimonials = updatedTestimonials.filter(
      (testimonial, index, self) => 
        index === self.findIndex(t => t.name === testimonial.name)
    );
    
    setAllTestimonials(uniqueTestimonials);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    if (allTestimonials.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % allTestimonials.length);
      
      if (carouselRef.current) {
        const scrollAmount = carouselRef.current.clientWidth;
        carouselRef.current.scrollTo({
          left: scrollAmount * ((currentIndex + 1) % allTestimonials.length),
          behavior: 'smooth'
        });
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [allTestimonials.length, currentIndex]);

  return (
    <section className="bg-gray-50 py-16 w-full">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">What Our Clients Say</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Don't just take our word for it. Here's what our satisfied customers have to say about our services.
        </p>
        
        <div className="relative max-w-6xl mx-auto mb-12">
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
                  <TestimonialCard
                    quote={testimonial.quote}
                    name={testimonial.name}
                    location={testimonial.location}
                    rating={testimonial.rating}
                    profileImage={testimonial.profileImage}
                    beforeAfterImage={testimonial.beforeAfterImage}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-6">
            {allTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  if (carouselRef.current) {
                    const scrollAmount = carouselRef.current.clientWidth;
                    carouselRef.current.scrollTo({
                      left: scrollAmount * index,
                      behavior: 'smooth'
                    });
                  }
                }}
                className={`w-3 h-3 mx-1 rounded-full ${
                  index === currentIndex ? 'bg-bc-red' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
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
