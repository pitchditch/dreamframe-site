
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Gift, Users, DollarSign, ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import ReferralOverlay from './ReferralOverlay';

const ReferralProgramSection = () => {
  const isMobile = useIsMobile();
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-bc-red to-red-600">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center mb-4">
            <Gift className="h-8 w-8 md:h-12 md:w-12 text-white mr-3" />
            <h2 className="text-2xl md:text-4xl font-bold text-white">
              Refer a Friend & Get 25% Off!
            </h2>
          </div>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Love our service? Share it with friends and family and get 25% off your next service!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Mobile Steps - Vertical Layout */}
          {isMobile ? (
            <div className="space-y-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-start space-x-3">
                  <div className="bg-white text-bc-red rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm mb-1">You Refer</h3>
                    <p className="text-white/90 text-sm">Tell friends about our service</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-start space-x-3">
                  <div className="bg-white text-bc-red rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm mb-1">They Book</h3>
                    <p className="text-white/90 text-sm">Friend books their first service</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-start space-x-3">
                  <div className="bg-white text-bc-red rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm mb-1">You Get 25% Off</h3>
                    <p className="text-white/90 text-sm">You get 25% off your next service</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Desktop Steps - Horizontal Layout
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20 transition-transform hover:scale-105">
                <div className="bg-white text-bc-red rounded-full w-16 h-16 flex items-center justify-center font-bold text-2xl mx-auto mb-4">
                  1
                </div>
                <h3 className="font-bold text-xl text-white mb-2">You Refer</h3>
                <p className="text-white/90">Tell your friends and family about our amazing service</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20 transition-transform hover:scale-105">
                <div className="bg-white text-bc-red rounded-full w-16 h-16 flex items-center justify-center font-bold text-2xl mx-auto mb-4">
                  2
                </div>
                <h3 className="font-bold text-xl text-white mb-2">They Book</h3>
                <p className="text-white/90">Your friend books their first service with us</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20 transition-transform hover:scale-105">
                <div className="bg-white text-bc-red rounded-full w-16 h-16 flex items-center justify-center font-bold text-2xl mx-auto mb-4">
                  3
                </div>
                <h3 className="font-bold text-xl text-white mb-2">You Get 25% Off</h3>
                <p className="text-white/90">You get 25% off your next service!</p>
              </div>
            </div>
          )}

          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6 mb-6 border border-white/20">
              <div className="flex items-center justify-center mb-3">
                <DollarSign className="h-6 w-6 md:h-8 md:w-8 text-yellow-300 mr-2" />
                <span className="text-lg md:text-2xl font-bold text-white">
                  Get 25% off your next service!
                </span>
              </div>
              <p className="text-white/90 text-sm md:text-base">
                No limit on referrals - the more friends you refer, the more you save!
              </p>
            </div>
            
            <Button 
              size={isMobile ? "default" : "lg"} 
              className="bg-white text-bc-red hover:bg-gray-100 font-bold transition-all hover:scale-105 w-full md:w-auto"
              onClick={() => setIsOverlayOpen(true)}
            >
              <Users className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              Start Referring Friends
              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      <ReferralOverlay 
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
      />
    </section>
  );
};

export default ReferralProgramSection;
