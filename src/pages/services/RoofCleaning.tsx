
import React from 'react';
import Layout from '../../components/Layout';
import { Shield, Star, Clock, Calendar, Check, AlertCircle, Droplet } from 'lucide-react';
import CallToAction from '../../components/CallToAction';
import RoofCleaningHero from '../../components/services/roof-cleaning/RoofCleaningHero';
import RoofCleaningBenefits from '../../components/services/roof-cleaning/RoofCleaningBenefits';
import RoofCleaningProcess from '../../components/services/roof-cleaning/RoofCleaningProcess';
import RoofCleaningProduct from '../../components/services/roof-cleaning/RoofCleaningProduct';
import RoofCleaningFAQ from '../../components/services/roof-cleaning/RoofCleaningFAQ';
import RoofCleaningGallery from '../../components/services/RoofCleaningGallery';
import RoofCleaningCTA from '../../components/services/roof-cleaning/RoofCleaningCTA';

const RoofCleaning: React.FC = () => {
  return (
    <Layout>
      <RoofCleaningHero />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Professional Roof Cleaning Services</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                BC Pressure Washing specializes in safe and effective roof cleaning that removes moss, algae, and lichen while protecting your roof's integrity. Our soft wash approach ensures your roof is thoroughly cleaned without the damage that can occur from high-pressure washing.
              </p>
            </div>
            
            <div className="relative aspect-w-16 aspect-h-9 mb-12">
              <iframe 
                width="100%" 
                height="500" 
                src="https://www.youtube.com/embed/_ILz9S5kS5k" 
                title="Professional Roof Cleaning" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="rounded-lg shadow-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      
      <RoofCleaningBenefits />
      <RoofCleaningProcess />
      <RoofCleaningProduct />
      <RoofCleaningGallery />
      <RoofCleaningFAQ />
      <RoofCleaningCTA />
      <CallToAction />
    </Layout>
  );
};

export default RoofCleaning;
