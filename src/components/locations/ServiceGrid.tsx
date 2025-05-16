
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { 
  House, 
  WindowCleaning, 
  DrivewayCleaning, 
  HousePlus, 
  GutterCleaning, 
  RoofCleaning 
} from '@/components/Icons/ServicesIcons';

interface Service {
  icon: string;
  title: string;
  description: string;
  link?: string;
}

interface ServiceGridProps {
  services: Service[];
}

const ServiceGrid = ({ services }: ServiceGridProps) => {
  // Function to get the correct icon component
  const getIcon = (iconName: string, size = 48) => {
    switch (iconName) {
      case 'house':
        return <House className="text-bc-red" size={size} />;
      case 'window-cleaning':
        return <WindowCleaning className="text-bc-red" size={size} />;
      case 'driveway-cleaning':
        return <DrivewayCleaning className="text-bc-red" size={size} />;
      case 'house-plus':
        return <HousePlus className="text-bc-red" size={size} />;
      case 'gutter-cleaning':
        return <GutterCleaning className="text-bc-red" size={size} />;
      case 'roof-cleaning':
        return <RoofCleaning className="text-bc-red" size={size} />;
      default:
        return <House className="text-bc-red" size={size} />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 transition-shadow hover:shadow-lg">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4">
              {getIcon(service.icon)}
            </div>
            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            {service.link && (
              <Link to={service.link} className="text-bc-red font-medium flex items-center hover:underline">
                Learn more <ArrowRight className="ml-2" size={16} />
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceGrid;
