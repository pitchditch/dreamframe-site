
import React, { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import TestimonialCard from '../TestimonialCard';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "../ui/carousel";
import { useTranslation } from '@/hooks/use-translation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home, DropletIcon, Wind, Landmark } from 'lucide-react';

// Updated testimonials with profile pictures
const testimonials = [
  {
    quote: "Fantastic job on our windows - they haven't been this clean in years! Jayden was professional, on time, and very thorough. Highly recommend!",
    name: "Michael S.",
    location: "White Rock",
    rating: 5,
    profilePic: "/lovable-uploads/08608f2b-7fc3-4072-b23d-7e952c0fa11d.png",
    service: "window-cleaning"
  },
  {
    quote: "BC Pressure Washing did an amazing job on our driveway and siding. The difference is night and day. Very fair pricing too!",
    name: "Sarah L.",
    location: "Surrey",
    rating: 5,
    profilePic: "/lovable-uploads/d7897310-f61c-46c9-a39f-913b18fcb804.png",
    service: "pressure-washing",
    beforeAfterImage: "/lovable-uploads/8456f0a6-f534-4cc6-96ec-3c56bec589c2.png"
  },
  {
    quote: "Jayden was extremely professional and did an excellent job on our gutters. He even took pictures to show us the before and after. Great service!",
    name: "Robert T.",
    location: "Langley",
    rating: 5,
    profilePic: "/lovable-uploads/1545a398-5061-4498-a6b5-fb551fedcd98.png",
    service: "gutter-cleaning"
  },
  {
    quote: "I'm impressed with the roof cleaning service. Our roof looks brand new, and Jayden was very careful with our property. Will use again!",
    name: "Jennifer P.",
    location: "White Rock",
    rating: 5,
    profilePic: "/lovable-uploads/5798947a-ce45-46db-9624-7b328b13e4f3.png",
    service: "roof-cleaning"
  },
  {
    quote: "Top-notch service! Our windows have never looked better. Prompt, professional, and attention to detail that's unmatched.",
    name: "David K.",
    location: "South Surrey",
    rating: 5,
    profilePic: "/lovable-uploads/a0c81c19-f375-42b5-babd-172d2d79e9fc.png",
    service: "window-cleaning",
    beforeAfterImage: "/lovable-uploads/69ca0b54-8ba8-406d-95e2-6af087c55541.png"
  },
  {
    quote: "We had our gutters cleaned and roof moss-treated. Great job, reliable service, and no mess left behind. Already recommended to neighbors!",
    name: "Patricia G.",
    location: "Delta",
    rating: 5,
    profilePic: "/lovable-uploads/d3af8233-d630-4f16-869b-bf58f0d60777.png",
    service: "roof-cleaning"
  }
];

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
                    profilePic={testimonial.profilePic}
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
