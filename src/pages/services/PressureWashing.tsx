
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Layout from '../../components/Layout';
import { Button } from '@/components/ui/button';
import { Check, MapPin } from 'lucide-react';
import TestimonialCard from '@/components/TestimonialCard';
import { Badge } from '@/components/ui/badge';
import { testimonials } from '@/data/testimonials';
import ServiceAreaMap from '@/components/ServiceAreaMap';

// USER IMAGES (keep original paths)
const HOUSE_EXTERIORS_IMG = "/lovable-uploads/1fb29b3f-e2ed-44b9-8ae8-b04efbf4fcce.png";
const DRIVEWAYS_IMG = "/lovable-uploads/5c38ab2e-3c2b-4fd1-9c94-b4715ce79479.png";
const PATIOS_DECKS_IMG = "/lovable-uploads/82d69edb-6210-433b-a762-4610f454fc2c.png";
const FENCES_IMG = "/lovable-uploads/7fa0104e-36e2-445b-8e02-acb214231c27.png";
const FEATURED_PROJECT_IMG = "/lovable-uploads/c47d9786-e883-4e04-9e43-be7f182735bb.png";
const PROPERTY_BACK_TO_LIFE_IMG = "/lovable-uploads/d2a05c53-e519-43eb-a837-d026ae7c42fc.png";

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
    description: 'Peace of mind — we\'re fully protected so your property is too.',
    image: "/lovable-uploads/1b3ad446-14a6-40c5-8292-6c774e00109c.png"
  },
  {
    title: 'Eco-Friendly Cleaning Agents',
    description: '100% safe for pets, plants, and our local environment.',
    image: "/lovable-uploads/f05fd62e-74a2-4b37-83ac-baee3893fc3d.png"
  },
  {
    title: '100% Satisfaction Guarantee',
    description: 'If you\'re not thrilled, we\'ll re-clean for free — period.',
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

      {/* 1. HERO SECTION - Fixed video display */}
      <header className="relative bg-black h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="absolute inset-0 w-full h-full z-0">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/lYnXijewxCM?autoplay=1&mute=1&loop=1&playlist=lYnXijewxCM&controls=0&showinfo=0&rel=0"
            title="Pressure Washing Surface Cleaner Video"
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{
              border: 'none',
              width: '100%',
              height: '100%',
              objectFit: "cover",
              pointerEvents: "none"
            }}
          />
        </div>
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

      {/* 2. WHAT WE CLEAN - Updated with new images */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Expert Pressure Washing for Every Surface</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-6">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-2xl shadow-lg mb-4 overflow-hidden w-32 h-32">
                <img src="/lovable-uploads/4b31a7a4-ec16-4996-a49e-ee4b41fe0713.png" alt="House Exteriors" className="object-cover w-full h-full" />
              </div>
              <h3 className="font-semibold text-lg">House Exteriors</h3>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-2xl shadow-lg mb-4 overflow-hidden w-32 h-32">
                <img src="/lovable-uploads/c5717ab7-6ffd-477f-9518-01adaa2fc3b2.png" alt="Driveways" className="object-cover w-full h-full" />
              </div>
              <h3 className="font-semibold text-lg">Driveways</h3>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-2xl shadow-lg mb-4 overflow-hidden w-32 h-32">
                <img src="/lovable-uploads/08fdbd08-5cb0-48a2-8a3b-3292e2c59d16.png" alt="Patios and Decks" className="object-cover w-full h-full" />
              </div>
              <h3 className="font-semibold text-lg">Patios &amp; Decks</h3>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-2xl shadow-lg mb-4 overflow-hidden w-32 h-32">
                <img src="/lovable-uploads/7ab353eb-4733-4841-a5dd-c656ebd963db.png" alt="Fences" className="object-cover w-full h-full" />
              </div>
              <h3 className="font-semibold text-lg">Fences</h3>
            </div>
          </div>
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

      {/* 4. FEATURED PROJECT */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Featured Project: South Abbotsford Church</h2>
          <p className="text-center text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
            See how we transformed this commercial property with our professional pressure washing services.
          </p>
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/bd7fedd3-f7c3-44f0-9588-8a16b56326be.png"
              alt="Featured Project - South Abbotsford Church"
              className="rounded-xl shadow-2xl max-w-4xl w-full"
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

      {/* 6. CUSTOMER TESTIMONIALS - Made cards bigger */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Customer Testimonials</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {pwTestimonials.slice(0, 2).map((testimonial, index) => (
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

      {/* 8. CALL TO ACTION - Updated with full width image */}
      <section className="relative min-h-[400px] w-full">
        <div className="absolute inset-0 w-full h-full">
          <img
            src={PROPERTY_BACK_TO_LIFE_IMG}
            alt="Let's bring your property back to life"
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-16 text-center h-full flex items-center justify-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white drop-shadow-lg">Let's Bring Your Property Back to Life</h2>
            <Button 
              asChild
              variant="default" 
              size="lg" 
              className="bg-white text-bc-red hover:bg-gray-100 text-lg font-semibold px-8 py-6"
            >
              <Link to="/calculator">Get My Free Quote &rarr;</Link>
            </Button>
          </div>
        </div>
      </section>

      <ServiceAreaMap />
    </Layout>
  );
};

export default PressureWashing;
