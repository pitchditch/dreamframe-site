import React from 'react';
import Layout from '../../components/Layout';
import ServiceHeader from '../../components/ServiceHeader';
import CallToAction from '../../components/CallToAction';
import { ExternalLink, MessageCircle } from 'lucide-react';
import ServiceProcessSection from '../../components/services/roof-cleaning/ServiceProcessSection';
import ServiceBenefitsSection from '../../components/services/roof-cleaning/ServiceBenefitsSection';
import MoreServicesSection from '../../components/MoreServicesSection';
import CitiesCarousel from '@/components/CitiesCarousel';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import RoofCleaningForm from '@/components/forms/RoofCleaningForm';
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import ServiceAreaMap from '@/components/ServiceAreaMap';

const RoofCleaning = () => {
  const faqs = [
    {
      question: "What types of roofs can you clean?",
      answer: "We clean a variety of roof types, including asphalt shingles, cedar shakes, tile, and metal roofs. Our team is trained to assess the specific needs of each roof and use appropriate cleaning methods."
    },
    {
      question: "Will roof cleaning damage my shingles?",
      answer: "No, our soft washing technique is designed to gently remove moss, algae, and debris without causing damage to your shingles. We avoid high-pressure methods that can strip granules and shorten the lifespan of your roof."
    },
    {
      question: "How long does roof cleaning take?",
      answer: "The duration of the cleaning process depends on the size and condition of your roof. A typical residential roof can take anywhere from 4 to 8 hours to clean thoroughly."
    },
    {
      question: "How often should I have my roof cleaned?",
      answer: "We recommend having your roof cleaned every 2-3 years to prevent the buildup of moss and algae, which can cause damage and reduce the lifespan of your roof."
    },
    {
      question: "Are the cleaning solutions you use safe for the environment?",
      answer: "Yes, we use eco-friendly cleaning solutions that are safe for your property, your family, and the environment. Our products are biodegradable and won't harm your landscaping."
    }
  ];
  
  return (
    <Layout title="Professional Roof Cleaning Services | Surrey & White Rock" description="Expert roof cleaning services to remove moss, algae, and debris, protecting your roof and extending its lifespan.">
      <ServiceHeader 
        title="Professional Roof Cleaning"
        description="Protect your roof and extend its lifespan with our expert cleaning services."
        youtubeId="twtzf2gRdFU"
      />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="md:col-span-1 lg:pr-8">
              <h2 className="text-3xl font-bold mb-6">Extend the Life of Your Roof</h2>
              <p className="text-lg text-gray-700 mb-4">
                Our professional roof cleaning services remove harmful moss, algae, and lichen, preventing damage and extending the life of your roof.
              </p>
              <p className="text-lg text-gray-700">
                Using safe, low-pressure techniques and eco-friendly solutions, we gently clean all types of roofing materials, including:
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                  <img src="/lovable-uploads/47504564-617f-4553-85c8-0f9f5d5ec715.png" alt="Asphalt Shingles" className="w-16 h-16 object-cover rounded-lg" />
                  <span className="font-medium">Asphalt shingles</span>
                </div>
                <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                  <img src="/lovable-uploads/47504564-617f-4553-85c8-0f9f5d5ec715.png" alt="Cedar Shakes" className="w-16 h-16 object-cover rounded-lg" />
                  <span className="font-medium">Cedar shakes</span>
                </div>
                <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                  <img src="/lovable-uploads/47504564-617f-4553-85c8-0f9f5d5ec715.png" alt="Tile Roofs" className="w-16 h-16 object-cover rounded-lg" />
                  <span className="font-medium">Tile roofs</span>
                </div>
                <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                  <img src="/lovable-uploads/47504564-617f-4553-85c8-0f9f5d5ec715.png" alt="Metal Roofs" className="w-16 h-16 object-cover rounded-lg" />
                  <span className="font-medium">Metal roofs</span>
                </div>
              </div>
            </div>
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-100 hover:border-bc-red transition-all duration-300 transform hover:-translate-y-1">
                <RoofCleaningForm />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="w-full bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <ServiceBenefitsSection />
        </div>
      </section>
      
      <ServiceProcessSection />
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">Recent Roof Cleaning Project</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            See the impressive results we've achieved for residential clients in the South Surrey and White Rock area.
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-lg shadow-xl">
              <img 
                src="/lovable-uploads/47504564-617f-4553-85c8-0f9f5d5ec715.png" 
                alt="South Surrey Roof Cleaning Project"
                className="w-full h-auto" 
              />
              <div className="p-6 bg-white">
                <h3 className="font-bold text-xl mb-2">South Surrey Residence</h3>
                <p className="text-gray-700">Residential roof cleaning service to remove moss and algae, protecting the roof and improving curb appeal.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <TestimonialsSection />
      
      <FAQSection
        title="Frequently Asked Questions"
        subtitle="Get answers to common questions about our roof cleaning services"
        faqs={faqs}
      />
      
      <MoreServicesSection />
      
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Areas We Service</h2>
          <ServiceAreaMap />
        </div>
      </section>
      
      {/* Update the CTA section with new background image */}
      <div className="bg-cover bg-center py-16 relative" style={{ backgroundImage: `url('/lovable-uploads/51b3b66a-da0c-4ca9-b746-8c0066dd405d.png')` }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready for a Cleaner, Healthier Roof?</h2>
            <p className="text-lg md:text-xl text-gray-100 mb-8">
              Protect your investment with our professional roof cleaning services.
            </p>
            <Button asChild variant="bc-red" size="lg" className="px-8 py-6">
              <Link to="/calculator">Check Prices & Availability</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RoofCleaning;
