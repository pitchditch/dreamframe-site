
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";
import useEmblaCarousel from 'embla-carousel-react';

const slides = [
  {
    image: "/lovable-uploads/6d50984b-4523-400a-ae71-f6be7d6f2430.png",
    title: "Professional Roof Cleaning",
    description: "Extend the life of your roof with our expert cleaning services",
    alt: "Roof Cleaning in White Rock | Moss Removal & Roof Maintenance by BC Pressure Washing"
  },
  {
    image: "/lovable-uploads/a0545346-ecaa-4530-b82b-09115dd4503e.png",
    title: "Commercial Pressure Washing",
    description: "Keep your business property looking its best year-round",
    alt: "Commercial Pressure Washing in Surrey | Professional Building Cleaning by BC Pressure Washing"
  },
  {
    image: "/lovable-uploads/7fd77226-1d57-4c52-a870-871532745a3f.png",
    title: "Residential Window Cleaning",
    description: "Crystal clear windows for your home, inside and out",
    alt: "Window Cleaning in White Rock | Streak-Free Window Washing by BC Pressure Washing"
  },
  {
    image: "/lovable-uploads/fb88ad63-4e80-4234-9ba4-f648453c2655.png",
    title: "Gutter Cleaning & Maintenance",
    description: "Prevent water damage with our thorough gutter cleaning",
    alt: "Gutter Cleaning in Langley | Rain Gutter Maintenance by BC Pressure Washing"
  }
];

const ServiceSlideshow = () => {
  const [api, setApi] = useState<any>(null);
  
  const onSelect = useCallback(() => {
    if (!api) return;
  }, [api]);

  useEffect(() => {
    if (!api) return;

    onSelect();
    api.on("select", onSelect);
    
    // Setup autoplay
    const autoplay = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 3000);

    return () => {
      clearInterval(autoplay);
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Professional Services</h2>
        
        <div className="w-full overflow-hidden">
          <Carousel
            opts={{
              loop: true,
              align: "start",
            }}
            className="w-full"
            orientation="horizontal"
            setApi={setApi}
          >
            <CarouselContent>
              {slides.map((slide, index) => (
                <CarouselItem key={index} className="w-full">
                  <div className="relative w-full overflow-hidden">
                    <img 
                      src={slide.image} 
                      alt={slide.alt} 
                      className="w-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center p-8">
                      <h3 className="text-white text-2xl md:text-3xl font-bold mb-4">{slide.title}</h3>
                      <p className="text-white text-lg md:text-xl mb-8">{slide.description}</p>
                      <Link to="/calculator">
                        <button className="btn-primary">Check Price & Availability</button>
                      </Link>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 bg-white/80" />
            <CarouselNext className="right-2 bg-white/80" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ServiceSlideshow;
