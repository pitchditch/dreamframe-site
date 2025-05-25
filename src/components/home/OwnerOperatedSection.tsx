
import React from 'react';
import { Shield, Award, ThumbsUp, Clock } from 'lucide-react';
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
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              At BC Pressure Washing, every job is personally handled or overseen by the owner. No outsourced teams—just local expertise and pride in every project. When you hire us, you're supporting a small, reliable business that puts your home and satisfaction first.
            </p>
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

          {/* Red Car Section - Full Width */}
          <div className="bg-gradient-to-r from-gray-900 to-black text-white rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
              <div className="p-8 lg:p-12">
                <h3 className="text-3xl font-bold mb-4 text-red-500">Seen Our Red Car?</h3>
                <p className="mb-6 text-lg text-gray-300">
                  If you've spotted our distinctive red vehicle along Marine Drive in White Rock, 
                  mention it when you contact us to receive a special <span className="animate-pulse font-bold text-red-500 text-xl">10% discount</span> on your service!
                </p>
                <p className="mb-8 text-gray-300">
                  As a locally owned and operated business, we're proud to be an active part of the White Rock 
                  and Surrey communities. We're not just a service provider - we're your neighbors, 
                  committed to keeping our local properties looking their best.
                </p>
                
                {/* Owner profile */}
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="w-16 h-16 border-2 border-bc-red">
                      <AvatarImage src="/lovable-uploads/72766780-6dc1-42de-8971-3a11add4daad.png" alt="Jayden - Owner" />
                      <AvatarFallback>JF</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-white">Jayden - Owner</p>
                    </div>
                  </div>
                  <p className="text-gray-300 italic mb-2">
                    "I'm committed to providing high-quality service with a personal touch. If you see my red car around town, feel free to wave or stop for a chat!"
                  </p>
                  <p className="font-bold text-bc-red">— Jayden, Owner</p>
                </div>
                
                <Button 
                  variant="bc-red" 
                  size="lg" 
                  className="group"
                  asChild
                >
                  <Link to="/contact">
                    Claim Your 10% Discount
                  </Link>
                </Button>
              </div>
              
              <div className="h-full">
                <img
                  src="/lovable-uploads/9dc6484c-91bb-4ae3-994d-f6cfefbf7c63.png" 
                  alt="BC Pressure Washing Red Car at Marine Drive"
                  className="w-full h-full object-cover min-h-[400px] lg:min-h-[500px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OwnerOperatedSection;
