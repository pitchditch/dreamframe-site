
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '../../components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import HeroSection from '@/components/post-construction/HeroSection';
import BenefitsSection from '@/components/post-construction/BenefitsSection';
import BeforeAfterSection from '@/components/post-construction/BeforeAfterSection';
import BookingSection from '@/components/post-construction/BookingSection';
import FAQSection from '@/components/post-construction/FAQSection';
import CTABanner from '@/components/home/CTABanner';
import LocationBanner from '@/components/LocationBanner';

const PostConstructionWindowCleaning: React.FC = () => {
  return (
    <Layout>
      <Helmet>
        <title>Post Construction Window Cleaning - BC Pressure Washing</title>
        <meta name="description" content="Professional post construction window cleaning services to ensure your windows are spotless and free of construction debris, fingerprints, and dust." />
        <meta name="keywords" content="post construction window cleaning, window cleaning services, construction cleanup, new home window cleaning, residential window cleaning, Vancouver window cleaning" />
      </Helmet>

      <HeroSection />
      <BenefitsSection />
      <BeforeAfterSection />
      <FAQSection />
      <BookingSection />
      <CTABanner />
      <LocationBanner />
    </Layout>
  );
};

export default PostConstructionWindowCleaning;
