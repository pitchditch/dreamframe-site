
import React from 'react';
import { Shield, Award, ThumbsUp, Clock } from 'lucide-react';
import ProcessStep from '../ProcessStep';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const OwnerOperatedSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Owner-Operated Excellence</h2>
            <div className="flex flex-col items-center">
              <p className="text-gray-600 max-w-3xl mx-auto text-lg mb-4">
                We take personal pride in every job we complete. When you hire us, you're getting service directly from the business owner, not a crew of subcontractors.
              </p>
              <div className="flex items-center justify-center mt-4">
                <img
                  src="/lovable-uploads/5ab1b520-40ad-4e25-b0d6-6292266b90ea.png"
                  alt="Jayden Fisher - Owner"
                  className="w-16 h-16 rounded-full object-cover border-2 border-bc-red"
                />
                <p className="ml-3 text-gray-800 font-medium">
                  <span className="block text-bc-red font-bold">Jayden Fisher</span>
                  <span className="text-sm">Owner Operator</span>
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow h-full flex flex-col">
              <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-bc-red mb-5">
                <Shield className="w-10 h-10" />
              </div>
              <h3 className="font-bold text-xl mb-3">Fully Insured</h3>
              <p className="text-gray-600 text-base flex-grow">
                We carry comprehensive liability insurance for your complete peace of mind.
              </p>
            </div>
            
            <div className="text-center bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow h-full flex flex-col">
              <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-bc-red mb-5">
                <Award className="w-10 h-10" />
              </div>
              <h3 className="font-bold text-xl mb-3">Satisfaction Guaranteed</h3>
              <p className="text-gray-600 text-base flex-grow">
                If you're not 100% satisfied, we'll make it right at no extra cost.
              </p>
            </div>
            
            <div className="text-center bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow h-full flex flex-col">
              <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-bc-red mb-5">
                <ThumbsUp className="w-10 h-10" />
              </div>
              <h3 className="font-bold text-xl mb-3">Quality Equipment</h3>
              <p className="text-gray-600 text-base flex-grow">
                We invest in professional-grade tools and eco-friendly cleaning solutions.
              </p>
            </div>
            
            <div className="text-center bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow h-full flex flex-col">
              <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-bc-red mb-5">
                <Clock className="w-10 h-10" />
              </div>
              <h3 className="font-bold text-xl mb-3">Prompt & Reliable</h3>
              <p className="text-gray-600 text-base flex-grow">
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
