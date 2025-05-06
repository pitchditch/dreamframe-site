
import React from 'react';
import { trackPageView } from '@/utils/analytics';

const StepThankYou: React.FC = () => {
  const handleFinalCallClick = () => {
    trackPageView('/virtual/final-call-button');
  };
  
  return (
    <div className="text-center py-10">
      <h3 className="text-2xl font-bold mb-4 text-green-700">Thank you!</h3>
      <p className="mb-2 text-gray-600">We've received your request and sent a confirmation to bcpressurewashing.ca@gmail.com. Jayden or a team member will contact you soon.</p>
      <a 
        href="tel:7788087620" 
        className="w-fit px-6 py-3 inline-block bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-lg font-bold shadow mt-3"
        onClick={handleFinalCallClick}
      >
        Call Jayden Now
      </a>
    </div>
  );
};

export default StepThankYou;
