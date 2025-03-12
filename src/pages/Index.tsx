
import { useEffect } from 'react';
import Layout from '../components/Layout';
import CallToAction from '../components/CallToAction';
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import PackagesSection from '../components/home/PackagesSection';
import CTABanner from '../components/home/CTABanner';
import ProcessSection from '../components/home/ProcessSection';
import TestimonialsSection from '../components/home/TestimonialsSection';

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
      <PackagesSection />
      <CTABanner />
      <ProcessSection />
      <TestimonialsSection />
      <CallToAction />
    </Layout>
  );
};

export default Index;
