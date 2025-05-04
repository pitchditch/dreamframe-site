
import React, { ReactNode } from 'react';
import { Shield, Construction, CheckCircle } from 'lucide-react';
import ServiceProcess from '../ServiceProcess';

interface Process {
  title: string;
  description: string;
  icon: ReactNode;
}

interface ServiceProcessProps {
  title: string;
  description: string;
  icon: ReactNode;
  number: number;
}

const ProcessSection: React.FC = () => {
  const processes: Process[] = [{
    title: "Initial Assessment",
    description: "We inspect all windows to identify construction residues, adhesives, paint, and other materials that need special attention.",
    icon: <Shield size={32} />
  }, {
    title: "Debris Removal",
    description: "We carefully remove larger debris, labels, stickers, and protective films from all window surfaces.",
    icon: <Construction size={32} />
  }, {
    title: "Deep Cleaning",
    description: "Using professional-grade solutions and equipment, we thoroughly clean glass, frames, tracks, and sills.",
    icon: <CheckCircle size={32} />
  }];
  
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Our Process</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our systematic approach ensures your post-construction windows are thoroughly cleaned and looking their best.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {processes.map((process, index) => (
            <ServiceProcess 
              key={index}
              title={process.title} 
              description={process.description} 
              icon={process.icon} 
              number={index + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
