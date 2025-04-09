
import React from 'react';
import Layout from '../../components/Layout';
import CallToAction from '../../components/CallToAction';

// Import refactored components
import HeroSection from '../../components/post-construction/HeroSection';
import WhySection from '../../components/post-construction/WhySection';
import BeforeAfterSection from '../../components/post-construction/BeforeAfterSection';
import RemovalItemsSection from '../../components/post-construction/RemovalItemsSection';
import ServiceAreaBanner from '../../components/post-construction/ServiceAreaBanner';
import ProcessSection from '../../components/post-construction/ProcessSection';
import BenefitsSection from '../../components/post-construction/BenefitsSection';
import TrustSection from '../../components/post-construction/TrustSection';
import BookingSection from '../../components/post-construction/BookingSection';
import FAQSection from '../../components/post-construction/FAQSection';

const PostConstructionWindowCleaning: React.FC = () => {
  const removalItems = [
    "Construction tape & stickers",
    "Paint overspray",
    "Drywall & cement dust",
    "Silicone smears",
    "Plaster residue"
  ];

  return (
    <Layout 
      title="Crystal Clear After Construction - Post Construction Window Cleaning"
      description="Professional post construction window cleaning services to remove dust, debris, paint, and adhesives. Serving Surrey, White Rock, and Metro Vancouver."
    >
      <HeroSection />
      <ServiceAreaBanner />
      <WhySection />
      <BeforeAfterSection />
      <RemovalItemsSection items={removalItems} />
      <ProcessSection />
      <BenefitsSection />
      <TrustSection />
      <BookingSection />
      <FAQSection />
      <CallToAction 
        title="Ready for Spotless Windows After Construction?"
        subtitle="Contact us today for a free estimate on our post-construction window cleaning services."
        primaryButtonText="Get a Free Quote"
        primaryButtonLink="/contact"
      />
    </Layout>
  );
};

export default PostConstructionWindowCleaning;
