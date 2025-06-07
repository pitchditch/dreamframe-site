
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { testimonials } from '@/data/testimonials';
import { useIsMobile } from '@/hooks/use-mobile';

interface RoofCleaningTestimonial {
  id: number;
  image: string;
  customerName: string;
  location: string;
  rating: number;
  review: string;
  testimonialId: number;
  beforeAfterImage?: string;
}

// Filter roof cleaning testimonials from our main testimonials data
const roofCleaningTestimonials = testimonials
  .filter(t => t.service === 'roof-cleaning')
  .slice(0, 6)
  .map(t => ({
    id: t.id,
    image: t.beforeAfterImage || '',
    customerName: t.name,
    location: t.location,
    rating: t.rating,
    review: t.quote,
    testimonialId: t.id,
    beforeAfterImage: t.beforeAfterImage
  }));

const RoofCleaningGallery = () => {
  const [api, setApi] = useState<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayTimeoutRef = useRef<number | null>(null);
  const isMobile = useIsMobile();
  
  // Handle autoplay functionality
  const startAutoplay = () => {
    if (autoplayTimeoutRef.current) {
      window.clearTimeout(autoplayTimeoutRef.current);
    }
    
    autoplayTimeoutRef.current = window.setTimeout(() => {
      if (!isPaused && api) {
        if (api.canScrollNext()) {
          api.scrollNext();
        } else {
          api.scrollTo(0);
        }
      }
    }, isMobile ? 3000 : 5000); // 3 seconds on mobile, 5 seconds on desktop
  };

  // Track current slide
  const onSelect = () => {
    if (!api) return;
    setCurrentSlide(api.selectedScrollSnap());
    startAutoplay();
  };

  useEffect(() => {
    if (!api) return;
    
    api.on("select", onSelect);
    startAutoplay();
    
    return () => {
      api.off("select", onSelect);
      if (autoplayTimeoutRef.current) {
        window.clearTimeout(autoplayTimeoutRef.current);
      }
    };
  }, [api, isPaused, isMobile]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Recent Roof Cleaning Projects</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See our professional roof cleaning results and what our happy customers have to say about our service.
          </p>
        </div>
        
        <div className="relative" 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <Carousel
            opts={{
              loop: true,
              align: "start",
            }}
            className="w-full"
            setApi={setApi}
          >
            <CarouselContent>
              {roofCleaningTestimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className={isMobile ? 'basis-full' : 'basis-1/3'}>
                  <Card className="border-none shadow-lg h-full">
                    <CardContent className="p-0 h-full">
                      <div className="relative h-full flex flex-col">
                        <div className="relative">
                          <img 
                            src={testimonial.image} 
                            alt={`Roof cleaning - ${testimonial.customerName}`}
                            className="w-full h-64 object-cover"
                          />
                          {testimonial.beforeAfterImage && (
                            <div className="absolute top-2 right-2 bg-bc-red text-white text-xs py-1 px-2 rounded">
                              Before/After
                            </div>
                          )}
                        </div>
                        
                        <div className="bg-white p-6 rounded-b-lg shadow-md flex-grow">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-bold text-lg">{testimonial.customerName}</h3>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={16}
                                  className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600 italic mb-3">"{testimonial.review}"</p>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">{testimonial.location}</span>
                            <Link 
                              to={`/testimonials?id=${testimonial.testimonialId}`} 
                              className="text-bc-red hover:underline font-medium text-sm"
                            >
                              Read Full Testimonial
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80" />
            <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80" />
          </Carousel>
          
          {/* Dots navigation */}
          <div className="flex justify-center mt-6 gap-2">
            {roofCleaningTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === index ? 'bg-bc-red' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="text-center mt-10">
          <Link to="/testimonials">
            <Button className="btn-primary">
              View All Testimonials
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RoofCleaningGallery;
