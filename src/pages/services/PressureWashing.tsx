import React from 'react';
import Layout from '../../components/Layout';
import ServiceHeader from '../../components/ServiceHeader';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import FAQSection from '@/components/FAQSection';
import MoreServicesSection from '@/components/MoreServicesSection';
import ServiceProcessSection from '@/components/services/pressure-washing/ServiceProcessSection';
import ServiceBenefitsSection from '@/components/services/pressure-washing/ServiceBenefitsSection';
import ImageCarousel from '@/components/services/pressure-washing/ImageCarousel';
import DrivewayCleaning from '@/components/services/pressure-washing/DrivewayCleaning';
import ServiceFeatures from '@/components/services/pressure-washing/ServiceFeatures';
import PressureWashingForm from '@/components/forms/PressureWashingForm';

const PressureWashing = () => {
  const faqs = [
    {
      question: "What types of surfaces can you pressure wash?",
      answer: "We can pressure wash a wide variety of surfaces, including concrete, brick, siding, wood, and more. We adjust our pressure settings and cleaning solutions to safely and effectively clean each surface."
    },
    {
      question: "Is pressure washing safe for my property?",
      answer: "Yes, when done correctly. Our experienced technicians use the appropriate pressure and techniques to avoid damaging your property. We also take precautions to protect plants, windows, and other sensitive areas."
    },
    {
      question: "How often should I pressure wash my home?",
      answer: "We recommend pressure washing your home every 1-2 years to remove dirt, grime, and mildew. However, this can vary depending on your location and the amount of exposure your home has to the elements."
    },
    {
      question: "Do I need to be home during the pressure washing service?",
      answer: "No, you do not need to be home during the service. However, we do ask that you close all windows and doors and remove any items that could be damaged by the water pressure."
    },
    {
      question: "Are you insured?",
      answer: "Yes, we are fully insured with WCB coverage and liability insurance for your complete peace of mind."
    }
  ];

  return (
    <Layout 
      title="Professional Pressure Washing Services | BC Pressure Washing" 
      description="Expert pressure washing services for homes and businesses in Surrey, White Rock & Vancouver areas."
    >
      <ServiceHeader 
        title="Professional Pressure Washing"
        description="Revitalize your property with our expert pressure washing services. Serving Surrey, White Rock & Metro Vancouver."
        youtubeId="Eqv9-jVzPMU"
      />
      
      <ServiceBenefitsSection />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="md:col-span-1 lg:pr-8">
              <h2 className="text-3xl font-bold mb-6">Transform Your Home with Pressure Washing</h2>
              <p className="text-lg text-gray-700 mb-4">
                Over time, dirt, grime, and mildew can accumulate on your home's exterior, making it look dull and uninviting. Our professional pressure washing services can remove these unsightly stains and restore your home's natural beauty.
              </p>
              <p className="text-lg text-gray-700">
                We use the latest equipment and techniques to safely and effectively clean a variety of surfaces, including siding, brick, concrete, and more.
              </p>
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-3">Our Pressure Washing Services Include:</h3>
                <ul className="list-none pl-0">
                  <li className="mb-2 flex items-center">
                    <Check className="text-green-500 mr-2" size={16} />
                    House washing
                  </li>
                  <li className="mb-2 flex items-center">
                    <Check className="text-green-500 mr-2" size={16} />
                    Driveway and walkway cleaning
                  </li>
                  <li className="mb-2 flex items-center">
                    <Check className="text-green-500 mr-2" size={16} />
                    Deck and patio cleaning
                  </li>
                  <li className="mb-2 flex items-center">
                    <Check className="text-green-500 mr-2" size={16} />
                    Fence cleaning
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:col-span-1">
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
      
      <ServiceFeatures />
      
      <TestimonialsCarousel />
      
      <FAQSection
        title="Frequently Asked Questions"
        subtitle="Get answers to common questions about our pressure washing services"
        faqs={faqs}
      />
      
      <MoreServicesSection />
      
      {/* CTA Section with updated background */}
      <div className="bg-cover bg-center py-16 relative" style={{ backgroundImage: `url('/lovable-uploads/6484c6c5-3c65-46de-b9f2-c054c708124b.png')` }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Your Property?</h2>
            <p className="text-lg md:text-xl text-gray-100 mb-8">
              Book your professional pressure washing service today and see the difference.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="bc-red" size="lg" className="px-8 py-6">
                <Link to="/calculator">Get Your Free Quote</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 py-6 bg-transparent text-white border-white hover:bg-white hover:text-gray-900">
                <a href="tel:7788087620">Call Us: 778-808-7620</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PressureWashing;
