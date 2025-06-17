
import { useState } from 'react';
import { useTranslation } from '@/hooks/use-translation';
import TestimonialsCarousel from '../TestimonialsCarousel';

const TestimonialsSection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <TestimonialsCarousel />
      </div>
    </section>
  );
};

export default TestimonialsSection;
