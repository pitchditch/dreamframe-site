
import React from 'react';
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';
import HoverImageSlideshow from '@/components/HoverImageSlideshow';
import ServiceVideoOverlay from '@/components/ServiceVideoOverlay';
import type { Service } from './serviceData';

interface ServiceCardProps {
  service: Service;
  index: number;
  hoveredService: number | null;
  onServiceClick: (serviceId: string) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onVideoClose: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  index,
  hoveredService,
  onServiceClick,
  onMouseEnter,
  onMouseLeave,
  onVideoClose
}) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const IconComponent = service.icon;

  // Determine icon color and size based on service
  const getIconStyles = () => {
    if (service.id === 'commercial') {
      return "w-8 h-8 text-gray-600"; // Dark gray for commercial
    } else if (service.id === 'roof-cleaning') {
      return "w-12 h-12 text-bc-red"; // Much larger for roof cleaning
    } else {
      return "w-8 h-8 text-bc-red";
    }
  };

  // Get image size based on service
  const getImageSize = () => {
    if (service.id === 'roof-cleaning') {
      return isMobile ? 'w-28 h-28' : 'w-36 h-36'; // Bigger for roof cleaning
    }
    return isMobile ? 'w-24 h-24' : 'w-32 h-32';
  };

  return (
    <div
      key={service.id}
      onClick={() => onServiceClick(service.id)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`group cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 ${
        isMobile ? 'p-4' : 'p-8'
      }`}
    >
      <div className="flex items-center gap-6">
        {/* Image container */}
        <div className={`relative ${isMobile ? 'mb-0' : 'mb-0'} overflow-hidden rounded-lg flex-shrink-0`}>
          <HoverImageSlideshow 
            images={service.slideImages} 
            interval={2500}
            altText={`${service.title} showcase`}
          >
            <img 
              src={service.image} 
              alt={service.title}
              className={`${getImageSize()} object-cover transition-transform duration-300 group-hover:scale-110 rounded-lg`}
            />
          </HoverImageSlideshow>
          <div className="absolute inset-0 bg-bc-red/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
            {service.customIcon ? (
              <img 
                src={service.customIcon} 
                alt={`${service.title} icon`}
                className={service.id === 'roof-cleaning' ? "w-12 h-12" : "w-8 h-8"}
              />
            ) : (
              <IconComponent className={getIconStyles()} />
            )}
          </div>
          
          <ServiceVideoOverlay
            videoId={service.videoId}
            isHovering={hoveredService === index}
            onClose={onVideoClose}
          />
        </div>
        
        {/* Content container */}
        <div className="flex-1">
          <h3 className={`${isMobile ? 'text-lg' : 'text-xl md:text-2xl'} font-bold text-gray-900 mb-3 group-hover:text-bc-red transition-colors`}>
            {t(service.title)}
          </h3>
          
          <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
            {t(service.description)}
          </p>
          
          <div className={`${isMobile ? 'mt-2' : 'mt-4'} w-12 h-1 bg-bc-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full`}></div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
