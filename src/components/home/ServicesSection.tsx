
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ServicesSection = () => {
  const services = [{
    title: "Window Cleaning",
    description: "Professional window cleaning for crystal clear views",
    image: "/lovable-uploads/73ff1153-6589-4537-996a-1ff5f512cbea.png",
    link: "/services/window-cleaning"
  }, {
    title: "Pressure Washing",
    description: "Restore surfaces to their original beauty",
    image: "/lovable-uploads/c349ee7a-bdd4-43c8-a168-a68aa3b007e3.png",
    link: "/services/pressure-washing"
  }, {
    title: "Gutter Cleaning",
    description: "Prevent water damage with clean, flowing gutters",
    image: "/lovable-uploads/0c2175e3-0c77-4b8a-8670-db9aa6ff6e63.png",
    link: "/services/gutter-cleaning"
  }, {
    title: "Roof Cleaning",
    description: "Remove moss, algae and debris for longer roof life",
    image: "/lovable-uploads/4da7d34a-a303-4274-ad91-8aeb980fa657.png",
    link: "/services/roof-cleaning"
  }];
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-50 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
              <img 
                src={service.image} 
                alt={service.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link to={service.link}>
                  <Button variant="outline" className="w-full group">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/services">
            <Button className="bg-bc-red hover:bg-red-700 text-white px-8 py-3 rounded-md font-medium">
              View All Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
