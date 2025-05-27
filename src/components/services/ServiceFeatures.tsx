
import React from 'react';

interface ServiceFeaturesProps {
  features: Array<{
    title: string;
    description: string;
  }>;
}

const ServiceFeatures = ({ features }: ServiceFeaturesProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
          <p className="text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ServiceFeatures;
