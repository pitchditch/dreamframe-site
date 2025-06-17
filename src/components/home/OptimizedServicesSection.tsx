
import { ArrowRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const OptimizedServicesSection = () => {
  const services = [
    {
      title: "Window Cleaning",
      benefit: "Restore crystal-clear windows",
      description: "Professional window cleaning for streak-free results",
      image: "/lovable-uploads/73ff1153-6589-4537-996a-1ff5f512cbea.png",
      link: "/services/window-cleaning"
    },
    {
      title: "Gutter Cleaning", 
      benefit: "Protect gutters from clogs",
      description: "Complete gutter system cleaning and maintenance",
      image: "/lovable-uploads/c349ee7a-bdd4-43c8-a168-a68aa3b007e3.png",
      link: "/services/gutter-cleaning"
    },
    {
      title: "House Soft Wash",
      benefit: "Revitalize your home's exterior", 
      description: "Gentle soft washing for siding and surfaces",
      image: "/lovable-uploads/4da7d34a-a303-4274-ad91-8aeb980fa657.png",
      link: "/services/house-washing"
    },
    {
      title: "Roof Cleaning",
      benefit: "Eliminate moss and algae safely",
      description: "Professional roof cleaning and protection",
      image: "/lovable-uploads/4da7d34a-a303-4274-ad91-8aeb980fa657.png", 
      link: "/services/roof-cleaning"
    },
    {
      title: "Pressure Washing",
      benefit: "Remove stubborn stains completely",
      description: "High-pressure cleaning for driveways and patios",
      image: "/lovable-uploads/c349ee7a-bdd4-43c8-a168-a68aa3b007e3.png",
      link: "/services/pressure-washing"
    },
    {
      title: "Commercial Services", 
      benefit: "Maintain professional appearance",
      description: "Commercial exterior cleaning solutions",
      image: "/lovable-uploads/73ff1153-6589-4537-996a-1ff5f512cbea.png",
      link: "/services/commercial"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="flex items-center bg-green-50 px-4 py-2 rounded-full">
            <span className="text-green-800 font-medium">✓ Fully Insured & Licensed</span>
          </div>
          <div className="flex items-center bg-yellow-50 px-4 py-2 rounded-full">
            <span className="text-yellow-800 font-medium">⭐ 5-Star Rated Service</span>
          </div>
          <div className="flex items-center bg-blue-50 px-4 py-2 rounded-full">
            <span className="text-blue-800 font-medium">🏠 Locally Owned</span>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Surrey & White Rock's 5★ Exterior Cleaning
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Free quotes in 60 seconds • Same-day availability • Serving Surrey, White Rock, Langley & Greater Vancouver
          </p>
          
          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button asChild size="lg" className="bg-bc-red hover:bg-red-700 text-lg px-8">
              <Link to="/calculator">Get My Free Quote</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <a href="tel:778-808-7620" className="flex items-center">
                <Phone className="mr-2" size={20} />
                Call (778) 808-7620
              </a>
            </Button>
          </div>

          {/* Core Services Bullets */}
          <div className="max-w-2xl mx-auto">
            <ul className="text-left space-y-2 text-lg">
              <li className="flex items-center">
                <span className="text-bc-red mr-2">•</span>
                Professional window & gutter cleaning
              </li>
              <li className="flex items-center">
                <span className="text-bc-red mr-2">•</span>
                Pressure washing & soft washing services
              </li>
              <li className="flex items-center">
                <span className="text-bc-red mr-2">•</span>
                Commercial & residential properties
              </li>
            </ul>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-8 text-center">What Can We Make Shine Today?</h3>
        <p className="text-center text-gray-600 mb-8">Choose a service to get instant pricing</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-xl border border-gray-100">
              <div className="h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h4 className="font-bold text-xl mb-2">{service.title}</h4>
                <p className="text-bc-red font-medium mb-2">{service.benefit}</p>
                <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
                <Link to={service.link} className="text-bc-red font-medium flex items-center hover:text-red-700 transition-colors">
                  Instant Pricing <ArrowRight className="ml-2" size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">Need a custom quote?</p>
          <Button asChild variant="outline" size="lg">
            <Link to="/contact">Contact us directly</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OptimizedServicesSection;
