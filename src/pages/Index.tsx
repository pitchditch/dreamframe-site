
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Layout from '../components/Layout';
import HeroSection from '../components/home/HeroSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import DetailedServiceCarousel from '../components/home/DetailedServiceCarousel';
import PackagesSection from '../components/home/PackagesSection';
import ProcessSection from '../components/home/ProcessSection';
import FeaturedProjectSection from '../components/home/FeaturedProjectSection';
import ReferralButton from '../components/ReferralButton';
import PriceCalculatorOverlay from '../components/PriceCalculatorOverlay';
import StorefrontMaintenanceBanner from '../components/home/StorefrontMaintenanceBanner';
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
      
      {/* Moved Testimonials to appear right after the Hero Section */}
      <TestimonialsSection />
      
      {/* How We Deliver Excellence moved below testimonials */}
      <ProcessSection />
      
      {/* Combined service carousel with detailed descriptions */}
      <DetailedServiceCarousel />
      
      {/* New Packages Section with Spring specials */}
      <PackagesSection />

      {/* New Storefront Maintenance Banner */}
      <StorefrontMaintenanceBanner />
      
      <FeaturedProjectSection />
      
      <ReferralButton />
    </Layout>
  );
};

export default Index;
