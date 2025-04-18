
import { useTranslation } from '@/hooks/use-translation';
import TestimonialCard from '../TestimonialCard';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "../ui/carousel";
import { useEffect, useState } from 'react';
import { testimonials } from '@/data/testimonials';

const TestimonialsSection = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [api, setApi] = useState<any>();

  useEffect(() => {
    if (!api) return;

    // Set up automatic scrolling with different speeds for mobile/desktop
    const interval = setInterval(() => {
      api.scrollNext();
    }, isMobile ? 5000 : 8000);

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

        <div className="mt-12 w-full">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
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
      </div>
    </section>
  );
};

export default TestimonialsSection;
