
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
    title: "Roof Cleaning",
    description: "Remove moss, algae and debris for longer roof life",
    image: "/lovable-uploads/4da7d34a-a303-4274-ad91-8aeb980fa657.png",
    link: "/services/roof-cleaning"
  }];
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">Our Services</h2>
        <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Professional exterior cleaning services for residential and commercial properties
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-xl">
              <div className="h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link to={service.link} className="text-bc-red font-medium flex items-center hover:text-red-700 transition-colors">
                  Learn more <ArrowRight className="ml-2" size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild variant="bc-red" size="lg" className="rounded-full px-8">
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
