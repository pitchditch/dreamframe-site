
import React from 'react';
import { Shield, Award, ThumbsUp, Clock } from 'lucide-react';
import ProcessStep from '../ProcessStep';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const OwnerOperatedSection = () => {
  return (
    <section className="py-20 bg-gray-50" id="owner-operated-excellence">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">Trusted, Owner-Operated<br />Pressure Washing Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
            <div className="text-center p-6 h-full flex flex-col">
              <div className="mx-auto w-24 h-24 bg-white rounded-full flex items-center justify-center text-bc-red mb-6 shadow-lg border-4 border-bc-red/10">
                <Shield className="w-12 h-12" />
              </div>
              <h3 className="font-bold text-2xl mb-4 text-gray-900">Fully Insured</h3>
              <p className="text-gray-600 text-base leading-relaxed flex-grow">
                Rest easy knowing we carry full liability insurance for all pressure washing and exterior cleaning services.
              </p>
            </div>
            
            <div className="text-center p-6 h-full flex flex-col">
              <div className="mx-auto w-24 h-24 bg-white rounded-full flex items-center justify-center text-bc-red mb-6 shadow-lg border-4 border-bc-red/10">
                <Award className="w-12 h-12" />
              </div>
              <h3 className="font-bold text-2xl mb-4 text-gray-900">Satisfaction Guarantee</h3>
              <p className="text-gray-600 text-base leading-relaxed flex-grow">
                Your happiness is our priority—if you're not 100% satisfied, we'll fix it at no extra cost.
              </p>
            </div>
            
            <div className="text-center p-6 h-full flex flex-col">
              <div className="mx-auto w-24 h-24 bg-white rounded-full flex items-center justify-center text-bc-red mb-6 shadow-lg border-4 border-bc-red/10">
                <ThumbsUp className="w-12 h-12" />
              </div>
              <h3 className="font-bold text-2xl mb-4 text-gray-900">Professional Equipment</h3>
              <p className="text-gray-600 text-base leading-relaxed flex-grow">
                We use top-of-the-line, eco-friendly tools for safe and effective exterior cleaning results.
              </p>
            </div>
            
            <div className="text-center p-6 h-full flex flex-col">
              <div className="mx-auto w-24 h-24 bg-white rounded-full flex items-center justify-center text-bc-red mb-6 shadow-lg border-4 border-bc-red/10">
                <Clock className="w-12 h-12" />
              </div>
              <h3 className="font-bold text-2xl mb-4 text-gray-900">Reliable & On-Time</h3>
              <p className="text-gray-600 text-base leading-relaxed flex-grow">
                We show up when we say we will—with clear communication and punctual service every time.
              </p>
            </div>
          </div>

          <div className="text-center mb-12">
            <p className="text-gray-700 max-w-5xl mx-auto text-lg leading-relaxed mb-8">
              At BC Pressure Washing, every job is personally handled or overseen by the owner. No outsourced teams—just local expertise and pride in every project. When you hire us, you're supporting a small, reliable business that puts your home and satisfaction first.
            </p>
            
            {/* Owner profile with improved quote */}
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-3xl mx-auto border border-gray-200">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Avatar className="w-24 h-24 border-4 border-bc-red shadow-lg">
                  <AvatarImage src="/lovable-uploads/72766780-6dc1-42de-8971-3a11add4daad.png" alt="Jayden - Owner" />
                  <AvatarFallback>JF</AvatarFallback>
                </Avatar>
                <div className="text-center sm:text-left flex-1">
                  <p className="text-gray-700 font-medium mb-3 text-lg italic leading-relaxed">
                    "I'm committed to providing high-quality service with a personal touch. If you see my red car around town, feel free to wave or stop for a chat!"
                  </p>
                  <p className="font-bold text-bc-red text-lg">— Jayden, Owner</p>
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
