
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
} from "@/components/ui/carousel";

interface ServiceImage {
  src: string;
  alt: string;
  link: string;
}

const MoreServicesSection: React.FC = () => {
  const [api, setApi] = useState<any>();
  
  const serviceImages: ServiceImage[] = [
    {
      src: "/lovable-uploads/e76ecfc1-a3a8-44d8-9a4a-5e1bf7c32282.png",
      alt: "Professional Pressure Washing in Surrey",
      link: "/services/pressure-washing"
    },
    {
      src: "/lovable-uploads/0a2cc308-bda3-4478-9cf0-5efabde14b96.png",
      alt: "Window Cleaning in White Rock",
      link: "/services/window-cleaning"
    },
    {
      src: "/lovable-uploads/ff0fc949-bae9-4f8b-a408-2322698b8479.png",
      alt: "Gutter Cleaning in Surrey & White Rock",
      link: "/services/gutter-cleaning"
    },
    {
      src: "/lovable-uploads/7e1c3bef-96a3-46e7-b312-58ac0d3423de.png",
      alt: "Roof Cleaning in Metro Vancouver",
      link: "/services/roof-cleaning"
    },
    {
      src: "/lovable-uploads/7e01805c-6b7d-4cca-b349-1f3a8ca1fa7d.png",
      alt: "House Washing Services in Surrey",
      link: "/services/house-washing"
    },
  ];

  useEffect(() => {
    if (!api) return;
    
    // Auto-rotate carousel every 4 seconds
    const interval = setInterval(() => {
      api.scrollNext();
    }, 4000);
    
    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Looking for More Services?</h2>
        
        <Carousel className="w-full" setApi={setApi}>
          <CarouselContent>
            {serviceImages.map((service, index) => (
              <CarouselItem key={index} className="basis-full">
                <Link to={service.link}>
                  <div className="relative overflow-hidden">
                    <img 
                      src={service.src} 
                      alt={service.alt}
                      className="w-full h-auto object-cover" 
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-white text-xl font-semibold">{service.alt}</h3>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        
        <div className="flex justify-center mt-8">
          <Button asChild size="lg" className="text-lg">
            <Link to="/services">
              View All Services <ArrowRight className="ml-2" size={18} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MoreServicesSection;
