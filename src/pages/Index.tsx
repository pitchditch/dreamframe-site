
import { useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import Layout from '../components/Layout';
import HeroSection from '../components/home/HeroSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import PremiumSolutionsSection from '../components/home/PremiumSolutionsSection';
import ReferralButton from '../components/ReferralButton';
import { useTranslation } from '@/hooks/use-translation';
import ScreenCleaningSection from '../components/post-construction/ScreenCleaningSection';
import FAQSection from '@/components/FAQSection';
import OwnerOperatedSection from '../components/home/OwnerOperatedSection';
import CompetitorComparisonSection from '../components/home/CompetitorComparisonSection';
import SatisfactionGuaranteeSection from '../components/home/SatisfactionGuaranteeSection';
import ServiceAreasSection from '../components/home/ServiceAreasSection';
import TrustedCustomersSection from '../components/home/TrustedCustomersSection';
import FounderSection from '../components/home/FounderSection';
import FeaturedProjectSection from '../components/home/FeaturedProjectSection';
import CTABanner from '../components/home/CTABanner';
import CombinedSimulatorsSection from '@/components/CombinedSimulatorsSection';
import PropertySpecificSection from '../components/home/PropertySpecificSection';
import SeasonalMaintenanceGuide from '../components/home/SeasonalMaintenanceGuide';
import WeatherService from '../components/WeatherService';

const Index = () => {
  const { language, t } = useTranslation();

  useEffect(() => {
    // Mark body to have video header (for navbar transparency)
    document.body.classList.add('has-video-header');

    // Animation for elements when they enter viewport
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

    // Log current language for debugging
    console.log('Current language on Index page:', language);
    console.log('Translation test:', t("Home"));

    return () => {
      // Clean up
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
      image="/open.png"
      canonicalUrl="/"
      title={t("BC Pressure Washing - #1 Window & Pressure Washing Services in Surrey & White Rock")}
      description={t("Professional pressure washing, window cleaning, roof & gutter cleaning services in Surrey, White Rock & Metro Vancouver. Family-owned local cleaning experts.")}
    >
      <Helmet>
        <meta name="keywords" content="pressure washing Surrey, window cleaning White Rock, roof cleaning BC, gutter cleaning services, exterior cleaning, house washing, driveway cleaning, commercial pressure washing" />
      </Helmet>
      
      <HeroSection />
      
      {/* Weather Service Integration */}
      <WeatherService />
      
      {/* Combined Simulators Section */}
      <CombinedSimulatorsSection />
      
      <div className="bg-white">
        <PremiumSolutionsSection />
        <FeaturedProjectSection />
        
        {/* Add property-specific section */}
        <PropertySpecificSection />
        
        {/* Add seasonal maintenance guide */}
        <SeasonalMaintenanceGuide />
        
        <ScreenCleaningSection />
        <div data-component="owner-operated">
          <OwnerOperatedSection />
        </div>
        <FounderSection />
        <TrustedCustomersSection />
        <CompetitorComparisonSection />
        <TestimonialsSection />
        <SatisfactionGuaranteeSection />
        <FAQSection 
          title={t("Frequently Asked Questions")} 
          subtitle={t("Everything you need to know about our services")}
          faqs={faqItems}
          darkMode={true}
        />
        <ServiceAreasSection />
        
        {/* Add padding at the bottom to ensure content isn't hidden behind the fixed CTA banner */}
        <div className="h-20"></div>
      </div>
      
      <CTABanner />
      <ReferralButton />
    </Layout>
  );
};

export default Index;
