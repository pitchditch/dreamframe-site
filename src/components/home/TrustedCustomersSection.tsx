
import React from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
} from "@/components/ui/carousel";

interface CustomerTestimonial {
  image: string;
  name: string;
  location: string;
  service: string;
  date: string;
  quote?: string;
}

const TrustedCustomersSection = () => {
  const [api, setApi] = React.useState<any>();
  
  const customers: CustomerTestimonial[] = [
    {
      image: "/lovable-uploads/2eaacd17-5dff-4af1-b073-c2ecadfdb6d0.png",
      name: "Michael",
      location: "White Rock",
      service: "Window Cleaning",
      date: "May 2025",
      quote: "They nailed it. Windows look crystal clear."
    },
    {
      image: "/lovable-uploads/37b96fc3-a1ad-49b9-b3df-85633bef1d67.png",
      name: "James",
      location: "Surrey",
      service: "Pressure Washing",
      date: "April 2025",
      quote: "Professional service from start to finish."
    },
    {
      image: "/lovable-uploads/09e0bf79-aa0b-43bd-be2b-3a2b44bf5bc9.png",
      name: "Robert",
      location: "South Surrey",
      service: "Roof Cleaning",
      date: "March 2025",
      quote: "Best decision I made. Roof looks brand new."
    },
    {
      image: "/lovable-uploads/74fff6dd-0d95-4d31-bb6a-606b14280b3a.png",
      name: "Lisa & John",
      location: "White Rock",
      service: "Window Cleaning",
      date: "May 2025",
      quote: "Couldn't be happier with the results!"
    },
    {
      image: "/lovable-uploads/4c1d610e-379a-49cb-9f37-ef1b48a248f4.png",
      name: "David",
      location: "Langley",
      service: "Window Cleaning",
      date: "April 2025",
      quote: "Great experience. Will use them again."
    }
  ];
  
  React.useEffect(() => {
    if (!api) return;
    
    // Auto-rotate carousel every 3 seconds
    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);
    
    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Trusted by Real Homeowners – Verified Customers</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Every one of these customers is someone we've proudly served – and they're wearing the shirt to prove it.
          </p>
          <div className="mt-4">
            <span className="inline-block bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-medium">
              Spring Shoot Catalog
            </span>
          </div>
        </div>
        
        {/* Carousel View (for all screen sizes) */}
        <div className="relative max-w-md mx-auto">
          <Carousel className="w-full" setApi={setApi}>
            <CarouselContent>
              {customers.map((customer, index) => (
                <CarouselItem key={index} className="basis-full">
                  <div className="flex flex-col items-center text-center p-2">
                    <div className="mb-4 w-full h-80 overflow-hidden rounded-lg mx-auto">
                      <img 
                        src={customer.image} 
                        alt={`${customer.name} from ${customer.location}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="font-semibold text-lg">{customer.name}</h4>
                    <p className="text-sm text-gray-600">Verified Customer – {customer.location}</p>
                    <p className="text-sm text-bc-red font-medium">{customer.service}, {customer.date}</p>
                    {customer.quote && (
                      <p className="mt-2 italic text-sm">"{customer.quote}"</p>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          
          <div className="flex justify-center mt-4">
            {customers.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`w-2 h-2 mx-1 rounded-full transition-colors ${
                  api?.selectedScrollSnap() === index ? 'bg-bc-red' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedCustomersSection;
