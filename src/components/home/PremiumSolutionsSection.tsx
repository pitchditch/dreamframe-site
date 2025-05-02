
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PremiumSolutionsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      const section = sectionRef.current;
      
      if (section) {
        // Start the transform when scroll reaches 50% of hero height
        const startTransform = heroHeight * 0.5;
        // Complete the transform at hero height
        const endTransform = heroHeight * 0.9;
        
        // Calculate the progress between 0 and 1
        const progress = Math.min(1, Math.max(0, (scrollY - startTransform) / (endTransform - startTransform)));
        
        // Apply transform - start at 100% below viewport and end at 0%
        section.style.transform = `translateY(${(1 - progress) * 20}vh)`;
        section.style.opacity = `${Math.min(1, progress * 1.5)}`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const services = [
    {
      title: "Window Cleaning",
      description: "Crystal-clear, streak-free windows using advanced pure water technology",
      image: "/lovable-uploads/73ff1153-6589-4537-996a-1ff5f512cbea.png",
      link: "/services/window-cleaning"
    },
    {
      title: "Gutter Cleaning",
      description: "Complete gutter cleaning and maintenance to prevent water damage",
      image: "/lovable-uploads/0c2175e3-0c77-4b8a-8670-db9aa6ff6e63.png",
      link: "/services/gutter-cleaning"
    },
    {
      title: "Roof Cleaning",
      description: "Gentle but effective moss and algae removal to protect your roof",
      image: "/lovable-uploads/4da7d34a-a303-4274-ad91-8aeb980fa657.png",
      link: "/services/roof-cleaning"
    },
    {
      title: "House Washing",
      description: "Safe soft washing techniques to restore your home's exterior beauty",
      image: "/lovable-uploads/c349ee7a-bdd4-43c8-a168-a68aa3b007e3.png",
      link: "/services/house-washing"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-16 bg-white relative z-20 rounded-t-[40px] shadow-lg transform will-change-transform"
      style={{ 
        marginTop: '-40px',
        opacity: 0,
        transform: 'translateY(20vh)'
      }}
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
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Button asChild variant="outline" className="w-full">
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
