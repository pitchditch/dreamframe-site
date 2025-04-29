
import React from 'react';
import { Button } from '@/components/ui/button';

interface PriceCalculatorIntroProps {
  onContinue: () => void;
}

const PriceCalculatorIntro: React.FC<PriceCalculatorIntroProps> = ({ onContinue }) => {
  return (
    <div className="py-12 px-6 md:p-16 bg-gradient-to-br from-bc-blue-dark to-bc-blue text-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Get Your Free Estimate in 30 Seconds</h2>
      <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
        No commitment required. Simply answer a few questions about your property and get an instant price estimate.
      </p>
      
      <div className="flex justify-center mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10 max-w-3xl">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 flex items-center justify-center mb-4">
              <span className="text-2xl md:text-3xl font-bold">1</span>
            </div>
            <p className="font-medium">Answer a few simple questions</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 flex items-center justify-center mb-4">
              <span className="text-2xl md:text-3xl font-bold">2</span>
            </div>
            <p className="font-medium">Get your instant price quote</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 flex items-center justify-center mb-4">
              <span className="text-2xl md:text-3xl font-bold">3</span>
            </div>
            <p className="font-medium">Book your preferred date</p>
          </div>
        </div>
      </div>
      
      <Button 
        onClick={onContinue}
        className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-lg px-8 py-6 rounded-md shadow-lg"
      >
        Start Your Free Quote
      </Button>
    </div>
  );
};

export default PriceCalculatorIntro;
