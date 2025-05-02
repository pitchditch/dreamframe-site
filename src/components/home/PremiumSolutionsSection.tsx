
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PremiumSolutionsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const heroSection = document.querySelector('.hero-section');
      if (!heroSection) return;
      
      const heroHeight = heroSection.clientHeight;
      const scrollPosition = window.scrollY;
      const triggerStart = heroHeight - window.innerHeight; // Start effect before reaching the section
      
      // Calculate progress (0 to 1)
      let progress = (scrollPosition - triggerStart) / (window.innerHeight / 2);
      progress = Math.max(0, Math.min(1, progress)); // Clamp between 0 and 1
      
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      title: "Window Cleaning",
      description: "Crystal-clear, streak-free windows using advanced pure water technology",
      image: "/lovable-uploads/3c677903-190c-483b-8e1d-b3e33c7231f9.png",
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
  
  // Calculate styles based on scroll progress
  const overlayOpacity = scrollProgress;
  const contentScale = 0.8 + (scrollProgress * 0.2); // Scale from 0.8 to 1
  const contentOpacity = scrollProgress;
  const translateY = (1 - scrollProgress) * 50; // Move up as we scroll

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 bg-white"
      style={{
        marginTop: '-100vh', // Overlap with hero section
        paddingTop: '100vh', // Add padding to account for the negative margin
        zIndex: 10
      }}
    >
      {/* Overlay that gradually becomes visible */}
      <div 
        className="absolute inset-0 bg-white transition-opacity duration-200 ease-out"
        style={{
          opacity: overlayOpacity,
          zIndex: 5
        }}
      />
      
      <div 
        className="container mx-auto px-4 relative"
        style={{
          transform: `translateY(${translateY}px) scale(${contentScale})`,
          opacity: contentOpacity,
          zIndex: 10,
          transition: 'transform 0.1s ease-out, opacity 0.1s ease-out'
        }}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Premium Cleaning Solutions</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our professional exterior cleaning services deliver exceptional results using state-of-the-art equipment and eco-friendly products.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="overflow-hidden h-full hover:shadow-lg transition-shadow">
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
