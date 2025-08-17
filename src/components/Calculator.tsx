
import React from 'react';
import Layout from '../components/Layout';
import { SmartPriceCalculator } from '../components/SmartPriceCalculator';
import { Helmet } from 'react-helmet';
import { Percent, Zap, MapPin, Calculator as CalcIcon } from 'lucide-react';

const Calculator = () => {
  return (
    <Layout>
      <Helmet>
        <title>Smart Price Calculator | BC Pressure Washing</title>
        <meta name="description" content="Get instant quotes with automatic address lookup and square footage detection. Professional cleaning services in White Rock, Surrey and Metro Vancouver." />
        <meta name="keywords" content="smart quote calculator, address lookup, square footage, pressure washing estimate, White Rock, Surrey, BC" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 mt-20">
            <div className="inline-block bg-yellow-400 text-black px-6 py-3 rounded-full font-bold mb-6 animate-pulse shadow-lg">
              <Percent className="inline-block h-5 w-5 mr-2" />
              PACKAGE DEALS AVAILABLE
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Smart Price Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Revolutionary pricing with automatic address lookup and square footage detection. 
              Get accurate quotes in seconds!
            </p>
            
            {/* Feature highlights */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-md">
                <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-sm font-medium">Address Autocomplete</span>
              </div>
              <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-md">
                <Zap className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-sm font-medium">Instant Square Footage</span>
              </div>
              <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-md">
                <CalcIcon className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-sm font-medium">Dynamic Pricing</span>
              </div>
            </div>
          </div>

          {/* Calculator */}
          <SmartPriceCalculator />
          
          {/* Information Section */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                How Our Smart Calculator Works
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">1. Enter Address</h3>
                  <p className="text-gray-600 text-sm">
                    Start typing your address and select from our intelligent suggestions
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">2. Auto-Detection</h3>
                  <p className="text-gray-600 text-sm">
                    We automatically detect your property size and local pricing zone
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CalcIcon className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">3. Instant Quote</h3>
                  <p className="text-gray-600 text-sm">
                    Get accurate pricing with location-based adjustments and current promotions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Calculator;
