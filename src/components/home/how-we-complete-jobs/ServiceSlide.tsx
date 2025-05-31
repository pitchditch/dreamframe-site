
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import type { Service } from './types';

interface ServiceSlideProps {
  service: Service;
  isActive: boolean;
}

const ServiceSlide = ({ service, isActive }: ServiceSlideProps) => {
  const isMobile = useIsMobile();
  const IconComponent = service.icon;

  return (
    <div 
      className={`absolute inset-0 transition-opacity duration-500 ${
        isActive ? 'opacity-100 z-10' : 'opacity-0'
      }`}
    >
      <div className="relative w-full h-full">
        <img 
          src={service.image} 
          alt={service.title}
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      {/* Overlay Image in Corner */}
      {service.overlayImage && (
        <div className={`absolute ${isMobile ? 'top-2 right-2' : 'top-6 right-6'} bg-white/95 backdrop-blur-sm rounded-lg ${isMobile ? 'p-2 max-w-[200px]' : 'p-4 max-w-xs'} shadow-lg z-20`}>
          <div className="flex items-start gap-3">
            <img 
              src={service.overlayImage} 
              alt={service.overlayTitle}
              className={`${isMobile ? 'w-12 h-12' : 'w-16 h-16'} object-contain flex-shrink-0`}
            />
            <div className="flex-1 min-w-0">
              <h4 className={`font-bold ${isMobile ? 'text-xs' : 'text-sm'} text-gray-900 mb-1`}>
                {service.overlayTitle}
              </h4>
              <p className={`${isMobile ? 'text-xs' : 'text-xs'} text-gray-700 leading-tight`}>
                {service.overlayDescription}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Content overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end">
        <div className="px-4 md:px-8 pb-8 md:pb-12">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-bc-red rounded-full flex items-center justify-center text-white">
                <IconComponent className="w-5 h-5" />
              </div>
              <h3 className={`${isMobile ? 'text-xl' : 'text-2xl md:text-3xl'} font-bold text-white`}>
                {service.title}
              </h3>
            </div>
            
            <p className={`${isMobile ? 'text-base mb-4' : 'text-lg md:text-xl mb-6'} text-white/90 leading-relaxed`}>
              {service.description}
            </p>
            
            <div className={`grid ${isMobile ? 'grid-cols-1 gap-2' : 'grid-cols-2 gap-3'}`}>
              {service.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-bc-red rounded-full mt-2 flex-shrink-0"></div>
                  <span className={`${isMobile ? 'text-sm' : 'text-base'} text-white/90`}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSlide;
