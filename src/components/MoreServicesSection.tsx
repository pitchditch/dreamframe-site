
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const MoreServicesSection = () => {
  const services = [
    {
      title: "Window Cleaning",
      description: "Professional window cleaning for a crystal-clear view",
      image: "/lovable-uploads/78a787e6-42d7-4f1e-85ef-7c58c848abaa.png",
      link: "/services/window-cleaning"
    },
    {
      title: "Gutter Cleaning",
      description: "Keep your gutters flowing freely and prevent water damage",
      image: "/lovable-uploads/ff0fc949-bae9-4f8b-a408-2322698b8479.png",
      link: "/services/gutter-cleaning"
    },
    {
      title: "Roof Cleaning",
      description: "Remove moss, algae and debris to extend your roof's lifespan",
      image: "/lovable-uploads/a4936873-69e7-4c50-b7db-d8b1cba1d80a.png",
      link: "/services/roof-cleaning"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Looking For Other Services?</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Explore our full range of professional exterior cleaning services for your home or business.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col hover:shadow-xl transition-shadow">
              <div className="h-80 w-full overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-6 flex-1">{service.description}</p>
                <Button asChild variant="ghost" className="group flex items-center mt-auto">
                  <Link to={service.link}>
                    Learn More
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoreServicesSection;
