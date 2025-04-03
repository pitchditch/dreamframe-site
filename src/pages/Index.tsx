
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Layout from '../components/Layout';
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import SpringSaleCarousel from '../components/home/SpringSaleCarousel';
import PackagesSection from '../components/home/PackagesSection';
import ProcessSection from '../components/home/ProcessSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FeaturedProjectSection from '../components/home/FeaturedProjectSection';
import ReferralButton from '../components/ReferralButton';
import PriceCalculatorOverlay from '../components/PriceCalculatorOverlay';
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
      
      {/* Spring Sale Carousel - added right after hero section */}
      <SpringSaleCarousel />
      
      {/* Moved Testimonials to appear right after the Hero Section */}
      <TestimonialsSection />
      
      {/* How We Deliver Excellence moved below testimonials */}
      <ProcessSection />
      
      <ServicesSection />
      
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
      
      {/* Packages Section remains here but connects to calculator */}
      <PackagesSection />
      
      <ReferralButton />
    </Layout>
  );
};

export default Index;
