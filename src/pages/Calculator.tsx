
import React from 'react';
import Layout from '../components/Layout';
import { SmartPriceCalculator } from '../components/SmartPriceCalculator';
import { Helmet } from 'react-helmet-async';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import { Shield, Clock, Users, Star } from 'lucide-react';

const Calculator: React.FC = () => {
  return (
    <Layout>
      <Helmet>
        <title>Smart Price Calculator - Instant Quotes | BC Pressure Washing</title>
        <meta name="description" content="Get instant quotes with automatic address lookup and square footage detection. Professional cleaning services in White Rock, Surrey and Metro Vancouver." />
        <meta name="keywords" content="smart quote calculator, address lookup, square footage, pressure washing estimate, White Rock, Surrey, BC" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Smart Price Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get instant quotes with automatic address lookup and square footage detection
            </p>
          </div>

          {/* Main Layout */}
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8 items-start">
              {/* Calculator Column (3/4 width on desktop) */}
              <div className="lg:col-span-3">
                <SmartPriceCalculator />
              </div>
              
              {/* Trust Elements Sidebar (1/4 width on desktop) */}
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-8 space-y-6">
                  {/* Testimonial Carousel */}
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Customer Reviews</h3>
                    <TestimonialCarousel />
                  </div>

                  {/* Trust Badges */}
                  <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Why Choose Us?</h3>
                    
                    <div className="flex items-center p-3 bg-green-50 rounded-lg">
                      <Shield className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-green-800 text-sm">Fully Insured</div>
                        <div className="text-xs text-green-600">Licensed & bonded</div>
                      </div>
                    </div>

                    <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <Clock className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-blue-800 text-sm">Same-Day Service</div>
                        <div className="text-xs text-blue-600">Often available</div>
                      </div>
                    </div>

                    <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                      <Users className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-purple-800 text-sm">500+ Happy Customers</div>
                        <div className="text-xs text-purple-600">5-star Google rated</div>
                      </div>
                    </div>

                    <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                      <Star className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-yellow-800 text-sm">Local & Trusted</div>
                        <div className="text-xs text-yellow-600">White Rock & Surrey</div>
                      </div>
                    </div>
                  </div>

                  {/* Review Links */}
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h4 className="font-semibold text-gray-800 mb-3 text-center">Leave Us a Review</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <a href="https://g.page/r/CbeicZxdYHsKEAI/review" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors">
                        <img src="/lovable-uploads/90d2177a-4c1d-4d8b-9873-f8ee94f4cd1f.png" alt="Google" className="w-8 h-8 object-contain" />
                      </a>
                      <a href="https://www.yelp.com/biz/bc-pressure-washing-white-rock" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors">
                        <img src="/lovable-uploads/b6d07b0f-96b7-4c0f-90b6-fef10d13439f.png" alt="Yelp" className="w-8 h-8 object-contain" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Ready for Professional Service?
              </h2>
              <p className="text-gray-600 mb-6">
                We're a local business serving White Rock and Surrey. Your satisfaction is guaranteed.
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
