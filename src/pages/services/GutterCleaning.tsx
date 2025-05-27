
import React from 'react';
import Layout from '../../components/Layout';
import ServiceHeader from '../../components/ServiceHeader';
import CallToAction from '../../components/CallToAction';
import FAQSection from '../../components/FAQSection';
import ServiceBenefits from '../../components/ServiceBenefits';
import GutterCleaningQuoteOverlay from '../../components/forms/GutterCleaningQuoteOverlay';
import GutterCleaningCarousel from '../../components/services/gutter-cleaning/GutterCleaningCarousel';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import MoreServicesSection from '@/components/MoreServicesSection';

const GutterCleaning = () => {
  const benefits = [
    {
      title: "Prevent Water Damage",
      description: "Clean gutters protect your foundation, siding, and landscaping from costly water damage."
    },
    {
      title: "Avoid Structural Issues",
      description: "Proper drainage prevents ice dams, foundation settling, and basement flooding."
    },
    {
      title: "Extend Gutter Life",
      description: "Regular cleaning prevents rust, corrosion, and premature gutter replacement."
    },
    {
      title: "Pest Prevention",
      description: "Remove breeding grounds for mosquitoes, birds, and other unwanted pests."
    },
    {
      title: "Professional Safety",
      description: "Our insured technicians handle dangerous ladder work so you don't have to."
    },
    {
      title: "Complete Inspection",
      description: "We identify potential issues before they become expensive repairs."
    }
  ];

  const faqs = [
    {
      question: "How often should gutters be cleaned?",
      answer: "Most homes should have gutters cleaned twice per year - once in late spring and once in late fall. Homes with many trees may need more frequent cleaning."
    },
    {
      question: "What happens if I don't clean my gutters?",
      answer: "Clogged gutters can cause water to overflow, leading to foundation damage, basement flooding, ice dams, and costly structural repairs."
    },
    {
      question: "Do you clean downspouts too?",
      answer: "Yes, our service includes clearing all downspouts and testing water flow through the entire gutter system."
    },
    {
      question: "Will you remove all the debris?",
      answer: "Absolutely. We remove all debris from your property and leave your gutters and surrounding areas clean."
    },
    {
      question: "What if you find damage during cleaning?",
      answer: "We'll point out any issues we discover and can provide recommendations for repairs or replacement if needed."
    }
  ];

  return (
    <Layout title="Professional Gutter Cleaning Services | Surrey & White Rock" description="Expert gutter cleaning and maintenance services. Protect your home from water damage with our professional gutter cleaning in Surrey, White Rock, and Metro Vancouver.">
      <ServiceHeader 
        title="Professional Gutter Cleaning" 
        description="Protect your home from water damage with our thorough gutter cleaning and maintenance services." 
        youtubeId="eQKpQgz5HfI"
        youtubeDesktopId="eQKpQgz5HfI"
      />
      
      {/* Get Your Gutters Cleaned Today Section - Full Width */}
      <section className="w-full py-16 bg-white">
        <div className="w-full px-4">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-6 heading-text">Get Your Gutters Cleaned Today</h2>
            <p className="text-lg text-gray-700 mb-8 content-text">
              Don't let clogged gutters damage your home. Our professional gutter cleaning service removes all debris, 
              tests water flow, and protects your property from costly water damage.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🏠</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Protect Your Home</h3>
                <p className="text-gray-600">Prevent foundation damage and basement flooding</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Professional Service</h3>
                <p className="text-gray-600">Insured technicians with proper safety equipment</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">💧</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Complete Cleaning</h3>
                <p className="text-gray-600">Gutters, downspouts, and water flow testing</p>
              </div>
            </div>

            <GutterCleaningQuoteOverlay buttonText="Get Free Gutter Cleaning Quote" variant="bc-red" />
          </div>
        </div>
      </section>
      
      {/* Our Gutter Cleaning Process Carousel */}
      <section className="w-full py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6 heading-text">Our Professional Gutter Cleaning Process</h2>
            <p className="text-lg text-gray-700 content-text max-w-3xl mx-auto">
              We follow a systematic 6-step process to ensure your gutters are thoroughly cleaned and functioning properly.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <GutterCleaningCarousel />
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <ServiceBenefits 
            title="Benefits of Professional Gutter Cleaning" 
            subtitle="Discover why regular gutter maintenance is essential for protecting your home"
            benefits={benefits} 
          />
        </div>
      </section>
      
      <TestimonialsSection />
      
      <FAQSection
        title="Frequently Asked Questions"
        subtitle="Get answers to common questions about our gutter cleaning services"
        faqs={faqs}
      />
      
      <MoreServicesSection />
      
      <CallToAction 
        title="Ready to Protect Your Home?"
        subtitle="Contact us today for a free estimate on our professional gutter cleaning services."
        backgroundImage="/lovable-uploads/26f6a625-a200-4106-8f94-579be5c566b6.png"
      />
    </Layout>
  );
};

export default GutterCleaning;
