import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import StreamlinedCalculatorForm from '../components/StreamlinedCalculator/StreamlinedCalculatorForm';
import { Helmet } from 'react-helmet-async';
import { Percent } from 'lucide-react';
import { TestimonialCarousel } from '@/components/TestimonialCarousel';
import QuestionsForm from '@/components/PriceCalculator/QuestionsForm';

const Calculator = () => {
  // Check if user was referred with form data
  const savedPostalCode = localStorage.getItem('postalCode') || localStorage.getItem('calculatorPostalCode') || sessionStorage.getItem('postalCode');
  const savedHouseSize = localStorage.getItem('calculatorHouseSize');
  
  useEffect(() => {
    // No localStorage clearing here
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Get Your Free Quote - 3 Simple Steps | BC Pressure Washing</title>
        <meta name="description" content="Get an instant quote for professional cleaning services in White Rock & Surrey. Simple 3-step form - address, property size, service type." />
        <meta name="keywords" content="free quote, pressure washing estimate, window cleaning quote, White Rock, Surrey, BC" />
      </Helmet>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block bg-yellow-400 text-black px-4 py-2 rounded-full font-bold mb-4 animate-pulse">
              <Percent className="inline-block h-4 w-4 mr-1" />
              SPRING SALE: 20% OFF ALL SERVICES
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get an Instant Quote
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional exterior cleaning services in White Rock & Surrey. 
              Quick quote in just 3 simple steps.
            </p>
          </div>

          {/* Main Layout */}
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              {/* Form Column (2/3 width on desktop) */}
              <div className="lg:col-span-2">
                <StreamlinedCalculatorForm />
              </div>
              
              {/* Trust Elements Sidebar (1/3 width on desktop) */}
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-8">
                  <TestimonialCarousel />
                </div>
              </div>
            </div>
          </div>

          {/* 100% Satisfaction Guarantee - Keep existing */}
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
          
          {/* Keep existing Questions Form */}
          <div className="mt-12">
            <QuestionsForm />
          </div>

          {/* Bottom Section */}
          <div className="mt-16 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Ready for a Clean Home?
              </h2>
              <p className="text-gray-600 mb-6">
                We're a local business serving White Rock and Surrey. Your satisfaction is guaranteed, 
                and we offer free quotes with no obligations.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                <span>• Free estimates</span>
                <span>• No obligations</span>
                <span>• Local & trusted</span>
                <span>• Same-day availability</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Calculator;
