
import React from 'react';
import { CheckCircle } from 'lucide-react';

const ServiceFeatures = () => {
  const features = [
    "High-rise window cleaning capabilities",
    "Flexible scheduling to minimize business disruption",
    "Fully trained and insured technicians",
    "Eco-friendly cleaning options available",
    "Water-fed pole systems for streak-free results",
    "Regular maintenance programs",
    "Interior and exterior window cleaning",
    "Frame and sill cleaning included"
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <img 
              src="/lovable-uploads/d9f3e980-9bd8-4f15-afb2-6df7cb095002.png" 
              alt="Commercial Window Cleaning Features" 
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Our Commercial Window Cleaning Features</h2>
            <p className="text-gray-600 mb-6">
              We offer comprehensive window cleaning solutions tailored to the unique needs of commercial properties. Our services include:
            </p>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="text-bc-red mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceFeatures;
