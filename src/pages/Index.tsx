
import { useEffect } from 'react';
import Layout from '../components/Layout';
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import ServiceSlideshow from '../components/home/ServiceSlideshow';
import PackagesSection from '../components/home/PackagesSection';
import ProcessSection from '../components/home/ProcessSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FeaturedProjectSection from '../components/home/FeaturedProjectSection';
import CallButton from '../components/CallButton';
import PriceCalculatorForm from '../components/PriceCalculator/PriceCalculatorForm';
import CTABanner from '../components/home/CTABanner';

const Index = () => {
  useEffect(() => {
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
  }, []);

  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
      <ServiceSlideshow />
      <FeaturedProjectSection />
      <PackagesSection />
      <PriceCalculatorForm />
      <ProcessSection />
      <TestimonialsSection />
      <CTABanner />
      <CallButton />
    </Layout>
  );
};

export default Index;
