
import React, { useState } from 'react';
import { Home, Droplets, Car, Building, Truck, Sparkles } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';
import HoverImageSlideshow from '../HoverImageSlideshow';
import ServiceVideoOverlay from '../ServiceVideoOverlay';
import { testimonials } from '@/data/testimonials';

interface Service {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  image: string;
  slideImages: string[];
  videoId: string;
  description: string;
}

const ServiceSelectionSection = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  // Filter testimonial images by service type
  const windowCleaningImages = testimonials
    .filter(t => t.service === 'window-cleaning' && t.beforeAfterImage)
    .map(t => t.beforeAfterImage as string);
  
  const houseWashingImages = testimonials
    .filter(t => t.service === 'pressure-washing' && t.beforeAfterImage)
    .map(t => t.beforeAfterImage as string);
  
  const gutterCleaningImages = testimonials
    .filter(t => t.service === 'gutter-cleaning' && t.beforeAfterImage)
    .map(t => t.beforeAfterImage as string);
  
  const roofCleaningImages = testimonials
    .filter(t => t.service === 'roof-cleaning' && t.beforeAfterImage)
    .map(t => t.beforeAfterImage as string);

  const services: Service[] = [
    {
      id: 'house-washing',
      title: t('House Soft Wash'),
      icon: Home,
      image: '/lovable-uploads/8fd22796-68ae-4cb7-a6f3-4743b0d93a37.png',
      slideImages: houseWashingImages,
      videoId: 'lYnXijewxCM',
      description: t('Gentle exterior house cleaning')
    },
    {
      id: 'window-cleaning',
      title: t('Window Cleaning'),
      icon: Sparkles,
      image: '/lovable-uploads/104fb195-8227-4f8c-af68-5406acc5388a.png',
      slideImages: windowCleaningImages,
      videoId: 'bbHnt4UNPcU',
      description: t('Crystal clear window cleaning')
    },
    {
      id: 'driveway-cleaning',
      title: t('Driveway Cleaning'),
      icon: Car,
      image: '/lovable-uploads/4bc56646-a50c-4c86-aeeb-997bd1c1c579.png',
      slideImages: ['/lovable-uploads/80972bf0-3700-43b0-8983-d5861531bf57.png', '/lovable-uploads/ff861e81-c504-47c8-aae7-5319b9ad2ab4.png'],
      videoId: 'lYnXijewxCM',
      description: t('Remove stains and restore surfaces')
    },
    {
      id: 'roof-cleaning',
      title: t('Roof Cleaning'),
      icon: Building,
      image: '/lovable-uploads/0c0d106e-85ea-4490-9176-1d36821732c1.png',
      slideImages: roofCleaningImages,
      videoId: 'eQSgdx9ujcc',
      description: t('Safe moss and algae removal')
    },
    {
      id: 'gutter-cleaning',
      title: t('Gutter Cleaning'),
      icon: Droplets,
      image: '/lovable-uploads/4f0a7bbd-e220-49bd-80ec-c83bb961b38f.png',
      slideImages: gutterCleaningImages,
      videoId: 'EdMlx1sYJDc',
      description: t('Complete gutter system cleaning')
    },
    {
      id: 'commercial',
      title: t('Commercial Services'),
      icon: Building,
      image: '/lovable-uploads/b5f7b3b1-4a41-4e10-963f-72eef95a03c4.png',
      slideImages: ['/lovable-uploads/b5f7b3b1-4a41-4e10-963f-72eef95a03c4.png', '/lovable-uploads/481b70c0-733d-4cc9-9629-3628731d87e4.png'],
      videoId: 'lYnXijewxCM',
      description: t('Professional commercial cleaning')
    }
  ];

  const handleServiceClick = (serviceId: string) => {
    // Scroll to the contact form
    const contactForm = document.querySelector('[data-contact-form]');
    if (contactForm) {
      contactForm.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
    
    // Store selected service for form pre-filling
    sessionStorage.setItem('selectedService', serviceId);
    
    // Dispatch custom event to notify the form
    window.dispatchEvent(new CustomEvent('serviceSelected', { 
      detail: { serviceId } 
    }));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-bold mb-6 text-gray-900`}>
            {t("What Can We Make Shine Today?")}
          </h2>
          <p className={`${isMobile ? 'text-lg' : 'text-xl'} text-gray-600 max-w-3xl mx-auto`}>
            {t("Choose a service to get instant pricing")}
          </p>
        </div>

        <div className={`grid ${isMobile ? 'grid-cols-2 gap-4' : 'grid-cols-2 md:grid-cols-3 gap-8'} max-w-6xl mx-auto`}>
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                onClick={() => handleServiceClick(service.id)}
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
                className={`group cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 ${
                  isMobile ? 'p-4' : 'p-8'
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`relative ${isMobile ? 'mb-4' : 'mb-6'} overflow-hidden rounded-lg`}>
                    <HoverImageSlideshow 
                      images={service.slideImages} 
                      interval={2500}
                      altText={`${service.title} showcase`}
                    >
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className={`${isMobile ? 'w-24 h-24' : 'w-32 h-32'} object-cover transition-transform duration-300 group-hover:scale-110 rounded-lg`}
                      />
                    </HoverImageSlideshow>
                    <div className="absolute inset-0 bg-bc-red/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                      <IconComponent className="w-8 h-8 text-bc-red" />
                    </div>
                    
                    <ServiceVideoOverlay
                      videoId={service.videoId}
                      isHovering={hoveredService === index}
                      onClose={() => setHoveredService(null)}
                    />
                  </div>
                  
                  <h3 className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} font-bold text-gray-900 mb-3 group-hover:text-bc-red transition-colors`}>
                    {service.title}
                  </h3>
                  
                  {!isMobile && (
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      {service.description}
                    </p>
                  )}
                  
                  <div className={`${isMobile ? 'mt-2' : 'mt-4'} w-12 h-1 bg-bc-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full`}></div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={`text-center ${isMobile ? 'mt-12' : 'mt-16'}`}>
          <p className={`${isMobile ? 'text-base' : 'text-lg'} text-gray-600`}>
            {t("Need a custom quote?")} 
            <button 
              onClick={() => handleServiceClick('custom')}
              className="ml-2 text-bc-red hover:text-red-700 font-semibold underline"
            >
              {t("Contact us directly")}
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceSelectionSection;
