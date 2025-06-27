
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Gift } from 'lucide-react';
import ReferralOverlay from './ReferralOverlay';

const ReferralButton = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <>
      {/* Main Referral Section */}
      <section className="py-16 bg-gradient-to-r from-bc-red to-red-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Gift className="w-16 h-16 text-white mx-auto mb-4" />
              <h2 className="text-4xl font-bold text-white mb-4">
                Refer a Friend & Both Save $50!
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Know someone who needs our services? When you refer them and they book, 
                you both get $50 off your next service!
              </p>
            </div>

            <Button 
              size="lg" 
              className="bg-white text-bc-red hover:bg-gray-100 text-xl font-bold px-8 py-4 mb-8"
              onClick={() => setIsOverlayOpen(true)}
            >
              <Gift className="mr-2 h-6 w-6" />
              Start Referring Friends
            </Button>
          </div>
        </div>
      </section>

      {/* Floating "Start Referring Friends" Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          onClick={() => setIsOverlayOpen(true)}
          className="bg-bc-red hover:bg-red-700 text-white shadow-2xl rounded-full px-6 py-3 text-lg font-bold animate-pulse"
        >
          <Gift className="mr-2 h-5 w-5" />
          Start Referring Friends
        </Button>
      </div>

      <ReferralOverlay 
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
      />
    </>
  );
};

export default ReferralButton;
