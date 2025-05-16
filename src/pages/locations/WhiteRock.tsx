
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '../../components/Layout';
import { ArrowRight, MapPin, Star, Check, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import ServiceGrid from '../../components/locations/ServiceGrid';
import WhiteRockTestimonials from '../../components/locations/WhiteRockTestimonials';
import { Button } from '@/components/ui/button';
import FAQSection from '@/components/FAQSection';

// Define the services offered in White Rock
const services = [
  {
    icon: 'house',
    title: 'House Washing',
    description: 'Gentle soft washing that removes dirt, algae, and moss without damaging your siding.',
    link: '/services/pressure-washing',
  },
  {
    icon: 'window-cleaning',
    title: 'Window Cleaning',
    description: 'Crystal clear windows, screens, tracks, and frames - inside and out.',
    link: '/services/window-cleaning',
  },
  {
    icon: 'driveway-cleaning',
    title: 'Driveway & Sidewalk Cleaning',
    description: 'Remove stubborn stains, moss, and weeds from concrete, pavers, and stonework.',
    link: '/services/pressure-washing',
  },
  {
    icon: 'house-plus',
    title: 'Soft Wash for Siding',
    description: 'Low-pressure cleaning that safely cleans delicate surfaces.',
    link: '/services/soft-washing',
  },
  {
    icon: 'gutter-cleaning',
    title: 'Gutter Cleaning',
    description: 'Clear debris, unclog downspouts, and flush your gutters for proper drainage.',
    link: '/services/gutter-cleaning',
  },
  {
    icon: 'roof-cleaning',
    title: 'Roof Moss Treatment',
    description: 'Safely remove moss and algae from your roof to prevent damage.',
    link: '/services/roof-cleaning',
  }
];

// FAQ data specific to White Rock
const faqItems = [
  {
    question: "How quickly can you service my White Rock home?",
    answer: "We typically offer service within 2-3 days for White Rock residents, and often have same-week availability. For urgent situations, we can sometimes accommodate same-day service."
  },
  {
    question: "Do you offer special rates for White Rock residents?",
    answer: "Yes! As a local White Rock company, we offer special neighborhood discounts. Plus, if you've seen our red car around town, mentioning it gets you an additional 10% off your first service."
  },
  {
    question: "How do you handle the saltwater exposure on oceanfront homes?",
    answer: "We use specialized cleaning solutions and techniques for oceanfront properties in White Rock that effectively remove salt residue without damaging surfaces. Our methods are particularly effective for windows and siding affected by sea spray."
  },
  {
    question: "Are you familiar with the HOA requirements in Semiahmoo?",
    answer: "Absolutely. We work with many homeowners in HOA communities throughout White Rock and are familiar with the specific requirements and restrictions. We can provide the documentation needed for any HOA approval process."
  }
];

const WhiteRock = () => {
  return (
    <Layout
      title="Pressure Washing in White Rock, BC | House & Window Cleaning Services"
      description="Professional pressure washing, window cleaning & exterior services in White Rock. From Marine Drive to Semiahmoo - fast, reliable & affordable. Book now!"
      canonicalUrl="/locations/white-rock"
    >
      <Helmet>
        <meta name="keywords" content="White Rock pressure washing, window cleaning White Rock, house washing BC, gutter cleaning White Rock, roof cleaning service, exterior cleaning, local pressure washing" />
      </Helmet>
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-cover bg-center text-white" style={{ backgroundImage: "url('/lovable-uploads/78b42700-b641-45cf-a11e-fb68f4124509.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Pressure Washing in White Rock, BC</h1>
            <p className="text-xl mb-8">Your local pros for house washing, window cleaning, roof cleaning, and more. Serving Marine Drive to Semiahmoo — fast, reliable, affordable.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-bc-red hover:bg-red-700 text-white font-bold py-3 px-8 rounded">
                Check Prices & Availability
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black font-bold py-3 px-8 rounded">
                View Services
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-3">Services We Offer in White Rock</h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Professional exterior cleaning services tailored to White Rock properties, from beachfront homes to hillside residences.
          </p>
          
          <ServiceGrid services={services} />
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-3">Why White Rock Residents Choose Us</h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Locally Trusted Pressure Washing in White Rock
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="bg-bc-red rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Check className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Locally Owned & Operated</h3>
              <p className="text-gray-600">We live in the community and understand White Rock's unique environmental challenges.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="bg-bc-red rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Quotes & Weekend Availability</h3>
              <p className="text-gray-600">Get a response within hours and book services when it's convenient for you.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="bg-bc-red rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Star className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Red Car Discount</h3>
              <p className="text-gray-600">Seen our red car around town? Mention it for 10% off your first service!</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Before & After */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-3">Before & After Transformations</h2>
          <p className="text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            See the dramatic difference our services make on White Rock properties
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img src="/lovable-uploads/291c6f08-33de-4e2e-85bb-05ef82580cf8.jpg" alt="Before pressure washing" className="w-full h-64 object-cover rounded-lg" />
              <p className="mt-2 text-center text-gray-300">Before: Moss and algae buildup</p>
            </div>
            <div>
              <img src="/lovable-uploads/42b7ee79-c183-4e96-bba0-a83510258d54.jpg" alt="After pressure washing" className="w-full h-64 object-cover rounded-lg" />
              <p className="mt-2 text-center text-gray-300">After: Clean and restored</p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link to="/services" className="inline-flex items-center text-bc-red hover:underline">
              View more transformations <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Service Areas */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-3">Where We Work in White Rock</h2>
          <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
            From the Pier to the Five Corners — We've Got You Covered
          </p>
          
          <div className="bg-gray-50 p-6 rounded-lg max-w-2xl mx-auto">
            <div className="flex items-start mb-4">
              <MapPin className="text-bc-red flex-shrink-0 mr-3 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2">White Rock Service Areas Include:</h3>
                <ul className="grid grid-cols-2 gap-2">
                  <li className="flex items-center"><Check size={16} className="text-green-500 mr-2" /> Marine Drive</li>
                  <li className="flex items-center"><Check size={16} className="text-green-500 mr-2" /> East/West Beach</li>
                  <li className="flex items-center"><Check size={16} className="text-green-500 mr-2" /> Semiahmoo</li>
                  <li className="flex items-center"><Check size={16} className="text-green-500 mr-2" /> Five Corners</li>
                  <li className="flex items-center"><Check size={16} className="text-green-500 mr-2" /> North Bluff</li>
                  <li className="flex items-center"><Check size={16} className="text-green-500 mr-2" /> All surrounding areas</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4">We also service South Surrey, Ocean Park, Crescent Beach and other neighboring communities.</p>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-3">What White Rock Clients Say</h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Read reviews from your neighbors about our services
          </p>
          
          <WhiteRockTestimonials />
        </div>
      </section>
      
      {/* FAQ Section */}
      <FAQSection 
        title="White Rock FAQs" 
        subtitle="Questions from White Rock Residents"
        faqs={faqItems}
        darkMode={false}
      />
      
      {/* Book or Get a Quote */}
      <section className="py-16 bg-bc-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Clean Up Your White Rock Home?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Enter your information below to check prices and availability for your White Rock property.
          </p>
          
          <div className="max-w-md mx-auto bg-white rounded-lg p-6">
            <form className="space-y-4">
              <div>
                <label htmlFor="postalCode" className="block text-gray-700 mb-1 text-left">Postal Code</label>
                <input
                  type="text"
                  id="postalCode"
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  placeholder="e.g. V4B 1A1"
                />
              </div>
              <div>
                <label htmlFor="propertySize" className="block text-gray-700 mb-1 text-left">House Size</label>
                <select id="propertySize" className="w-full px-4 py-2 border border-gray-300 rounded">
                  <option value="">Select size</option>
                  <option value="small">Small (up to 1,500 sq ft)</option>
                  <option value="medium">Medium (1,500-2,500 sq ft)</option>
                  <option value="large">Large (2,500-3,500 sq ft)</option>
                  <option value="xl">Extra Large (3,500+ sq ft)</option>
                </select>
              </div>
              <Button type="submit" className="w-full bg-bc-red hover:bg-red-700 text-white font-bold py-3 rounded">
                Check Prices & Availability
              </Button>
            </form>
          </div>
        </div>
      </section>
      
      {/* Footer Navigation Links */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Services</h3>
              <ul className="space-y-2">
                <li><Link to="/services/window-cleaning" className="text-gray-600 hover:text-bc-red">Window Cleaning</Link></li>
                <li><Link to="/services/pressure-washing" className="text-gray-600 hover:text-bc-red">Pressure Washing</Link></li>
                <li><Link to="/services/gutter-cleaning" className="text-gray-600 hover:text-bc-red">Gutter Cleaning</Link></li>
                <li><Link to="/services/roof-cleaning" className="text-gray-600 hover:text-bc-red">Roof Cleaning</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Locations</h3>
              <ul className="space-y-2">
                <li><Link to="/locations/white-rock" className="text-gray-600 hover:text-bc-red">White Rock</Link></li>
                <li><Link to="/locations/surrey" className="text-gray-600 hover:text-bc-red">Surrey</Link></li>
                <li><Link to="/locations/langley" className="text-gray-600 hover:text-bc-red">Langley</Link></li>
                <li><Link to="/locations/delta" className="text-gray-600 hover:text-bc-red">Delta</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-600 hover:text-bc-red">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-600 hover:text-bc-red">Contact</Link></li>
                <li><Link to="/faq" className="text-gray-600 hover:text-bc-red">FAQ</Link></li>
                <li><Link to="/why-choose-us" className="text-gray-600 hover:text-bc-red">Why Choose Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="text-gray-600">BC Pressure Washing</li>
                <li className="text-gray-600">White Rock, BC</li>
                <li><a href="tel:778-808-7620" className="text-gray-600 hover:text-bc-red">778-808-7620</a></li>
                <li><a href="mailto:bcpressurewashing.ca@gmail.com" className="text-gray-600 hover:text-bc-red">bcpressurewashing.ca@gmail.com</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WhiteRock;
