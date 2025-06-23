
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import ReferralProgramDialog from '@/components/ReferralProgramDialog';

const RedCarSection = () => {
  const [isReferralDialogOpen, setIsReferralDialogOpen] = useState(false);

  return (
    <>
      <section className="py-16 bg-gradient-to-r from-bc-red to-red-600 text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Content */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Seen Our Red Car? Mention it for 10% Off!
              </h2>
              
              <p className="text-xl mb-8 text-white/90 leading-relaxed">
                If you spot our distinctive red vehicle around White Rock or Surrey, mention it when you book and enjoy 10% off your service!
              </p>
              
              <p className="text-lg mb-8 text-white/80">
                We're proud to be your local, owner-operated business — committed to keeping our community's homes looking their best.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="bg-white text-bc-red hover:bg-gray-100 text-lg font-bold px-8 py-4"
                  asChild
                >
                  <a href="tel:7788087620">Claim Your 10% Discount</a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-bc-red text-lg font-bold px-8 py-4"
                  onClick={() => setIsReferralDialogOpen(true)}
                >
                  Start Referring Friends
                </Button>
              </div>
              
              {/* Jayden's Personal Note */}
              <div className="mt-8 p-6 bg-white/10 rounded-lg backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src="/lovable-uploads/069112d9-e61f-4def-94ed-7f1c34172bfd.png"
                    alt="Jayden Fisher - Owner"
                    className="w-16 h-16 rounded-full border-2 border-white"
                  />
                  <div>
                    <p className="font-bold text-lg">Jayden Fisher</p>
                    <p className="text-white/80">Owner & Operator</p>
                  </div>
                </div>
                <p className="text-white/90 italic">
                  "If you see my red car, feel free to wave or stop for a chat!"
                </p>
              </div>
            </div>
            
            {/* Image */}
            <div className="lg:w-1/2">
              <div className="relative">
                <img
                  src="/lovable-uploads/3774dac7-a537-41d3-b86b-eee5ae6dfd89.png"
                  alt="BC Pressure Washing red car with owner"
                  className="rounded-lg shadow-2xl w-full h-auto transform hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <ReferralProgramDialog 
        open={isReferralDialogOpen} 
        onOpenChange={setIsReferralDialogOpen} 
      />
    </>
  );
};

export default RedCarSection;
