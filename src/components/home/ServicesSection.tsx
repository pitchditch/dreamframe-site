
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
        <div className="text-center max-w-3xl mx-auto">
          <span className="badge-pill mx-auto w-fit">Our Services</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">Professional Exterior Cleaning Solutions</h2>
          <p className="text-gray-600 mb-12">
            We provide comprehensive exterior cleaning services designed to restore
            and maintain your property's appearance, value, and longevity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <div key={index} className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group">
              <Link to={service.link}>
                <div className="h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2 group-hover:text-bc-red transition-colors">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex items-center text-bc-red font-medium">
                    Learn more
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-2" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" className="border-bc-red text-bc-red hover:bg-bc-red hover:text-white px-8">
            <Link to="/services">View All Services <ArrowRight className="ml-2" size={16} /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
