
import React from 'react';
import Layout from '../../components/Layout';
import ServiceHeader from '../../components/ServiceHeader';
import CallToAction from '../../components/CallToAction';
import { ExternalLink } from 'lucide-react';
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
        imagePath="/lovable-uploads/e76ecfc1-a3a8-44d8-9a4a-5e1bf7c32282.png"
      />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <ServiceFeatures />
              <ServiceBenefitsSection />
            </div>
            <div>
              <PressureWashingForm />
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
      
      <CitiesCarousel />
      
      <div className="py-10 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d167326.78631723323!2d-122.96968737170609!3d49.10482983753625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5485d910ff12a495%3A0x50135152a7b0560!2sSurrey%2C%20BC!5e0!3m2!1sen!2sca!4v1657051523264!5m2!1sen!2sca" 
              width="800" 
              height="400" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Service Area Map"
              className="rounded-lg shadow-lg"
            ></iframe>
          </div>
        </div>
      </div>
      
      <CallToAction 
        title="Ready to Transform Your Property?"
        subtitle="Contact us today for a free estimate on our pressure washing services."
      />
    </Layout>
  );
};

export default PressureWashing;
