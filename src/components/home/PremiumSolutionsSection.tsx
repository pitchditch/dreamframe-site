
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PremiumSolutionsSection = () => {
  const services = [
    {
      title: "Window Cleaning",
      description: "Crystal-clear, streak-free windows using advanced pure water technology",
      image: "/lovable-uploads/55bfc658-50d0-48fe-ac66-4ba487558bb8.png",
      link: "/services/window-cleaning"
    },
    {
      title: "House Washing",
      description: "Safe soft washing techniques to restore your home's exterior beauty",
      image: "/lovable-uploads/64e17c22-a0ba-4ad1-94f6-60f204cf37b1.png",
      link: "/services/house-washing"
    },
    {
      title: "Gutter Cleaning",
      description: "Complete gutter cleaning and maintenance to prevent water damage",
      image: "/lovable-uploads/aead2bc0-52db-4534-b826-b41fe11a14a0.png",
      link: "/services/gutter-cleaning"
    },
    {
      title: "Roof Cleaning",
      description: "Gentle but effective moss and algae removal to protect your roof",
      image: "/lovable-uploads/fd20884f-f0f2-40f2-ac11-daa1fbd7f404.png",
      link: "/services/roof-cleaning"
    }
  ];

  return (
    <section 
      className="py-16 relative z-20 rounded-t-[40px] bg-white shadow-lg mt-20"
    >
      <div className="container mx-auto px-4 pt-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Premium Cleaning Solutions</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our professional exterior cleaning services deliver exceptional results using state-of-the-art equipment and eco-friendly products.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="overflow-hidden h-full hover:shadow-lg transition-shadow bg-white rounded-lg shadow">
              <div className="relative p-6 flex flex-col items-center">
                <div className="w-40 h-40 mb-4">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4 text-center">{service.description}</p>
                <Button asChild variant="outline" className="w-full mt-auto">
                  <Link to={service.link}>
                    Learn More <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Button asChild size="lg" variant="bc-red">
            <Link to="/services">
              View All Services <ArrowRight className="ml-2" size={18} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PremiumSolutionsSection;
