import React, { useState } from 'react';
import { useTranslation } from '@/hooks/use-translation';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Home, 
  CheckCircle, 
  Star, 
  ChevronRight, 
  Phone,
  Droplet,
  Wind,
  Layers,
  CloudRain,
  Locate
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';

const WhiteRockBC = () => {
  const { t } = useTranslation();
  const [postalCode, setPostalCode] = useState('');
  const [houseSize, setHouseSize] = useState('medium');

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Open form overlay or redirect to quote page
    window.location.href = `/calculator?postal=${postalCode}&size=${houseSize}`;
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <Layout
      title="Pressure Washing in White Rock, BC | BC Pressure Washing"
      description="Professional pressure washing services in White Rock. House washing, window cleaning, roof & gutter cleaning from your local experts. Fast, reliable, affordable."
      canonicalUrl="/locations/white-rock-bc"
    >
      {/* SECTION 1: Hero Banner */}
      <div className="relative h-[70vh] min-h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/lovable-uploads/302cbdcc-ad2e-496b-bb73-502eb77f353a.png" 
            alt="White Rock Pier and Beach" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="container mx-auto relative z-10 px-4 text-white">
          <motion.div 
            className="max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">🧼 Pressure Washing in White Rock, BC</h1>
            <p className="text-xl md:text-2xl mb-8">
              Your local pros for house washing, window cleaning, roof cleaning, and more. 
              Serving Marine Drive to Semiahmoo — fast, reliable, affordable.
            </p>
            <Button 
              size="lg" 
              variant="bc-red"
              className="text-lg py-6"
              onClick={() => {
                const calculator = document.getElementById('quote-section');
                calculator?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Check Prices & Availability
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Content sections that overlap the hero */}
      <div className="relative z-20 -mt-24 md:-mt-32">
        {/* SECTION 2: Services We Offer in White Rock */}
        <section className="py-16 bg-white rounded-t-3xl shadow-xl">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-2">Services We Offer in White Rock</h2>
              <p className="text-gray-600">Professional pressure washing services tailored for White Rock homes and businesses</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { 
                  icon: <Home className="h-10 w-10 text-bc-red" />, 
                  title: "House Washing", 
                  description: "Gentle yet effective soft washing for your home's exterior surfaces that removes dirt, grime, and organic growth." 
                },
                { 
                  icon: <Wind className="h-10 w-10 text-bc-red" />, 
                  title: "Window Cleaning", 
                  description: "Professional interior and exterior window cleaning for crystal-clear views of White Rock's beautiful scenery." 
                },
                { 
                  icon: <Droplet className="h-10 w-10 text-bc-red" />, 
                  title: "Driveway & Sidewalk Cleaning", 
                  description: "Restore your concrete surfaces to like-new condition with our high-pressure cleaning service." 
                },
                { 
                  icon: <Wind className="h-10 w-10 text-bc-red" />, 
                  title: "Soft Wash for Siding", 
                  description: "Low-pressure cleaning technique that safely removes mold, mildew and algae without damaging delicate surfaces." 
                },
                { 
                  icon: <Layers className="h-10 w-10 text-bc-red" />, 
                  title: "Gutter Cleaning", 
                  description: "Clear clogged gutters to prevent water damage and maintain your home's protection from White Rock's rainy seasons." 
                },
                { 
                  icon: <CloudRain className="h-10 w-10 text-bc-red" />, 
                  title: "Roof Moss & Algae Treatment", 
                  description: "Specialized treatment to remove harmful moss and algae, extending the life of your roof in White Rock's damp climate." 
                },
              ].map((service, index) => (
                <motion.div 
                  key={index}
                  className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: Why White Rock Residents Choose Us */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-2">Locally Trusted Pressure Washing in White Rock</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                For over a decade, we've been serving the White Rock community with exceptional exterior cleaning services
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                className="flex flex-col items-center text-center p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <CheckCircle className="h-12 w-12 text-bc-red mb-4" />
                <h3 className="text-xl font-bold mb-2">Locally owned & operated</h3>
                <p className="text-gray-600">
                  Based in White Rock, we know the area and its unique cleaning challenges better than anyone else.
                </p>
              </motion.div>

              <motion.div 
                className="flex flex-col items-center text-center p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <CheckCircle className="h-12 w-12 text-bc-red mb-4" />
                <h3 className="text-xl font-bold mb-2">Fast quotes & weekend availability</h3>
                <p className="text-gray-600">
                  Get a quote within 24 hours and enjoy our flexible scheduling, including weekends, to fit your busy life.
                </p>
              </motion.div>

              <motion.div 
                className="flex flex-col items-center text-center p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <CheckCircle className="h-12 w-12 text-bc-red mb-4" />
                <h3 className="text-xl font-bold mb-2">Seen our red car around town?</h3>
                <p className="text-gray-600">
                  Mention it when you call and receive 10% off your first service! We're proud to be visible in the community.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Before & After Carousel */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-2">Before & After Transformations</h2>
              <p className="text-gray-600">See the dramatic difference our services make</p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <Carousel className="w-full">
                <CarouselContent>
                  <CarouselItem>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <img 
                          src="/lovable-uploads/9c5e6f5f-cc13-408c-af83-ca211626f285.png" 
                          alt="Driveway Before Cleaning" 
                          className="rounded-lg h-64 w-full object-cover"
                        />
                        <p className="text-center mt-2 font-medium">Before</p>
                      </div>
                      <div>
                        <img 
                          src="/lovable-uploads/55261385-ad80-4322-9551-dbc3392a881c.png" 
                          alt="Driveway After Cleaning" 
                          className="rounded-lg h-64 w-full object-cover"
                        />
                        <p className="text-center mt-2 font-medium">After</p>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-center mt-4">Driveway Transformation</h3>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <img 
                          src="/lovable-uploads/fa3b438e-d980-439e-9d0f-e829e376fcf7.png" 
                          alt="Roof Before Cleaning" 
                          className="rounded-lg h-64 w-full object-cover"
                        />
                        <p className="text-center mt-2 font-medium">Before</p>
                      </div>
                      <div>
                        <img 
                          src="/lovable-uploads/7e1a9bdf-7cca-4b17-857e-6acaedd8309c.png" 
                          alt="Roof After Cleaning" 
                          className="rounded-lg h-64 w-full object-cover"
                        />
                        <p className="text-center mt-2 font-medium">After</p>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-center mt-4">Roof Moss Removal</h3>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <img 
                          src="/lovable-uploads/46bdd024-275a-4b16-ae57-e690113dae3f.png" 
                          alt="Gutters Before Cleaning" 
                          className="rounded-lg h-64 w-full object-cover"
                        />
                        <p className="text-center mt-2 font-medium">Before</p>
                      </div>
                      <div>
                        <img 
                          src="/lovable-uploads/775da843-921c-4e15-adf9-8237f632efcf.png" 
                          alt="Gutters After Cleaning" 
                          className="rounded-lg h-64 w-full object-cover"
                        />
                        <p className="text-center mt-2 font-medium">After</p>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-center mt-4">Gutter Cleaning</h3>
                  </CarouselItem>
                </CarouselContent>
                <div className="flex justify-center mt-4">
                  <CarouselPrevious className="relative mr-2" />
                  <CarouselNext className="relative ml-2" />
                </div>
              </Carousel>
              <p className="text-center text-gray-600 mt-4">
                Real results from real jobs right here in White Rock.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: Where We Work in White Rock */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-2">From the Pier to the Five Corners — We've Got You Covered</h2>
              <p className="text-gray-600">Proudly serving all neighborhoods in White Rock, BC</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Areas We Serve in White Rock</h3>
                  <ul className="space-y-3">
                    {[
                      "Marine Drive", 
                      "East/West Beach", 
                      "Semiahmoo Secondary area", 
                      "Five Corners", 
                      "North Bluff & surrounding neighborhoods",
                      "White Rock Elementary area",
                      "Peace Arch Hospital vicinity",
                      "Centennial Park district",
                      "White Rock Pier & Promenade"
                    ].map((area, index) => (
                      <li key={index} className="flex items-start">
                        <MapPin className="h-5 w-5 text-bc-red mr-2 flex-shrink-0 mt-0.5" />
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="relative h-64 md:h-auto rounded-lg overflow-hidden shadow-sm">
                <img 
                  src="/lovable-uploads/8c89dd09-cd92-4892-a012-595394b9c34c.png" 
                  alt="BC Pressure Washing vehicle in White Rock" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <MapPin className="h-16 w-16 text-bc-red" />
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 h-4 w-4 bg-bc-red rounded-full animate-ping" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Testimonials Carousel */}
        <TestimonialsCarousel />

        {/* SECTION 7: Book or Get a Quote */}
        <section id="quote-section" className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="max-w-2xl mx-auto text-center mb-8"
            >
              <h2 className="text-3xl font-bold mb-4">Ready to clean up your home's exterior?</h2>
              <p className="text-xl">Enter your postal code to check prices and availability in your area.</p>
            </motion.div>

            <div className="max-w-md mx-auto bg-white text-gray-800 p-6 rounded-lg shadow-lg">
              <form onSubmit={handleQuoteSubmit}>
                <div className="mb-4">
                  <label htmlFor="postalCode" className="block text-sm font-medium mb-1">Postal Code</label>
                  <input 
                    type="text" 
                    id="postalCode"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-bc-red focus:border-bc-red"
                    placeholder="e.g. V4B 1S1"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="houseSize" className="block text-sm font-medium mb-1">House Size</label>
                  <select 
                    id="houseSize"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-bc-red focus:border-bc-red"
                    value={houseSize}
                    onChange={(e) => setHouseSize(e.target.value)}
                  >
                    <option value="small">Small (Up to 1,500 sq. ft.)</option>
                    <option value="medium">Medium (1,500 - 2,500 sq. ft.)</option>
                    <option value="large">Large (2,500 - 3,500 sq. ft.)</option>
                    <option value="xlarge">X-Large (3,500+ sq. ft.)</option>
                  </select>
                </div>

                <Button 
                  type="submit" 
                  variant="bc-red" 
                  className="w-full py-6 text-lg"
                >
                  Check Prices & Availability
                </Button>
              </form>
            </div>

            <div className="mt-6 text-center">
              <Link to="/contact" className="text-white hover:underline flex items-center justify-center">
                Or call us directly for a quote <Phone className="h-4 w-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 8: Footer Links & Internal Navigation */}
        <section className="py-8 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-3">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link to="/" className="hover:text-bc-red flex items-center"><ChevronRight className="h-4 w-4 mr-1" /> Home</Link></li>
                  <li><Link to="/contact" className="hover:text-bc-red flex items-center"><ChevronRight className="h-4 w-4 mr-1" /> Contact</Link></li>
                  <li><Link to="/faq" className="hover:text-bc-red flex items-center"><ChevronRight className="h-4 w-4 mr-1" /> FAQs</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-3">Our Services</h3>
                <ul className="space-y-2">
                  <li><Link to="/services/window-cleaning" className="hover:text-bc-red flex items-center"><ChevronRight className="h-4 w-4 mr-1" /> Window Cleaning</Link></li>
                  <li><Link to="/services/pressure-washing" className="hover:text-bc-red flex items-center"><ChevronRight className="h-4 w-4 mr-1" /> Pressure Washing</Link></li>
                  <li><Link to="/services/gutter-cleaning" className="hover:text-bc-red flex items-center"><ChevronRight className="h-4 w-4 mr-1" /> Gutter Cleaning</Link></li>
                  <li><Link to="/services/roof-cleaning" className="hover:text-bc-red flex items-center"><ChevronRight className="h-4 w-4 mr-1" /> Roof Cleaning</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-3">Locations</h3>
                <ul className="space-y-2">
                  <li><Link to="/locations/white-rock-bc" className="hover:text-bc-red flex items-center"><ChevronRight className="h-4 w-4 mr-1" /> White Rock</Link></li>
                  <li><Link to="/locations/vancouver-bc" className="hover:text-bc-red flex items-center"><ChevronRight className="h-4 w-4 mr-1" /> Vancouver</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-3">Contact Us</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Phone className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span>778-808-7620</span>
                  </li>
                  <li className="flex items-start">
                    <MapPin className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span>White Rock, BC</span>
                  </li>
                </ul>
                <div className="mt-4">
                  <h4 className="font-medium mb-1">Hours:</h4>
                  <p className="text-sm">Mon–Fri: 8–6</p>
                  <p className="text-sm">Sat: 9–5</p>
                  <p className="text-sm">Sun: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default WhiteRockBC;
