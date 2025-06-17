
import React from 'react';
import { Star } from 'lucide-react';

const OptimizedTestimonials = () => {
  const testimonials = [
    {
      name: "Michael Johnson",
      location: "Surrey, BC",
      review: "The pressure washing service was incredible and results speak for themselves.",
      rating: 5,
      image: "/lovable-uploads/069112d9-e61f-4def-94ed-7f1c34172bfd.png"
    },
    {
      name: "Elizabeth Turner", 
      location: "Abbotsford, BC",
      review: "BC Pressure Washing saved me $4,000 in roof repairs with their professional cleaning!",
      rating: 5,
      image: "/lovable-uploads/069112d9-e61f-4def-94ed-7f1c34172bfd.png"
    },
    {
      name: "Vikram Patel",
      location: "White Rock, BC", 
      review: "They were quick, careful, and did a great job removing moss and debris.",
      rating: 5,
      image: "/lovable-uploads/069112d9-e61f-4def-94ed-7f1c34172bfd.png"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-xl text-gray-600 mb-6">
            Don't just take our word for it
          </p>
          <div className="inline-flex items-center bg-yellow-50 px-4 py-2 rounded-full">
            <span className="text-yellow-800 font-medium">🏆 Trusted by 500+ Homeowners in BC</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.review}"</p>
              <div className="flex items-center">
                <img 
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OptimizedTestimonials;
