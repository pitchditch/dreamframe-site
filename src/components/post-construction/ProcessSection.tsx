import React, { ReactNode } from 'react';
import { Shield, Construction, CheckCircle } from 'lucide-react';
import ServiceProcess from '../ServiceProcess';
interface Process {
  title: string;
  description: string;
  icon: ReactNode;
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
  return;
};
export default ProcessSection;