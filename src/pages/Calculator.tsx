
import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { SmartPriceCalculator } from '../components/SmartPriceCalculator';
import { Helmet } from 'react-helmet-async';
import { Percent, Shield, Star, Clock, Users, CheckCircle } from 'lucide-react';
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
        <title>Smart Quote Calculator - Instant Pricing | BC Pressure Washing</title>
        <meta name="description" content="Get instant quotes with automatic address lookup and square footage detection. Professional cleaning services in White Rock, Surrey and Metro Vancouver." />
        <meta name="keywords" content="smart quote calculator, address lookup, square footage, pressure washing estimate, White Rock, Surrey, BC" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-yellow-400 text-black px-6 py-3 rounded-full font-bold mb-6 animate-pulse shadow-lg">
              <Percent className="inline-block h-5 w-5 mr-2" />
              SPRING SALE: 20% OFF ALL SERVICES
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Smart Quote Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Revolutionary pricing with automatic address lookup and square footage detection. 
              Get accurate quotes in seconds!
            </p>
          </div>

          {/* Trust Badges - Full Width Above Calculator */}
          <div className="mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <div className="flex items-center bg-green-50 p-3 md:p-4 rounded-lg border border-green-200">
                  <Shield className="w-5 h-5 md:w-6 md:h-6 text-green-600 mr-2 md:mr-3 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="font-semibold text-green-800 text-sm md:text-base leading-tight">Fully Insured</div>
                    <div className="text-xs md:text-sm text-green-600 leading-tight">Licensed & bonded</div>
                  </div>
                </div>

                <div className="flex items-center bg-blue-50 p-3 md:p-4 rounded-lg border border-blue-200">
                  <Clock className="w-5 h-5 md:w-6 md:h-6 text-blue-600 mr-2 md:mr-3 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="font-semibold text-blue-800 text-sm md:text-base leading-tight">Same-Day Service</div>
                    <div className="text-xs md:text-sm text-blue-600 leading-tight">Often available</div>
                  </div>
                </div>

                <div className="flex items-center bg-purple-50 p-3 md:p-4 rounded-lg border border-purple-200">
                  <Users className="w-5 h-5 md:w-6 md:h-6 text-purple-600 mr-2 md:mr-3 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="font-semibold text-purple-800 text-sm md:text-base leading-tight">500+ Happy Customers</div>
                    <div className="text-xs md:text-sm text-purple-600 leading-tight">5-star Google rated</div>
                  </div>
                </div>

                <div className="flex items-center bg-yellow-50 p-3 md:p-4 rounded-lg border border-yellow-200">
                  <Star className="w-5 h-5 md:w-6 md:h-6 text-yellow-600 mr-2 md:mr-3 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="font-semibold text-yellow-800 text-sm md:text-base leading-tight">Local & Trusted</div>
                    <div className="text-xs md:text-sm text-yellow-600 leading-tight">White Rock & Surrey</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Layout */}
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-12 items-start">
              {/* Form Column (3/4 width on desktop) */}
              <div className="lg:col-span-3">
                <SmartPriceCalculator />
              </div>
              
              {/* Trust Elements Sidebar (1/4 width on desktop) */}
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-8 space-y-8">
                  {/* Testimonial Carousel */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">What Our Customers Say</h3>
                    <TestimonialCarousel />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 100% Satisfaction Guarantee */}
          <div className="mt-20 relative overflow-hidden rounded-xl shadow-2xl">
            <div className="absolute inset-0">
              <img 
                src="/lovable-uploads/3508b357-c029-4365-bb7c-e8cd605080a5.png" 
                alt="Beautiful clean house exterior" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
            </div>
            <div className="relative p-12 text-white">
              <h3 className="text-4xl font-bold mb-6">100% Satisfaction Guarantee</h3>
              <p className="text-xl mb-8 max-w-3xl leading-relaxed">
                Not happy? We'll return at no cost to fix it.
              </p>
              <div className="flex items-center">
                <img
                  src="/lovable-uploads/069112d9-e61f-4def-94ed-7f1c34172bfd.png"
                  alt="Jayden Fisher - Owner"
                  className="w-20 h-20 rounded-full border-4 border-white mr-6"
                />
                <div>
                  <p className="font-bold text-xl">Jayden Fisher</p>
                  <p className="text-lg">Owner, BC Pressure Washing</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Questions Form */}
          <div className="mt-16">
            <QuestionsForm />
          </div>

          {/* Bottom Section */}
          <div className="mt-20 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Ready for a Clean Home?
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We're a local business serving White Rock and Surrey. Your satisfaction is guaranteed, 
                and we offer free quotes with no obligations.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-lg text-gray-500">
                <span className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                  Free estimates
                </span>
                <span className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                  No obligations
                </span>
                <span className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                  Local & trusted
                </span>
                <span className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                  Same-day availability
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Calculator;
