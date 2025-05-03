
import React from 'react';
import { Shield, Construction, Award, Star } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import TestimonialCard from '../TestimonialCard';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "../ui/carousel";
import { testimonials } from '@/data/testimonials';

const TrustSection: React.FC = () => {
  // Filter testimonials related to window cleaning for post-construction
  const windowCleaningTestimonials = testimonials
    .filter(t => t.service === 'window-cleaning')
    .slice(0, 3);

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Trusted By Builders & Homeowners</h2>
        
        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="flex items-center bg-white px-6 py-3 rounded-full shadow-sm">
            <Shield className="text-bc-red mr-2" size={24} />
            <span className="font-medium">Fully Insured</span>
          </div>
          <div className="flex items-center bg-white px-6 py-3 rounded-full shadow-sm">
            <Construction className="text-bc-red mr-2" size={24} />
            <span className="font-medium">Builder Friendly</span>
          </div>
          <div className="flex items-center bg-white px-6 py-3 rounded-full shadow-sm">
            <Star className="text-yellow-400 mr-2" size={24} />
            <span className="font-medium">5-Star Rated Service</span>
          </div>
          <div className="flex items-center bg-white px-6 py-3 rounded-full shadow-sm">
            <Award className="text-bc-red mr-2" size={24} />
            <span className="font-medium">100% Satisfaction Guarantee</span>
          </div>
        </div>
        
        {/* Testimonials Carousel */}
        <h3 className="text-2xl font-semibold mb-6">What Our Clients Say</h3>
        <div className="max-w-3xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              {windowCleaningTestimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <TestimonialCard
                      quote={testimonial.quote}
                      name={testimonial.name}
                      location={testimonial.location}
                      rating={testimonial.rating}
                      beforeAfterImage={testimonial.beforeAfterImage}
                      profileImage={testimonial.profileImage}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
