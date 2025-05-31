
import React from 'react';
import Layout from '../../components/Layout';
import ServiceHeader from '../../components/ServiceHeader';
import FAQSection from '../../components/FAQSection';
import ServiceBenefits from '../../components/ServiceBenefits';
import CallToAction from '../../components/CallToAction';
import { Shield, Droplets, Leaf } from 'lucide-react';
import RoofCleaningQuoteOverlay from '@/components/forms/RoofCleaningQuoteOverlay';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import RoofCleaningProcessCarousel from '@/components/services/roof-cleaning/RoofCleaningProcessCarousel';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const RoofCleaning = () => {
  const benefits = [{
    title: "Prevent Roof Damage",
    description: "Moss and algae can deteriorate roofing materials, leading to leaks and expensive repairs."
  }, {
    title: "Extend Roof Lifespan",
    description: "Regular cleaning can add years to your roof's life expectancy by preventing organic growth damage."
  }, {
    title: "Improve Energy Efficiency",
    description: "A clean roof reflects more sunlight and absorbs less heat, potentially reducing cooling costs."
  }, {
    title: "Enhance Curb Appeal",
    description: "Remove unsightly stains and growths to dramatically improve your home's overall appearance."
  }, {
    title: "Maintain Property Value",
    description: "A well-maintained roof is a significant factor in your home's market value and appeal to buyers."
  }, {
    title: "Prevent Health Issues",
    description: "Mold and algae can spread into your home, creating potential health concerns for you and your family."
  }];
  
  const faqs = [{
    question: "How often should I have my roof cleaned?",
    answer: "Most homes benefit from roof cleaning every 1-3 years, depending on your location's climate, surrounding trees, and previous growth issues. In the Pacific Northwest's damp climate, annual inspection and cleaning may be recommended."
  }, {
    question: "Will roof cleaning damage my shingles?",
    answer: "Our soft washing technique is specifically designed to clean effectively without damaging roofing materials. We never use high pressure on asphalt shingles, which can remove granules and shorten roof life."
  }, {
    question: "How do you remove the moss and algae without damaging my roof?",
    answer: "We use a specialized two-step process: first applying an environmentally responsible cleaning solution that kills the organic growth, followed by gentle low-pressure rinsing. This method effectively removes growths without damaging shingles."
  }, {
    question: "Will the cleaning solution harm my plants or landscaping?",
    answer: "We take precautions to protect your landscaping by pre-wetting plants and covering sensitive areas. Our cleaning solutions are biodegradable and, when properly diluted and applied, won't harm your landscaping."
  }, {
    question: "How long does roof cleaning take?",
    answer: "For an average home, professional roof cleaning typically takes 3-5 hours. Larger homes or those with severe growth may take longer. Weather conditions can also affect timing."
  }];

  return (
    <Layout title="Professional Roof Cleaning Services | BC Pressure Washing" description="Expert roof cleaning services in White Rock, Surrey and Metro Vancouver. Prevent damage and extend the life of your roof with our soft washing techniques.">
      <ServiceHeader 
        title="Professional Roof Cleaning" 
        description="Protect your investment with our safe and effective roof cleaning service." 
        youtubeId="twtzf2gRdFU"
        youtubeDesktopId="eQSgdx9ujcc"
      />
      
      {/* Restore Your Roof's Beauty - Full Width */}
      <section className="w-full py-16 bg-white" data-section="premium-solutions">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-6 heading-text">Restore Your Roof's Beauty</h2>
            <p className="text-lg text-gray-700 mb-8 content-text">
              Moss, algae, and lichen can not only make your roof look unsightly but also cause significant damage over time. Our professional roof cleaning service safely removes these growths, extending the life of your roof and enhancing your home's curb appeal.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start justify-center">
                <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600 mr-3">
                  <Shield size={18} />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-lg">Safe Soft Washing Techniques</h3>
                  <p className="text-gray-600">
                    We use low-pressure soft washing to gently remove moss and algae without damaging your roofing materials.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start justify-center">
                <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600 mr-3">
                  <Droplets size={18} />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-lg">Effective Algae and Moss Removal</h3>
                  <p className="text-gray-600">
                    Our specialized cleaning solutions effectively kill and remove moss, algae, and lichen, preventing regrowth for longer-lasting results.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start justify-center">
                <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600 mr-3">
                  <Leaf size={18} />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-lg">Eco-Friendly Cleaning Products</h3>
                  <p className="text-gray-600">
                    We use environmentally friendly cleaning solutions that are safe for your family, pets, and landscaping.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <RoofCleaningQuoteOverlay buttonText="Check Price & Availability" variant="bc-red" />
              <Button className="bg-green-600 hover:bg-green-700 text-white" size="lg" asChild>
                <a href="tel:7788087620" className="flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  Call Now: (778) 808-7620
                </a>
              </Button>
            </div>
            
            <div className="mt-8 p-6 bg-amber-50 rounded-lg border border-amber-200 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold mb-2 text-amber-800">Roof Cleaning Warning!</h3>
              <p className="text-amber-700">
                Ignoring moss and algae growth can lead to significant roof damage and costly repairs. Protect your investment with regular, professional cleaning.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <ServiceBenefits title="Benefits of Professional Roof Cleaning" subtitle="Protect your biggest investment and enhance your home's appearance with our safe and effective roof cleaning services" benefits={benefits} />
        </div>
      </section>
      
      <RoofCleaningProcessCarousel />
      
      <TestimonialsSection />
      
      <FAQSection title="Frequently Asked Questions About Roof Cleaning" subtitle="Get answers to common questions about our roof cleaning services" faqs={faqs} />
      
      <CallToAction 
        title="Ready for a Cleaner, Healthier Roof?" 
        subtitle="Contact us today for a free estimate and protect your home with our professional roof cleaning service." 
        backgroundImage="/lovable-uploads/9454f467-d96c-435e-b88d-8a78e379102a.png"
      />
    </Layout>
  );
};

export default RoofCleaning;
