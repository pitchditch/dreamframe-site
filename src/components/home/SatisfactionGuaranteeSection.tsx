
import React from 'react';
import { Shield } from 'lucide-react';

const SatisfactionGuaranteeSection = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-gray-900 to-gray-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/53939952-27dd-42b6-92d3-7ab137a3b788.png')] bg-cover bg-center"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center animate-pulse">
              <Shield className="text-bc-red" size={40} />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4 text-shadow">100% Satisfaction Guarantee</h2>
          <div className="h-1 w-24 bg-bc-red mx-auto mb-6"></div>
          <p className="text-lg mb-6">
            If you're not completely satisfied with our work, we'll come back and make it right at no additional cost to you.
          </p>
          <div className="flex justify-center mt-8 gap-4 flex-col sm:flex-row">
            <a href="tel:7788087620" className="bg-bc-red hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-bold transition-all transform hover:scale-105 pulse-animation">
              Call Now: 778-808-7620
            </a>
            <a href="/contact" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30 px-8 py-4 rounded-lg text-lg font-bold transition-all transform hover:scale-105">
              Get a Free Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SatisfactionGuaranteeSection;
