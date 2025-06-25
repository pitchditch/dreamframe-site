
import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah M.",
    rating: 5,
    text: "Amazing service! My windows have never been cleaner.",
    location: "White Rock"
  },
  {
    name: "Mike T.",
    rating: 5,
    text: "Professional and efficient. Highly recommend!",
    location: "Surrey"
  },
  {
    name: "Jennifer L.",
    rating: 5,
    text: "Great value and excellent results. Will use again.",
    location: "Vancouver"
  }
];

const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const current = testimonials[currentIndex];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center mb-2">
        {[...Array(current.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-gray-700 text-sm mb-2">"{current.text}"</p>
      <div className="text-xs text-gray-500">
        <span className="font-semibold">{current.name}</span> - {current.location}
      </div>
      <div className="flex justify-center mt-3 space-x-1">
        {testimonials.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
