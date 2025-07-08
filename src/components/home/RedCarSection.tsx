
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { Car, MapPin, Percent } from 'lucide-react';

const RedCarSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Full width red background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-bc-red via-red-600 to-red-800">
        {/* Decorative pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
          <div className="absolute top-20 right-20 w-24 h-24 border-4 border-white rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-16 h-16 border-4 border-white rounded-full"></div>
          <div className="absolute bottom-10 right-32 w-20 h-20 border-4 border-white rounded-full"></div>
        </div>
        
        {/* Floating car icons */}
        <div className="absolute top-16 left-1/4 text-white/20">
          <Car size={48} />
        </div>
        <div className="absolute bottom-16 right-1/4 text-white/20">
          <Car size={64} />
        </div>
        <div className="absolute top-1/2 left-12 text-white/20">
          <MapPin size={40} />
        </div>
      </div>

      <div className="relative z-10 py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 min-h-[600px]">
              
              {/* Content Side */}
              <div className="text-white space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                      <Car className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-4xl md:text-5xl font-bold">
                      Seen Our <span className="text-yellow-300">Red Car?</span>
                    </h3>
                  </div>
                  
                  <div className="bg-white/15 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-yellow-400 p-3 rounded-full">
                        <Percent className="w-6 h-6 text-red-800" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-yellow-300">Special Discount!</p>
                        <p className="text-lg text-white/90">Marine Drive Spotting Bonus</p>
                      </div>
                    </div>
                    
                    <p className="text-xl mb-6 leading-relaxed">
                      If you've spotted our distinctive red vehicle along Marine Drive in White Rock, 
                      mention it when you contact us to receive a special{' '}
                      <span className="bg-yellow-400 text-red-800 px-3 py-1 rounded-full font-bold text-xl animate-pulse">
                        10% discount
                      </span>{' '}
                      on your service!
                    </p>
                    
                    <p className="text-lg text-white/90 mb-8">
                      As a locally owned and operated business, we're proud to be an active part of the White Rock 
                      and Surrey communities. We're not just a service provider - we're your neighbors, 
                      committed to keeping our local properties looking their best.
                    </p>
                  </div>
                </div>
                
                {/* Owner profile */}
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="w-16 h-16 border-3 border-yellow-400 flex-shrink-0">
                      <AvatarImage src="/lovable-uploads/72766780-6dc1-42de-8971-3a11add4daad.png" alt="Jayden - Owner" />
                      <AvatarFallback>JF</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-white text-xl">Jayden - Owner</p>
                      <p className="text-yellow-300 font-semibold">Your Local Cleaning Expert</p>
                    </div>
                  </div>
                  <blockquote className="text-white/95 italic text-lg mb-4 pl-4 border-l-4 border-yellow-400">
                    "I'm committed to providing high-quality service with a personal touch. If you see my red car around town, feel free to wave or stop for a chat!"
                  </blockquote>
                  <p className="font-bold text-yellow-300 text-lg">— Jayden, Your Neighbor</p>
                </div>
                
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="bg-white text-red-600 hover:bg-yellow-100 font-bold text-xl py-4 px-8 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                  asChild
                >
                  <Link to="/contact" className="flex items-center gap-3">
                    <Percent className="w-6 h-6" />
                    Claim Your 10% Discount
                  </Link>
                </Button>
              </div>
              
              {/* Image Side */}
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
                  <img
                    src="/lovable-uploads/9dc6484c-91bb-4ae3-994d-f6cfefbf7c63.png" 
                    alt="BC Pressure Washing Red Car at Marine Drive"
                    className="w-full h-auto object-cover rounded-xl shadow-2xl"
                  />
                  <div className="absolute -top-4 -right-4 bg-yellow-400 text-red-800 p-3 rounded-full font-bold text-sm animate-bounce">
                    Look for me!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RedCarSection;
