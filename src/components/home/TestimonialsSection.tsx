import { useState } from 'react';
import TestimonialsCarousel from '../TestimonialsCarousel';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
const TestimonialsSection = () => {
  return <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        

        <TestimonialsCarousel />

        <div className="text-center mt-10">
          <Button asChild variant="outline" className="border-bc-red text-bc-red hover:bg-bc-red hover:text-white">
            
          </Button>
        </div>

        <div className="mt-12 bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
          
        </div>
      </div>
    </section>;
};
export default TestimonialsSection;