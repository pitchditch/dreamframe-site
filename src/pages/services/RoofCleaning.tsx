
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '../../components/Layout';
import RoofCleaningGallery from '../../components/services/RoofCleaningGallery';
import LocationBanner from '@/components/LocationBanner';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import ChatAssistant from '@/components/ChatAssistant';
import { Badge } from '@/components/ui/badge';
import RoofCleaningHero from '@/components/services/roof-cleaning/RoofCleaningHero';
import RoofCleaningProcess from '@/components/services/roof-cleaning/RoofCleaningProcess';
import RoofCleaningBenefits from '@/components/services/roof-cleaning/RoofCleaningBenefits';
import RoofCleaningFAQ from '@/components/services/roof-cleaning/RoofCleaningFAQ';
import RoofCleaningCTA from '@/components/services/roof-cleaning/RoofCleaningCTA';

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
      <RoofCleaningProcess />
      <LocationBanner />
      <ServiceAreaMap />
      <RoofCleaningGallery />
      <RoofCleaningFAQ />
      <RoofCleaningCTA />

      {/* SERVICE AREA SECTION */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-6">We Serve All of Surrey, White Rock, South Surrey & Langley</h3>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Badge className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 text-sm">Surrey</Badge>
            <Badge className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 text-sm">White Rock</Badge>
            <Badge className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 text-sm">South Surrey</Badge>
            <Badge className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 text-sm">Langley</Badge>
            <Badge className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 text-sm">Cloverdale</Badge>
            <Badge className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 text-sm">Ocean Park</Badge>
            <Badge className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 text-sm">Crescent Beach</Badge>
          </div>
        </div>
      </section>

      {/* Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        <ChatAssistant />
      </div>
    </Layout>
  );
};

export default RoofCleaning;
