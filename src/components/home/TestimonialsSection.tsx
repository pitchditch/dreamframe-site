
import { useEffect, useState } from 'react';
import TestimonialCard from '../TestimonialCard';
import { testimonials } from '@/data/testimonials';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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
  const [featuredTestimonials, setFeaturedTestimonials] = useState(testimonials.slice(0, 3));

  // Assign profile images to testimonials
  useEffect(() => {
    const testimonialsWithImages = testimonials.slice(0, 3).map((testimonial, index) => {
      const gender = index === 0 || index === 1 ? 'female' : 'male';
      const imageIndex = gender === 'female' ? index % 6 : 4 + (index % 6);
      return {
        ...testimonial,
        profileImage: profileImages[imageIndex]
      };
    });
    
    setFeaturedTestimonials(testimonialsWithImages);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our customers have to say about our services.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {featuredTestimonials.map((testimonial, index) => (
            <div key={index} className="animate-on-scroll" style={{ animationDelay: `${index * 150}ms` }}>
              <TestimonialCard 
                quote={testimonial.quote} 
                name={testimonial.name} 
                location={testimonial.location} 
                rating={testimonial.rating}
                profileImage={testimonial.profileImage}
                beforeAfterImage={testimonial.beforeAfterImage}
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link to="/why-us">View More Testimonials</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
