import React from 'react';
import Layout from '../../components/Layout';
import ServiceHeader from '../../components/ServiceHeader';
import CallToAction from '../../components/CallToAction';
import { ExternalLink, MessageCircle } from 'lucide-react';
import ServiceProcessSection from '../../components/services/pressure-washing/ServiceProcessSection';
import ServiceBenefitsSection from '../../components/services/pressure-washing/ServiceBenefitsSection';
import ServiceFeatures from '../../components/services/pressure-washing/ServiceFeatures';
import DrivewayCleaning from '../../components/services/pressure-washing/DrivewayCleaning';
import ImageCarousel from '../../components/services/pressure-washing/ImageCarousel';
import MoreServicesSection from '../../components/MoreServicesSection';
import CitiesCarousel from '@/components/CitiesCarousel';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import PressureWashingForm from '@/components/forms/PressureWashingForm';
import { Card } from '@/components/ui/card';
import ServiceAreaMap from '@/components/ServiceAreaMap';

const PressureWashing = () => {
  const faqs = [
    {
      question: "Do you use eco-friendly cleaning solutions?",
      answer: "Yes, we use biodegradable, environmentally friendly cleaning solutions that are safe for your property, your family, and your pets, while still delivering excellent cleaning results."
    },
    {
      question: "Will pressure washing damage my property?",
      answer: "Our technicians are trained to use appropriate pressure levels for different surfaces. We utilize soft washing techniques for delicate surfaces and adjust our approach to ensure effective cleaning without damage."
    },
    {
      question: "How often should I have my property pressure washed?",
      answer: "Most residential properties benefit from annual pressure washing. However, homes in areas with high humidity, extensive tree coverage, or near water bodies may require cleaning every 6-8 months to prevent buildup of organic growth."
    },
    {
      question: "How long does pressure washing take?",
      answer: "The time required depends on the size and condition of the area being cleaned. A typical house exterior might take 3-5 hours, while a driveway or deck could take 1-2 hours. We'll provide a time estimate when you book your service."
    },
    {
      question: "What preparation is needed before you arrive?",
      answer: "We ask that you remove any obstacles like furniture, potted plants, garden hoses, and vehicles from the areas to be cleaned. Also, please ensure exterior electrical outlets are accessible and water sources are turned on."
    }
  ];
  
  return (
    <Layout title="Professional Pressure Washing Services | Surrey & White Rock" description="Expert pressure washing services for homes and businesses. Remove dirt, grime, and stains with our specialized equipment and eco-friendly solutions.">
      <ServiceHeader 
        title="Professional Pressure Washing"
        description="Restore the beauty of your exterior surfaces with our specialized pressure washing services."
        youtubeId="HuXyYAxC4Fs" // Updated YouTube ID for mobile
        youtubeDesktopId="lYnXijewxCM" // Added new desktop YouTube ID
      />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="md:col-span-1 lg:pr-8">
              <h2 className="text-3xl font-bold mb-6 heading-text">Revitalize Your Home's Exterior</h2>
              <p className="text-lg text-gray-700 mb-4 content-text">
                Our professional pressure washing services remove years of built-up dirt, grime, mold, and mildew, instantly transforming your property's appearance and protecting your investment.
              </p>
              <p className="text-lg text-gray-700 content-text">
                Using state-of-the-art equipment and eco-friendly cleaning solutions, we safely clean all exterior surfaces including:
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                  <img src="/lovable-uploads/77a691e2-8b93-4749-be35-5ca5bbf137b3.png" alt="Siding & Exterior Walls" className="w-16 h-16 object-cover rounded-lg" />
                  <span className="font-medium">Siding & exterior walls</span>
                </div>
                <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                  <img src="/lovable-uploads/058537c2-5a7e-47ce-bf9d-ea1ada4c2595.png" alt="Fences & Gates" className="w-16 h-16 object-cover rounded-lg" />
                  <span className="font-medium">Fences & gates</span>
                </div>
                <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                  <img src="/lovable-uploads/197efc6d-85e4-474e-8c04-38e42cc66919.png" alt="Decks & Patios" className="w-16 h-16 object-cover rounded-lg" />
                  <span className="font-medium">Decks & patios</span>
                </div>
                <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                  <img src="/lovable-uploads/8f646c66-5a09-4335-a82d-e15a1d86a4c4.png" alt="Driveways & Walkways" className="w-16 h-16 object-cover rounded-lg" />
                  <span className="font-medium">Driveways & walkways</span>
                </div>
              </div>
              <ServiceFeatures />
            </div>
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-100 hover:border-bc-red transition-all duration-300 transform hover:-translate-y-1">
                <PressureWashingForm />
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
      
      <DrivewayCleaning />
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">Recent Pressure Washing Project</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            See the impressive results we've achieved for commercial clients in the South Surrey and White Rock area.
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-lg shadow-xl">
              <img 
                src="/lovable-uploads/a2a1376b-3da7-4c9d-9a85-60ba24418d4f.png" 
                alt="South Abbotsford Church Pressure Washing Project"
                className="w-full h-auto" 
              />
              <div className="p-6 bg-white">
                <h3 className="font-bold text-xl mb-2">South Abbotsford Church</h3>
                <p className="text-gray-700">Commercial pressure washing service for walkways, entrances and exterior surfaces to remove dirt, grime, and organic growth.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <TestimonialsSection />
      
      <FAQSection
        title="Frequently Asked Questions"
        subtitle="Get answers to common questions about our pressure washing services"
        faqs={faqs}
      />
      
      <MoreServicesSection />
      
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Areas We Service</h2>
          <ServiceAreaMap />
        </div>
      </section>
      
      <CallToAction 
        title="Ready to Transform Your Property?"
        subtitle="Contact us today for a free estimate on our pressure washing services."
        backgroundImage="/lovable-uploads/26f6a625-a200-4106-8f94-579be5c566b6.png"
      />
    </Layout>
  );
};

export default PressureWashing;
