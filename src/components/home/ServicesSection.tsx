
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/use-translation';

const services = [
  {
    title: "House Washing",
    icon: "/lovable-uploads/8582dccb-5ab2-4365-b09f-3e6aaf801f95.png",
    description: "Restore your home's exterior to its original beauty",
    link: "/services/pressure-washing"
  },
  {
    title: "Window Cleaning",
    icon: "/lovable-uploads/b6e1b56e-31c1-4910-a4ec-b2631099b62c.png",
    description: "Crystal clear views from every window",
    link: "/services/window-cleaning"
  },
  {
    title: "Roof Cleaning",
    icon: "/lovable-uploads/37349814-fdee-4127-adc4-6f37694afb4f.png",
    description: "Remove moss, algae, and protect your investment",
    link: "/services/roof-cleaning"
  },
  {
    title: "Gutter Cleaning",
    icon: "/lovable-uploads/8141f18e-9a6f-47a1-b634-7b18a984f5c7.png",
    description: "Prevent water damage and maintain proper drainage",
    link: "/services/gutter-cleaning"
  }
];

const ServicesSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{t('Our Services')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Link to={service.link} key={index} className="block">
              <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-center mb-4">
                  <img 
                    src={service.icon} 
                    alt={service.title} 
                    className="h-24 w-24 object-contain transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">{service.title}</h3>
                <p className="text-gray-600 text-center">{service.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
