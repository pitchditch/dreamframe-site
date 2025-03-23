
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    description: string;
    hasOptions: boolean;
  };
  isSelected: boolean;
  onToggle: (serviceId: string) => void;
  children?: React.ReactNode;
}

const ServiceCard = ({ service, isSelected, onToggle, children }: ServiceCardProps) => {
  return (
    <Card className={`p-0 overflow-hidden ${isSelected ? 'border-2 border-blue-500' : 'border border-gray-200'}`}>
      <div 
        className="p-4 cursor-pointer"
        onClick={() => onToggle(service.id)}
      >
        <div className="flex items-center mb-2">
          <div className="flex items-center justify-center w-6 h-6 mr-3">
            <Checkbox 
              checked={isSelected}
              // No onCheckedChange to avoid double updates
            />
          </div>
          <span className="font-semibold text-lg">{service.title}</span>
        </div>
        <p className="text-gray-600 ml-9">{service.description}</p>
      </div>
      
      {isSelected && service.hasOptions && children}
    </Card>
  );
};

export default ServiceCard;
