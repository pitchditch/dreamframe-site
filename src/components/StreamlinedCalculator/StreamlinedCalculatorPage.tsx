
import React from 'react';
import StreamlinedCalculatorForm from './StreamlinedCalculatorForm';
import TrustSidebar from './TrustSidebar';

const StreamlinedCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
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
                <TrustSidebar />
              </div>
            </div>
          </div>
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
  );
};

export default StreamlinedCalculatorPage;
