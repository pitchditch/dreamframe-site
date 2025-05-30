
import React, { useEffect } from 'react';
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
      name: "David",
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
      name: "Michael", 
      location: "South Surrey",
      service: "Roof Cleaning",
      date: "March 2025",
      quote: "Best decision I made. Roof looks brand new."
    },
    {
      image: "/lovable-uploads/74fff6dd-0d95-4d31-bb6a-606b14280b3a.png",
      name: "Jennifer & Frank",
      location: "White Rock",
      service: "Window Cleaning",
      date: "May 2025",
      quote: "Couldn't be happier with the results!"
    },
    {
      image: "/lovable-uploads/4c1d610e-379a-49cb-9f37-ef1b48a248f4.png",
      name: "Robert",
      location: "Langley",
      service: "Window Cleaning",
      date: "April 2025",
      quote: "Great experience. Will use them again."
    }
  ];
  
  // Auto-rotate carousel continuously without pausing
  useEffect(() => {
    if (!api) return;
    
    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);
    
    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Trusted by Real Homeowners – Verified Customers
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-4">
            Every one of these customers is someone we've proudly served – and they're wearing the shirt to prove it.
          </p>
          <div className="flex justify-center items-center gap-4">
            <span className="inline-block bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-medium">
              🏠 Real Customers
            </span>
            <span className="inline-block bg-bc-red text-white px-4 py-2 rounded-full text-sm font-medium">
              ✓ Verified Reviews
            </span>
            <span className="inline-block bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium">
              📸 Branded Photos
            </span>
          </div>
        </div>
        
        {/* Carousel View */}
        <div className="relative max-w-xl mx-auto">
          <Carousel className="w-full" setApi={setApi} opts={{ loop: true }}>
            <CarouselContent>
              {customers.map((customer, index) => (
                <CarouselItem key={index} className="basis-full">
                  <div className="flex flex-col items-center text-center p-2">
                    <div className="mb-6 w-full h-96 overflow-hidden rounded-xl mx-auto shadow-lg">
                      <img 
                        src={customer.image} 
                        alt={`${customer.name} from ${customer.location} - Verified BC Pressure Washing Customer`} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 max-w-md mx-auto">
                      <h4 className="font-bold text-xl text-gray-900 mb-2">{customer.name}</h4>
                      <p className="text-sm text-gray-600 mb-1">✓ Verified Customer – {customer.location}</p>
                      <p className="text-sm text-bc-red font-medium mb-3">{customer.service} • {customer.date}</p>
                      {customer.quote && (
                        <p className="italic text-gray-700 bg-gray-50 p-3 rounded-lg">
                          "{customer.quote}"
                        </p>
                      )}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          
          <div className="flex justify-center mt-6">
            {customers.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`w-3 h-3 mx-1 rounded-full transition-colors ${
                  api?.selectedScrollSnap() === index ? 'bg-bc-red' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-600">
            <span className="font-semibold text-bc-red">100% Real Customers</span> • All photos taken with permission • 
            <span className="font-medium"> Look for our red car around White Rock!</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustedCustomersSection;
