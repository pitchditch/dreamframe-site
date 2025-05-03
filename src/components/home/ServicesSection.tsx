
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ServicesSection = () => {
  const services = [
    {
      title: "Window Cleaning",
      description: "Professional window cleaning for crystal clear views",
      image: "/lovable-uploads/73ff1153-6589-4537-996a-1ff5f512cbea.png",
      link: "/services/window-cleaning"
    },
    {
      title: "Pressure Washing",
      description: "Restore surfaces to their original beauty",
      image: "/lovable-uploads/c349ee7a-bdd4-43c8-a168-a68aa3b007e3.png",
      link: "/services/pressure-washing"
    },
    {
      title: "Gutter Cleaning",
      description: "Prevent water damage with clean, flowing gutters",
      image: "/lovable-uploads/0c2175e3-0c77-4b8a-8670-db9aa6ff6e63.png",
      link: "/services/gutter-cleaning"
    },
    {
      title: "Roof Cleaning",
      description: "Remove moss, algae and debris for longer roof life",
      image: "/lovable-uploads/4da7d34a-a303-4274-ad91-8aeb980fa657.png",
      link: "/services/roof-cleaning"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Professional Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We deliver exceptional cleaning solutions for your home's exterior using state-of-the-art equipment and eco-friendly products.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Button variant="outline" asChild className="w-full">
                  <Link to={service.link}>
                    Learn More <ArrowRight className="ml-2" size={16} />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Button asChild variant="bc-red" size="lg">
            <Link to="/services">
              View All Services <ArrowRight className="ml-2" size={18} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
