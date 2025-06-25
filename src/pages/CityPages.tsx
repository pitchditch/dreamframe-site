
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from '../components/Layout';
import HeroWithContent from '../components/HeroWithContent';
import ServiceAreasCarousel from '@/components/ServiceAreasCarousel';
import ReferralButton from '../components/ReferralButton';
import { useTranslation } from '@/hooks/use-translation';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import CityNavigation from '../components/home/CityNavigation';
import ServiceSelectionSection from '../components/home/ServiceSelectionSection';
import BeforeAfterGallery from '../components/BeforeAfterGallery';
import RedCarSection from '../components/home/RedCarSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import TrustedCustomersSection from '../components/home/TrustedCustomersSection';
import ReferralProgramSection from '../components/ReferralProgramSection';
import { getCityBySlug } from '@/data/cities';

const CityPages = () => {
  const { citySlug } = useParams<{ citySlug: string }>();
  const { language, setLanguage } = useTranslation();
  
  if (!citySlug) {
    return <Navigate to="/" replace />;
  }

  const cityData = getCityBySlug(citySlug);
  
  if (!cityData) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    console.log('Current language on City page:', language);
  }, [language, setLanguage]);

  return (
    <Layout 
      image="/lovable-uploads/5608bf56-7f0e-4f7f-9bb0-5ba81b9d267e.png"
      canonicalUrl={`/${citySlug}`}
      title={`BC Pressure Washing - #1 Window & Pressure Washing Services in ${cityData.name} & White Rock`}
      description={`Professional pressure washing, window cleaning, roof & gutter cleaning services in ${cityData.name}, White Rock & Metro Vancouver. Top-rated local cleaning experts. Mention our red car for 10% off!`}
    >
      <HeroWithContent>
        {/* Service Locations */}
        <CityNavigation />
        
        {/* Service Selection */}
        <ServiceSelectionSection />
        
        {/* Before/After Gallery */}
        <BeforeAfterGallery />
        
        {/* Testimonials */}
        <TestimonialsSection />
        
        {/* Red Car Section */}
        <RedCarSection />
        
        {/* Trusted Customers */}
        <TrustedCustomersSection />
        
        {/* Referral Program */}
        <ReferralProgramSection />

        {/* Service Areas */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Areas We Service</h2>
            <ServiceAreaMap />
            <ServiceAreasCarousel />
          </div>
        </section>

        <ReferralButton />

        <footer className="text-center text-sm text-gray-500 mt-12">
          <p>BC Pressure Washing · White Rock, BC · 778-808-7620 · bcpressurewashing.ca@gmail.com</p>
          <p>Follow us: 
            <a href="https://www.instagram.com/bc.pressure.washing" target="_blank" rel="noopener noreferrer" className="ml-1 text-blue-400 underline">Instagram</a> | 
            <a href="https://www.youtube.com/@bc.pressure.washing" target="_blank" rel="noopener noreferrer" className="ml-1 text-blue-400 underline">YouTube</a> | 
            <a href="https://www.facebook.com/bcpressurewashing" target="_blank" rel="noopener noreferrer" className="ml-1 text-blue-400 underline">Facebook</a>
          </p>
        </footer>
      </HeroWithContent>
    </Layout>
  );
};

export default CityPages;
