
import React from 'react';
import ServiceBenefits from '../ServiceBenefits';

interface Benefit {
  title: string;
  description: string;
}

const BenefitsSection: React.FC = () => {
  const benefits: Benefit[] = [
    {
      title: "Pristine First Impression",
      description: "Ensure your newly constructed property makes the best first impression with spotlessly clean windows."
    },
    {
      title: "Removes Construction Residue",
      description: "Effectively removes stubborn construction dust, paint splatter, adhesive residues, and stickers from all window surfaces."
    },
    {
      title: "Protects Window Investment",
      description: "Prevents permanent damage to glass by removing potentially corrosive construction materials and debris."
    },
    {
      title: "Comprehensive Cleaning",
      description: "We clean not only the glass but also frames, tracks, and sills to ensure your windows are completely free of construction debris."
    },
    {
      title: "Experienced Professionals",
      description: "Our team specializes in post-construction cleaning with the expertise to handle even the most challenging situations."
    },
    {
      title: "Fully Insured Service",
      description: "Rest easy knowing our professional cleaners are fully insured for your peace of mind."
    }
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Why Choose Our Post-Construction Window Cleaning</h2>
        <p className="section-subtitle">
          Trust our experts to handle the unique challenges of cleaning windows after construction
        </p>
        <ServiceBenefits benefits={benefits} />
      </div>
    </section>
  );
};

export default BenefitsSection;
