
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '../../components/Layout';
import RoofCleaningGallery from '../../components/services/RoofCleaningGallery';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import ChatAssistant from '@/components/ChatAssistant';
import RoofCleaningHero from '@/components/services/roof-cleaning/RoofCleaningHero';
import RoofCleaningProcess from '@/components/services/roof-cleaning/RoofCleaningProcess';
import RoofCleaningBenefits from '@/components/services/roof-cleaning/RoofCleaningBenefits';
import RoofCleaningFAQ from '@/components/services/roof-cleaning/RoofCleaningFAQ';
import RoofCleaningCTA from '@/components/services/roof-cleaning/RoofCleaningCTA';
import RoofCleaningProduct from '@/components/services/roof-cleaning/RoofCleaningProduct';

const RoofCleaning = () => {
  useEffect(() => {
    document.title = "Roof Cleaning & Moss Removal Services | BC Pressure Washing";
    document.body.classList.add('roof-cleaning-page');
    return () => {
      document.body.classList.remove('roof-cleaning-page');
    };
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Professional Roof Cleaning & Moss Removal | BC Pressure Washing</title>
        <meta name="description" content="Professional roof cleaning and moss removal services in Surrey, White Rock, and South Surrey. Extend the life of your roof while improving curb appeal." />
      </Helmet>

      <RoofCleaningHero />
      <RoofCleaningBenefits />
      <RoofCleaningProduct />
      <RoofCleaningProcess />
      <ServiceAreaMap />
      <RoofCleaningGallery />
      <RoofCleaningFAQ />
      <RoofCleaningCTA />
      
      {/* Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        <ChatAssistant />
      </div>
    </Layout>
  );
};

export default RoofCleaning;
