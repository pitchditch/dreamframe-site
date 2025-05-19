
import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import PriceCalculatorForm from '../components/PriceCalculator/PriceCalculatorForm';
import { Helmet } from 'react-helmet-async';
import { Percent } from 'lucide-react';
import { TestimonialCarousel } from '@/components/TestimonialCarousel';
import QuestionsForm from '@/components/PriceCalculator/QuestionsForm';

const Calculator = () => {
  // Check if user was referred with form data
  const savedPostalCode = localStorage.getItem('calculatorPostalCode');
  const savedHouseSize = localStorage.getItem('calculatorHouseSize');
  
  // Determine initial step based on available data
  const determineInitialStep = () => {
    if (savedPostalCode) {
      return "address";
    }
    return undefined;
  };
  
  // Clean up localStorage after retrieving the values
  useEffect(() => {
    // We don't clear localStorage here to allow for page refreshes
    // The form component will handle this after successful submission
  }, []);

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
            Quick quote for your exterior cleaning needs in White Rock & Surrey.
          </p>
        </div>
        
        <div className="relative flex">
          <div className="w-full lg:w-3/4 pr-0 lg:pr-8">
            <PriceCalculatorForm 
              initialStep={determineInitialStep()} 
              prefillData={{
                postalCode: savedPostalCode || '',
                houseSize: savedHouseSize || 'medium'
              }}
            />
            
            {/* 100% Satisfaction Guarantee - Now with house background */}
            <div className="mt-12 relative overflow-hidden rounded-xl shadow-lg">
              <div className="absolute inset-0">
                <img 
                  src="/lovable-uploads/3508b357-c029-4365-bb7c-e8cd605080a5.png" 
                  alt="Beautiful clean house exterior" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
              </div>
              <div className="relative p-10 text-white">
                <h3 className="text-3xl font-bold mb-4">100% Satisfaction Guarantee</h3>
                <p className="text-lg mb-6">
                  We stand behind our work with a full satisfaction guarantee. If you're not completely satisfied with our service, we'll return to address any issues at no additional cost.
                </p>
                <div className="flex items-center">
                  <img
                    src="/lovable-uploads/069112d9-e61f-4def-94ed-7f1c34172bfd.png"
                    alt="Jayden Fisher - Owner"
                    className="w-16 h-16 rounded-full border-2 border-white mr-4"
                  />
                  <div>
                    <p className="font-bold">Jayden Fisher</p>
                    <p>Owner, BC Pressure Washing</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <QuestionsForm />
            </div>
          </div>
          
          <div className="hidden lg:block w-1/4 absolute top-0 right-0 bottom-0">
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
