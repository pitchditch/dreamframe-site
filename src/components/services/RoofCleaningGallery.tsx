
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

interface RoofCleaningTestimonial {
  id: number;
  image: string;
  customerName: string;
  location: string;
  rating: number;
  review: string;
  testimonialId: number;
}

const roofCleaningTestimonials: RoofCleaningTestimonial[] = [
  {
    id: 1,
    image: "/lovable-uploads/89515ed3-256d-4840-a9ed-2049bb5d0d1f.png",
    customerName: "Michael T.",
    location: "Langley, BC",
    rating: 5,
    review: "The transformation is incredible! My roof looks brand new and the team was professional and efficient.",
    testimonialId: 8
  },
  {
    id: 2,
    image: "/lovable-uploads/e2607535-f225-440b-8ea4-b3d5db21acfc.png",
    customerName: "Sarah L.",
    location: "Surrey, BC",
    rating: 5,
    review: "Amazing job removing all the moss and algae. My roof hasn't looked this good in years!",
    testimonialId: 12
  },
  {
    id: 3,
    image: "/lovable-uploads/281422a1-6eb1-4353-9f93-de7d6163152e.png",
    customerName: "Robert J.",
    location: "Richmond, BC",
    rating: 5,
    review: "Professional service from start to finish. The difference in my roof is night and day.",
    testimonialId: 16
  },
  {
    id: 4,
    image: "/lovable-uploads/cf8d9662-3846-4e1a-8919-9cbaec254941.png",
    customerName: "Jennifer K.",
    location: "North Vancouver, BC",
    rating: 5,
    review: "My roof was in terrible condition with moss everywhere. Now it looks brand new! Highly recommend.",
    testimonialId: 20
  },
  {
    id: 5,
    image: "/lovable-uploads/8094c1a2-06bf-4a0c-955f-17cfad036166.png",
    customerName: "David C.",
    location: "White Rock, BC",
    rating: 5,
    review: "Great service and attention to detail. The roof cleaning made a tremendous difference.",
    testimonialId: 4
  },
  {
    id: 6,
    image: "/lovable-uploads/8ebd925c-5b93-484f-9271-d891851d3e7a.png",
    customerName: "Emily W.",
    location: "Burnaby, BC",
    rating: 5,
    review: "The roof cleaning service was excellent. My home looks so much better now!",
    testimonialId: 8
  }
];

const RoofCleaningGallery = () => {
  const [api, setApi] = useState<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayTimeoutRef = useRef<number | null>(null);

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
    }, 5000); // 5 seconds per slide
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
  }, [api, isPaused]);

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
                <CarouselItem key={testimonial.id} className="md:basis-1/1">
                  <Card className="border-none shadow-lg">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img 
                          src={testimonial.image} 
                          alt={`Roof cleaning - ${testimonial.customerName}`}
                          className="w-full h-auto rounded-t-lg object-cover aspect-[1/1]"
                        />
                        
                        <div className="bg-white p-6 rounded-b-lg shadow-md">
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
            <button className="btn-primary">
              View All Testimonials
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RoofCleaningGallery;
