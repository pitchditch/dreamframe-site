
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const LocalMediaSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Rooted in White Rock – Born and Raised Here
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              We take pride in keeping our neighborhoods spotless. Watch our experienced technicians clean 
              3-story windows safely from the ground using our advanced water-fed pole system.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-bc-red rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Local White Rock Business</h3>
                  <p className="text-gray-600">
                    Born and raised in White Rock, we understand the unique challenges of coastal 
                    window cleaning and take personal pride in every job.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-bc-red rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Personal Service Guarantee</h3>
                  <p className="text-gray-600">
                    Every job is personally checked by owner Jayden Fisher. We're not a franchise – 
                    you get genuine personal attention on every service call.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Button asChild variant="bc-red" size="lg">
                <Link to="/calculator">Get My Free Quote</Link>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-[9/16] max-w-sm mx-auto rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/lovable-uploads/43f837f2-f6f3-404b-85de-ba0901296f83.png"
                alt="BC Pressure Washing team cleaning 3rd-story windows in White Rock"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 italic">
                "Cleaning a 3rd-story window in White Rock using our pole system — no ladders, no streaks."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalMediaSection;
