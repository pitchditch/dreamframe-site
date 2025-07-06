
import React from 'react';
import { Star, Quote, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const featuredTestimonials = [
  {
    id: 1,
    name: "Jennifer Martinez",
    location: "White Rock",
    rating: 5,
    date: "2 weeks ago",
    service: "House Washing",
    quote: "BC Pressure Washing transformed our home! Living by the ocean, we get a lot of salt buildup, but they made our siding look brand new. Jayden's team was professional, punctual, and the results exceeded our expectations.",
    image: "/lovable-uploads/9ab5a05b-8db4-45b1-b31f-73f16bbc49a0.png",
    beforeAfter: "/lovable-uploads/5608bf56-7f0e-4f7f-9bb0-5ba81b9d267e.png",
    verified: true
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Surrey",
    rating: 5,
    date: "1 month ago",
    service: "Driveway Cleaning",
    quote: "Amazing results on our oil-stained driveway! I thought we'd need to replace it, but BC Pressure Washing made it look like new. Great value and excellent customer service.",
    image: "/lovable-uploads/9ab5a05b-8db4-45b1-b31f-73f16bbc49a0.png",
    beforeAfter: "/lovable-uploads/06e9bd14-b601-4e6f-bcd9-01217b067c47.png",
    verified: true
  },
  {
    id: 3,
    name: "Sarah Thompson",
    location: "Langley",
    rating: 5,
    date: "3 weeks ago",
    service: "Roof Cleaning",
    quote: "Professional, reliable, and fantastic results! Our moss-covered roof looks incredible now. Jayden explained the entire process and delivered exactly what he promised.",
    image: "/lovable-uploads/9ab5a05b-8db4-45b1-b31f-73f16bbc49a0.png",
    beforeAfter: "/lovable-uploads/e57e6764-cc42-4943-8a89-4d56f9c96469.png",
    verified: true
  }
];

const EnhancedTestimonialsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header with Overall Rating */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-yellow-50 px-6 py-3 rounded-full mb-4">
            <div className="flex items-center mr-4">
              {[1,2,3,4,5].map((star) => (
                <Star key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <div className="text-left">
              <div className="font-bold text-lg">4.9/5 Stars</div>
              <div className="text-sm text-gray-600">Based on 150+ Reviews</div>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Real reviews from satisfied customers across Metro Vancouver
          </p>
        </div>

        {/* Featured Testimonials */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {featuredTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="relative overflow-hidden hover:shadow-xl transition-all duration-300">
              {/* Verified Badge */}
              {testimonial.verified && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium z-10">
                  ✓ Verified
                </div>
              )}
              
              {/* Before/After Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={testimonial.beforeAfter} 
                  alt={`${testimonial.service} results`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="bg-bc-red px-2 py-1 rounded text-sm font-medium mb-1">
                    {testimonial.service}
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex mr-3">
                    {[1,2,3,4,5].map((star) => (
                      <Star 
                        key={star} 
                        className={`w-4 h-4 ${star <= testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {testimonial.date}
                  </div>
                </div>

                {/* Quote */}
                <div className="relative mb-4">
                  <Quote className="w-6 h-6 text-bc-red/20 absolute -top-2 -left-1" />
                  <p className="text-gray-700 italic pl-5 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </div>

                {/* Customer Info */}
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border-2 border-gray-200 mr-3"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-3 h-3 mr-1" />
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="bg-gray-50 rounded-lg p-8 mb-8">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-bc-red mb-2">150+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-bc-red mb-2">4.9★</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-bc-red mb-2">100%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-bc-red mb-2">5+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button asChild size="lg" variant="bc-red" className="mr-4">
            <Link to="/calculator">Get Your Free Quote</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/testimonials">Read All Reviews</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EnhancedTestimonialsSection;
