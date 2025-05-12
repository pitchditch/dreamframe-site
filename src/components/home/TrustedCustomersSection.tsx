
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { testimonials } from '@/data/testimonials';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from 'lucide-react';

const TrustedCustomersSection = () => {
  // Filter testimonials to only show the first 6
  const displayedTestimonials = testimonials.slice(0, 6);
  
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Trusted by Local Homeowners</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
            See why so many homeowners in White Rock, Surrey, and across Metro Vancouver choose us for all their exterior cleaning needs.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              {displayedTestimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-2">
                    <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
                      <div className="flex items-center mb-4">
                        <Avatar className="h-10 w-10 mr-3">
                          {testimonial.profileImage ? (
                            <AvatarImage src={testimonial.profileImage} alt={testimonial.name} />
                          ) : null}
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium text-gray-800">{testimonial.name}</h3>
                          <p className="text-sm text-gray-500">{testimonial.location}</p>
                        </div>
                      </div>
                      
                      <div className="flex mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      
                      <p className="text-gray-600 italic text-sm flex-grow">
                        "{testimonial.quote.length > 120 
                          ? testimonial.quote.substring(0, 120) + '...' 
                          : testimonial.quote}"
                      </p>
                      
                      {testimonial.beforeAfterImage && (
                        <div className="mt-4 h-40 overflow-hidden rounded-md">
                          <img 
                            src={testimonial.beforeAfterImage} 
                            alt="Before and after cleaning" 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      )}
                    </div>
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

export default TrustedCustomersSection;
