
import { useEffect, useState } from 'react';
import TestimonialCard from '../TestimonialCard';
import { testimonials } from '@/data/testimonials';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Define a local testimonial interface if it's not exported from the data file
interface Testimonial {
  id: string;
  name: string;
  quote?: string;
  location?: string;
  rating: number;
  service?: string;
  date?: string;
  beforeAfterImage?: string;
}

// Define an extended testimonial type that includes the profileImage
interface TestimonialWithProfile extends Testimonial {
  profileImage?: string;
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

const TestimonialsSection = () => {
  const [featuredTestimonials, setFeaturedTestimonials] = useState<TestimonialWithProfile[]>([]);

  // Assign profile images to testimonials
  useEffect(() => {
    // Get testimonials with before/after images for better display
    const testimonialsWithBeforeAfter = testimonials.filter(t => t.beforeAfterImage).slice(0, 3);
    
    // If we don't have enough with before/after images, add some regular ones
    const allFeatured = testimonialsWithBeforeAfter.length === 3 
      ? testimonialsWithBeforeAfter 
      : [...testimonialsWithBeforeAfter, ...testimonials.filter(t => !t.beforeAfterImage).slice(0, 3 - testimonialsWithBeforeAfter.length)];
    
    const testimonialsWithImages = allFeatured.map((testimonial, index) => {
      const gender = index === 0 || index === 1 ? 'female' : 'male';
      const imageIndex = gender === 'female' ? index % 6 : 4 + index % 6;
      return {
        ...testimonial,
        profileImage: profileImages[imageIndex]
      };
    });
    setFeaturedTestimonials(testimonialsWithImages);
  }, []);

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">What Our Clients Say</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Don't just take our word for it. Here's what our satisfied customers have to say about our services.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredTestimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              quote={testimonial.quote || ""}
              name={testimonial.name}
              location={testimonial.location || ""}
              rating={testimonial.rating}
              profileImage={testimonial.profileImage}
              beforeAfterImage={testimonial.beforeAfterImage}
            />
          ))}
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

export default TestimonialsSection;
