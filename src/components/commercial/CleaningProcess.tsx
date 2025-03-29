
import ServiceProcess from '../ServiceProcess';
import { ReactNode } from 'react';

export interface ProcessItem {
  title: string;
  description: string;
  icon: ReactNode;
}

interface CleaningProcessProps {
  processes: ProcessItem[];
}

const CleaningProcess = ({ processes }: CleaningProcessProps) => {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="section-title">Our Commercial Window Cleaning Process</h2>
      <p className="section-subtitle">
        We follow a comprehensive approach to deliver spotless windows for your commercial property
      </p>
      <ServiceProcess processes={processes} />
    </section>
  );
};

export default CleaningProcess;
