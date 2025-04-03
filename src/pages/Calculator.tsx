
import React from 'react';
import Layout from '../components/Layout';
import PriceCalculatorForm from '../components/PriceCalculator/PriceCalculatorForm';
import { Helmet } from 'react-helmet';
import { Flame } from 'lucide-react';

const Calculator = () => {
  // Check if a special package was selected
  const hasSelectedPackage = !!sessionStorage.getItem('selectedPackage');

  return (
    <Layout>
      <Helmet>
        <title>Service Price Calculator | BC Pressure Washing</title>
        <meta name="description" content="Get an instant quote for window cleaning, pressure washing, and gutter cleaning services in White Rock, Surrey and Metro Vancouver." />
        <meta name="keywords" content="pressure washing quote, window cleaning estimate, gutter cleaning cost, White Rock, Surrey, BC" />
      </Helmet>
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Service Price Calculator</h1>
        
        {hasSelectedPackage && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
            <div className="flex items-center mb-2">
              <Flame className="text-orange-500 mr-2" size={20} />
              <h2 className="text-xl font-bold text-orange-700">Spring Special Package Selected!</h2>
            </div>
            <p className="text-gray-700">
              Your selected package has been applied with a 20% discount. Complete the form below to finalize your booking.
            </p>
          </div>
        )}
        
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Get an instant estimate for your service needs. Our calculator provides a customized quote based on your specific requirements.
          We serve residential and commercial properties in White Rock and surrounding areas.
        </p>
        <PriceCalculatorForm />
      </div>
    </Layout>
  );
};

export default Calculator;
