
import { Check } from 'lucide-react';
import { ReactNode } from 'react';

interface Benefit {
  title: string;
  description: string;
  icon?: ReactNode;
}

export interface ServiceBenefitsProps {
  benefits: Benefit[];
  title?: string;
  subtitle?: string; // Added subtitle as an optional property
}

const ServiceBenefits = ({ benefits, title, subtitle }: ServiceBenefitsProps) => {
  return (
    <div>
      {title && <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{title}</h2>}
      {subtitle && <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">{subtitle}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                {benefit.icon || <Check size={18} />}
              </div>
              <h3 className="text-lg font-semibold">{benefit.title}</h3>
            </div>
            <p className="text-gray-600">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceBenefits;
