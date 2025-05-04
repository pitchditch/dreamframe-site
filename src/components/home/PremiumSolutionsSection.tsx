
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

const PremiumSolutionsSection = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate overlay based on scroll position - smoother transition
  const calculateOverlay = () => {
    const heroHeight = window.innerHeight; // Height of hero section
    const triggerPoint = heroHeight * 0.8; // Start overlay effect at 80% of hero height
    
    if (scrollPosition < triggerPoint) {
      return 0;
    } else {
      // Calculate gradual overlay between triggerPoint and heroHeight
      const percentage = Math.min((scrollPosition - triggerPoint) / (heroHeight * 0.2), 1);
      return percentage;
    }
  };

  const overlayOpacity = calculateOverlay();

  return (
    <section 
      className="py-16 bg-white relative z-10" 
      style={{ 
        transform: `translateY(${-100 * overlayOpacity}px)`,
        marginTop: `${-100 * overlayOpacity}px`,
        transition: 'transform 0.1s, margin-top 0.1s'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-bc-red font-semibold">Premium Cleaning Solutions</span>
          <h2 className="text-4xl font-bold mt-2">Professional Exterior Cleaning Services</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            We deliver exceptional results for residential and commercial properties throughout Surrey, White Rock, and the Lower Mainland.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Service Cards */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <img 
              src="/lovable-uploads/4f5100f2-42bb-471b-aad7-f0700e9a1cab.png" 
              alt="Window Cleaning Services" 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Window Cleaning</h3>
              <p className="text-gray-600 mb-4">
                Crystal clear windows that enhance your property's appearance and let in more natural light.
              </p>
              <Button variant="outline" size="sm" asChild className="mt-2">
                <Link to="/services/window-cleaning" className="flex items-center">
                  Learn More <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <img 
              src="/lovable-uploads/85f5bd3c-680e-4957-9722-6bc6070f7d51.png" 
              alt="Pressure Washing Services" 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Pressure Washing</h3>
              <p className="text-gray-600 mb-4">
                Revitalize your outdoor surfaces by removing dirt, grime, moss, and organic growth.
              </p>
              <Button variant="outline" size="sm" asChild className="mt-2">
                <Link to="/services/pressure-washing" className="flex items-center">
                  Learn More <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <img 
              src="/lovable-uploads/61c248da-a39d-4414-a395-5a104dbff13b.png" 
              alt="Gutter Cleaning Services" 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Gutter Cleaning</h3>
              <p className="text-gray-600 mb-4">
                Protect your property from water damage by keeping gutters clean and functioning properly.
              </p>
              <Button variant="outline" size="sm" asChild className="mt-2">
                <Link to="/services/gutter-cleaning" className="flex items-center">
                  Learn More <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumSolutionsSection;
