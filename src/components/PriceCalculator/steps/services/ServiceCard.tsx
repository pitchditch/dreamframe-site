
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    description?: string;
    price?: number;
    image?: string;
  };
  isSelected: boolean;
  onToggle: (id: string) => void;
  children?: React.ReactNode;
}

const ServiceCard = ({ service, isSelected, onToggle, children }: ServiceCardProps) => {
  const handleToggle = () => {
    onToggle(service.id);
  };

  return (
    <Card className={`p-0 overflow-hidden ${isSelected ? 'border-2 border-blue-500' : 'border border-gray-200'}`}>
      <div 
        className="p-4 cursor-pointer"
        onClick={handleToggle}
      >
        <div className="flex items-center mb-2">
          <div className="flex items-center justify-center w-6 h-6 mr-3">
            <Checkbox 
              checked={isSelected}
              onCheckedChange={() => handleToggle()}
              // Prevent propagation to avoid double firing with the parent div click
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <span className="font-semibold text-lg">{service.title}</span>
        </div>
        
        {service.description && (
          <p className="text-gray-600 text-sm mb-2">{service.description}</p>
        )}
        
        {service.price && (
          <div className="font-bold text-blue-600">${service.price}</div>
        )}
      </div>
      
      {children && (
        <div className={`bg-gray-50 p-4 border-t ${isSelected ? 'block' : 'hidden'}`}>
          {children}
        </div>
      )}
    </Card>
  );
};

export default ServiceCard;
