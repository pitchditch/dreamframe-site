
import React from 'react';
import { Shield, Award, ThumbsUp, Clock } from 'lucide-react';

const CompetitorComparisonSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Surrey Homeowners Trust Us More Than Shackshine or Men In Kilts</h2>
          <p className="text-gray-600">
            When it comes to exterior cleaning services, BC Pressure Washing stands above the competition with our personalized service, competitive pricing, and exceptional results.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="bg-gray-50 rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-bc-red rounded-full">
              <Shield className="text-white" size={32} />
            </div>
            <h3 className="font-bold mb-2">Owner Operated</h3>
            <p className="text-sm text-gray-600">Not a franchise - get personal attention from the business owner</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-blue-500 rounded-full">
              <Award className="text-white" size={32} />
            </div>
            <h3 className="font-bold mb-2">Better Value</h3>
            <p className="text-sm text-gray-600">Competitive pricing without franchise fees or corporate overhead</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-green-500 rounded-full">
              <ThumbsUp className="text-white" size={32} />
            </div>
            <h3 className="font-bold mb-2">Superior Results</h3>
            <p className="text-sm text-gray-600">Professional-grade equipment and personalized attention to detail</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-purple-500 rounded-full">
              <Clock className="text-white" size={32} />
            </div>
            <h3 className="font-bold mb-2">Local Knowledge</h3>
            <p className="text-sm text-gray-600">Deep understanding of Surrey & White Rock conditions and properties</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompetitorComparisonSection;
