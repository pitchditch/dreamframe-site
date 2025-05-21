
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
import BeforeAfterSection from '@/components/home/BeforeAfterSection';
import TrustBadges from '@/components/TrustBadges';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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
      
      <div className="bg-white">
        <PremiumSolutionsSection />
        
        {/* Add the new Before/After Section */}
        <BeforeAfterSection />
        
        <div className="py-16 container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Why Choose BC Pressure Washing?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              We're committed to providing exceptional service with guaranteed results
            </p>
          </div>
          <TrustBadges />
        </div>
        
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-8">Our Enhanced Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4">Compare Services</h3>
              <p className="text-gray-600 mb-6">Find the right service package for your needs and budget with our comparison tool.</p>
              <Button asChild variant="outline" className="border-bc-red text-bc-red hover:bg-bc-red hover:text-white">
                <Link to="/service-comparison">Compare Options</Link>
              </Button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4">Book Online</h3>
              <p className="text-gray-600 mb-6">Schedule your service at your convenience with our easy online booking system.</p>
              <Button asChild variant="outline" className="border-bc-red text-bc-red hover:bg-bc-red hover:text-white">
                <Link to="/online-booking">Book Now</Link>
              </Button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4">Refer & Earn</h3>
              <p className="text-gray-600 mb-6">Refer friends and family to earn rewards and discounts on future services.</p>
              <Button asChild variant="outline" className="border-bc-red text-bc-red hover:bg-bc-red hover:text-white">
                <Link to="/referrals">Earn Rewards</Link>
              </Button>
            </div>
          </div>
        </div>
        
        <FeaturedProjectSection />
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
