
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

const WindowCleaning = () => {
  return (
    <Layout title="Crystal Clear Windows, Guaranteed | Window Cleaning BC"
      description="Professional window cleaning with a 100% satisfaction guarantee — or we re-clean for free. Book your free quote today."
      image="/lovable-uploads/9185f920-c6ac-4208-b4ce-34c34612c549.png">
      
      {/* Updated Hero Section - Full size image with button positioned lower */}
      <header className="relative h-screen w-full">
        <img
          src="/lovable-uploads/9185f920-c6ac-4208-b4ce-34c34612c549.png"
          alt="Professional window cleaning service"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-12 left-0 right-0 flex justify-center">
          {/* Moved button lower (from bottom-20 to bottom-12) */}
          <Button asChild variant="bc-red" size="lg" className="shadow-xl text-lg font-semibold rounded-md">
            <Link to="/calculator">Check Prices & Availability</Link>
          </Button>
        </div>
      </header>

      {/* WHY CHOOSE US */}
      <section className="py-16 px-4 max-w-5xl mx-auto bg-[#f9f9f9]">
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
      <section className="py-16 bg-[#f9f9f9] px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Advanced Water Fed Pole Technology</h2>
        <p className="text-lg text-center mb-8 max-w-3xl mx-auto">
          We use cutting-edge water fed pole systems with multi-stage water purification to leave your exterior windows completely spot and streak-free — no soap, no residue. Our system filters out minerals, sediments, and impurities, delivering ultra-pure water that dries crystal clear. 
          It also allows us to clean high windows safely from the ground — no ladders, no damage.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative aspect-video w-full rounded-2xl shadow-lg overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/PKw0OS7iDmY?autoplay=1&mute=1&loop=1&playlist=PKw0OS7iDmY"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Water Fed Pole System - Exterior Window Cleaning"
              className="absolute inset-0 w-full h-full"
              style={{
                border: "none",
                objectFit: "cover",
                transform: "scale(1.5)",
              }}
            />
          </div>
          <div className="relative aspect-video w-full rounded-2xl shadow-lg overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/xeUNIHhOxb8?autoplay=1&mute=1&loop=1&playlist=xeUNIHhOxb8"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Squeegee Technique - Interior Window Cleaning"
              className="absolute inset-0 w-full h-full"
              style={{
                border: "none",
                objectFit: "cover",
                transform: "scale(1.5)",
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
            <img src="/lovable-uploads/f05fd62e-74a2-4b37-83ac-baee3893fc3d.png" alt="Eco-Friendly Cleaning Solutions Badge" className="h-48 w-auto" />
            <img src="/lovable-uploads/61c248da-a39d-4414-a395-5a104dbff13b.png" alt="100% Satisfaction Guaranteed Badge" className="h-48 w-auto" />
            <img src="/lovable-uploads/1b3ad446-14a6-40c5-8292-6c774e00109c.png" alt="Fully Insured & Licensed Badge" className="h-48 w-auto" />
            <img src="/lovable-uploads/732df9a1-30af-4d3c-9e7f-569e3c4e30d3.png" alt="Locally Owned & Operated Badge" className="h-48 w-auto" />
          </div>
        </div>
      </section>

      {/* WHAT OUR CLIENTS SAY - Made testimonial larger */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Clients Say</h2>
        <div className="mx-auto mb-8" style={{ maxWidth: '100%' }}>
          {/* Increased size by removing maxWidth restriction */}
          <TestimonialCard
            quote={windowTestimonial.quote}
            name={windowTestimonial.name}
            location={windowTestimonial.location}
            rating={"rating" in windowTestimonial ? windowTestimonial.rating : 5}
            beforeAfterImage={"beforeAfterImage" in windowTestimonial ? windowTestimonial.beforeAfterImage : undefined}
            className="scale-110 transform" // Using the className prop properly now
          />
        </div>
        <div className="text-center">
          <Button asChild variant="outline" size="lg" className="bg-bc-red text-white hover:bg-bc-red/90">
            <Link to="/why-us">See More Testimonials</Link>
          </Button>
        </div>
      </section>

      {/* CTA SECTION */}
      <RoofCleaningCTA />
    </Layout>
  );
};

// Refactor RoofCleaningCTA for use in WindowCleaning page
const RoofCleaningCTA = () => {
  return (
    <section className="relative h-screen w-full">
      <img
        src="/lovable-uploads/13c3d877-d7e9-4e18-8266-eb45347c292c.png"
        alt="All in one window cleaning service"
        className="absolute inset-0 w-full h-full object-cover object-[50%_50%]"
      />
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl font-bold mb-6 text-white drop-shadow-lg">Ready for Sparkling Windows?</h2>
        <p className="text-xl text-white mb-8 drop-shadow-lg max-w-2xl">
          Experience our all-in-one cleaning service - Window, Frame & Sill, and Screen Cleaning
        </p>
        <Button asChild variant="bc-red" size="lg" className="text-lg font-semibold">
          <Link to="/calculator">Book Now</Link>
        </Button>
      </div>
    </section>
  );
};

export default WindowCleaning;
