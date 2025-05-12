import React from 'react';
import Layout from '@/components/Layout';
import ServiceHeader from '@/components/ServiceHeader';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import FAQSection from '@/components/FAQSection';
import MoreServicesSection from '@/components/MoreServicesSection';
import RoofCleaningGallery from '@/components/services/RoofCleaningGallery';
import RoofCleaningForm from '@/components/forms/RoofCleaningForm';
import ServiceAreasCarousel from '@/components/ServiceAreasCarousel';
import ServiceAreaMap from '@/components/ServiceAreaMap';

const RoofCleaning = () => {
  const faqs = [
    {
      question: "How often should I clean my roof?",
      answer: "We recommend cleaning your roof every 2-3 years to prevent moss and algae buildup."
    },
    {
      question: "What are the benefits of roof cleaning?",
      answer: "Roof cleaning removes harmful moss and algae, extends the life of your roof, and improves your home's curb appeal."
    },
    {
      question: "Is roof cleaning safe for my roof?",
      answer: "Yes, our soft wash cleaning method is safe for all types of roofs and won't damage your shingles."
    },
    {
      question: "Do you offer any guarantees?",
      answer: "Yes, we offer a 100% satisfaction guarantee. If you're not happy with our work, we'll make it right."
    },
    {
      question: "Are you insured?",
      answer: "Yes, we are fully insured with WCB coverage and liability insurance for your complete peace of mind."
    }
  ];

  return (
    <Layout 
      title="Professional Roof Cleaning Services | BC Pressure Washing" 
      description="Expert roof cleaning, moss removal and black streak removal services in Surrey, White Rock & Vancouver areas."
    >
      <ServiceHeader 
        title="Professional Roof Cleaning"
        description="Protect your roof from moss and algae with our expert cleaning services."
        imagePath="/lovable-uploads/5608bf56-7f0e-4f7f-9bb0-5ba81b9d267e.png"
        darkOverlay={true}
      />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="md:col-span-1 lg:pr-8">
              <h2 className="text-3xl font-bold mb-6">Protect Your Roof with Professional Cleaning</h2>
              <p className="text-lg text-gray-700 mb-4">
                Moss, algae, and lichen can cause serious damage to your roof over time. Our professional roof cleaning services remove these harmful growths, extending the life of your roof and improving your home's curb appeal.
              </p>
              <p className="text-lg text-gray-700">
                We use a soft wash cleaning method that is safe for all types of roofs, including asphalt shingles, tile, and metal. Our process won't damage your roof or remove any granules.
              </p>
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-3">Our Roof Cleaning Services Include:</h3>
                <ul className="list-none pl-0">
                  <li className="mb-2 flex items-center">
                    <Check className="text-green-500 mr-2" size={16} />
                    Moss and algae removal
                  </li>
                  <li className="mb-2 flex items-center">
                    <Check className="text-green-500 mr-2" size={16} />
                    Black streak removal
                  </li>
                  <li className="mb-2 flex items-center">
                    <Check className="text-green-500 mr-2" size={16} />
                    Soft wash cleaning method
                  </li>
                  <li className="mb-2 flex items-center">
                    <Check className="text-green-500 mr-2" size={16} />
                    Environmentally friendly cleaning solutions
                  </li>
                </ul>
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
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Before & After</h2>
          <RoofCleaningGallery />
        </div>
      </section>
      
      <TestimonialsCarousel />
      
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
          <div className="mt-8">
            <ServiceAreasCarousel />
          </div>
        </div>
      </section>
      
      {/* CTA Section with Updated Background */}
      <div className="bg-cover bg-center py-16 relative" style={{ backgroundImage: `url('/lovable-uploads/59401248-58ee-4944-b37e-410cc26c471d.png')` }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready for a Cleaner, Healthier Roof?</h2>
            <p className="text-lg md:text-xl text-gray-100 mb-8">
              Book your professional roof cleaning service today and protect your home's most important asset.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="bc-red" size="lg" className="px-8 py-6">
                <Link to="/calculator">Get Your Free Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RoofCleaning;
