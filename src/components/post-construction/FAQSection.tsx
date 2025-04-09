
import React from 'react';

const FAQSection: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-100">
        <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-bold text-xl mb-2">How soon after construction should windows be cleaned?</h3>
            <p className="text-gray-600">
              We recommend scheduling post-construction window cleaning after all construction work is completely finished to avoid re-contamination. Typically, this is one of the last services performed before occupancy.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-xl mb-2">Can you remove paint splatter and construction adhesives?</h3>
            <p className="text-gray-600">
              Yes, our professional technicians use specialized tools and solutions to safely remove paint splatter, adhesive residues, and other construction materials without damaging the glass.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-xl mb-2">Do you clean window frames and tracks as well?</h3>
            <p className="text-gray-600">
              Absolutely! Our post-construction window cleaning service includes comprehensive cleaning of glass, frames, tracks, and sills to remove all construction debris.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-xl mb-2">How long does post-construction window cleaning take?</h3>
            <p className="text-gray-600">
              The time required depends on the size of the property and the number of windows. We'll provide you with a time estimate when you request a quote.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
