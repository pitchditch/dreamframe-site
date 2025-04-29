
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/use-translation';

const services = [
  {
    title: "House Washing",
    icon: "/lovable-uploads/dd816e92-c307-427b-876b-7660f0fd21ac.png",
    description: "Restore your home's exterior to its original beauty",
    link: "/services/pressure-washing"
  },
  {
    title: "Window Cleaning",
    icon: "/lovable-uploads/e8c7869e-c964-4cce-abc9-39b7beb5f321.png",
    description: "Crystal clear views from every window",
    link: "/services/window-cleaning"
  },
  {
    title: "Roof Cleaning",
    icon: "/lovable-uploads/73544240-3f5f-4345-b744-1d8c2f45f8cf.png",
    description: "Remove moss, algae, and protect your investment",
    link: "/services/roof-cleaning"
  },
  {
    title: "Gutter Cleaning",
    icon: "/lovable-uploads/b2f45089-a8a1-40c1-b5e6-096ef277b16e.png",
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
                    className="h-24 w-24 object-contain transition-transform duration-300 hover:scale-110" /* Added scale effect on hover */
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
