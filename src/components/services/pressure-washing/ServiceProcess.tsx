
import React, { ReactNode } from 'react';
import ServiceProcess from '@/components/ServiceProcess';

interface Process {
  title: string;
  description: string;
  icon: ReactNode;
}

interface PressureWashingProcessProps {
  processes: Process[];
}

const PressureWashingProcess: React.FC<PressureWashingProcessProps> = ({ processes }) => {
  return <ServiceProcess processes={processes} />;
};

export default PressureWashingProcess;
