
import React from 'react';

interface Benefit {
  title: string;
  description: string;
}

interface CleaningBenefitsProps {
  benefits: Benefit[];
}

const CleaningBenefits = ({ benefits }: CleaningBenefitsProps) => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Benefits of Professional Commercial Window Cleaning</h2>
        <p className="text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Regular professional window cleaning provides numerous advantages for your commercial property beyond just appearances.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-bc-red">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CleaningBenefits;
