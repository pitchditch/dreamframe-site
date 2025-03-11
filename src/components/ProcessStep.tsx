
import { ReactNode } from 'react';

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
  icon: ReactNode;
}

const ProcessStep = ({ number, title, description, icon }: ProcessStepProps) => {
  return (
    <div className="relative">
      <div className="absolute -left-4 top-0 w-8 h-8 bg-bc-red rounded-full flex items-center justify-center text-white font-bold z-10">
        {number}
      </div>
      <div className="bg-gray-50 hover:bg-white transition-colors p-6 rounded-lg">
        <div className="flex justify-center mb-4 text-bc-red">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
        <p className="text-gray-600 text-center">{description}</p>
      </div>
    </div>
  );
};

export default ProcessStep;
