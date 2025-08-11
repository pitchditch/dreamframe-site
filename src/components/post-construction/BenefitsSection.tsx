
import React from 'react';
import { CheckCircle, ShieldCheck, Clock, Sparkles } from 'lucide-react';

const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: <CheckCircle className="text-bc-red" size={32} />,
      title: "Complete Debris Removal",
      description: "We remove all construction residue, stickers, paint splatter, and adhesive materials from your windows."
    },
    {
      icon: <ShieldCheck className="text-bc-red" size={32} />,
      title: "Safe & Professional",
      description: "Our trained technicians use specialized tools and techniques to clean without damaging your new windows."
    },
    {
      icon: <Clock className="text-bc-red" size={32} />,
      title: "Ready for Occupancy",
      description: "Get your property move-in ready with spotless windows that let in maximum natural light."
    },
    {
      icon: <Sparkles className="text-bc-red" size={32} />,
      title: "Crystal Clear Results",
      description: "Achieve streak-free, crystal clear windows that showcase your new construction perfectly."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Our Post Construction Cleaning?
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Construction projects leave behind more than just dust. Our specialized cleaning removes 
            stubborn construction debris that regular cleaning can't handle.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mb-4 flex justify-center">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
