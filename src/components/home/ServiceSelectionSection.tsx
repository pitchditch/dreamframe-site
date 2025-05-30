
import React from 'react';
import { Home, Droplets, Car, Building, Truck, Sparkles } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';

interface Service {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  image: string;
  description: string;
}

const ServiceSelectionSection = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const services: Service[] = [
    {
      id: 'house-washing',
      title: t('House Washing'),
      icon: Home,
      image: '/lovable-uploads/5608bf56-7f0e-4f7f-9bb0-5ba81b9d267e.png',
      description: t('Complete exterior house cleaning')
    },
    {
      id: 'window-cleaning',
      title: t('Window Cleaning'),
      icon: Sparkles,
      image: '/lovable-uploads/104fb195-8227-4f8c-af68-5406acc5388a.png',
      description: t('Crystal clear window cleaning')
    },
    {
      id: 'driveway-cleaning',
      title: t('Driveway Cleaning'),
      icon: Truck,
      image: '/lovable-uploads/80972bf0-3700-43b0-8983-d5861531bf57.png',
      description: t('Remove stains and restore surfaces')
    },
    {
      id: 'roof-cleaning',
      title: t('Roof Cleaning'),
      icon: Building,
      image: '/lovable-uploads/0c0d106e-85ea-4490-9176-1d36821732c1.png',
      description: t('Safe moss and algae removal')
    },
    {
      id: 'gutter-cleaning',
      title: t('Gutter Cleaning'),
      icon: Droplets,
      image: '/lovable-uploads/4f0a7bbd-e220-49bd-80ec-c83bb961b38f.png',
      description: t('Complete gutter system cleaning')
    },
    {
      id: 'commercial',
      title: t('Commercial Services'),
      icon: Building,
      image: '/lovable-uploads/b5f7b3b1-4a41-4e10-963f-72eef95a03c4.png',
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
            {t("What Do You Need Pressure Washed?")}
          </h2>
          <p className={`${isMobile ? 'text-lg' : 'text-xl'} text-gray-600 max-w-3xl mx-auto`}>
            {t("Click a service below to request a free estimate")}
          </p>
        </div>

        <div className={`grid ${isMobile ? 'grid-cols-2 gap-4' : 'grid-cols-2 md:grid-cols-3 gap-8'} max-w-6xl mx-auto`}>
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                onClick={() => handleServiceClick(service.id)}
                className={`group cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 ${
                  isMobile ? 'p-4' : 'p-8'
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`relative ${isMobile ? 'mb-4' : 'mb-6'} overflow-hidden rounded-lg`}>
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className={`${isMobile ? 'w-24 h-24' : 'w-32 h-32'} object-cover transition-transform duration-300 group-hover:scale-110 rounded-lg`}
                    />
                    <div className="absolute inset-0 bg-bc-red/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                      <IconComponent className="w-8 h-8 text-bc-red" />
                    </div>
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
