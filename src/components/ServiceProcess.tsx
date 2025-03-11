
import { ReactNode } from 'react';

interface ProcessItem {
  title: string;
  description: string;
  icon: ReactNode;
}

interface ServiceProcessProps {
  processes: ProcessItem[];
}

const ServiceProcess = ({ processes }: ServiceProcessProps) => {
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
};

export default ServiceProcess;
