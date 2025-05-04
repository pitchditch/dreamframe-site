
import React, { ReactNode } from 'react';

export interface ServiceProcessProps {
  title: string;
  description: string;
  icon: ReactNode;
  number: number;
}

const ServiceProcess: React.FC<ServiceProcessProps> = ({ title, description, icon, number }) => {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
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
