
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Layout from '../components/Layout';
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import ServiceSlideshow from '../components/home/ServiceSlideshow';
import PackagesSection from '../components/home/PackagesSection';
import ProcessSection from '../components/home/ProcessSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FeaturedProjectSection from '../components/home/FeaturedProjectSection';
import ReferralButton from '../components/ReferralButton';
import PriceCalculatorForm from '../components/PriceCalculator/PriceCalculatorForm';
import { useTranslation } from '@/hooks/use-translation';
import { MapPin, ArrowRight, Sun } from 'lucide-react';

const Index = () => {
  const { setLanguage } = useTranslation();

  useEffect(() => {
    // Ensure English is the default language on initial load
    setLanguage('en');
    
    // Mark body to have video header (for navbar transparency)
    document.body.classList.add('has-video-header');

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
      // Clean up
      document.body.classList.remove('has-video-header');
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, [setLanguage]);

  return (
    <Layout>
      <Helmet>
        <title>BC Pressure Washing - #1 Window & Pressure Washing Services in Surrey & White Rock</title>
        <meta name="description" content="Professional pressure washing, window cleaning, roof & gutter cleaning services in Surrey, White Rock & Metro Vancouver. Top-rated local cleaning experts." />
        <meta name="keywords" content="pressure washing Surrey, window cleaning White Rock, roof cleaning BC, gutter cleaning services, exterior cleaning, house washing, driveway cleaning, commercial pressure washing" />
      </Helmet>
      
      <HeroSection />
      <ServicesSection />
      <ServiceSlideshow />
      
      {/* White Rock Featured Location Section - Updated to focus on window cleaning */}
      <section className="py-16 bg-bc-gray">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="badge-pill mb-4">White Rock Window Cleaning</div>
              <h2 className="text-3xl font-bold mb-6">White Rock's Top-Rated Window Cleaning Experts</h2>
              <p className="text-gray-600 mb-6">
                Based in White Rock, we understand the unique challenges that our coastal climate presents for window maintenance. Salt spray, mineral deposits, and hard water spots require specialized cleaning techniques that our trained professionals have mastered.
              </p>
              <div className="flex items-center mb-6">
                <MapPin className="text-bc-red mr-2" />
                <span className="font-medium">Locally owned and operated in White Rock, BC</span>
              </div>
              <div className="flex items-center mb-6">
                <Sun className="text-bc-red mr-2" />
                <span className="font-medium">Crystal clear, streak-free window cleaning guaranteed</span>
              </div>
              <Link to="/locations/white-rock">
                <button className="btn-primary">
                  White Rock Window Cleaning <ArrowRight className="ml-2 inline-block" size={16} />
                </button>
              </Link>
            </div>
            <div>
              <Link to="/locations/white-rock">
                <img 
                  src="/lovable-uploads/76968d4f-c862-4989-a3e3-b74ac31968e2.png" 
                  alt="White Rock Window Cleaning Services" 
                  className="rounded-lg shadow-xl hover:opacity-90 transition-opacity"
                  loading="lazy"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <FeaturedProjectSection />
      <PackagesSection />
      <PriceCalculatorForm />
      <ProcessSection />
      <TestimonialsSection />
      <ReferralButton />
      
      {/* Hidden SEO-optimized keywords section - visible to search engines but not users */}
      <div className="seo-keywords">
        <h2>Professional Exterior Cleaning Services in Metro Vancouver</h2>
        <ul>
          <li>Pressure washing Surrey BC</li>
          <li>Window cleaning White Rock</li>
          <li>Gutter cleaning services Surrey</li>
          <li>Roof cleaning Metro Vancouver</li>
          <li>House washing services BC</li>
          <li>Driveway cleaning Surrey</li>
          <li>Commercial pressure washing</li>
          <li>Residential power washing</li>
          <li>Deck cleaning services</li>
          <li>Concrete cleaning Surrey</li>
          <li>Eco-friendly pressure washing</li>
          <li>Soft washing specialists</li>
          <li>Exterior cleaning company</li>
        </ul>
      </div>
      
      {/* Schema.org microdata for Local Business */}
      <div className="schema-data" itemScope itemType="http://schema.org/LocalBusiness">
        <h1 itemProp="name">BC Pressure Washing</h1>
        <div itemProp="description">Professional pressure washing, window cleaning, and exterior cleaning services for residential and commercial properties in Surrey, White Rock, and Metro Vancouver.</div>
        <div itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
          <span itemProp="streetAddress">15501 Marine Dr</span>
          <span itemProp="addressLocality">White Rock</span>,
          <span itemProp="addressRegion">BC</span>
          <span itemProp="postalCode">V4B 1C9</span>
          <span itemProp="addressCountry">CA</span>
        </div>
        <div itemProp="geo" itemScope itemType="http://schema.org/GeoCoordinates">
          <meta itemProp="latitude" content="49.0253"/>
          <meta itemProp="longitude" content="-122.8026"/>
        </div>
        <div itemProp="openingHoursSpecification" itemScope itemType="http://schema.org/OpeningHoursSpecification">
          <link itemProp="dayOfWeek" href="http://schema.org/Monday http://schema.org/Tuesday http://schema.org/Wednesday http://schema.org/Thursday http://schema.org/Friday"/>
          <meta itemProp="opens" content="08:00"/>
          <meta itemProp="closes" content="18:00"/>
        </div>
        <div itemProp="openingHoursSpecification" itemScope itemType="http://schema.org/OpeningHoursSpecification">
          <link itemProp="dayOfWeek" href="http://schema.org/Saturday"/>
          <meta itemProp="opens" content="09:00"/>
          <meta itemProp="closes" content="17:00"/>
        </div>
        <div>
          Phone: <span itemProp="telephone">778 808 7620</span>
        </div>
        <div>
          Website: <a href="https://bcpressurewashing.ca" itemProp="url">bcpressurewashing.ca</a>
        </div>
        <div>
          <meta itemProp="priceRange" content="$$"/>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
