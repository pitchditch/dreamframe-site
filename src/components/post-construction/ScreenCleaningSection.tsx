
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Check } from 'lucide-react';

const ScreenCleaningSection: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Window & Screen Cleaning</h2>
              <p className="text-gray-700 mb-6 text-lg">
                Complete your post-construction cleanup with our professional window and screen cleaning services.
                We thoroughly clean both your windows and screens to ensure a perfect finish.
              </p>
              
              <Card className="mb-8 border-l-4 border-l-bc-red">
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    {[
                      "Thorough screen removal and cleaning",
                      "Pressure washing for tough debris",
                      "Frame cleaning and restoration",
                      "Streak-free window finishes",
                      "Reinstallation with perfect alignment"
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-bc-red mt-1 mr-2 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Button 
                variant="bc-red"
                size="lg"
                onClick={() => document.getElementById('booking-section')?.scrollIntoView({behavior: 'smooth'})}
                className="text-white"
              >
                Add Screen Cleaning to Your Service
              </Button>
            </div>
            
            <div className="relative">
              <img 
                src="/lovable-uploads/ffa692d0-ab2a-469d-a1a6-f5784d0ed566.png" 
                alt="Professional window screen cleaning" 
                className="rounded-lg shadow-xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <p className="text-bc-red font-semibold text-lg mb-1">Complete Package</p>
                <p className="text-gray-700">Windows + Screens = Perfect Finish</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScreenCleaningSection;
