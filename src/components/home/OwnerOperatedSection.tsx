
import React from 'react';
import { Shield, Award, ThumbsUp, Clock } from 'lucide-react';
import ProcessStep from '../ProcessStep';

const OwnerOperatedSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Owner-Operated Excellence</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We take personal pride in every job we complete. When you hire us, you're getting service directly from the business owner, not a crew of subcontractors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
              <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-bc-red mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-bold mb-2">Fully Insured</h3>
              <p className="text-gray-600 text-sm">
                We carry comprehensive liability insurance for your complete peace of mind.
              </p>
            </div>
            
            <div className="text-center bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
              <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-bc-red mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold mb-2">Satisfaction Guaranteed</h3>
              <p className="text-gray-600 text-sm">
                If you're not 100% satisfied, we'll make it right at no extra cost.
              </p>
            </div>
            
            <div className="text-center bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
              <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-bc-red mb-4">
                <ThumbsUp className="w-6 h-6" />
              </div>
              <h3 className="font-bold mb-2">Quality Equipment</h3>
              <p className="text-gray-600 text-sm">
                We invest in professional-grade tools and eco-friendly cleaning solutions.
              </p>
            </div>
            
            <div className="text-center bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
              <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-bc-red mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-bold mb-2">Prompt & Reliable</h3>
              <p className="text-gray-600 text-sm">
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
