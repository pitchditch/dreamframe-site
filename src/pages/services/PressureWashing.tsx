import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Layout from '../../components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Star } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import TestimonialCard from '@/components/TestimonialCard';
import { Badge } from '@/components/ui/badge';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Card, CardContent } from '@/components/ui/card';
import { testimonials } from '@/data/testimonials';

// Find pressure washing related testimonials
const pressureWashingTestimonials = testimonials.filter(
  (t) => t.quote && (
    t.quote.toLowerCase().includes("pressure") || 
    t.quote.toLowerCase().includes("wash") ||
    t.quote.toLowerCase().includes("clean")
  )
).slice(0, 3);

const PressureWashing = () => {
  const { t } = useTranslation();
  
  return (
    <Layout>
      <Helmet>
        <title>Professional Pressure Washing in Surrey & White Rock | BC Pressure Washing</title>
        <meta name="description" content="Eco-conscious pressure washing using surface cleaners & safe chemical solutions. House washing, driveway cleaning, and commercial services. Get a free quote!" />
        <meta name="keywords" content="pressure washing Surrey, house washing White Rock, driveway cleaning Surrey, eco-friendly pressure washing, commercial pressure washing" />
      </Helmet>
      
      {/* 1. HERO SECTION */}
      <header className="relative bg-black min-h-[500px] flex items-center justify-center">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          poster="/lovable-uploads/2e6b8af4-e2b3-424a-bdfb-3ba6a8d188f4.png"
        >
          <source src="https://youtu.be/PKw0OS7iDmY" type="video/mp4" />
        </video>
        <div className="relative z-10 text-center px-6 py-20 md:py-32 max-w-5xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg mb-4">
            Professional Pressure Washing in Surrey & White Rock
          </h1>
          <p className="text-lg md:text-2xl text-white font-medium mb-8 max-w-3xl mx-auto">
            Eco-conscious cleaning using surface cleaners &amp; safe chemical solutions. Your home or business deserves the best.
          </p>
          <Button asChild variant="bc-red" size="lg" className="shadow-xl text-lg font-semibold rounded-md">
            <a href="#booking-section">Get Your Free Quote Today <ArrowRight className="ml-2" size={18} /></a>
          </Button>
        </div>
      </header>

      {/* 2. WHAT WE CLEAN */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Expert Pressure Washing for Every Surface</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Driveways */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-gray-100 rounded-full p-6 mb-4">
                <img src="/lovable-uploads/7fa0104e-36e2-445b-8e02-acb214231c27.png" alt="Driveway pressure washing" className="w-24 h-24 object-cover rounded-full" />
              </div>
              <h3 className="font-semibold text-lg mb-1">Driveways</h3>
            </div>
            {/* House Exteriors */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-gray-100 rounded-full p-6 mb-4">
                <img src="/lovable-uploads/417b8f9b-59c5-4d97-b333-e204b4d67c51.png" alt="House exterior pressure washing" className="w-24 h-24 object-cover rounded-full" />
              </div>
              <h3 className="font-semibold text-lg mb-1">House Exteriors</h3>
            </div>
            {/* Patios & Decks (combined) */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-gray-100 rounded-full p-6 mb-4">
                <img src="/lovable-uploads/ed9fa980-3e80-4398-9d6d-b2c95be9982d.png" alt="Patio and deck pressure washing" className="w-24 h-24 object-cover rounded-full" />
              </div>
              <h3 className="font-semibold text-lg mb-1">Patios & Decks</h3>
            </div>
            {/* Fences */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-gray-100 rounded-full p-6 mb-4">
                <img src="/lovable-uploads/f46ac2d7-7e8b-4a54-95ae-63db67082c3e.png" alt="Fence pressure washing" className="w-24 h-24 object-cover rounded-full" />
              </div>
              <h3 className="font-semibold text-lg mb-1">Fences</h3>
            </div>
          </div>
          
          <p className="text-center mt-10 text-lg text-gray-600 max-w-3xl mx-auto">
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
          
          {/* Quick video bonus, borderless */}
          <div className="mt-16 max-w-3xl mx-auto">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
              <iframe 
                src="https://www.youtube.com/embed/PKw0OS7iDmY?autoplay=1&mute=1&loop=1&playlist=PKw0OS7iDmY" 
                className="w-full h-64 md:h-80 border-0" 
                style={{ border: "none" }}
                title="Surface cleaner in action"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
            <p className="text-center text-gray-500 mt-2">Watch our surface cleaner in action</p>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PROJECT (was: BEFORE & AFTER GALLERY) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Featured Project: South Abbotsford Church</h2>
          <p className="text-center text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
            See what a real transformation looks like – commercial-grade cleaning with a visible before/after difference. 
          </p>
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/2e6b8af4-e2b3-424a-bdfb-3ba6a8d188f4.png" 
              alt="Featured Project: South Abbotsford Church" 
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
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="mb-4 text-bc-red">
                <img 
                  src="/lovable-uploads/76968d4f-c862-4989-a3e3-b74ac31968e2.png" 
                  alt="Jayden Fisher" 
                  className="w-24 h-24 object-cover rounded-full mx-auto" 
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Owner-Operated</h3>
              <p className="text-gray-600">Every job is checked by Jayden Fisher</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="mb-4 text-bc-red">
                <Check size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fully Insured</h3>
              <p className="text-gray-600">Complete peace of mind with full coverage</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="mb-4 text-bc-red">
                <img 
                  src="/lovable-uploads/f05fd62e-74a2-4b37-83ac-baee3893fc3d.png" 
                  alt="Eco-friendly" 
                  className="h-14" 
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Eco-Friendly Cleaning Agents</h3>
              <p className="text-gray-600">Safe for your family, pets, and the environment</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="mb-4 text-bc-red">
                <img 
                  src="/lovable-uploads/61c248da-a39d-4414-a395-5a104dbff13b.png" 
                  alt="100% satisfaction" 
                  className="h-14" 
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Competitive Pricing</h3>
              <p className="text-gray-600">Excellent value without compromising quality</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="mb-4 text-bc-red">
                <img 
                  src="/lovable-uploads/732df9a1-30af-4d3c-9e7f-569e3c4e30d3.png" 
                  alt="Local service" 
                  className="h-14" 
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast, Friendly Local Service</h3>
              <p className="text-gray-600">Quick response times from people who live in your community</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Customer Testimonials</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pressureWashingTestimonials.map((testimonial, index) => (
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
              <h3 className="text-xl font-semibold mb-3">What's the benefit of using a surface cleaner vs. a wand?</h3>
              <p className="text-gray-600">
                Surface cleaners provide a more even, consistent clean without leaving "zebra stripes" or uneven patterns that often occur with wands. They distribute water pressure evenly across a wider area, clean faster, use less water, and minimize the risk of surface damage. This results in a more professional finish and is why we use commercial-grade surface cleaners for most flat surfaces.
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
            <Link to="/calculator">Get My Free Quote <ArrowRight className="ml-2" size={18} /></Link>
          </Button>
          <p className="mt-6 text-lg">Fast response. No pressure. Just clean.</p>
        </div>
      </section>

      {/* 9. LOCAL SEO FOOTER */}
      <section className="py-8 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">
            Serving Surrey, White Rock, South Surrey, Langley, and Greater Vancouver
          </p>
          <div className="flex flex-wrap justify-center gap-8 mt-0 mb-0 pb-0">
            <Badge className="bg-gray-700 hover:bg-gray-600 text-white text-lg px-8 py-4 rounded-lg min-w-[210px] max-w-none">
              <Link to="/services/window-cleaning">Window Cleaning</Link>
            </Badge>
            <Badge className="bg-gray-700 hover:bg-gray-600 text-white text-lg px-8 py-4 rounded-lg min-w-[210px] max-w-none">
              <Link to="/services/roof-cleaning">Roof Cleaning</Link>
            </Badge>
            <Badge className="bg-gray-700 hover:bg-gray-600 text-white text-lg px-8 py-4 rounded-lg min-w-[210px] max-w-none">
              <Link to="/services/gutter-cleaning">Gutter Cleaning</Link>
            </Badge>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PressureWashing;
