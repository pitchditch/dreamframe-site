
import { useEffect } from 'react';
import Layout from '../components/Layout';
import ReferralButton from '../components/ReferralButton';
import { useTranslation } from '@/hooks/use-translation';
import StickyQuoteBar from '@/components/StickyQuoteBar';
import AfkOverlay from '../components/AfkOverlay';
import SEOContent from '../components/SEOContent';
import HeroWithContent from '../components/HeroWithContent';
import ServiceBanner from '../components/ServiceBanner';
import WhatWeCleanSection from '../components/home/WhatWeCleanSection';
import WhyChooseUsSection from '../components/home/WhyChooseUsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import TrustedCustomersSection from '../components/home/TrustedCustomersSection';
import ReferralProgramSection from '../components/ReferralProgramSection';
import CompetitorComparisonSection from '../components/home/CompetitorComparisonSection';
import FAQSection from '../components/FAQSection';
import FinalCTASection from '../components/home/FinalCTASection';
import RedCarSection from '../components/home/RedCarSection';

const Index = () => {
  const { language, t } = useTranslation();

  useEffect(() => {
    document.body.classList.add('has-video-header');

    console.log('Current language on Index page:', language);
    console.log('Translation test:', t("Home"));

    return () => {
      document.body.classList.remove('has-video-header');
    };
  }, [language, t]);

  const faqItems = [
    {
      question: t("What areas do you service?"),
      answer: t("We are based in White Rock and service the entire Metro Vancouver region, including Surrey, Langley, Delta, Vancouver and surrounding areas.")
    },
    {
      question: t("Are you fully insured?"),
      answer: t("Yes, we are fully insured with WCB coverage and liability insurance for your complete peace of mind.")
    },
    {
      question: t("How often should I have my windows cleaned?"),
      answer: t("Most homeowners benefit from window cleaning 2-3 times per year, though this varies based on your location, property conditions, and personal preference.")
    },
    {
      question: t("Do you offer any guarantees?"),
      answer: t("Absolutely! We offer a 100% satisfaction guarantee. If you're not completely satisfied with our work, we'll come back and make it right at no additional cost.")
    },
    {
      question: t("How do you price your services?"),
      answer: t("Our pricing is based on the service requested, property size, accessibility, and specific requirements. We offer free quotes after assessing your property's needs.")
    }
  ];

  return (
    <Layout
      image="/lovable-uploads/5608bf56-7f0e-4f7f-9bb0-5ba81b9d267e.png"
      canonicalUrl="/"
      title="White Rock BC Pressure Washing & Window Cleaning - BC Pressure Washing"
      description="BC Pressure Washing offers professional pressure washing and window cleaning in White Rock, South Surrey and the Lower Mainland. Call now for a free quote!"
    >
      <SEOContent faqItems={faqItems} />
      
      <HeroWithContent>
        <>
          <ServiceBanner />
          
          {/* What We Clean Section */}
          <div className="bg-white relative z-50">
            <WhatWeCleanSection />
          </div>
          
          <div className="bg-white relative z-50">
            {/* Why Choose Us Section */}
            <WhyChooseUsSection />
            
            {/* Testimonials */}
            <TestimonialsSection />
            
            {/* Red Car Section */}
            <RedCarSection />
            
            {/* Trusted Customers Slideshow */}
            <TrustedCustomersSection />
            
            {/* Referral Program Section */}
            <ReferralProgramSection />
            
            {/* Competitor Comparison */}
            <CompetitorComparisonSection />
            
            {/* FAQ Section */}
            <div data-section="faq">
              <FAQSection 
                title={t("Frequently Asked Questions")} 
                subtitle={t("Everything you need to know about our services")}
                faqs={faqItems}
                darkMode={true}
              />
            </div>
            
            {/* Final CTA Section */}
            <FinalCTASection />
            
            {/* White Rock Footer Image */}
            <div className="w-full footer-image">
              <img 
                src="/lovable-uploads/06e9bd14-b601-4e6f-bcd9-01217b067c47.png" 
                alt="White Rock Marine Drive - Local Business" 
                className="w-full h-auto object-cover object-center rounded-t-3xl" 
              />
            </div>
          </div>
        </>
      </HeroWithContent>
      
      <ReferralButton />
      <StickyQuoteBar />
      <AfkOverlay />
    </Layout>
  );
};

export default Index;
