
import React from 'react';
import { Shield, Award, ThumbsUp, Clock } from 'lucide-react';
import ProcessStep from '../ProcessStep';

const OwnerOperatedSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Owner-Operated Excellence</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              We take personal pride in every job we complete. When you hire us, you're getting service directly from the business owner, not a crew of subcontractors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center bg-gray-50 p-8 rounded-lg hover:shadow-md transition-shadow h-full flex flex-col">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-bc-red mb-6">
                <Shield className="w-12 h-12" />
              </div>
              <h3 className="font-bold text-2xl mb-4">Fully Insured</h3>
              <p className="text-gray-600 text-lg flex-grow">
                We carry comprehensive liability insurance for your complete peace of mind.
              </p>
            </div>
            
            <div className="text-center bg-gray-50 p-8 rounded-lg hover:shadow-md transition-shadow h-full flex flex-col">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-bc-red mb-6">
                <Award className="w-12 h-12" />
              </div>
              <h3 className="font-bold text-2xl mb-4">Satisfaction Guaranteed</h3>
              <p className="text-gray-600 text-lg flex-grow">
                If you're not 100% satisfied, we'll make it right at no extra cost.
              </p>
            </div>
            
            <div className="text-center bg-gray-50 p-8 rounded-lg hover:shadow-md transition-shadow h-full flex flex-col">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-bc-red mb-6">
                <ThumbsUp className="w-12 h-12" />
              </div>
              <h3 className="font-bold text-2xl mb-4">Quality Equipment</h3>
              <p className="text-gray-600 text-lg flex-grow">
                We invest in professional-grade tools and eco-friendly cleaning solutions.
              </p>
            </div>
            
            <div className="text-center bg-gray-50 p-8 rounded-lg hover:shadow-md transition-shadow h-full flex flex-col">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-bc-red mb-6">
                <Clock className="w-12 h-12" />
              </div>
              <h3 className="font-bold text-2xl mb-4">Prompt & Reliable</h3>
              <p className="text-gray-600 text-lg flex-grow">
                We value your time with punctual service and clear communication.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OwnerOperatedSection;
