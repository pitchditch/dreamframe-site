
import React from 'react';
import Layout from '../components/Layout';
import PriceCalculatorForm from '../components/PriceCalculator/PriceCalculatorForm';
import { Helmet } from 'react-helmet-async';
import { Percent } from 'lucide-react';
import { TestimonialCarousel } from '@/components/PriceCalculator/TestimonialCarousel';
import QuestionsForm from '@/components/PriceCalculator/QuestionsForm';

const Calculator = () => {
  // Check if user was referred from the homepage with a postal code
  const hasPostalCode = sessionStorage.getItem('postalCode') || localStorage.getItem('postalCode');

  return (
    <Layout>
      <Helmet>
        <title>Service Price Calculator | BC Pressure Washing</title>
        <meta name="description" content="Get an instant quote for window cleaning, pressure washing, and gutter cleaning services in White Rock, Surrey and Metro Vancouver." />
        <meta name="keywords" content="pressure washing quote, window cleaning estimate, gutter cleaning cost, White Rock, Surrey, BC" />
      </Helmet>
      <div className="container mx-auto py-12 mt-24">
        <div className="text-center mb-12">
          <div className="inline-block bg-yellow-400 text-black px-4 py-2 rounded-full font-bold mb-4 animate-pulse">
            <Percent className="inline-block h-4 w-4 mr-1" />
            SPRING SALE: 20% OFF ALL SERVICES
          </div>
          <h1 className="text-4xl font-bold mb-4">Service Price Calculator</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {hasPostalCode ? 
              "Thanks for entering your postal code! Now complete the form below to get your custom quote." :
              "Get an instant estimate for your service needs. Our calculator provides a customized quote based on your specific requirements."}
            We serve residential and commercial properties in White Rock and surrounding areas.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <PriceCalculatorForm initialStep={hasPostalCode ? "address" : undefined} />
            
            <div className="mt-12">
              <QuestionsForm />
            </div>
          </div>
          
          <div className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-32">
              <TestimonialCarousel />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Calculator;
