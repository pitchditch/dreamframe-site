
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
import LanguageSelector from '@/components/LanguageSelector';
import WindowCleaningSimulator from '@/components/home/WindowCleaningSimulator';
import PropertySpecificSection from '../components/home/PropertySpecificSection';
import SeasonalMaintenanceGuide from '../components/home/SeasonalMaintenanceGuide';
import WeatherService from '../components/WeatherService';

const Index = () => {
  const { language } = useTranslation();

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

    return () => {
      // Clean up
      document.body.classList.remove('has-video-header');
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, [language]);

  const faqItems = [
    {
      question: "What areas do you service?",
      answer: "We are based in White Rock and service the entire Metro Vancouver region, including Surrey, Langley, Delta, Vancouver and surrounding areas."
    },
    {
      question: "Are you fully insured?",
      answer: "Yes, we are fully insured with WCB coverage and liability insurance for your complete peace of mind."
    },
    {
      question: "How often should I have my windows cleaned?",
      answer: "Most homeowners benefit from window cleaning 2-3 times per year, though this varies based on your location, property conditions, and personal preference."
    },
    {
      question: "Do you offer any guarantees?",
      answer: "Absolutely! We offer a 100% satisfaction guarantee. If you're not completely satisfied with our work, we'll come back and make it right at no additional cost."
    },
    {
      question: "How do you price your services?",
      answer: "Our pricing is based on the service requested, property size, accessibility, and specific requirements. We offer free quotes after assessing your property's needs."
    }
  ];

  return (
    <Layout 
      image="/open.png"
      canonicalUrl="/"
      title="BC Pressure Washing - #1 Window & Pressure Washing Services in Surrey & White Rock"
      description="Professional pressure washing, window cleaning, roof & gutter cleaning services in Surrey, White Rock & Metro Vancouver. Family-owned local cleaning experts."
    >
      <Helmet>
        <meta name="keywords" content="pressure washing Surrey, window cleaning White Rock, roof cleaning BC, gutter cleaning services, exterior cleaning, house washing, driveway cleaning, commercial pressure washing" />
      </Helmet>
      
      {/* Position language selector on top right corner */}
      <div className="fixed top-4 right-4 z-[100]">
        <LanguageSelector />
      </div>
      
      <HeroSection />
      
      {/* Weather Service Integration */}
      <WeatherService />
      
      {/* Window Cleaning Simulator */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience Our Window Cleaning</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Try our interactive simulator to see how our professional window cleaning transforms dirty windows
            </p>
          </div>

          <div className="flex justify-center">
            <WindowCleaningSimulator />
          </div>
        </div>
      </section>
      
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
          title="Frequently Asked Questions" 
          subtitle="Everything you need to know about our services"
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
