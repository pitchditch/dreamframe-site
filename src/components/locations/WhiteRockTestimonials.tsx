
import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    name: "Michael T.",
    location: "Marine Drive, White Rock",
    rating: 5,
    text: "BC Pressure Washing did an amazing job on our oceanfront home. The salt spray had done a number on our windows and siding, but everything looks brand new now. Highly recommend!",
    service: "House Washing & Window Cleaning"
  },
  {
    name: "Sarah L.",
    location: "Five Corners, White Rock",
    rating: 5,
    text: "I spotted their red car around town and decided to give them a call. Got 10% off and they did an excellent job cleaning our roof and gutters. Very professional team!",
    service: "Roof & Gutter Cleaning"
  },
  {
    name: "David W.",
    location: "Semiahmoo Area, White Rock",
    rating: 5,
    text: "Our driveway was covered in moss and algae. BC Pressure Washing completely transformed it - looks better than when we moved in! Fast service and reasonable prices.",
    service: "Driveway Cleaning"
  }
];

const WhiteRockTestimonials = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map((testimonial, index) => (
        <Card key={index} className="shadow-md hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
              </div>
              <div className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                {testimonial.service}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default WhiteRockTestimonials;
