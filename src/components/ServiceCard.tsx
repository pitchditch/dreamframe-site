
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

interface ServiceCardProps {
  title: string;
  description: string;
  link: string;
  icon?: React.ReactNode;
  image?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, link, icon, image }) => {
  const { t } = useTranslation();
  
  return (
    <div className="relative service-card h-full flex flex-col overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl w-full">
      {/* Image container with fixed height and full width */}
      <div className="relative h-52 sm:h-60 w-full overflow-hidden">
        {image && (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
        {icon && (
          <div className="absolute top-4 left-4 p-2 bg-white/90 rounded-full">
            {icon}
          </div>
        )}
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm md:text-base flex-grow mb-4">{description}</p>
        <Link to={link} className="service-link mt-auto group flex items-center">
          <span className="mr-1">{t("Learn More")}</span> 
          <ArrowRight size={16} className="mt-0.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
