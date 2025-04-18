
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const FounderSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">👋 Meet the Founder</h2>
          <div className="w-24 h-1 bg-bc-red mx-auto"></div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-8 max-w-6xl mx-auto">
          <div className="md:w-1/3">
            <img 
              src="/lovable-uploads/c5219e28-4a09-4d72-bef9-e96193360fa6.png" 
              alt="Jayden Fisher - Founder of BC Pressure Washing" 
              className="rounded-full shadow-xl w-48 h-48 object-cover mx-auto"
            />
          </div>
          <div className="md:w-2/3">
            <h3 className="text-2xl font-bold mb-4">Jayden Fisher – Owner & Operator of BC Pressure Washing</h3>
            <p className="text-gray-700 mb-4">
              What started with a squeegee, a dream, and some serious door-knocking hustle quickly grew into a full-time business. Two years ago, I went door-to-door offering exterior cleaning services in White Rock and Surrey — and thanks to amazing clients and a reputation for quality work, BC Pressure Washing was born.
            </p>
            <p className="text-gray-700 mb-8">
              Today, we use state-of-the-art equipment, offer competitive pricing, and back every job with a 100% satisfaction guarantee — if you're not happy, we'll re-clean at no extra charge. Whether it's crystal-clear windows or spotless driveways, we treat every home like it's our own.
            </p>
            
            <div className="flex justify-center gap-8">
              <div className="flex justify-center">
                <img 
                  src="/lovable-uploads/c74311b2-46a2-482b-93d0-1c36dd1c0695.png" 
                  alt="Licensed and Insured"
                  className="w-32 h-32 object-contain"
                />
              </div>
              <div className="flex justify-center">
                <img 
                  src="/lovable-uploads/cbc1a352-c1be-4b9f-b751-65974751292b.png" 
                  alt="Eco-Friendly Cleaning"
                  className="w-32 h-32 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Company Vehicle Banner */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <img 
            src="/lovable-uploads/657b41f7-7fc2-489d-bea2-fc4c7d5655ec.png" 
            alt="BC Pressure Washing Company Vehicle" 
            className="w-full max-w-4xl mx-auto h-auto object-contain rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
