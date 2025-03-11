
import { Check } from 'lucide-react';

interface Benefit {
  title: string;
  description: string;
}

interface ServiceBenefitsProps {
  benefits: Benefit[];
}

const ServiceBenefits = ({ benefits }: ServiceBenefitsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {benefits.map((benefit, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
              <Check size={18} />
            </div>
            <h3 className="text-lg font-semibold">{benefit.title}</h3>
          </div>
          <p className="text-gray-600">{benefit.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ServiceBenefits;
