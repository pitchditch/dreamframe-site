
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/Layout';
import { Shield, Award, Users, CheckCircle2, Star, Clock, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const WhyUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <Layout 
      title="Why Choose BC Pressure Washing | Surrey & White Rock's Premier Cleaning Service"
      description="Learn why BC Pressure Washing is the top choice for exterior cleaning in White Rock & Surrey. Professional equipment, expert technicians, and satisfaction guaranteed."
      canonicalUrl="/why-us"
      image="/lovable-uploads/281422a1-6eb1-4353-9f93-de7d6163152e.png"
    >
      <Helmet>
        <title>Why Choose BC Pressure Washing | Surrey & White Rock's Premier Cleaning Service</title>
        <meta name="description" content="Learn why BC Pressure Washing is the top choice for exterior cleaning in White Rock & Surrey. Professional equipment, expert technicians, and satisfaction guaranteed." />
        <meta property="og:title" content="Why Choose BC Pressure Washing - Surrey's Premier Cleaning Service" />
        <meta property="og:description" content="Professional, reliable exterior cleaning services with top-of-the-line equipment and expert technicians." />
        <meta name="keywords" content="best pressure washing Surrey, top window cleaning White Rock, expert gutter cleaning, professional exterior cleaning services, BC Pressure Washing quality" />
      </Helmet>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Why Choose BC Pressure Washing</h1>
            <p className="text-xl opacity-90 mb-8">Discover what makes us the preferred exterior cleaning specialists in White Rock, Surrey and across the Lower Mainland</p>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">What Sets Us Apart</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="rounded-full bg-red-100 p-3 w-14 h-14 flex items-center justify-center mb-4">
                <Shield className="text-bc-red h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Fully Insured</h3>
              <p className="text-gray-600">We carry comprehensive insurance for your peace of mind. Your property is always protected when we're on the job.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="rounded-full bg-red-100 p-3 w-14 h-14 flex items-center justify-center mb-4">
                <Award className="text-bc-red h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Premium Equipment</h3>
              <p className="text-gray-600">We invest in top-quality, professional-grade equipment to deliver superior results for every service we provide.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="rounded-full bg-red-100 p-3 w-14 h-14 flex items-center justify-center mb-4">
                <Users className="text-bc-red h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Experienced Team</h3>
              <p className="text-gray-600">Our technicians are highly trained and experienced, ensuring consistent quality and attention to detail.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="rounded-full bg-red-100 p-3 w-14 h-14 flex items-center justify-center mb-4">
                <CheckCircle2 className="text-bc-red h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Satisfaction Guaranteed</h3>
              <p className="text-gray-600">We stand behind our work with a satisfaction guarantee. If you're not happy, we'll make it right.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="rounded-full bg-red-100 p-3 w-14 h-14 flex items-center justify-center mb-4">
                <Star className="text-bc-red h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">5-Star Service</h3>
              <p className="text-gray-600">Our commitment to excellence has earned us consistent 5-star ratings from our satisfied customers.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="rounded-full bg-red-100 p-3 w-14 h-14 flex items-center justify-center mb-4">
                <Truck className="text-bc-red h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Locally Owned</h3>
              <p className="text-gray-600">As a local business, we take pride in serving our community with personal care and attention.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Red Car Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold mb-4">Spotted Our Red Car?</h2>
              <p className="text-gray-700 mb-4">
                If you've seen our distinctive red vehicle around White Rock and Surrey, mention it when you contact us to receive a special <span className="font-bold text-bc-red animate-pulse text-xl">10% discount</span> on your service!
              </p>
              <p className="text-gray-700 mb-6">
                Our red car has become a recognized symbol of quality pressure washing and window cleaning services throughout the community. We take pride in being visible and accessible to our customers.
              </p>
              <Button asChild variant="bc-red" size="lg">
                <Link to="/contact">
                  Claim Your Discount
                </Link>
              </Button>
            </div>
            <div className="order-1 md:order-2">
              <img 
                src="/lovable-uploads/082a711b-0417-4ffb-aa1a-69a4a7b54f09.png" 
                alt="BC Pressure Washing Red Company Car" 
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Owner Profile */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <img 
                  src="/lovable-uploads/9ab5a05b-8db4-45b1-b31f-73f16bbc49a0.png" 
                  alt="Jayden Fisher - Owner of BC Pressure Washing" 
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4">Meet the Owner</h2>
                <p className="text-gray-700 mb-4">
                  "I believe in being visible and approachable in the community I serve. When you see our red car, feel free to wave or stop for a chat!"
                </p>
                <p className="text-gray-700 mb-6">
                  "Every service we provide is delivered with the same attention to detail and quality that I would expect for my own property. That's my personal guarantee to you."
                </p>
                <div className="flex items-center">
                  <p className="font-bold text-bc-red">— Jayden Fisher, Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-bc-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Experience the Difference?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today to schedule your service or request a free, no-obligation quote.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="bg-white text-bc-red hover:bg-gray-100 border-none">
              <Link to="/contact">Get a Free Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <a href="tel:+16047860399">Call Us Today</a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WhyUs;
