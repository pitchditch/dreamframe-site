
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface ServiceArea {
  name: string;
  description: string;
}

const ServiceAreasMap = () => {
  const [activeArea, setActiveArea] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [api, setApi] = useState<any>(null);
  
  const serviceAreas: ServiceArea[] = [
    {
      name: "Cloverdale",
      description: "Comprehensive exterior cleaning solutions for homes and businesses in the Cloverdale area."
    },
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
      name: "Delta",
      description: "Premium pressure washing and window cleaning services for North Delta, Ladner, and Tsawwassen."
    },
    {
      name: "Tsawwassen",
      description: "Expert exterior cleaning services for Tsawwassen's homes and businesses, including beach properties."
    }
  ];

  // Update active slide indicator when api changes slide
  const handleSelect = () => {
    if (api) {
      setActiveArea(api.selectedScrollSnap());
    }
  };

  if (api) {
    api.on('select', handleSelect);
  }

  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-6 text-center">Areas We Serve</h2>
        <h3 className="text-2xl font-semibold mb-10 text-center">Serving Surrey, White Rock & Beyond</h3>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="service-areas">
            <div className="mb-8">
              <Carousel 
                className="w-full" 
                opts={{
                  align: "start",
                  loop: true,
                }}
                setApi={setApi}
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
                        <button 
                          className="text-bc-red p-0 mt-4 hover:text-red-400 flex items-center"
                          onClick={() => {
                            const faqElement = document.getElementById('service-areas-faq');
                            if (faqElement) {
                              faqElement.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                        >
                          Check if we service your area
                          <ChevronRight size={16} className="ml-1" />
                        </button>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center mt-4 gap-1">
                  {serviceAreas.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => api?.scrollTo(index)}
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
              src="https://www.google.com/maps/d/embed?mid=1EFqLJEb-CuHik9j9h2e0iuzKHJwFD30"
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
        
        <div id="service-areas-faq" className="mt-16">
          <h3 className="text-2xl font-bold mb-6">FAQ: What Areas Do You Service?</h3>
          <p className="text-lg mb-4">
            We are based in White Rock and service the entire Metro Vancouver region, including White Rock, 
            Surrey, Langley, Delta, Tsawwassen, Ladner, Richmond, Vancouver, and surrounding areas.
          </p>
          <p className="text-lg mb-4">
            Our service radius extends throughout the Lower Mainland, so whether you're in South Surrey, 
            Cloverdale, or as far as Coquitlam or Port Moody, we're able to provide our premium exterior 
            cleaning services to your location.
          </p>
          <p className="text-lg">
            Not sure if we service your specific area? Give us a call at <a href="tel:7788087620" className="text-bc-red hover:underline">778-808-7620</a> or 
            fill out our <Link to="/calculator" className="text-bc-red hover:underline">quick quote form</Link> to confirm availability for your address.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreasMap;
