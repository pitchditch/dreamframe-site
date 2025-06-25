
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Shield, Clock, Users } from 'lucide-react';

const TrustSidebar = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "James Thompson",
      location: "White Rock",
      text: "Great service in White Rock! Professional and thorough.",
      rating: 5
    },
    {
      name: "Michael Johnson", 
      location: "Surrey",
      text: "Best window cleaning service we've used. Highly recommend!",
      rating: 5
    },
    {
      name: "Sarah Mitchell",
      location: "South Surrey", 
      text: "Friendly team, fair prices, excellent results.",
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Testimonial Carousel */}
      <Card className="border-gray-200">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="flex justify-center mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-700 italic mb-4">
              "{testimonials[currentTestimonial].text}"
            </p>
            <div className="text-sm">
              <div className="font-semibold text-gray-900">
                {testimonials[currentTestimonial].name}
              </div>
              <div className="text-gray-500">
                {testimonials[currentTestimonial].location}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trust Badges */}
      <div className="space-y-4">
        <div className="flex items-center bg-green-50 p-4 rounded-lg">
          <Shield className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" />
          <div>
            <div className="font-semibold text-green-800">Fully Insured</div>
            <div className="text-sm text-green-600">Licensed & bonded</div>
          </div>
        </div>

        <div className="flex items-center bg-blue-50 p-4 rounded-lg">
          <Clock className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" />
          <div>
            <div className="font-semibold text-blue-800">Same-Day Service</div>
            <div className="text-sm text-blue-600">Often available</div>
          </div>
        </div>

        <div className="flex items-center bg-purple-50 p-4 rounded-lg">
          <Users className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0" />
          <div>
            <div className="font-semibold text-purple-800">500+ Happy Customers</div>
            <div className="text-sm text-purple-600">5-star Google rated</div>
          </div>
        </div>
      </div>

      {/* 100% Satisfaction Guarantee */}
      <Card className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <CardContent className="p-6 text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="w-8 h-8 text-gray-900" />
            </div>
            <h3 className="text-xl font-bold mb-2">100% SATISFACTION GUARANTEED</h3>
            <p className="text-gray-300 text-sm">
              We stand behind our work – or your money back!
            </p>
          </div>
          <div className="text-sm text-gray-400 border-t border-gray-700 pt-4">
            Proudly serving White Rock & Surrey
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrustSidebar;
