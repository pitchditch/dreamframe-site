
import Layout from '../../components/Layout';
import ServiceHeader from '../../components/ServiceHeader';
import { Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { testimonials } from '@/data/testimonials';
import TestimonialCard from '@/components/TestimonialCard';

const beforeAfter = [
  {
    label: 'Before window cleaning',
    img: '/lovable-uploads/302cbdcc-ad2e-496b-bb73-502eb77f353a.png'
  },
  {
    label: 'After window cleaning',
    img: '/lovable-uploads/76968d4f-c862-4989-a3e3-b74ac31968e2.png'
  }
];

const whyUs = [
  {
    title: '100% Satisfaction Guarantee',
    description: "If you're not happy, we'll re-clean it for free — no stress."
  },
  {
    title: 'Streak-Free Finish',
    description: 'We use purified water and professional squeegees for flawless results.'
  },
  {
    title: 'Inside & Outside Cleaning',
    description: 'We clean both sides of your windows with care and precision.'
  },
  {
    title: 'Licensed & Insured',
    description: 'Peace of mind comes standard — we’re fully covered.'
  }
];

const WindowCleaning = () => {
  // Example testimonial for this service
  const windowTestimonial = testimonials.find(
    (t) =>
      t.quote &&
      (t.quote.toLowerCase().includes("window") || t.quote.toLowerCase().includes("windows"))
  ) || {
    quote: "I'm so happy with how my windows turned out! The crew was really friendly, and they took care not to make a mess inside.",
    name: "Jennifer Davis",
    location: "Burnaby"
  };

  return (
    <Layout
      title="Crystal Clear Windows, Guaranteed | Window Cleaning BC"
      description="Professional window cleaning with a 100% satisfaction guarantee — or we re-clean for free. Book your free quote today."
      image="/lovable-uploads/76968d4f-c862-4989-a3e3-b74ac31968e2.png"
    >
      <ServiceHeader
        title="Crystal Clear Windows, Guaranteed"
        description="Professional window cleaning with a 100% satisfaction guarantee — or we re-clean for free."
        icon={<Sun size={48} />}
        imagePath="/lovable-uploads/76968d4f-c862-4989-a3e3-b74ac31968e2.png"
      />
      <section className="container mx-auto px-4 mb-12 text-center">
        <Button asChild variant="bc-red" size="lg" className="w-full max-w-sm text-lg font-semibold mx-auto">
          <Link to="/calculator">Get a Free Quote</Link>
        </Button>
      </section>

      <section className="container mx-auto px-4 mb-12">
        <h2 className="text-2xl font-bold mb-4 text-center">Why Choose Us for Window Cleaning?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {whyUs.map((item, idx) => (
            <div key={idx} className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition-all">
              <h3 className="font-semibold text-bc-red mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Before &amp; After</h2>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
          {beforeAfter.map((b, idx) => (
            <div key={b.label} className="flex flex-col items-center w-full">
              <img
                src={b.img}
                alt={b.label}
                className="rounded-lg shadow-md w-full object-cover aspect-video mb-2"
              />
              <span className="font-medium text-gray-700">{b.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">What Our Clients Say</h2>
        <div className="max-w-xl mx-auto">
          <TestimonialCard
            quote={windowTestimonial.quote}
            name={windowTestimonial.name}
            location={windowTestimonial.location}
            rating={windowTestimonial.rating || 5}
            beforeAfterImage={windowTestimonial.beforeAfterImage}
          />
        </div>
      </section>
      
      <section className="container mx-auto px-4 mb-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready for Sparkling Windows?</h2>
        <p className="mb-6 text-gray-600">Book now and see the difference professional window cleaning makes.</p>
        <Button asChild variant="bc-red" size="lg" className="w-full max-w-sm text-lg font-semibold mx-auto">
          <Link to="/calculator">Check Prices &amp; Availability</Link>
        </Button>
      </section>
    </Layout>
  );
};

export default WindowCleaning;

