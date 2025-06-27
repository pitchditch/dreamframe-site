
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const RedCarSection = () => {
  return (
    <section className="w-full bg-gradient-to-r from-red-600 via-red-500 to-red-700 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-24 translate-y-24"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 min-h-[600px]">
            
            {/* Content Side */}
            <div className="order-2 lg:order-1 space-y-6">
              <div className="inline-block">
                <h3 className="text-3xl md:text-4xl font-bold mb-2 text-white">
                  Seen Our Red Car?
                </h3>
                <div className="w-24 h-1 bg-white/80 rounded-full"></div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                <p className="text-lg md:text-xl text-white/90 mb-4 leading-relaxed">
                  If you've spotted our distinctive red vehicle along Marine Drive in White Rock, 
                  mention it when you contact us to receive a special{' '}
                  <span className="animate-pulse font-bold text-yellow-300 text-xl md:text-2xl bg-white/20 px-2 py-1 rounded-lg">
                    10% discount
                  </span>{' '}
                  on your service!
                </p>
                <p className="text-base md:text-lg text-white/80 leading-relaxed">
                  As a locally owned and operated business, we're proud to be an active part of the White Rock 
                  and Surrey communities. We're not just a service provider - we're your neighbors, 
                  committed to keeping our local properties looking their best.
                </p>
              </div>
              
              {/* Owner Profile */}
              <div className="bg-white/15 backdrop-blur-md p-6 rounded-2xl border border-white/30 shadow-xl">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-16 h-16 border-3 border-white/50 shadow-lg">
                    <AvatarImage src="/lovable-uploads/72766780-6dc1-42de-8971-3a11add4daad.png" alt="Jayden - Owner" />
                    <AvatarFallback className="bg-white text-red-600 font-bold text-lg">JF</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-white text-lg">Jayden - Owner</p>
                    <p className="text-white/70 text-sm">BC Pressure Washing</p>
                  </div>
                </div>
                <blockquote className="text-white/90 italic mb-3 text-base md:text-lg leading-relaxed">
                  "I'm committed to providing high-quality service with a personal touch. If you see my red car around town, feel free to wave or stop for a chat!"
                </blockquote>
                <div className="text-right">
                  <cite className="text-yellow-300 font-semibold not-italic">— Jayden</cite>
                </div>
              </div>
              
              <Button 
                variant="default" 
                size="lg" 
                className="group w-full sm:w-auto bg-white text-red-600 hover:bg-white/90 hover:text-red-700 font-bold text-lg px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link to="/contact">
                  🎉 Claim Your 10% Discount
                </Link>
              </Button>
            </div>
            
            {/* Image Side */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
                <img
                  src="/lovable-uploads/9dc6484c-91bb-4ae3-994d-f6cfefbf7c63.png" 
                  alt="BC Pressure Washing Red Car at Marine Drive"
                  className="w-full h-full object-cover object-center min-h-[400px] lg:min-h-[500px] hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-red-700 px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-bounce">
                10% OFF!
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default RedCarSection;
