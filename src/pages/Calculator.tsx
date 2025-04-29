
import React from 'react';
import Layout from '../components/Layout';
import PriceCalculatorForm from '../components/PriceCalculator/PriceCalculatorForm';
import { Helmet } from 'react-helmet';
import { Percent } from 'lucide-react';

const Calculator = () => {
  return (
    <Layout>
      <Helmet>
        <title>Service Price Calculator | BC Pressure Washing</title>
        <meta name="description" content="Get an instant quote for window cleaning, pressure washing, and gutter cleaning services in White Rock, Surrey and Metro Vancouver." />
        <meta name="keywords" content="pressure washing quote, window cleaning estimate, gutter cleaning cost, White Rock, Surrey, BC" />
      </Helmet>
      <div className="container mx-auto py-12">
        <div className="text-center mb-8">
          <div className="inline-block bg-yellow-400 text-black px-4 py-2 rounded-full font-bold mb-4 animate-pulse">
            <Percent className="inline-block h-4 w-4 mr-1" />
            SPRING SALE: 20% OFF ALL SERVICES
          </div>
          <h1 className="text-4xl font-bold mb-4">Service Price Calculator</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get an instant estimate for your service needs. Our calculator provides a customized quote based on your specific requirements.
            We serve residential and commercial properties in White Rock and surrounding areas.
          </p>
        </div>
        <div className="flex flex-col items-center mb-6">
          <img 
            src="/lovable-uploads/c5219e28-4a09-4d72-bef9-e96193360fa6.png" 
            alt="Jayden Fisher - Owner" 
            className="w-32 h-32 rounded-full object-cover mb-2 border-2 border-bc-red"
          />
          <span className="font-semibold text-lg">Jayden Fisher</span>
          <span className="text-gray-600">Owner & Lead Technician</span>
        </div>
        <PriceCalculatorForm />
      </div>
    </Layout>
  );
};

export default Calculator;
