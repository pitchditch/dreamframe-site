
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

const profileImages = [
  "/lovable-uploads/b69bdd37-7a37-43f0-a192-58ba9655e94f.png", 
  "/lovable-uploads/8c769aeb-d888-49ed-a370-c4d0945e1eb7.png", 
  "/lovable-uploads/c69aec79-5ead-4023-bb2f-2137e27b7d02.png", 
  "/lovable-uploads/59401248-58ee-4944-b37e-410cc26c471d.png", 
  "/lovable-uploads/f1451ac8-7689-4f79-9c7e-c53342257df3.png", 
  "/lovable-uploads/5f513861-3c9c-4e8c-a0f1-254574396881.png", 
  "/lovable-uploads/84d7a106-6be2-4a23-a9dd-def86b85bd3a.png", 
  "/lovable-uploads/0fe6a9ec-690a-4ac5-a8b6-efab2e58937f.png", 
  "/lovable-uploads/80888870-b48a-405b-ac8e-ad08f4fe5afc.png", 
  "/lovable-uploads/497a46c4-728e-426b-bd23-fc5c5b9869be.png", 
  "/lovable-uploads/16c023d9-6b16-4f03-a3b2-e9f188599e2e.png", 
  "/lovable-uploads/5d129c1e-f5d7-4fa6-a1f1-78e9ba4b05c5.png"
];

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allTestimonials, setAllTestimonials] = useState<TestimonialWithProfile[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Assign profile images to testimonials
  useEffect(() => {
    const testimonialsWithImages = testimonials.map((testimonial, index) => {
      const imageIndex = index % profileImages.length;
      return {
        ...testimonial,
        profileImage: profileImages[imageIndex]
      };
    });
    
    setAllTestimonials(testimonialsWithImages);
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
                <div className="max-w-3xl mx-auto">
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
