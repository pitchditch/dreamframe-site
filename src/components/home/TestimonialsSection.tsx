
import { useTranslation } from '@/hooks/use-translation';
import TestimonialCard from '../TestimonialCard';

const testimonials = [
  {
    quote:
      "BC Pressure Washing did an amazing job on our driveway. The team was on time, polite, and the results exceeded our expectations!",
    name: "Jane S.",
    location: "Surrey, BC",
    // No image, show default avatar
    beforeAfterImage: undefined,
    badge: false,
  },
  {
    quote:
      "They removed years of grime from our gutters—everything looks brand new. Would highly recommend!",
    name: "Michael R.",
    location: "White Rock, BC",
    // Show badge on this one
    beforeAfterImage: undefined,
    badge: true,
  },
  {
    quote:
      "Prompt, affordable and very professional. The difference was visible instantly.",
    name: "Alicia D.",
    location: "Langley, BC",
    // Provide custom image example for variety
    beforeAfterImage: "/lovable-uploads/a1f01b41-c73a-4644-8580-6399a42951bf.png",
    badge: false,
  },
];

const TestimonialsSection = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          {t("What Our Clients Say")}
        </h2>
        <p className="text-center text-gray-500 mb-10">
          {t("Before & After Transformations + Customer Testimonials")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={i} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
