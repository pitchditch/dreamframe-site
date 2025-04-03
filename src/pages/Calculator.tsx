
import React from 'react';
import Layout from '../components/Layout';
import PriceCalculatorForm from '../components/PriceCalculator/PriceCalculatorForm';
import { Helmet } from 'react-helmet';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const Calculator = () => {
  return (
    <Layout>
      <Helmet>
        <title>Service Price Calculator | BC Pressure Washing</title>
        <meta name="description" content="Get an instant quote for window cleaning, pressure washing, and gutter cleaning services in White Rock, Surrey and Metro Vancouver." />
        <meta name="keywords" content="pressure washing quote, window cleaning estimate, gutter cleaning cost, White Rock, Surrey, BC" />
      </Helmet>
      
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Service Price Calculator</h1>
        
        <div className="max-w-4xl mx-auto mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-gray-50 border border-gray-200">
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-4">Why Choose Our Calculator</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Get instant pricing based on your specific requirements</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Transparent pricing with no hidden fees</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Special package discounts automatically applied</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>No obligation quotes - compare and decide</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-50 border border-gray-200">
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-4">We Serve All Property Types</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg text-center">
                  <span className="text-2xl">🏠</span>
                  <p className="font-medium mt-2">Residential</p>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <span className="text-2xl">🏢</span>
                  <p className="font-medium mt-2">Commercial</p>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <span className="text-2xl">🏘️</span>
                  <p className="font-medium mt-2">Multi-Family</p>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <span className="text-2xl">🏗️</span>
                  <p className="font-medium mt-2">New Construction</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
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
