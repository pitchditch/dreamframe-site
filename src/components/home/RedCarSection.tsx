
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const RedCarSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
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

export default RedCarSection;
