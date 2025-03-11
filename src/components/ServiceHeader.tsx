
import { ReactNode } from 'react';

interface ServiceHeaderProps {
  title: string;
  description: string;
  icon?: ReactNode;
  imagePath: string;
}

const ServiceHeader = ({ title, description, icon, imagePath }: ServiceHeaderProps) => {
  return (
    <div className="relative bg-black text-white mb-16">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${imagePath})` }}
      />
      <div className="relative container mx-auto px-4 py-24 text-center">
        {icon && <div className="inline-block text-bc-red mb-4">{icon}</div>}
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-200">{description}</p>
      </div>
    </div>
  );
};

export default ServiceHeader;
