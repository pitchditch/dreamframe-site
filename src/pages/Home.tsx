import { useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import Layout from '../components/Layout';
import HeroSection from '../components/home/HeroSection';
import SpringSaleCarousel from '../components/home/SpringSaleCarousel';
import TestimonialsSection from '../components/home/TestimonialsSection';

import { useTranslation } from '@/hooks/use-translation';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import ServiceAreasCarousel from '@/components/ServiceAreasCarousel';
import PremiumSolutionsSection from '../components/home/PremiumSolutionsSection';
import PackagesSection from '../components/home/PackagesSection';
import OwnerOperatedSection from '../components/home/OwnerOperatedSection';
import SatisfactionGuaranteeSection from '../components/home/SatisfactionGuaranteeSection';
import FeaturedProjectSection from '../components/home/FeaturedProjectSection';

const Home = () => {
  const { language, setLanguage } = useTranslation();

  useEffect(() => {
    document.body.classList.add('has-video-header');

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
      document.body.classList.remove('has-video-header');
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, [language, setLanguage]);

  return (
    <Layout 
      image="/lovable-uploads/5608bf56-7f0e-4f7f-9bb0-5ba81b9d267e.png"
      canonicalUrl="/"
      title="BC Pressure Washing - #1 Window & Pressure Washing Services in Surrey & White Rock"
      description="Top-rated local pressure washing, window cleaning, and gutter services in White Rock, Surrey, and Metro Vancouver. Get 10% off if you see our red car on Marine Drive!"
    >
      <Helmet>
        <title>BC Pressure Washing - Top-Rated Exterior Cleaning in White Rock & Surrey</title>
        <meta name="description" content="BC Pressure Washing provides expert pressure washing, window cleaning, and gutter cleaning services in White Rock, Surrey, and the Lower Mainland. Locally owned and operated. Get 10% off if you spot our red car!" />
        <meta name="keywords" content="BC Pressure Washing, pressure washing Surrey, window cleaning White Rock, gutter cleaning Metro Vancouver, soft washing, exterior cleaning services BC" />
        <meta property="og:image" content="/lovable-uploads/5608bf56-7f0e-4f7f-9bb0-5ba81b9d267e.png" />
        <link rel="canonical" href="https://www.bcpressurewashing.ca/" />
        <meta property="og:title" content="BC Pressure Washing - Local Cleaning Experts in White Rock & Surrey" />
        <meta property="og:description" content="Expert pressure washing and window cleaning for White Rock, Surrey, and surrounding areas. Seen our red car? Get 10% off!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.bcpressurewashing.ca/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BC Pressure Washing - Exterior Cleaning Pros" />
        <meta name="twitter:description" content="Professional window and pressure washing services in White Rock and Surrey. Spot our red car and claim your 10% discount!" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      </Helmet>

      <HeroSection />

      <div className="relative z-20 -mt-24 md:-mt-32">
        <div className="bg-white rounded-t-3xl shadow-xl">
          <FeaturedProjectSection />
          <PremiumSolutionsSection />

          <div className="px-6 py-12 text-center bg-red-50">
            <h2 className="text-3xl font-bold text-red-700 mb-4">Spotted Our Red Vehicle? Get 10% Off!</h2>
            <p className="text-lg max-w-2xl mx-auto mb-3">
              If you’ve seen our red car on Marine Drive in White Rock, mention it when booking and get <strong>10% off your service</strong>.
            </p>
            <p className="text-base text-gray-700 max-w-2xl mx-auto mb-4">
              Proudly serving the White Rock and Surrey communities — your neighbors, not just your cleaners.
            </p>
            <p className="italic text-sm text-gray-600 mb-2">“If you see me around, feel free to wave or say hi!”</p>
            <p className="font-medium text-gray-800 mb-4">— Jayden, Owner</p>
            <a href="#quote" className="inline-block px-6 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition">
              Claim Your 10% Discount
            </a>
          </div>

          <div data-component="owner-operated">
            <OwnerOperatedSection />
          </div>
          <SatisfactionGuaranteeSection />
          <SpringSaleCarousel />
          <TestimonialsSection />
          <PackagesSection />

          <section className="py-16 bg-gray-900 text-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">Areas We Service</h2>
              <ServiceAreaMap />
              <ServiceAreasCarousel />
            </div>
          </section>

          <footer className="text-center text-sm text-gray-500 mt-12">
            <p>BC Pressure Washing · White Rock, BC · 778-808-7620 · bcpressurewashing.ca@gmail.com</p>
            <p>Follow us: 
              <a href="https://www.instagram.com/bc.pressure.washing" target="_blank" rel="noopener noreferrer" className="ml-1 text-blue-400 underline">Instagram</a> | 
              <a href="https://www.youtube.com/@bc.pressure.washing" target="_blank" rel="noopener noreferrer" className="ml-1 text-blue-400 underline">YouTube</a> | 
              <a href="https://www.facebook.com/bcpressurewashing" target="_blank" rel="noopener noreferrer" className="ml-1 text-blue-400 underline">Facebook</a>
            </p>
          </footer>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
