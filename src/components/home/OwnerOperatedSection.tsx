
import React from 'react';
import { Shield, Award, ThumbsUp, Clock } from 'lucide-react';

const OwnerOperatedSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold mb-6">Owner-Operated Excellence</h2>
            <p className="text-lg text-gray-700 mb-8">
              As the owner of BC Pressure Washing, I personally oversee every project to ensure the highest standards of quality and customer satisfaction. When you choose us, you're working directly with the business owner who takes pride in delivering exceptional results.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start">
                <Shield className="text-bc-red mr-3 mt-1" size={24} />
                <div>
                  <h3 className="font-bold mb-1">Fully Insured</h3>
                  <p className="text-sm text-gray-600">WCB & liability insurance protection for your complete peace of mind.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Award className="text-bc-red mr-3 mt-1" size={24} />
                <div>
                  <h3 className="font-bold mb-1">5-Star Rated</h3>
                  <p className="text-sm text-gray-600">Our service excellence is reflected in our customer reviews.</p>
                </div>
              </div>
              <div className="flex items-start">
                <ThumbsUp className="text-bc-red mr-3 mt-1" size={24} />
                <div>
                  <h3 className="font-bold mb-1">Satisfaction Guaranteed</h3>
                  <p className="text-sm text-gray-600">We're not happy until you're completely satisfied with our work.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="text-bc-red mr-3 mt-1" size={24} />
                <div>
                  <h3 className="font-bold mb-1">Prompt & Reliable</h3>
                  <p className="text-sm text-gray-600">We show up when scheduled and complete work efficiently.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <div className="rounded-full border-4 border-white shadow-xl overflow-hidden w-64 h-64">
              <img src="/lovable-uploads/10e953e1-c5f0-4899-a3b7-944cf15bca76.png" alt="Jayden Fisher - Owner of BC Pressure Washing" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OwnerOperatedSection;
