import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Layout from '../../components/Layout';
import { Button } from '@/components/ui/button';
import { Check, MapPin } from 'lucide-react';
import TestimonialCard from '@/components/TestimonialCard';
import { Badge } from '@/components/ui/badge';
import { testimonials } from '@/data/testimonials';
import ServiceAreaMap from '@/components/ServiceAreaMap';

// USER IMAGES (replace with uploaded assets)
const HOUSE_EXTERIORS_IMG = "/lovable-uploads/photo-1465379944081-7f47de8d74ac.jpg";
const DRIVEWAYS_IMG = "/lovable-uploads/photo-1485833077593-4278bba3f11f.jpg";
const PATIOS_DECKS_IMG = "/lovable-uploads/photo-1500375592092-40eb2168fd21.jpg";
const FENCES_IMG = "/lovable-uploads/photo-1487252665478-49b61b47f302.jpg";
const FEATURED_PROJECT_IMG = "/lovable-uploads/c47d9786-e883-4e04-9e43-be7f182735bb.png";

// Owner operated image (headshot)
const OWNER_IMG = "/lovable-uploads/c47d9786-e883-4e04-9e43-be7f182735bb.png";

// BADGES (icon is just visual, images come from lovable uploads)
const whyUsBadges = [
  {
    title: 'Owner-Operated',
    description: 'Every job is checked by Jayden Fisher for personal quality assurance.',
    image: OWNER_IMG
  },
  {
    title: 'Fully Insured',
    description: 'Peace of mind — we’re fully protected so your property is too.',
    image: "/lovable-uploads/1b3ad446-14a6-40c5-8292-6c774e00109c.png"
  },
  {
    title: 'Eco-Friendly Cleaning Agents',
    description: '100% safe for pets, plants, and our local environment.',
    image: "/lovable-uploads/f05fd62e-74a2-4b37-83ac-baee3893fc3d.png"
  },
  {
    title: '100% Satisfaction Guarantee',
    description: 'If you’re not thrilled, we’ll re-clean for free — period.',
    image: "/lovable-uploads/61c248da-a39d-4414-a395-5a104dbff13b.png"
  }
];

// Only show 2–4 reviews, preferably about professionalism/effectiveness
const pwTestimonials = testimonials.filter(
  (t) => t.quote && (
    t.quote.toLowerCase().includes("pressure") ||
    t.quote.toLowerCase().includes("professional") ||
    t.quote.toLowerCase().includes("effect") ||
    t.quote.toLowerCase().includes("friendly")
  )
).slice(0, 4);

