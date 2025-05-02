
import React from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { Droplets, Home, Wind } from 'lucide-react';

const MoreServicesSection = () => {
  const services = [
    {
      title: 'Gutter Cleaning',
      description: 'Remove debris and ensure proper water flow to prevent costly damage.',
      icon: <Wind className="h-6 w-6 text-green-500" />,
      image: '/lovable-uploads/3f5a834d-b684-4522-a2a6-e877e036ccd8.png',
      link: '/services/gutter-cleaning'
    },
    {
      title: 'Pressure Washing',
      description: 'Restore the beauty of your property by removing dirt, grime, and stains.',
      icon: <Home className="h-6 w-6 text-bc-red" />,
      image: '/lovable-uploads/e76ecfc1-a3a8-44d8-9a4a-5e1bf7c32282.png',
      link: '/services/pressure-washing'
    },
    {
      title: 'Roof Cleaning',
      description: 'Remove moss, algae, and debris to extend the life of your roof.',
      icon: <Home className="h-6 w-6 text-amber-700" />,
      image: '/lovable-uploads/47504564-617f-4553-85c8-0f9f5d5ec715.png',
      link: '/services/roof-cleaning'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Looking for More Services?</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Explore our full range of professional cleaning services designed to enhance and protect your property.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <div className="mr-2 bg-white p-2 rounded-full shadow-sm">{service.icon}</div>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Button asChild variant="bc-red" className="w-full">
                  <Link to={service.link}>Learn More</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild variant="outline" className="border-bc-red text-bc-red hover:bg-bc-red hover:text-white">
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MoreServicesSection;
