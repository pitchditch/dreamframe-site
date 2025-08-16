
import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '@/components/post-construction/HeroSection';
import BenefitsSection from '@/components/post-construction/BenefitsSection';
import BeforeAfterSection from '@/components/post-construction/BeforeAfterSection';
import BookingSection from '@/components/post-construction/BookingSection';
import FAQSection from '@/components/post-construction/FAQSection';
import CTABanner from '@/components/home/CTABanner';
import LocationBanner from '@/components/LocationBanner';
import { ServicePageHeader } from '@/components/ServicePageHeader';
import PersonalizedChatbot from '@/components/PersonalizedChatbot';

const PostConstructionWindowCleaning: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Post Construction Window Cleaning | BC Pressure Washing</title>
        <meta name="description" content="Specialized window cleaning services for newly constructed or renovated properties. Remove construction debris, stickers, paint, and more for crystal clear windows." />
      </Helmet>
      
      <ServicePageHeader isOverVideo={true} />
      <HeroSection />
      <BenefitsSection />
      <BeforeAfterSection />
      <FAQSection />
      <BookingSection />
      <CTABanner />
      <LocationBanner />
      <PersonalizedChatbot />
    </>
  );
};

export default PostConstructionWindowCleaning;
