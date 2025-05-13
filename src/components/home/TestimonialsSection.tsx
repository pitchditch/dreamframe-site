import { useState } from 'react';
import TestimonialsCarousel from '../TestimonialsCarousel';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
const TestimonialsSection = () => {
  return <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about our services.
          </p>
        </div>

        <TestimonialsCarousel />

        <div className="text-center mt-10">
          <Button asChild variant="outline" className="border-bc-red text-bc-red hover:bg-bc-red hover:text-white">
            
          </Button>
        </div>

        <div className="mt-12 bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <img src="/lovable-uploads/9dc6484c-91bb-4ae3-994d-f6cfefbf7c63.png" alt="BC Pressure Washing Red Car" className="w-16 h-16 object-cover rounded-full" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Spotted Our Red Car?</h3>
            <p className="text-center text-gray-600 mb-4">
              If you've seen our distinctive red car on Marine Drive, mention it when you contact us for a 10% discount on your service!
            </p>
            <Button asChild variant="bc-red">
              <Link to="/contact">Claim Your Discount Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default TestimonialsSection;