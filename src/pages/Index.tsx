import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import ServiceCard from '../components/ServiceCard';
import TestimonialCard from '../components/TestimonialCard';
import ProcessStep from '../components/ProcessStep';
import CallToAction from '../components/CallToAction';
import { ArrowRight, Droplets, Home, PencilRuler, Clipboard, DropletIcon } from 'lucide-react';

const Index = () => {
  useEffect(() => {
    // Animation for elements when they enter viewport
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-section relative h-[90vh] flex items-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1433086966358-54859d0ed716')" }}>
        <div className="hero-overlay"></div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-3xl">
            <div className="badge-pill animate-on-scroll mb-4">
              Professional Pressure Washing Services
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-on-scroll">
              The Ultimate Cleaning
              <span className="text-bc-red block"> Solution </span>
              for Your Property
            </h1>
            <p className="text-lg md:text-xl mb-8 animate-on-scroll">
              We deliver exceptional cleaning results for residential and commercial properties with our state-of-the-art equipment and professional techniques.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-on-scroll">
              <Link to="/contact">
                <button className="btn-primary">
                  Get a Free Quote <ArrowRight className="ml-2 inline-block" size={16} />
                </button>
              </Link>
              <Link to="/services">
                <button className="btn-secondary">
                  Explore Our Services
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-bc-gray">
        <div className="container mx-auto px-4">
          <div className="badge-pill mx-auto w-fit animate-on-scroll">Our Professional Services</div>
          <h2 className="section-title animate-on-scroll">Premium Cleaning Solutions for Every Surface</h2>
          <p className="section-subtitle animate-on-scroll">
            We offer a comprehensive range of pressure washing services tailored to meet the unique needs of both residential and commercial properties.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="animate-on-scroll">
              <ServiceCard
                icon={<Droplets size={24} />}
                title="Window Cleaning"
                description="Professional window cleaning using purified water for crystal clear, streak-free results on homes and commercial buildings."
                link="/services/window-cleaning"
                image="https://images.unsplash.com/photo-1426604966848-d7adac402bff"
              />
            </div>
            <div className="animate-on-scroll">
              <ServiceCard
                icon={<Home size={24} />}
                title="Gutter Cleaning"
                description="Thorough gutter cleaning to prevent damage and maintain proper drainage, extending the life of your gutter system."
                link="/services/gutter-cleaning"
                image="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb"
              />
            </div>
            <div className="animate-on-scroll">
              <ServiceCard
                icon={<DropletIcon size={24} />}
                title="House Washing"
                description="Safe, low-pressure house washing that removes dirt, algae, and mildew without damaging your home's exterior."
                link="/services/house-washing"
                image="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9"
              />
            </div>
          </div>

          <div className="mt-12 text-center animate-on-scroll">
            <Link to="/services">
              <button className="btn-primary">
                View All Services <ArrowRight className="ml-2 inline-block" size={16} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="badge-pill mx-auto w-fit animate-on-scroll">Yearly Maintenance</div>
          <h2 className="section-title animate-on-scroll">Choose the Right Package for Your Home</h2>
          <p className="section-subtitle animate-on-scroll">
            Our subscription packages are designed to keep your property looking its best year-round with regular maintenance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="animate-on-scroll">
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-2xl font-bold mb-2">Starter Package</h3>
                <p className="text-3xl font-bold mb-2">$700</p>
                <p className="text-gray-500 text-sm mb-6">Based on a 1800 SQFT. House</p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-bc-red mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Window Cleaning
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-bc-red mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Gutter Cleaning
                  </li>
                  <li className="flex items-center text-gray-400">
                    <svg className="w-5 h-5 text-gray-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Exterior House Wash
                  </li>
                  <li className="flex items-center text-gray-400">
                    <svg className="w-5 h-5 text-gray-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Roof Soft Wash
                  </li>
                  <li className="flex items-center text-gray-400">
                    <svg className="w-5 h-5 text-gray-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Driveway Power Wash
                  </li>
                </ul>
                
                <Link to="/contact">
                  <button className="btn-primary w-full">Get Started</button>
                </Link>
              </div>
            </div>
            
            <div className="animate-on-scroll">
              <div className="bg-bc-red text-white p-8 rounded-lg shadow-md relative">
                <div className="absolute -top-3 right-6 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                  POPULAR
                </div>
                <h3 className="text-2xl font-bold mb-2">Upgraded Package</h3>
                <p className="text-3xl font-bold mb-2">$1,200</p>
                <p className="text-gray-200 text-sm mb-6">Based on a 1900 SQFT. House</p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Window Cleaning
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Gutter Cleaning
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Exterior House Wash
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Roof Soft Wash
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Driveway Power Wash
                  </li>
                </ul>
                
                <Link to="/contact">
                  <button className="bg-white text-bc-red px-6 py-3 rounded-md font-medium w-full hover:bg-gray-100 transition-colors">Get Started</button>
                </Link>
              </div>
            </div>
            
            <div className="animate-on-scroll">
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-2xl font-bold mb-2">Premium Package</h3>
                <p className="text-3xl font-bold mb-2">$1,600</p>
                <p className="text-gray-500 text-sm mb-6">Based on a 1900 SQFT+ House</p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-bc-red mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Window Cleaning
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-bc-red mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Gutter Cleaning
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-bc-red mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Exterior House Wash
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-bc-red mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Roof Soft Wash
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-bc-red mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Driveway Power Wash
                  </li>
                </ul>
                
                <Link to="/contact">
                  <button className="btn-primary w-full">Get Started</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1513836279014-a89f7a76ae86')", backgroundPosition: "center", backgroundSize: "cover" }}>
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll">Ready to Transform Your Property?</h2>
            <p className="text-lg mb-8 animate-on-scroll">
              Get in touch today for a free, no-obligation quote and see how we can help you maintain your property's pristine appearance.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-on-scroll">
              <Link to="/contact">
                <button className="btn-primary">
                  Get a Free Quote <ArrowRight className="ml-2 inline-block" size={16} />
                </button>
              </Link>
              <a href="tel:7788087620">
                <button className="btn-secondary">
                  Call Us: 778 808 7620
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="badge-pill mx-auto w-fit animate-on-scroll">Our Process</div>
          <h2 className="section-title animate-on-scroll">How We Deliver Excellence</h2>
          <p className="section-subtitle animate-on-scroll">
            Our systematic approach ensures that every cleaning project is completed with precision and care.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <div className="animate-on-scroll">
              <ProcessStep
                number={1}
                title="Free Assessment"
                description="We start with a thorough assessment of your property to understand your specific cleaning needs."
                icon={<Clipboard size={48} />}
              />
            </div>
            <div className="animate-on-scroll">
              <ProcessStep
                number={2}
                title="Custom Quote"
                description="Based on the assessment, we provide a detailed quote with transparent pricing and no hidden fees."
                icon={<PencilRuler size={48} />}
              />
            </div>
            <div className="animate-on-scroll">
              <ProcessStep
                number={3}
                title="Professional Cleaning"
                description="Our trained technicians use advanced equipment and eco-friendly solutions to clean your property."
                icon={<DropletIcon size={48} />}
              />
            </div>
            <div className="animate-on-scroll">
              <ProcessStep
                number={4}
                title="Final Inspection"
                description="We conduct a final walkthrough to ensure everything meets our high standards of cleanliness."
                icon={<Droplets size={48} />}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-bc-gray">
        <div className="container mx-auto px-4">
          <div className="badge-pill mx-auto w-fit animate-on-scroll">Testimonials</div>
          <h2 className="section-title animate-on-scroll">What Our Clients Say</h2>
          <p className="section-subtitle animate-on-scroll">
            Don't just take our word for it. Hear what our satisfied customers have to say about our services.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="animate-on-scroll">
              <TestimonialCard
                quote="Jayden did an amazing job on the roof. I'll be using his services again."
                name="John P."
                location="Langley, BC"
              />
            </div>
            <div className="animate-on-scroll">
              <TestimonialCard
                quote="Great work! Totally satisfied with the result of the window cleaning. left no mess and my windows are perfect."
                name="Liz S."
                location="Surrey, BC"
              />
            </div>
            <div className="animate-on-scroll">
              <TestimonialCard
                quote="He used some fancy equipment, did my windows with a water fed pole which I've never seen before. It did a great job on the windows and left no streaks!"
                name="Emily C."
                location="Langley, BC"
              />
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <Link to="/testimonials">
              <button className="btn-primary">View More Testimonials</button>
            </Link>
          </div>
        </div>
      </section>

      <CallToAction />
    </Layout>
  );
};

export default Index;