const PressureWashing = () => {
  return (
    <Layout>
      <Helmet>
        <title>Professional Pressure Washing in Surrey & White Rock | BC Pressure Washing</title>
        <meta name="description" content="Eco-conscious pressure washing using surface cleaners & safe chemical solutions. House washing, driveway cleaning, and commercial services. Get a free quote!" />
        <meta name="keywords" content="pressure washing Surrey, house washing White Rock, driveway cleaning Surrey, eco-friendly pressure washing, commercial pressure washing" />
      </Helmet>

      {/* 1. HERO SECTION */}
      <header className="relative bg-black min-h-[450px] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <iframe
          className="absolute inset-0 w-full h-full object-cover z-0 select-none pointer-events-none"
          src="https://www.youtube.com/embed/uxFSTD4SpS0?autoplay=1&mute=1&loop=1&playlist=uxFSTD4SpS0&controls=0&showinfo=0&rel=0"
          title="Pressure Washing Surface Cleaner Video"
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{ border: 'none', minHeight: "450px", objectFit: "cover", transform: "scale(1.2)", transformOrigin: "center" }}
        />
        <div className="relative z-20 text-center px-6 py-16 md:py-28 w-full flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">Professional Pressure Washing in Surrey &amp; White Rock</h1>
          <p className="text-lg md:text-2xl text-white font-medium mb-6 max-w-2xl mx-auto">
            Eco-conscious cleaning using surface cleaners &amp; safe chemical solutions. Your home or business deserves the best.
          </p>
          <Button asChild variant="bc-red" size="lg" className="shadow-xl text-lg font-semibold rounded-md">
            <a href="#booking-section">Get Your Free Quote Today &rarr;</a>
          </Button>
        </div>
      </header>

      {/* 2. WHAT WE CLEAN */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Expert Pressure Washing for Every Surface</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-6">
            {/* House Exteriors */}
            <div className="flex flex-col items-center text-center">
              <div className="rounded-2xl shadow-lg mb-4 overflow-hidden w-32 h-32">
                <img src={HOUSE_EXTERIORS_IMG} alt="House Exteriors" className="object-cover w-full h-full" />
              </div>
              <h3 className="font-semibold text-lg">House Exteriors</h3>
            </div>
            {/* Driveways */}
            <div className="flex flex-col items-center text-center">
              <div className="rounded-2xl shadow-lg mb-4 overflow-hidden w-32 h-32">
                <img src={DRIVEWAYS_IMG} alt="Driveways" className="object-cover w-full h-full" />
              </div>
              <h3 className="font-semibold text-lg">Driveways</h3>
            </div>
            {/* Patios & Decks */}
            <div className="flex flex-col items-center text-center">
              <div className="rounded-2xl shadow-lg mb-4 overflow-hidden w-32 h-32">
                <img src={PATIOS_DECKS_IMG} alt="Patios and Decks" className="object-cover w-full h-full" />
              </div>
              <h3 className="font-semibold text-lg">Patios &amp; Decks</h3>
            </div>
            {/* Fences */}
            <div className="flex flex-col items-center text-center">
              <div className="rounded-2xl shadow-lg mb-4 overflow-hidden w-32 h-32">
                <img src={FENCES_IMG} alt="Fences" className="object-cover w-full h-full" />
              </div>
              <h3 className="font-semibold text-lg">Fences</h3>
            </div>
          </div>
          <p className="text-center mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            No damage – just deep, effective cleaning tailored for each surface type.
          </p>
        </div>
      </section>

      {/* 3. OUR PROCESS */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">A Deep Clean That's Safe, Effective &amp; Guaranteed</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-bc-red bg-opacity-10 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                <span className="text-bc-red font-bold text-2xl">1</span>
              </div>
              <h3 className="text-xl font-bold text-center mb-3">Pre-Treat</h3>
              <p className="text-gray-600 text-center">
                We apply a biodegradable sodium hypochlorite solution to kill algae, mold, and embedded grime.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-bc-red bg-opacity-10 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                <span className="text-bc-red font-bold text-2xl">2</span>
              </div>
              <h3 className="text-xl font-bold text-center mb-3">Surface Cleaning</h3>
              <p className="text-gray-600 text-center">
                Using commercial-grade surface cleaners for streak-free, even results.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-bc-red bg-opacity-10 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                <span className="text-bc-red font-bold text-2xl">3</span>
              </div>
              <h3 className="text-xl font-bold text-center mb-3">Final Rinse &amp; Post-Treatment</h3>
              <p className="text-gray-600 text-center">
                We rinse with clean water and perform a walkthrough to guarantee satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PROJECT (Image instead of before/after slider, use user's first image) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Featured Project: Local Transformation</h2>
          <p className="text-center text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
            See the dramatic difference we've created for homes right here in the Surrey &amp; White Rock area.
          </p>
          <div className="flex justify-center">
            <img 
              src={FEATURED_PROJECT_IMG}
              alt="Featured Local Project"
              className="rounded-xl shadow-2xl max-w-3xl w-full"
              style={{ border: "none" }}
            />
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Surrey Homeowners Trust Us Over Shack Shine or Men in Kilts
          </h2>
          <div className="flex flex-wrap justify-center gap-10 items-stretch mb-4">
            {whyUsBadges.map((badge, idx) => (
              <div
                className="flex flex-col items-center text-center bg-white rounded-2xl shadow-lg px-8 py-8 mx-3 grow gap-3 min-w-[280px] max-w-lg"
                style={{ flexBasis: "340px" }}
                key={badge.title}
              >
                <div
                  className="mb-4"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: idx === 0 ? 130 : 110,
                    height: idx === 0 ? 130 : 110,
                    borderRadius: "100%",
                    background: idx === 0 ? "#eee" : "rgba(252, 49, 48, 0.09)",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={badge.image}
                    alt={badge.title}
                    className={`object-cover ${idx === 0 ? "w-[110px] h-[110px]" : "h-[90px] w-[90px]"}`}
                    style={{
                      borderRadius: "100%",
                      background: idx === 0 ? "#fff" : "",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">{badge.title}</h3>
                <p className="text-gray-700 text-base">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CUSTOMER TESTIMONIALS */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Customer Testimonials</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {pwTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                name={testimonial.name}
                location={testimonial.location}
                rating={testimonial.rating || 5}
                beforeAfterImage={testimonial.beforeAfterImage}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ SECTION */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Is pressure washing safe for all surfaces?</h3>
              <p className="text-gray-600">
                Not all surfaces should be treated the same way. We use different techniques and pressures for different materials. Our technicians are trained to assess each surface and use the appropriate method to ensure effective cleaning without damage. For delicate surfaces, we use soft washing techniques with lower pressure.
              </p>
            </div>
            {/* SKIPPED the "surface cleaner vs. wand" question based on user request */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Is sodium hypochlorite safe for pets and plants?</h3>
              <p className="text-gray-600">
                When properly diluted and applied by professionals, sodium hypochlorite is safe. We take precautions like pre-wetting plants and ensuring pets are kept away during application. The solution breaks down quickly after use, and our thorough rinsing process ensures no harmful residue remains. We can also adjust our cleaning methods if you have specific environmental concerns.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">How long will it stay clean?</h3>
              <p className="text-gray-600">
                Results typically last 1-2 years depending on environmental factors like shade, moisture, and surrounding vegetation. North-facing surfaces or areas under trees may require more frequent cleaning. We offer maintenance programs to keep your property looking its best year-round with scheduled cleaning visits.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Do you offer bundled pricing for house + driveway?</h3>
              <p className="text-gray-600">
                Yes! We offer package deals that can save you money when combining services like house washing, driveway cleaning, and other exterior cleaning services. Contact us for a custom quote based on your specific needs. Our bundled services are popular because they provide the best value while transforming your entire property at once.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION */}
      <section id="booking-section" className="py-16 bg-bc-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Bring Your Property Back to Life</h2>
          <Button 
            asChild
            variant="default" 
            size="lg" 
            className="bg-white text-bc-red hover:bg-gray-100 text-lg font-semibold px-8 py-6"
          >
            <Link to="/calculator">Get My Free Quote &rarr;</Link>
          </Button>
          <p className="mt-6 text-lg">Fast response. No pressure. Just clean.</p>
        </div>
      </section>

      {/* 9. LOCAL SEO FOOTER & AREAS SERVED - Only one, combined with map */}
      <footer className="bg-gray-900 text-white pt-12 pb-2">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-1 flex justify-center items-center gap-2">
            <MapPin className="text-bc-red" /> Areas We Serve: Surrey, White Rock, South Surrey, Langley, and Greater Vancouver
          </h3>
        </div>
        <div className="flex justify-center my-6 pb-0">
          {/* Embed Service Area Map directly */}
          <ServiceAreaMap />
        </div>
        <div className="flex flex-wrap justify-center gap-8 mt-8 pb-2">
          <Badge className="bg-gray-700 hover:bg-gray-600 text-white text-lg px-12 py-4 rounded-lg min-w-[280px] max-w-none">
            <Link to="/services/window-cleaning">Window Cleaning</Link>
          </Badge>
          <Badge className="bg-gray-700 hover:bg-gray-600 text-white text-lg px-12 py-4 rounded-lg min-w-[280px] max-w-none">
            <Link to="/services/roof-cleaning">Roof Cleaning</Link>
          </Badge>
          <Badge className="bg-gray-700 hover:bg-gray-600 text-white text-lg px-12 py-4 rounded-lg min-w-[280px] max-w-none">
            <Link to="/services/gutter-cleaning">Gutter Cleaning</Link>
          </Badge>
        </div>
      </footer>
    </Layout>
  );
};

export default PressureWashing;
