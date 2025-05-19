import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/use-translation';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Home, CheckCircle, Star, ChevronRight, Phone, Droplet, Wind, Layers, CloudRain, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TestimonialCarousel } from '@/components/TestimonialCarousel';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import ServiceAreasCarousel from '@/components/ServiceAreasCarousel';
import { testimonials } from '@/data/testimonials';
const MetroVancouver = () => {
  const {
    t
  } = useTranslation();
  const [postalCode, setPostalCode] = useState('');
  const [houseSize, setHouseSize] = useState('medium');
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll for premium services section animation
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Save form data to localStorage for the calculator page to use
    localStorage.setItem('calculatorPostalCode', postalCode);
    localStorage.setItem('calculatorHouseSize', houseSize);

    // Redirect to calculator page
    window.location.href = `/calculator`;
  };
  const handleBusinessCTA = () => {
    // Save indication that user is a business owner
    localStorage.setItem('isBusinessContact', 'true');
    // Navigate to contact page
    window.location.href = '/contact';
  };

  // Animation variants
  const fadeIn = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };
  return <Layout title="BC Pressure Washing Exterior Cleaning in Metro Vancouver" description="Professional exterior cleaning services throughout Metro Vancouver. House washing, window cleaning, roof & gutter cleaning from your local pressure washing experts." canonicalUrl="/locations/metro-vancouver">
      {/* SECTION 1: Hero Banner */}
      <div className="relative h-[70vh] min-h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/lovable-uploads/9c8f9c31-61c5-43ea-a6a5-89a6aba7c4af.png" alt="Commercial Pressure Washing in Metro Vancouver" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="container mx-auto relative z-10 px-4 text-white">
          <motion.div className="max-w-3xl" initial="hidden" animate="visible" variants={fadeIn}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Exterior Cleaning in Metro Vancouver</h1>
            <p className="text-xl md:text-2xl mb-8">
              Professional pressure washing, window cleaning, and exterior restoration services.
              From Vancouver to Surrey, Langley to White Rock — we've got Metro Vancouver covered.
            </p>
            <Button size="lg" variant="bc-red" className="text-lg py-6" onClick={() => {
            const calculator = document.getElementById('quote-section');
            calculator?.scrollIntoView({
              behavior: 'smooth'
            });
          }}>
              Check Prices & Availability
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Content sections that overlap the hero */}
      <div className="relative z-20 -mt-24 md:-mt-32">
        {/* SECTION 2: Services We Offer in Metro Vancouver - slides over hero on scroll */}
        <motion.section className="py-16 bg-white rounded-t-3xl shadow-xl" style={{
        translateY: Math.max(0, scrollY * 0.1 - 20),
        zIndex: 20
      }}>
          <div className="container mx-auto px-4">
            <motion.div initial="hidden" whileInView="visible" viewport={{
            once: true
          }} variants={fadeIn} className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2">Services We Offer Throughout Metro Vancouver</h2>
              <p className="text-gray-600">Expert exterior cleaning services for residential and commercial properties</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[{
              icon: <Home className="h-10 w-10 text-bc-red" />,
              title: "House Washing",
              description: "Safe and effective soft washing for your home's exterior surfaces using biodegradable cleaning solutions."
            }, {
              icon: <Wind className="h-10 w-10 text-bc-red" />,
              title: "Window Cleaning",
              description: "Professional window cleaning that leaves your glass spotless inside and out, with attention to frames and tracks."
            }, {
              icon: <Droplet className="h-10 w-10 text-bc-red" />,
              title: "Driveway & Concrete Cleaning",
              description: "Powerful pressure washing to remove stains, moss, and grime from driveways and walkways."
            }, {
              icon: <Home className="h-10 w-10 text-bc-red" />,
              title: "Soft Wash for Siding",
              description: "Low-pressure cleaning technique that safely removes contaminants from vinyl, hardy board, and delicate surfaces."
            }, {
              icon: <Layers className="h-10 w-10 text-bc-red" />,
              title: "Gutter Cleaning",
              description: "Thorough clearing of gutters and downspouts to prevent water damage and maintain proper drainage."
            }, {
              icon: <CloudRain className="h-10 w-10 text-bc-red" />,
              title: "Roof Cleaning",
              description: "Safe removal of moss, algae, and organic growth to extend the life of your roof in Vancouver's wet climate."
            }].map((service, index) => <motion.div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow" whileHover={{
              y: -5
            }} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: index * 0.1
            }}>
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </motion.div>)}
            </div>
          </div>
        </motion.section>

        {/* SECTION 3: Why Metro Vancouver Residents Choose Us */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div initial="hidden" whileInView="visible" viewport={{
            once: true
          }} variants={fadeIn} className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2">Why Metro Vancouver Chooses Us</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Trusted by homeowners and businesses across the Lower Mainland for reliable, quality exterior cleaning services
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div className="flex flex-col items-center text-center p-6" initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: 0.1
            }}>
                <CheckCircle className="h-12 w-12 text-bc-red mb-4" />
                <h3 className="text-xl font-bold mb-2">Local & Owner-Operated</h3>
                <p className="text-gray-600">
                  Based in Metro Vancouver, we understand the unique challenges our local climate presents for exterior surfaces.
                </p>
              </motion.div>

              <motion.div className="flex flex-col items-center text-center p-6" initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: 0.2
            }}>
                <CheckCircle className="h-12 w-12 text-bc-red mb-4" />
                <h3 className="text-xl font-bold mb-2">Quick Response & Flexible Scheduling</h3>
                <p className="text-gray-600">
                  We offer prompt quotes and convenient appointment times to fit your schedule, including evenings and weekends.
                </p>
              </motion.div>

              <motion.div className="flex flex-col items-center text-center p-6" initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: 0.3
            }}>
                <CheckCircle className="h-12 w-12 text-bc-red mb-4" />
                <h3 className="text-xl font-bold mb-2">Insured & Professionally Equipped</h3>
                <p className="text-gray-600">
                  Fully insured with commercial-grade equipment and eco-friendly products for optimal results.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Business CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div initial="hidden" whileInView="visible" viewport={{
            once: true
          }} variants={fadeIn} className="bg-gray-50 p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="md:w-3/5">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Business Owner?</h2>
                  <p className="text-gray-700 mb-4">
                    We provide specialized commercial cleaning services for businesses throughout Metro Vancouver. 
                    Our team can handle properties of any size with minimal disruption to your operations.
                  </p>
                  <ul className="list-disc pl-4 mb-6 text-gray-700">
                    <li>Custom maintenance schedules</li>
                    <li>Corporate account management</li>
                    <li>Property management solutions</li>
                    <li>Multi-location service agreements</li>
                  </ul>
                </div>
                <div className="md:w-2/5 flex justify-center">
                  <Button onClick={handleBusinessCTA} size="lg" variant="bc-red" className="w-full md:w-auto text-white flex items-center justify-center gap-2 py-6">
                    <Building className="h-5 w-5" />
                    <span>Get a Business Quote</span>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 5: Areas We Service in Metro Vancouver - Using ServiceAreaMap and ServiceAreasCarousel from homepage */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div initial="hidden" whileInView="visible" viewport={{
            once: true
          }} variants={fadeIn} className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2">Serving All Areas in Metro Vancouver</h2>
              <p className="text-gray-600">From city centers to suburban neighborhoods, we've got you covered</p>
            </motion.div>

            <div className="mb-8">
              <ServiceAreaMap />
            </div>
            
            {/* Modified service areas carousel with white bg and black text */}
            <div className="py-6 bg-white overflow-hidden w-full rounded-lg shadow-sm">
              <div className="text-center mb-2 text-gray-500 text-sm font-medium">
                Service Areas
              </div>
              <div className="relative w-full">
                <ServiceAreasCarousel />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Testimonials - Using the same TestimonialCarousel from homepage */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div initial="hidden" whileInView="visible" viewport={{
            once: true
          }} variants={fadeIn} className="text-center mb-12">
              
              
            </motion.div>

            <TestimonialCarousel />
          </div>
        </section>

        {/* SECTION 7: Book or Get a Quote */}
        <section id="quote-section" className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <motion.div initial="hidden" whileInView="visible" viewport={{
            once: true
          }} variants={fadeIn} className="max-w-2xl mx-auto text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Ready For Professional Exterior Cleaning?</h2>
              <p className="text-xl">Enter your postal code to check prices and availability in your area.</p>
            </motion.div>

            <div className="max-w-md mx-auto bg-white text-gray-800 p-6 rounded-lg shadow-lg">
              <form onSubmit={handleQuoteSubmit}>
                <div className="mb-4">
                  <label htmlFor="postalCode" className="block text-sm font-medium mb-1">Postal Code</label>
                  <input type="text" id="postalCode" className="w-full p-2 border border-gray-300 rounded focus:ring-bc-red focus:border-bc-red" placeholder="e.g. V6B 1A1" value={postalCode} onChange={e => setPostalCode(e.target.value)} required />
                </div>

                <div className="mb-6">
                  <label htmlFor="houseSize" className="block text-sm font-medium mb-1">House Size</label>
                  <select id="houseSize" className="w-full p-2 border border-gray-300 rounded focus:ring-bc-red focus:border-bc-red" value={houseSize} onChange={e => setHouseSize(e.target.value)}>
                    <option value="small">Small (Up to 1,500 sq. ft.)</option>
                    <option value="medium">Medium (1,500 - 2,500 sq. ft.)</option>
                    <option value="large">Large (2,500 - 3,500 sq. ft.)</option>
                    <option value="xlarge">X-Large (3,500+ sq. ft.)</option>
                  </select>
                </div>

                <Button type="submit" variant="bc-red" className="w-full py-6 text-lg">
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
                  <li><Link to="/services" className="hover:text-bc-red flex items-center"><ChevronRight className="h-4 w-4 mr-1" /> Services</Link></li>
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
                  <li><Link to="/locations/metro-vancouver" className="hover:text-bc-red flex items-center"><ChevronRight className="h-4 w-4 mr-1" /> Metro Vancouver</Link></li>
                  <li><Link to="/locations/white-rock-bc" className="hover:text-bc-red flex items-center"><ChevronRight className="h-4 w-4 mr-1" /> White Rock</Link></li>
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
                    <span>Metro Vancouver, BC</span>
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
    </Layout>;
};
export default MetroVancouver;