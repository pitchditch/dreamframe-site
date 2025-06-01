
import { useState } from 'react';
import { useTranslation } from '@/hooks/use-translation';
import TestimonialsCarousel from '../TestimonialsCarousel';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const TestimonialsSection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <TestimonialsCarousel />
        
        <div className="text-center mt-10">
          <Button asChild className="bg-bc-red hover:bg-red-700">
            <Link to="/compare-prices">{t("Compare Our Prices & Packages")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
