
import { useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import Layout from '../components/Layout';
import HeroSection from '../components/home/HeroSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import ServicesSection from '../components/home/ServicesSection';
import ReferralButton from '../components/ReferralButton';
import { useTranslation } from '@/hooks/use-translation';
import ServiceAreasMap from '@/components/home/ServiceAreasMap';

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
    <Layout image="/open.png">
      <Helmet>
        <title>BC Pressure Washing - #1 Window & Pressure Washing Services in Surrey & White Rock</title>
        <meta name="description" content="Professional pressure washing, window cleaning, roof & gutter cleaning services in Surrey, White Rock & Metro Vancouver. Top-rated local cleaning experts." />
        <meta name="keywords" content="pressure washing Surrey, window cleaning White Rock, roof cleaning BC, gutter cleaning services, exterior cleaning, house washing, driveway cleaning, commercial pressure washing" />
        <meta property="og:image" content="/open.png" />
      </Helmet>
      
      <HeroSection />
      <ServicesSection />
      <ServiceAreasMap />
      <TestimonialsSection />
      
      {/* Full Width Contact Section */}
      <section className="relative py-20">
        <div className="absolute inset-0">
          <img 
            src="/lovable-uploads/10e953e1-c5f0-4899-a3b7-944cf15bca76.png"
            alt="Bring Property Back To Life" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Bring Your Property Back to Life</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Ready to transform your property? Get in touch for a free, no-obligation quote.
          </p>
          <div className="flex justify-center gap-4">
            <a href="tel:7788087620" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold transition-all">
              Call Now: 778-808-7620
            </a>
          </div>
        </div>
      </section>
      
      <ReferralButton />
    </Layout>
  );
};

export default Index;
