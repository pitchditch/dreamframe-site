
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '../components/Layout';
import { trackPageView } from '../utils/analytics';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import CalculatorForm from '../components/CalculatorForm';

const Calculator = () => {
  useEffect(() => {
    trackPageView('/calculator', 'Price Calculator - BC Pressure Washing');
  }, []);

  return (
    <Layout title="Price Calculator | BC Pressure Washing" description="Get an instant quote for your pressure washing and window cleaning services in Surrey, White Rock, and the Lower Mainland.">
      <Helmet>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Price Calculator</h1>
            <p className="text-lg text-gray-600">
              Get an instant price quote for your window cleaning, gutter cleaning, or pressure washing service.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <CalculatorForm />
            </div>
            
            <div className="lg:col-span-5 order-1 lg:order-2">
              {/* Full-size before/after slider */}
              <div className="bg-white p-6 rounded-lg shadow-lg mb-6 w-full">
                <h3 className="text-xl font-semibold mb-4">See The Difference</h3>
                <BeforeAfterSlider
                  beforeImage="/lovable-uploads/760a47b6-0ed1-4cac-bcb0-b915374332a7.png"
                  afterImage="/lovable-uploads/47d43541-d56d-4183-bb3a-ac2730befaae.png"
                  height="500px"
                  width="100%"
                />
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg w-full">
                <h3 className="text-xl font-semibold mb-4">Window Cleaning Results</h3>
                <BeforeAfterSlider
                  beforeImage="/lovable-uploads/5a861af8-fd16-402e-bb94-198b855dfb45.png"
                  afterImage="/lovable-uploads/823da2c6-a4b1-4d58-b80c-f059628dbd2b.png"
                  height="500px"
                  width="100%"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Calculator;
