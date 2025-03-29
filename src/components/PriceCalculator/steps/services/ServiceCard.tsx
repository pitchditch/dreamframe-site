
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
            {/* Use a custom rendered checkbox instead of the interactive component */}
            <div className="relative w-4 h-4 border rounded-sm border-primary flex items-center justify-center">
              {isSelected && (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="h-3 w-3 text-primary-foreground"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
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
