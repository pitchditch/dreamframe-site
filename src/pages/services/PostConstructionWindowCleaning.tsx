
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '../../components/Layout';
import HeroSection from '@/components/post-construction/HeroSection';
import BenefitsSection from '@/components/post-construction/BenefitsSection';
import BeforeAfterSection from '@/components/post-construction/BeforeAfterSection';
import BookingSection from '@/components/post-construction/BookingSection';
import FAQSection from '@/components/post-construction/FAQSection';
import CTABanner from '@/components/home/CTABanner';
import LocationBanner from '@/components/LocationBanner';

const PostConstructionWindowCleaning: React.FC = () => {
  return (
    <Layout 
      title="Post Construction Window Cleaning - BC Pressure Washing"
      description="Professional post construction window cleaning services to ensure your windows are spotless and free of construction debris, fingerprints, and dust."
    >
      <Helmet>
        <title>Post Construction Window Cleaning | BC Pressure Washing</title>
        <meta name="description" content="Specialized window cleaning services for newly constructed or renovated properties. Remove construction debris, stickers, paint, and more for crystal clear windows." />
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
