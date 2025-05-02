
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Droplets, Home, Wind, Warehouse } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ServicesSection = () => {
  const services = [{
    icon: <Droplets className="text-blue-500" size={32} />,
    title: "Window Cleaning",
    description: "Crystal clear windows for residential and commercial properties. We use professional-grade equipment for spotless results.",
    link: "/services/window-cleaning",
    image: "/lovable-uploads/0a2cc308-bda3-4478-9cf0-5efabde14b96.png"
  }, {
    icon: <Home className="text-bc-red" size={32} />,
    title: "Pressure Washing",
    description: "Revitalize your property with our powerful yet safe pressure washing services for driveways, siding, decks, and more.",
    link: "/services/pressure-washing",
    image: "/lovable-uploads/e76ecfc1-a3a8-44d8-9a4a-5e1bf7c32282.png"
  }, {
    icon: <Wind className="text-green-500" size={32} />,
    title: "Gutter Cleaning",
    description: "Prevent water damage with our thorough gutter cleaning. We remove debris and check for proper drainage.",
    link: "/services/gutter-cleaning",
    image: "/lovable-uploads/ff0fc949-bae9-4f8b-a408-2322698b8479.png"
  }, {
    icon: <Warehouse className="text-amber-600" size={32} />,
    title: "Commercial Services",
    description: "Specialized cleaning solutions for businesses, including storefronts, office buildings, and multi-unit properties.",
    link: "/services/commercial-pressure-washing",
    image: "/lovable-uploads/d9f3e980-9bd8-4f15-afb2-6df7cb095002.png"
  }];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Our Premium Services</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Professional exterior cleaning solutions for residential and commercial properties in Surrey, White Rock & Metro Vancouver.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all">
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{service.title}</h3>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center mb-4">
                  <div className="mr-3">{service.icon}</div>
                </div>
                <p className="text-gray-600 mb-4 min-h-[80px]">{service.description}</p>
                <Button asChild variant="link" className="text-bc-red pl-0 hover:text-red-700 hover:no-underline font-medium">
                  <Link to={service.link}>
                    Learn More <ArrowRight size={16} className="ml-1" />
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

export default ServicesSection;
