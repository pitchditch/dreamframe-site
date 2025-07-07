
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

      <div className="relative z-10 py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 min-h-[500px]">
              
              {/* Content Side */}
              <div className="text-white space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                      <Car className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold">
                      Seen Our <span className="text-yellow-300">Red Car?</span>
                    </h3>
                  </div>
                  
                  <div className="bg-white/15 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-yellow-400 p-2 rounded-full">
                        <Percent className="w-5 h-5 text-red-800" />
                      </div>
                      <div>
                        <p className="text-xl font-bold text-yellow-300">Special Discount!</p>
                        <p className="text-sm text-white/90">Marine Drive Spotting Bonus</p>
                      </div>
                    </div>
                    
                    <p className="text-lg mb-4 leading-relaxed">
                      Spotted our red car on Marine Drive? Get{' '}
                      <span className="bg-yellow-400 text-red-800 px-2 py-1 rounded-full font-bold animate-pulse">
                        10% off
                      </span>{' '}
                      your service!
                    </p>
                  </div>
                </div>
                
                {/* Owner profile */}
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="w-12 h-12 border-2 border-yellow-400 flex-shrink-0">
                      <AvatarImage src="/lovable-uploads/72766780-6dc1-42de-8971-3a11add4daad.png" alt="Jayden - Owner" />
                      <AvatarFallback>JF</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-white text-lg">Jayden - Owner</p>
                      <p className="text-yellow-300 font-semibold text-sm">Your Local Expert</p>
                    </div>
                  </div>
                  <blockquote className="text-white/95 italic text-sm mb-3 pl-3 border-l-3 border-yellow-400">
                    "Wave if you see my red car around town!"
                  </blockquote>
                </div>
                
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="bg-white text-red-600 hover:bg-yellow-100 font-bold text-lg py-3 px-6 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                  asChild
                >
                  <Link to="/contact" className="flex items-center gap-2">
                    <Percent className="w-5 h-5" />
                    Claim Your 10% Discount
                  </Link>
                </Button>
              </div>
              
              {/* Image Side - Made bigger */}
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm p-2 rounded-2xl border border-white/20">
                  <img
                    src="/lovable-uploads/9dc6484c-91bb-4ae3-994d-f6cfefbf7c63.png" 
                    alt="BC Pressure Washing Red Car at Marine Drive"
                    className="w-full h-auto object-cover rounded-xl shadow-2xl"
                  />
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-red-800 p-2 rounded-full font-bold text-xs animate-bounce">
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
