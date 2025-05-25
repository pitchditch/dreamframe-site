
import React from 'react';
import { Shield, Award, ThumbsUp, Clock } from 'lucide-react';
import ProcessStep from '../ProcessStep';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const OwnerOperatedSection = () => {
  return (
    <section className="py-16 bg-white" id="owner-operated-excellence">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Trusted, Owner-Operated Pressure Washing Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow h-full flex flex-col">
              <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-bc-red mb-5">
                <Shield className="w-10 h-10" />
              </div>
              <h3 className="font-bold text-xl mb-3">Fully Insured</h3>
              <p className="text-gray-600 text-base flex-grow">
                Rest easy knowing we carry full liability insurance for all pressure washing and exterior cleaning services.
              </p>
            </div>
            
            <div className="text-center bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow h-full flex flex-col">
              <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-bc-red mb-5">
                <Award className="w-10 h-10" />
              </div>
              <h3 className="font-bold text-xl mb-3">Satisfaction Guarantee</h3>
              <p className="text-gray-600 text-base flex-grow">
                Your happiness is our priority—if you're not 100% satisfied, we'll fix it at no extra cost.
              </p>
            </div>
            
            <div className="text-center bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow h-full flex flex-col">
              <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-bc-red mb-5">
                <ThumbsUp className="w-10 h-10" />
              </div>
              <h3 className="font-bold text-xl mb-3">Professional Equipment</h3>
              <p className="text-gray-600 text-base flex-grow">
                We use top-of-the-line, eco-friendly tools for safe and effective exterior cleaning results.
              </p>
            </div>
            
            <div className="text-center bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow h-full flex flex-col">
              <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-bc-red mb-5">
                <Clock className="w-10 h-10" />
              </div>
              <h3 className="font-bold text-xl mb-3">Reliable & On-Time</h3>
              <p className="text-gray-600 text-base flex-grow">
                We show up when we say we will—with clear communication and punctual service every time.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-gray-600 max-w-4xl mx-auto text-lg mb-4 text-center">
              At BC Pressure Washing, every job is personally handled or overseen by the owner. No outsourced teams—just local expertise and pride in every project. When you hire us, you're supporting a small, reliable business that puts your home and satisfaction first.
            </p>
            
            {/* Owner profile with improved quote */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm mt-6 max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Avatar className="w-20 h-20 border-2 border-bc-red">
                  <AvatarImage src="/lovable-uploads/72766780-6dc1-42de-8971-3a11add4daad.png" alt="Jayden - Owner" />
                  <AvatarFallback>JF</AvatarFallback>
                </Avatar>
                <div className="text-center sm:text-left">
                  <p className="text-gray-700 font-medium mb-2">
                    "I'm committed to providing high-quality service with a personal touch. If you see my red car around town, feel free to wave or stop for a chat!"
                  </p>
                  <p className="font-bold text-bc-red">— Jayden, Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OwnerOperatedSection;
