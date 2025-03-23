
import { useEffect } from 'react';
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

const Index = () => {
  const { setLanguage } = useTranslation();

  useEffect(() => {
    // Ensure English is the default language on initial load
    setLanguage('en');
    
    // Mark body to have video header (for navbar transparency)
    document.body.classList.add('has-video-header');

    // Add responsive styles for landscape mode
    const landscapeStyle = document.createElement('style');
    landscapeStyle.innerHTML = `
      @media (orientation: landscape) and (max-height: 500px) {
        .hero-section {
          height: 100vh !important;
        }
        
        .hero-section h1 {
          font-size: 2rem !important;
        }
        
        .hero-section p {
          font-size: 1rem !important;
        }
      }
    `;
    document.head.appendChild(landscapeStyle);

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
      document.head.removeChild(landscapeStyle);
    };
  }, [setLanguage]);

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
      <ReferralButton />
    </Layout>
  );
};

export default Index;
