
import React from 'react';

const FAQSection: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-16 bg-white">
      <div className="max-w-4xl mx-auto p-8 rounded-lg shadow-lg border border-gray-100">
        <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-bold text-xl mb-2 text-gray-800">How soon after construction should windows be cleaned?</h3>
            <p className="text-gray-700">
              We recommend scheduling post-construction window cleaning after all construction work is completely finished to avoid re-contamination. Typically, this is one of the last services performed before occupancy.
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-bold text-xl mb-2 text-gray-800">Can you remove paint splatter and construction adhesives?</h3>
            <p className="text-gray-700">
              Yes, our professional technicians use specialized tools and solutions to safely remove paint splatter, adhesive residues, and other construction materials without damaging the glass.
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-bold text-xl mb-2 text-gray-800">Do you clean window frames and tracks as well?</h3>
            <p className="text-gray-700">
              Absolutely! Our post-construction window cleaning service includes comprehensive cleaning of glass, frames, tracks, and sills to remove all construction debris.
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-bold text-xl mb-2 text-gray-800">How long does post-construction window cleaning take?</h3>
            <p className="text-gray-700">
              The time required depends on the size of the property and the number of windows. We'll provide you with a time estimate when you request a quote.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
