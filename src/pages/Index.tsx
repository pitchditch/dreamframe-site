
import { useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import Layout from '../components/Layout';
import HeroSection from '../components/home/HeroSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import PremiumSolutionsSection from '../components/home/PremiumSolutionsSection';
import ReferralButton from '../components/ReferralButton';
import { useTranslation } from '@/hooks/use-translation';
import FAQSection from '@/components/FAQSection';
import CompetitorComparisonSection from '../components/home/CompetitorComparisonSection';
import SatisfactionGuaranteeSection from '../components/home/SatisfactionGuaranteeSection';
import ServiceAreasSection from '../components/home/ServiceAreasSection';
import TrustedCustomersSection from '../components/home/TrustedCustomersSection';
import FeaturedProjectSection from '../components/home/FeaturedProjectSection';
import PropertySpecificSection from '../components/home/PropertySpecificSection';
import ServiceBanner from '../components/ServiceBanner';
import OwnerOperatedSection from '../components/home/OwnerOperatedSection';

const Index = () => {
  const { language, t } = useTranslation();

  useEffect(() => {
    document.body.classList.add('has-video-header');

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    console.log('Current language on Index page:', language);
    console.log('Translation test:', t("Home"));

    return () => {
      document.body.classList.remove('has-video-header');
      animatedElements.forEach(el => observer.unobserve(el));
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
      title={t("BC Pressure Washing - #1 Window & Pressure Washing Services in Surrey & White Rock")}
      description={t("Professional pressure washing, window cleaning, roof & gutter cleaning services in Surrey, White Rock & Metro Vancouver. Family-owned local cleaning experts.")}
    >
      <Helmet>
        <meta name="keywords" content="pressure washing Surrey, window cleaning White Rock, roof cleaning BC, gutter cleaning services, exterior cleaning, house washing, driveway cleaning, commercial pressure washing" />
      </Helmet>
      
      {/* Hero Section - Fixed position for slide effect with proper z-index */}
      <div className="fixed top-0 left-0 w-full h-screen z-10 overflow-hidden">
        <HeroSection />
      </div>
      
      {/* Content that slides over the hero - Higher z-index to prevent glitching */}
      <div className="relative z-40" style={{ marginTop: '100vh' }}>
        <div className="bg-white rounded-t-3xl shadow-2xl -mt-24 md:-mt-32 min-h-screen relative z-50">
          <ServiceBanner />
          
          <div className="bg-white relative z-50">
            <div data-section="premium-solutions">
              <PremiumSolutionsSection />
            </div>
            
            <FeaturedProjectSection />
            
            <PropertySpecificSection />
            
            <OwnerOperatedSection />
            
            <TrustedCustomersSection />
            <CompetitorComparisonSection />
            <TestimonialsSection />
            
            <SatisfactionGuaranteeSection />
            
            <ServiceAreasSection />
            
            <div data-section="faq">
              <FAQSection 
                title={t("Frequently Asked Questions")} 
                subtitle={t("Everything you need to know about our services")}
                faqs={faqItems}
                darkMode={true}
              />
            </div>
            
            <div className="w-full footer-image">
              <img 
                src="/lovable-uploads/06e9bd14-b601-4e6f-bcd9-01217b067c47.png" 
                alt="White Rock Marine Drive - Local Business" 
                className="w-full h-auto object-cover object-center rounded-t-3xl" 
              />
            </div>
          </div>
        </div>
      </div>
      
      <ReferralButton />
    </Layout>
  );
};

export default Index;
