
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ServiceSelectionSection = () => {
  const services = [
    {
      title: 'House Washing',
      description: 'Complete exterior house cleaning',
      icon: '🏠',
      href: '/services/house-washing'
    },
    {
      title: 'Window Cleaning',
      description: 'Crystal clear windows inside & out',
      icon: '🪟',
      href: '/services/window-cleaning'
    },
    {
      title: 'Pressure Washing',
      description: 'Driveways, patios & walkways',
      icon: '🚿',
      href: '/services/pressure-washing'
    },
    {
      title: 'Gutter Cleaning',
      description: 'Complete gutter maintenance',
      icon: '🏘️',
      href: '/services/gutter-cleaning'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Do You Need Cleaned?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose from our professional cleaning services to make your property shine
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <Button asChild variant="outline" className="w-full">
                <Link to={service.href}>Learn More</Link>
              </Button>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild size="lg" variant="bc-red">
            <Link to="/calculator">Get Free Quote</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServiceSelectionSection;
