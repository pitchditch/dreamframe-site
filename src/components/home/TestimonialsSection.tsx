import { useEffect, useState } from 'react';
import TestimonialCard from '../TestimonialCard';
import { testimonials, Testimonial } from '@/data/testimonials';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Define an extended testimonial type that includes the profileImage
interface TestimonialWithProfile extends Testimonial {
  profileImage?: string;
}
const profileImages = ["/lovable-uploads/b69bdd37-7a37-43f0-a192-58ba9655e94f.png", "/lovable-uploads/8c769aeb-d888-49ed-a370-c4d0945e1eb7.png", "/lovable-uploads/c69aec79-5ead-4023-bb2f-2137e27b7d02.png", "/lovable-uploads/59401248-58ee-4944-b37e-410cc26c471d.png", "/lovable-uploads/f1451ac8-7689-4f79-9c7e-c53342257df3.png", "/lovable-uploads/5f513861-3c9c-4e8c-a0f1-254574396881.png", "/lovable-uploads/84d7a106-6be2-4a23-a9dd-def86b85bd3a.png", "/lovable-uploads/0fe6a9ec-690a-4ac5-a8b6-efab2e58937f.png", "/lovable-uploads/80888870-b48a-405b-ac8e-ad08f4fe5afc.png", "/lovable-uploads/497a46c4-728e-426b-bd23-fc5c5b9869be.png", "/lovable-uploads/16c023d9-6b16-4f03-a3b2-e9f188599e2e.png", "/lovable-uploads/5d129c1e-f5d7-4fa6-a1f1-78e9ba4b05c5.png"];
const TestimonialsSection = () => {
  const [featuredTestimonials, setFeaturedTestimonials] = useState<TestimonialWithProfile[]>([]);

  // Assign profile images to testimonials
  useEffect(() => {
    const testimonialsWithImages = testimonials.slice(0, 3).map((testimonial, index) => {
      const gender = index === 0 || index === 1 ? 'female' : 'male';
      const imageIndex = gender === 'female' ? index % 6 : 4 + index % 6;
      return {
        ...testimonial,
        profileImage: profileImages[imageIndex]
      };
    });
    setFeaturedTestimonials(testimonialsWithImages);
  }, []);
  return;
};
export default TestimonialsSection;