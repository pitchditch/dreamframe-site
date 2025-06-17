
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
  imageAlt?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, link, icon, image, imageAlt }) => {
  const { t } = useTranslation();
  
  return (
    <div className="relative service-card h-full flex flex-col overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
      <div className="relative h-48 sm:h-56 w-full overflow-hidden">
        {image && (
          <img 
            src={image} 
            alt={imageAlt || title} 
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
      
      <div className="p-6 flex-grow flex flex-col bg-white">
        <h3 className="text-2xl font-bold mb-3 text-charcoal leading-tight">{title}</h3>
        <p className="text-navy/80 text-lg md:text-xl flex-grow mb-4 leading-relaxed">{description}</p>
        <Link 
          to={link} 
          className="service-link mt-auto group flex items-center text-bc-red hover:text-bc-red/80 text-lg font-semibold"
        >
          <span className="mr-1">{t("Learn More")}</span> 
          <ArrowRight size={18} className="mt-0.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
