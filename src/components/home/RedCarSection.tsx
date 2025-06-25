
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { Car, MapPin, Star, Sparkles } from 'lucide-react';

const RedCarSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-700 to-red-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header with car icon */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6 animate-bounce">
              <Car className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Spotted Our <span className="text-yellow-300 animate-pulse">Red Car</span>?
            </h2>
            <div className="flex items-center justify-center gap-2 text-white/90 text-lg">
              <MapPin className="w-5 h-5" />
              <span>Marine Drive, White Rock</span>
            </div>
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left side - Content */}
            <div className="space-y-8">
              {/* Discount offer card */}
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-6 h-6 text-yellow-300" />
                  <h3 className="text-2xl font-bold text-white">Special Offer!</h3>
                </div>
                <p className="text-white/90 text-lg leading-relaxed mb-6">
                  If you&apos;ve spotted our distinctive red vehicle along Marine Drive in White Rock, 
                  mention it when you contact us to receive a special{' '}
                  <span className="font-bold text-yellow-300 text-xl bg-white/20 px-3 py-1 rounded-full animate-pulse">
                    10% discount
                  </span>{' '}
                  on your service!
                </p>
                
                {/* Community connection */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <p className="text-white/80 text-base leading-relaxed">
                    As a locally owned and operated business, we&apos;re proud to be an active part of the 
                    White Rock and Surrey communities. We&apos;re not just a service provider - we&apos;re your 
                    neighbors, committed to keeping our local properties looking their best.
                  </p>
                </div>
              </div>

              {/* Owner profile - Enhanced */}
              <div className="bg-gradient-to-r from-white/15 to-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-start gap-6">
                  <div className="relative">
                    <Avatar className="w-20 h-20 border-3 border-white/30 shadow-xl">
                      <AvatarImage src="/lovable-uploads/72766780-6dc1-42de-8971-3a11add4daad.png" alt="Jayden - Owner" />
                      <AvatarFallback className="bg-white/20 text-white font-bold text-xl">JF</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 bg-yellow-400 rounded-full p-1">
                      <Star className="w-4 h-4 text-yellow-800 fill-current" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <h4 className="font-bold text-white text-xl">Jayden</h4>
                      <span className="bg-white/20 text-white/90 px-3 py-1 rounded-full text-sm font-medium">
                        Owner
                      </span>
                    </div>
                    
                    <blockquote className="text-white/90 italic text-lg leading-relaxed mb-4">
                      &ldquo;I&apos;m committed to providing high-quality service with a personal touch. 
                      If you see my red car around town, feel free to wave or stop for a chat!&rdquo;
                    </blockquote>
                    
                    <div className="flex items-center gap-2 text-yellow-300 font-medium">
                      <span>—</span>
                      <span>Jayden, Owner</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Car image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/lovable-uploads/9dc6484c-91bb-4ae3-994d-f6cfefbf7c63.png" 
                  alt="BC Pressure Washing Red Car at Marine Drive"
                  className="w-full h-full object-cover min-h-[400px] lg:min-h-[600px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                
                {/* Floating badge */}
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2 text-red-600 font-bold">
                    <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                    <span>Look for this car!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width CTA bar */}
      <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 py-8 shadow-2xl">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Ready to Claim Your 10% Discount?
              </h3>
              <p className="text-gray-700 text-lg">
                Mention our red car when you contact us and save on your next service!
              </p>
            </div>
            
            <Button 
              size="lg" 
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-bold shadow-xl transform hover:scale-105 transition-all duration-200 min-w-[250px]"
              asChild
            >
              <Link to="/contact" className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Claim Your Discount
                <Sparkles className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RedCarSection;
