
import React, { useState } from 'react';
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';
import { services } from './ServiceSelectionSection/serviceData';
import ServiceCard from './ServiceSelectionSection/ServiceCard';

const ServiceSelectionSection = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [hoveredService, setHoveredService] = useState<number | null>(null);

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

        {/* Grid layout: 2 rows of 3 columns */}
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-3 gap-8'} max-w-6xl mx-auto`}>
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              hoveredService={hoveredService}
              onServiceClick={handleServiceClick}
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
              onVideoClose={() => setHoveredService(null)}
            />
          ))}
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
