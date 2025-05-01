
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MapPin, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ServiceArea {
  name: string;
  description: string;
}

const ServiceAreasMap = () => {
  const [activeArea, setActiveArea] = useState(0);
  const intervalRef = useRef<number | null>(null);
  
  const serviceAreas: ServiceArea[] = [
    {
      name: "White Rock",
      description: "Premier pressure washing, window cleaning, and roof cleaning services for White Rock's homes and businesses."
    },
    {
      name: "South Surrey",
      description: "Top-rated exterior cleaning services throughout South Surrey, from Morgan Creek to Grandview Heights."
    },
    {
      name: "Langley",
      description: "Professional pressure washing, window cleaning, and gutter maintenance for Langley residences and commercial properties."
    },
    {
      name: "Cloverdale",
      description: "Comprehensive exterior cleaning solutions for homes and businesses in the Cloverdale area."
    },
    {
      name: "Delta",
      description: "Premium pressure washing and window cleaning services for North Delta, Ladner, and Tsawwassen."
    },
    {
      name: "Tsawwassen",
      description: "Expert exterior cleaning services for Tsawwassen's homes and businesses, including beach properties."
    }
  ];

  useEffect(() => {
    // Auto rotation of carousel
    intervalRef.current = window.setInterval(() => {
      setActiveArea((prev) => (prev + 1) % serviceAreas.length);
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [serviceAreas.length]);

  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Areas We Serve</h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="service-areas">
            <h3 className="text-2xl font-bold mb-6">Serving Surrey, White Rock & Beyond</h3>
            
            <div className="mb-8">
              <Carousel 
                className="w-full" 
                opts={{
                  align: "start",
                  loop: true,
                }}
                value={activeArea}
                onValueChange={(value) => setActiveArea(value)}
              >
                <CarouselContent>
                  {serviceAreas.map((area, index) => (
                    <CarouselItem key={index}>
                      <div className="p-4 border border-gray-700 rounded-lg bg-gray-900 h-full">
                        <h4 className="text-xl font-bold mb-2 flex items-center">
                          <MapPin className="mr-2 text-bc-red" size={20} />
                          {area.name}
                        </h4>
                        <p className="text-gray-400">{area.description}</p>
                        <Button asChild variant="link" className="text-bc-red p-0 mt-4 hover:text-red-400">
                          <Link to="/contact" className="flex items-center">
                            Check if we service your area
                            <ChevronRight size={16} className="ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center mt-4 gap-1">
                  {serviceAreas.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveArea(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === activeArea ? "bg-bc-red" : "bg-gray-600"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </Carousel>
            </div>
            
            <div className="hidden md:block">
              <h3 className="text-xl font-bold mb-4">All Areas We Serve:</h3>
              <div className="grid grid-cols-2 gap-4">
                {serviceAreas.map((area, index) => (
                  <div key={index} className="flex items-center">
                    <MapPin size={16} className="text-bc-red mr-2" />
                    <span>{area.name}</span>
                  </div>
                ))}
                <div className="flex items-center">
                  <MapPin size={16} className="text-bc-red mr-2" />
                  <span>And more...</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="map-container h-96 rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83327.81947490028!2d-122.90458565331543!3d49.10797320846295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5485c376522d29bd%3A0x561be351914c38d9!2sWhite%20Rock%2C%20BC!5e0!3m2!1sen!2sca!4v1652458251111!5m2!1sen!2sca"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Service Area Map"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreasMap;
