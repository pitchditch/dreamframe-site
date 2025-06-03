
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

        {/* Grid layout: 3 columns and 2 rows */}
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
          <p className={`${isMobile ? 'text-base' : 'text-lg'} text-gray-600 mb-6`}>
            {t("Need a custom quote?")} 
            <button 
              onClick={() => handleServiceClick('custom')}
              className="ml-2 text-bc-red hover:text-red-700 font-semibold underline"
            >
              {t("Contact us directly")}
            </button>
          </p>
          
          {/* Enhanced Compare Prices Button */}
          <div className="mt-8">
            <button 
              onClick={() => window.location.href = '/compare-services'}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-bc-red to-red-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-bc-red opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span>Compare Our Prices & Packages</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSelectionSection;
