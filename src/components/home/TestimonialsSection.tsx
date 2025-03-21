
import { useTranslation } from '@/hooks/use-translation';
import TestimonialCard from '../TestimonialCard';

const testimonials = [
  {
    quote: "Jayden did an amazing job on the roof. I'll be using his services again.",
    name: "John P.",
    location: "Langley, BC",
    rating: 5
  },
  {
    quote: "Great work! Totally satisfied with the result of the window cleaning. left no mess and my windows are perfect.",
    name: "Liz S.",
    location: "Surrey, BC",
    rating: 5
  },
  {
    quote: "He used some fancy equipment, did my windows with a water fed pole which I've never seen before. It did a great job on the windows and left no streaks!",
    name: "Emily C.",
    location: "Langley, BC",
    rating: 5
  },
  {
    quote: "Professional service from start to finish. They were on time, courteous, and did an excellent job on our gutters.",
    name: "Michael R.",
    location: "Richmond, BC",
    rating: 5
  },
  {
    quote: "Our house looks brand new after their pressure washing service. Will definitely recommend to friends and family.",
    name: "Sarah T.",
    location: "Burnaby, BC",
    rating: 5
  },
  {
    quote: "Quick response, fair pricing, and excellent work. Couldn't ask for more!",
    name: "David K.",
    location: "North Vancouver, BC",
    rating: 5
  }
];

const TestimonialsSection = () => {
  const { t } = useTranslation();
  
  // Create duplicate array for seamless carousel
  const allTestimonials = [...testimonials, ...testimonials];
  
  return (
    <section className="section-padding bg-bc-gray">
      <div className="container mx-auto px-4">
        <div className="badge-pill mx-auto w-fit animate-on-scroll">{t("Testimonials")}</div>
        <h2 className="section-title animate-on-scroll">{t("What Our Clients Say")}</h2>
        <p className="section-subtitle animate-on-scroll">
          {t("Don't just take our word for it. Hear what our satisfied customers have to say about our services.")}
        </p>

        <div className="mt-12 overflow-hidden relative">
          <div className="flex animate-testimonial-carousel space-x-8 py-4">
            {allTestimonials.map((testimonial, index) => (
              <div key={index} className="w-full md:w-[350px] flex-shrink-0">
                <TestimonialCard
                  quote={testimonial.quote}
                  name={testimonial.name}
                  location={testimonial.location}
                  rating={testimonial.rating}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <a href="/testimonials">
            <button className="btn-primary">{t("View More Testimonials")}</button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
