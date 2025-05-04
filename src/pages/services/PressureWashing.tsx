
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
        youtubeId="lYnXijewxCM"
      />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-6">Revitalize Your Home's Exterior</h2>
                <p className="text-lg text-gray-700 mb-4">
                  Our professional pressure washing services remove years of built-up dirt, grime, mold, and mildew, instantly transforming your property's appearance and protecting your investment.
                </p>
                <p className="text-lg text-gray-700">
                  Using state-of-the-art equipment and eco-friendly cleaning solutions, we safely clean all exterior surfaces including:
                </p>
                <ul className="mt-4 space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="inline-block w-2 h-2 bg-bc-red rounded-full mr-3"></span>
                    Driveways & walkways
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block w-2 h-2 bg-bc-red rounded-full mr-3"></span>
                    Decks & patios
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block w-2 h-2 bg-bc-red rounded-full mr-3"></span>
                    Siding & exterior walls
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block w-2 h-2 bg-bc-red rounded-full mr-3"></span>
                    Fences & gates
                  </li>
                </ul>
              </div>
              <ServiceFeatures />
              <ServiceBenefitsSection />
            </div>
            <div className="flex flex-col">
              <div className="relative mb-6">
                <div className="absolute -top-12 -left-12 w-24 h-24 animate-spin-slow opacity-80">
                  <img src="/lovable-uploads/21056867-9ce1-48a7-8503-3d9f1efdf36e.png" alt="BC Pressure Washing" className="w-full h-full object-contain drop-shadow-md" />
                </div>
                <div className="absolute -top-16 left-16 bg-white p-3 rounded-lg shadow-md transform rotate-6 animate-bounce-slow">
                  <MessageCircle className="text-bc-red h-8 w-8" />
                  <div className="absolute w-4 h-4 bg-white transform rotate-45 -bottom-2 left-6"></div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-100 hover:border-bc-red transition-all duration-300 transform hover:-translate-y-1">
                <PressureWashingForm />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <ServiceProcessSection />
      
      <DrivewayCleaning />
      
      <ImageCarousel />
      
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
      />
    </Layout>
  );
};

export default PressureWashing;
