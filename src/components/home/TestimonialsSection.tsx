import React, { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import TestimonialCard from '../TestimonialCard';
import { testimonials } from '@/data/testimonials';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "../ui/carousel";
import { useTranslation } from '@/hooks/use-translation';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home, DropletIcon, Wind, Landmark } from 'lucide-react';

const TestimonialsSection = () => {
  const [api, setApi] = useState<any>();
  const [activeCategory, setActiveCategory] = useState('all');
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  // Group testimonials by service
  const testimonialsByService = {
    'all': testimonials,
    'pressure-washing': testimonials.filter(t => t.service === 'pressure-washing'),
    'window-cleaning': testimonials.filter(t => t.service === 'window-cleaning'),
    'gutter-cleaning': testimonials.filter(t => t.service === 'gutter-cleaning'),
    'roof-cleaning': testimonials.filter(t => t.service === 'roof-cleaning')
  };

  // Get testimonials with images first for the selected category
  const getFilteredTestimonials = (category: string) => {
    const categoryTestimonials = testimonialsByService[category as keyof typeof testimonialsByService];
    
    // Sort to show testimonials with images first
    return [...categoryTestimonials].sort((a, b) => {
      if (a.beforeAfterImage && !b.beforeAfterImage) return -1;
      if (!a.beforeAfterImage && b.beforeAfterImage) return 1;
      return 0;
    });
  };

  // Get the active testimonials based on selected category
  const activeTestimonials = getFilteredTestimonials(activeCategory);

  useEffect(() => {
    if (!api) return;

    // Set up automatic scrolling with different timing for mobile
    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, isMobile ? 3000 : 5000); // Faster on mobile

    return () => clearInterval(interval);
  }, [api, isMobile]);

  return (
    <section className="section-padding bg-bc-gray overflow-hidden -mt-24 pt-32 relative z-10">
      <div className="container mx-auto px-4">
        <div className="badge-pill mx-auto w-fit animate-on-scroll">{t("Testimonials")}</div>
        <h2 className="section-title animate-on-scroll">{t("What Our Clients Say")}</h2>
        <p className="section-subtitle animate-on-scroll">
          {t("Don't just take our word for it. Hear what our satisfied customers have to say about our services.")}
        </p>

        {/* Service Filter Tabs */}
        <div className="mt-8">
          <Tabs 
            defaultValue="all"
            className="w-full max-w-4xl mx-auto"
            onValueChange={setActiveCategory}
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 bg-transparent mb-8">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-bc-red data-[state=active]:text-white"
              >
                All Reviews
              </TabsTrigger>
              <TabsTrigger 
                value="gutter-cleaning" 
                className="data-[state=active]:bg-bc-red data-[state=active]:text-white"
              >
                <Wind className="w-4 h-4 mr-2" />
                Gutter Cleaning
              </TabsTrigger>
              <TabsTrigger 
                value="window-cleaning" 
                className="data-[state=active]:bg-bc-red data-[state=active]:text-white"
              >
                <DropletIcon className="w-4 h-4 mr-2" />
                Window Cleaning
              </TabsTrigger>
              <TabsTrigger 
                value="pressure-washing" 
                className="data-[state=active]:bg-bc-red data-[state=active]:text-white"
              >
                <Home className="w-4 h-4 mr-2" />
                Pressure Washing
              </TabsTrigger>
              <TabsTrigger 
                value="roof-cleaning" 
                className="data-[state=active]:bg-bc-red data-[state=active]:text-white"
              >
                <Landmark className="w-4 h-4 mr-2" />
                Roof Cleaning
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="mt-8 w-full">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent>
              {activeTestimonials.slice(0, 12).map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <TestimonialCard
                    quote={testimonial.quote}
                    name={testimonial.name}
                    location={testimonial.location}
                    rating={testimonial.rating}
                    beforeAfterImage={testimonial.beforeAfterImage}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg" className="bg-bc-red text-white hover:bg-bc-red/90">
            <Link to="/testimonials" className="no-underline">See More Testimonials</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
