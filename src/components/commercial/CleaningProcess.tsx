
import React, { ReactNode } from 'react';

interface Process {
  title: string;
  description: string;
  icon: ReactNode;
}

interface CleaningProcessProps {
  processes: Process[];
}

const CleaningProcess = ({ processes }: CleaningProcessProps) => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Professional Cleaning Process</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          We follow a thorough, systematic approach to ensure consistently excellent results for every commercial window cleaning project.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {processes.map((process, index) => (
          <div key={index} className="bg-gray-50 p-8 rounded-lg text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              {process.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{process.title}</h3>
            <p className="text-gray-600">{process.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CleaningProcess;
