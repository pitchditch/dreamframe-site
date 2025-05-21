
import React from 'react';
import TestimonialCard from './TestimonialCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/use-translation';

interface LocalTestimonialsProps {
  city: string;
  testimonials: Array<{
    name: string;
    location: string;
    quote: string;
    rating: number;
    service?: string;
    profileImage?: string;
    beforeAfterImage?: string;
  }>;
}

const LocalTestimonials = ({ city, testimonials }: LocalTestimonialsProps) => {
  const { t } = useTranslation();
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">{t("What Our")} {city} {t("Customers Say")}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t("Don't just take our word for it. Here's what local homeowners in")} {city} {t("have to say about our services.")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              location={testimonial.location}
              rating={testimonial.rating}
              profileImage={testimonial.profileImage}
              beforeAfterImage={testimonial.beforeAfterImage}
            />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button asChild variant="outline" className="border-bc-red text-bc-red hover:bg-bc-red hover:text-white">
            <Link to="/testimonials">{t("View All Testimonials")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LocalTestimonials;
