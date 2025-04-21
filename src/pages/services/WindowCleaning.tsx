
import Layout from '../../components/Layout';
import ServiceHeader from '../../components/ServiceHeader';
import { Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { testimonials } from '@/data/testimonials';
import TestimonialCard from '@/components/TestimonialCard';

// Pick testimonial for window cleaning if available (with fallback)
const windowTestimonial = testimonials.find(
  (t) => t.quote && (t.quote.toLowerCase().includes("window") || t.quote.toLowerCase().includes("windows"))
) || {
  quote: "I'm so happy with how my windows turned out! The crew was really friendly, and they took care not to make a mess inside.",
  name: "Jennifer Davis",
  location: "Burnaby"
};

const whyUs = [
  {
    title: '100% Satisfaction Guarantee',
    description: "If you're not happy, we'll re-clean it for free — no stress.",
  },
  {
    title: 'Streak-Free Finish',
    description: 'We use purified water and professional squeegees for flawless results.',
  },
  {
    title: 'Inside & Outside Cleaning',
    description: 'We clean both sides of your windows with care and precision.',
  },
  {
    title: 'Licensed & Insured',
    description: 'Peace of mind comes standard — we’re fully covered.',
  },
];

const WindowCleaning = () => {
  return (
    <Layout
      title="Crystal Clear Windows, Guaranteed | Window Cleaning BC"
      description="Professional window cleaning with a 100% satisfaction guarantee — or we re-clean for free. Book your free quote today."
      image="/lovable-uploads/30f2c843-a162-44bc-a697-d9d9b7c9faef.png"
    >
      {/* HERO SECTION */}
      <div className="relative bg-black min-h-[340px] md:min-h-[460px] flex items-center justify-center">
        <img
          src="/lovable-uploads/30f2c843-a162-44bc-a697-d9d9b7c9faef.png"
          alt="Professional window cleaning service"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="relative z-10 text-center px-6 py-24 md:py-32">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">Crystal Clear Windows, Guaranteed</h1>
          <p className="text-lg md:text-2xl text-white font-medium mb-6">Professional window cleaning with a 100% satisfaction guarantee — or we re-clean for free.</p>
          <Button asChild variant="bc-red" size="lg" className="shadow-xl text-lg font-semibold rounded-md">
            <Link to="/calculator">Get a Free Quote</Link>
          </Button>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Why Choose Us for Window Cleaning?</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {whyUs.map((item) => (
            <li key={item.title} className="bg-white rounded-lg shadow p-6 text-left">
              <strong className="block text-bc-red mb-2">{item.title}</strong>
              <span className="text-gray-700">{item.description}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ADVANCED WATER FED POLE TECH (you can replace imgs with real if provided) */}
      <section className="py-16 bg-white px-4 max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Advanced Water Fed Pole Technology</h2>
        <p className="text-lg text-center mb-8 max-w-3xl mx-auto">
          We use cutting-edge water fed pole systems with multi-stage water purification to leave your exterior windows completely spot and streak-free — no soap, no residue. Our system filters out minerals, sediments, and impurities, delivering ultra-pure water that dries crystal clear. 
          It also allows us to clean high windows safely from the ground — no ladders, no damage.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <img src="/lovable-uploads/302cbdcc-ad2e-496b-bb73-502eb77f353a.png" alt="Water fed pole cleaning upper floor window" className="rounded-lg shadow w-full object-cover" />
          <img src="/lovable-uploads/76968d4f-c862-4989-a3e3-b74ac31968e2.png" alt="Pure water system for window cleaning" className="rounded-lg shadow w-full object-cover" />
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="py-12 bg-gray-50 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">You're in Good Hands</h2>
          <div className="flex justify-center gap-6 flex-wrap">
            <img src="/lovable-uploads/a9642252-b006-4c8c-89d4-d439e04f9891.png" alt="Licensed & Insured Badge" className="h-16" />
            <img src="/lovable-uploads/ff4fb258-bc33-4114-83e8-05d0d9f02770.png" alt="Satisfaction Guarantee Badge" className="h-16" />
            <img src="/lovable-uploads/c5219e28-4a09-4d72-bef9-e96193360fa6.png" alt="Locally Owned Badge" className="h-16" />
            <img src="/lovable-uploads/dfaebca8-43d4-42ef-89ea-15ebe31be9c7.png" alt="Eco Friendly Badge" className="h-16" />
          </div>
        </div>
      </section>

      {/* WHAT OUR CLIENTS SAY */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">What Our Clients Say</h2>
        <div className="mx-auto mb-8" style={{ maxWidth: 500 }}>
          <TestimonialCard
            quote={windowTestimonial.quote}
            name={windowTestimonial.name}
            location={windowTestimonial.location}
            rating={"rating" in windowTestimonial ? windowTestimonial.rating : 5}
            beforeAfterImage={"beforeAfterImage" in windowTestimonial ? windowTestimonial.beforeAfterImage : undefined}
          />
        </div>
        <div className="text-center">
          <Button asChild variant="outline" size="lg" className="bg-bc-red text-white hover:bg-bc-red/90">
            <Link to="/why-us">See More Testimonials</Link>
          </Button>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 bg-blue-100 text-center">
        <h2 className="text-2xl md:text-3xl font-bold">Ready for Sparkling Windows?</h2>
        <p className="text-lg mt-2 mb-6">Book now and see the difference professional window cleaning makes.</p>
        <Button asChild variant="bc-red" size="lg" className="text-lg font-semibold">
          <Link to="/calculator">Check Prices &amp; Availability</Link>
        </Button>
      </section>

      {/* FOOTER */}
      <footer className="footer py-8 text-center bg-gray-800 text-white">
        <p>&copy; 2025 BC Pressure Washing. All rights reserved.</p>
      </footer>
    </Layout>
  );
};

export default WindowCleaning;

