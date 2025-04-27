import Layout from '../../components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { testimonials } from '@/data/testimonials';
import TestimonialCard from '@/components/TestimonialCard';

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
    description: "Peace of mind comes standard — we\'re fully covered.",
  },
];

// Showcase section using YouTube iframes for each method
const WindowCleaningShowcaseSection = () => (
  <section className="py-16 bg-gray-50 animate-on-scroll">
    <div className="max-w-6xl mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-4">See Our Window Cleaning in Action</h2>
      <p className="text-lg text-gray-600 mb-10">
        We use a pure water-fed pole system for spotless exterior windows and traditional squeegee methods for crystal-clear interiors.
      </p>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Exterior Windows - Water Fed Pole */}
        <div>
          <div className="aspect-w-16 aspect-h-9 w-full rounded-2xl shadow-lg overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/03njfGLUDUQ?autoplay=1&mute=1&loop=1&playlist=03njfGLUDUQ"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Exterior Window Cleaning - Water Fed Pole"
              className="w-full h-full"
              style={{
                border: "none",
                objectFit: "cover",
                transform: "scale(1.15)",
                transformOrigin: "center",
              }}
            />
          </div>
          <h3 className="text-xl font-semibold mt-4">Exterior Window Cleaning</h3>
          <p className="text-gray-500">
            Water-fed pole with purified water leaves no streaks or spots – ideal for high windows and eco-friendly too.
          </p>
        </div>
        {/* Interior Windows - Squeegee */}
        <div>
          <div className="aspect-w-16 aspect-h-9 w-full rounded-2xl shadow-lg overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/bbHnt4UNPcU?autoplay=1&mute=1&loop=1&playlist=bbHnt4UNPcU"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Interior Window Cleaning - Squeegee"
              className="w-full h-full"
              style={{
                border: "none",
                objectFit: "cover",
                transform: "scale(1.15)",
                transformOrigin: "center",
              }}
            />
          </div>
          <h3 className="text-xl font-semibold mt-4">Interior Window Cleaning</h3>
          <p className="text-gray-500">
            Professional hand squeegee technique for a flawless finish – with care and attention inside your home.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const WindowCleaning = () => {
  return (
    <Layout
      title="Crystal Clear Windows, Guaranteed | Window Cleaning BC"
      description="Professional window cleaning with a 100% satisfaction guarantee — or we re-clean for free. Book your free quote today."
      image="/lovable-uploads/30f2c843-a162-44bc-a697-d9d9b7c9faef.png"
    >
      {/* HERO SECTION */}
      <header className="hero-section bg-black min-h-[340px] md:min-h-[460px] flex items-center justify-center relative">
        <img
          src="/lovable-uploads/30f2c843-a162-44bc-a697-d9d9b7c9faef.png"
          alt="Professional window cleaning service"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="relative z-10 text-center px-6 py-20 md:py-32">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">Crystal Clear Windows, Guaranteed</h1>
          <p className="text-lg md:text-2xl text-white font-medium mb-6">
            Professional window cleaning with a 100% satisfaction guarantee — or we re-clean for free.
          </p>
          <Button asChild variant="bc-red" size="lg" className="shadow-xl text-lg font-semibold rounded-md">
            <Link to="/calculator">Get a Free Quote</Link>
          </Button>
        </div>
      </header>

      {/* WHY CHOOSE US */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Why Choose Us for Window Cleaning?</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {whyUs.map((item) => (
            <li key={item.title} className="bg-white rounded-lg shadow p-6 text-left">
              <strong className="block text-bc-red mb-2">{item.title}</strong>
              <span className="text-gray-700">{item.description}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ADVANCED WATER FED POLE TECH */}
      <section className="py-16 bg-white px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Advanced Water Fed Pole Technology</h2>
        <p className="text-lg text-center mb-8 max-w-3xl mx-auto">
          We use cutting-edge water fed pole systems with multi-stage water purification to leave your exterior windows completely spot and streak-free — no soap, no residue. Our system filters out minerals, sediments, and impurities, delivering ultra-pure water that dries crystal clear. 
          It also allows us to clean high windows safely from the ground — no ladders, no damage.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="aspect-w-16 aspect-h-9 w-full rounded-2xl shadow-lg overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/PKw0OS7iDmY?autoplay=1&mute=1&loop=1&playlist=PKw0OS7iDmY"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Water Fed Pole System - Exterior Window Cleaning"
              className="w-full h-full"
              style={{
                border: "none",
                objectFit: "cover",
                transform: "scale(1.15)",
                transformOrigin: "center",
              }}
            />
          </div>
          <div className="aspect-w-16 aspect-h-9 w-full rounded-2xl shadow-lg overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/xeUNIHhOxb8?autoplay=1&mute=1&loop=1&playlist=xeUNIHhOxb8"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Squeegee Technique - Interior Window Cleaning"
              className="w-full h-full"
              style={{
                border: "none",
                objectFit: "cover",
                transform: "scale(1.15)",
                transformOrigin: "center",
              }}
            />
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="py-12 bg-gray-50 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">You're in Good Hands</h2>
          <div className="flex justify-center gap-6 flex-wrap">
            <img src="/lovable-uploads/f05fd62e-74a2-4b37-83ac-baee3893fc3d.png" alt="Eco-Friendly Cleaning Solutions Badge" className="h-28 w-auto" />
            <img src="/lovable-uploads/61c248da-a39d-4414-a395-5a104dbff13b.png" alt="100% Satisfaction Guaranteed Badge" className="h-28 w-auto" />
            <img src="/lovable-uploads/1b3ad446-14a6-40c5-8292-6c774e00109c.png" alt="Fully Insured & Licensed Badge" className="h-28 w-auto" />
            <img src="/lovable-uploads/732df9a1-30af-4d3c-9e7f-569e3c4e30d3.png" alt="Locally Owned & Operated Badge" className="h-28 w-auto" />
          </div>
        </div>
      </section>

      {/* SHOWCASE - SEE OUR WINDOW CLEANING IN ACTION */}
      <WindowCleaningShowcaseSection />

      {/* WHAT OUR CLIENTS SAY */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Clients Say</h2>
        <div className="mx-auto mb-8" style={{ maxWidth: 700 }}>
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

      {/* CTA SECTION - Updated with new image */}
      <section className="relative h-[600px] w-full">
        <img
          src="/lovable-uploads/13c3d877-d7e9-4e18-8266-eb45347c292c.png"
          alt="All in one window cleaning service"
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
          <h2 className="text-4xl font-bold mb-6 text-white drop-shadow-lg">Ready for Sparkling Windows?</h2>
          <p className="text-xl text-white mb-8 drop-shadow-lg">
            Experience our all-in-one cleaning service - Window, Frame & Sill, and Screen Cleaning
          </p>
          <Button asChild variant="bc-red" size="lg" className="text-lg font-semibold">
            <Link to="/calculator">Book Now</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default WindowCleaning;
