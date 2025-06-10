
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowRight, Percent } from 'lucide-react';

// Service data for carousel
const serviceSlides = [
  {
    id: "window-cleaning",
    name: "Window Cleaning",
    description: "Exterior Window Cleaning with a 20% Off Spring Sale!",
    image: "/lovable-uploads/7fd77226-1d57-4c52-a870-871532745a3f.png",
    pricing: [
      { size: "0-1800 sqft", before: 300, after: 240 },
      { size: "1800-2800 sqft", before: 357.30, after: 285.84 },
      { size: "2800-3500 sqft", before: 431.10, after: 344.88 }
    ]
  },
  {
    id: "pressure-washing",
    name: "Pressure Washing",
    description: "House Washing with a 20% Off Spring Sale!",
    image: "/lovable-uploads/a0545346-ecaa-4530-b82b-09115dd4503e.png",
    pricing: [
      { size: "0-1800 sqft", before: 414.30, after: 331.44 },
      { size: "1800-2800 sqft", before: 627.30, after: 501.84 },
      { size: "2800-3500 sqft", before: 888.30, after: 710.64 }
    ]
  },
  {
    id: "gutter-cleaning",
    name: "Gutter Cleaning",
    description: "Gutter Cleaning (Inside & Outside) with a 20% Off Spring Sale!",
    image: "/lovable-uploads/fb88ad63-4e80-4234-9ba4-f648453c2655.png",
    pricing: [
      { size: "0-1800 sqft", before: 454.00, after: 363.20 },
      { size: "1800-2800 sqft", before: 686.10, after: 548.88 },
      { size: "2800-3500 sqft", before: 822.60, after: 658.08 }
    ]
  },
  {
    id: "driveway-washing",
    name: "Driveway Washing",
    description: "Driveway Pressure Washing with a 20% Off Spring Sale!",
    image: "/lovable-uploads/df1d5443-a527-44af-b261-a7bfde6064f7.png",
    pricing: [
      { size: "0-1800 sqft", before: 300, after: 240 },
      { size: "1800-2800 sqft", before: 314.10, after: 251.28 },
      { size: "2800-3500 sqft", before: 384.30, after: 307.44 }
    ]
  }
];

const SpringSaleCarousel = () => {
  const navigate = useNavigate();
  const [api, setApi] = useState<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Handle autoplay
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };

    api.on('select', onSelect);
    onSelect(); // Set initial value
    
    const autoplayInterval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 5000);

    return () => {
      clearInterval(autoplayInterval);
      api.off('select', onSelect);
    };
  }, [api]);

  const handleSelectService = (service: any) => {
    // Store service selection in sessionStorage
    sessionStorage.setItem('selectedPackage', JSON.stringify({
      title: `${service.name} Package`,
      services: [service.id],
      discountApplied: true,
      discountPercent: 20,
      isSpringSale: true,
      prices: service.pricing
    }));
    
    // Open calculator overlay if it exists
    const calculatorOverlay = document.querySelector('.special-offers-button') as HTMLButtonElement;
    if (calculatorOverlay) {
      calculatorOverlay.click();
    } else {
      // Fallback to navigating to calculator page
      navigate('/calculator');
    }
  };

  return (
    <section className="py-16">
      <div className="relative w-full max-w-full overflow-hidden">
        <div className="absolute top-4 left-0 right-0 z-10 flex justify-center">
          <div className="bg-yellow-400 text-black text-sm px-6 py-2 rounded-full font-bold flex items-center shadow-lg">
            <Percent className="h-4 w-4 mr-1" />
            SPRING SALE: 20% OFF ALL SERVICES
          </div>
        </div>
        
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            loop: true,
            align: "start",
          }}
        >
          <CarouselContent>
            {serviceSlides.map((service, slideIndex) => (
              <CarouselItem key={slideIndex} className="w-full relative">
                <div 
                  className="w-full h-[80vh] sm:h-[600px] relative overflow-hidden"
                  style={{
                    backgroundImage: `url(${service.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {/* Improved dark overlay for better text visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40"></div>
                  
                  {/* Service info container with improved visibility */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-12 text-white">
                    <div className="max-w-4xl mx-auto w-full bg-black/40 backdrop-blur-sm p-6 sm:p-8 rounded-lg">
                      <h2 className="text-3xl sm:text-5xl font-bold mb-3 text-white drop-shadow-lg">{service.name}</h2>
                      <p className="text-lg sm:text-xl mb-6 text-white/90 drop-shadow">{service.description}</p>
                      
                      {/* Pricing grid with improved visibility */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        {service.pricing.map((price, priceIndex) => (
                          <div key={priceIndex} className="bg-white/20 backdrop-blur-sm p-4 rounded-lg border border-white/30">
                            <p className="text-sm font-medium mb-2 text-white">{price.size}</p>
                            <div className="flex items-center gap-2">
                              <p className="text-gray-300 line-through">${price.before.toFixed(2)}</p>
                              <p className="text-xl font-bold text-white">${price.after.toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        onClick={() => handleSelectService(service)}
                        className="bg-white text-black hover:bg-yellow-400 transition-all duration-300 font-bold text-lg px-8 py-6"
                        size="lg"
                      >
                        Select This Service <ArrowRight className="ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Carousel navigation */}
          <div className="absolute z-10 bottom-4 left-0 right-0 flex justify-center gap-2">
            {serviceSlides.map((_, dotIndex) => (
              <button
                key={dotIndex}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === dotIndex 
                    ? "bg-white scale-125" 
                    : "bg-white/30 hover:bg-white/60"
                }`}
                onClick={() => api?.scrollTo(dotIndex)}
                aria-label={`Go to slide ${dotIndex + 1}`}
              />
            ))}
          </div>
          
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 backdrop-blur-sm text-white border-none" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 backdrop-blur-sm text-white border-none" />
        </Carousel>
      </div>
    </section>
  );
};

export default SpringSaleCarousel;
