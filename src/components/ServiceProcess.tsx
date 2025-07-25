
import React, { ReactNode } from 'react';

export interface ServiceProcessItemProps {
  title: string;
  description: string;
  icon: ReactNode;
  number: number;
}

export interface ServiceProcessProps {
  processes?: { title: string; description: string; icon: ReactNode }[];
  title?: string;
  description?: string;
  icon?: ReactNode;
  number?: number;
}

const ServiceProcess: React.FC<ServiceProcessProps> = ({ processes, title, description, icon, number }) => {
  // If processes array is provided, render multiple items
  if (processes && processes.length > 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {processes.map((process, index) => (
          <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm relative">
            <div className="bg-gray-100 rounded-full p-4 mb-4">
              {process.icon}
            </div>
            <div className="absolute -top-2 -right-2 bg-bc-red text-white h-8 w-8 flex items-center justify-center rounded-full font-bold">
              {index + 1}
            </div>
            <h3 className="text-xl font-semibold mb-2">{process.title}</h3>
            <p className="text-gray-600">{process.description}</p>
          </div>
        ))}
      </div>
    );
  }
  
  // Otherwise, it's used as a single process item (backward compatibility)
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm relative">
      <div className="bg-gray-100 rounded-full p-4 mb-4">
        {icon}
      </div>
      <div className="absolute -top-2 -right-2 bg-bc-red text-white h-8 w-8 flex items-center justify-center rounded-full font-bold">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ServiceProcess;
