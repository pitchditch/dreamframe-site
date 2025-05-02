
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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="badge-pill">Professional Services</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Exterior Cleaning Services</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We offer a complete range of exterior cleaning services to keep your property looking its best. From window cleaning to pressure washing, our team delivers superior results.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <div className="mr-3">{service.icon}</div>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Button asChild variant="ghost" className="w-full justify-between hover:bg-gray-50">
                  <Link to={service.link}>
                    Learn More <ArrowRight size={16} />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild variant="bc-red" size="lg">
            <Link to="/services">View All Services <ArrowRight size={16} className="ml-2" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
