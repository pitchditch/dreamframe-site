
import { useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import Layout from '../components/Layout';
import HeroSection from '../components/home/HeroSection';
import SpringSaleCarousel from '../components/home/SpringSaleCarousel';
import TestimonialsSection from '../components/home/TestimonialsSection';
import ReferralButton from '../components/ReferralButton';
import { useTranslation } from '@/hooks/use-translation';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import ServiceAreasCarousel from '@/components/ServiceAreasCarousel';
import PremiumSolutionsSection from '@/components/home/PremiumSolutionsSection';
import RedCarSection from '@/components/home/RedCarSection';
import LocalCompanySection from '@/components/home/LocalCompanySection';
import GutterFaceCleaningSection from '@/components/home/GutterFaceCleaningSection';
import PackagesSection from '@/components/home/PackagesSection';
import OwnerOperatedSection from '@/components/home/OwnerOperatedSection';

const Home = () => {
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
    <Layout 
      image="/lovable-uploads/5608bf56-7f0e-4f7f-9bb0-5ba81b9d267e.png"
      canonicalUrl="/"
      title="BC Pressure Washing - #1 Window & Pressure Washing Services in Surrey & White Rock"
      description="Professional pressure washing, window cleaning, roof & gutter cleaning services in Surrey, White Rock & Metro Vancouver. Top-rated local cleaning experts. Mention our red car for 10% off!"
    >
      <Helmet>
        <title>BC Pressure Washing - #1 Window & Pressure Washing Services in Surrey & White Rock</title>
        <meta name="description" content="Professional pressure washing, window cleaning, roof & gutter cleaning services in Surrey, White Rock & Metro Vancouver. Top-rated local cleaning experts. Mention our red car for 10% off!" />
        <meta name="keywords" content="pressure washing Surrey, window cleaning White Rock, roof cleaning BC, gutter cleaning services, exterior cleaning, house washing, driveway cleaning, commercial pressure washing" />
        <meta property="og:image" content="/lovable-uploads/5608bf56-7f0e-4f7f-9bb0-5ba81b9d267e.png" />
        
        {/* Additional SEO tags for better indexing */}
        <link rel="canonical" href="https://www.bcpressurewashing.ca/" />
        <meta property="og:title" content="BC Pressure Washing - #1 Window & Pressure Washing in Surrey & White Rock" />
        <meta property="og:description" content="Professional pressure washing, window cleaning, roof & gutter cleaning services in Surrey, White Rock & Metro Vancouver. Top-rated local cleaning experts." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.bcpressurewashing.ca/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BC Pressure Washing - #1 Window & Pressure Washing in Surrey & White Rock" />
        <meta name="twitter:description" content="Professional pressure washing and cleaning services. Mention our red car for 10% off!" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      </Helmet>
      
      <HeroSection />
      <RedCarSection />
      <PremiumSolutionsSection />
      <OwnerOperatedSection />
      <SpringSaleCarousel />
      <TestimonialsSection />
      <PackagesSection />
      <LocalCompanySection />
      <GutterFaceCleaningSection />
      
      {/* Service Area Map */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Areas We Service</h2>
          <ServiceAreaMap />
          <ServiceAreasCarousel />
        </div>
      </section>
      
      <ReferralButton />
    </Layout>
  );
};

export default Home;
