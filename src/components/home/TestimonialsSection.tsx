
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
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("What Our Customers Say")}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t("Real Feedback from Satisfied Clients")}
          </p>
        </div>
        
        <TestimonialsCarousel />
        
        <div className="text-center mt-10 flex flex-col md:flex-row justify-center gap-4">
          <Button asChild variant="outline" className="border-bc-red text-bc-red hover:bg-bc-red hover:text-white">
            <Link to="/testimonials">{t("View All Testimonials")}</Link>
          </Button>
          <Button asChild className="bg-bc-red hover:bg-red-700">
            <Link to="/compare-prices">{t("Compare Our Prices & Packages")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
