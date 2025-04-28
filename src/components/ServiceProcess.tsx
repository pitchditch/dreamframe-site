
import { ReactNode } from 'react';

interface ProcessStep {
  number: number;
  title: string;
  description: string;
  icon?: ReactNode;
}

interface ServiceProcessProps {
  processes?: ProcessItem[];
  steps?: ProcessStep[];
  title?: string;
}

interface ProcessItem {
  title: string;
  description: string;
  icon: ReactNode;
}

const ServiceProcess = ({ processes, steps, title }: ServiceProcessProps) => {
  if (processes) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {processes.map((process, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-bc-red mb-4 mx-auto">
              {process.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3">{process.title}</h3>
            <p className="text-gray-600">{process.description}</p>
          </div>
        ))}
      </div>
    );
  }

  if (steps) {
    return (
      <div className="container mx-auto px-4">
        {title && <h2 className="text-3xl font-bold text-center mb-10">{title}</h2>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {steps.map((step) => (
            <div key={step.number} className="relative bg-gray-50 hover:bg-white transition-colors p-6 rounded-lg">
              <div className="absolute -left-4 top-0 w-8 h-8 bg-bc-red rounded-full flex items-center justify-center text-white font-bold z-10">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">{step.title}</h3>
              <p className="text-gray-600 text-center">{step.description}</p>
              {step.icon && (
                <div className="flex justify-center mt-4 text-bc-red">
                  {step.icon}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default ServiceProcess;
