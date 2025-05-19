
import { useEffect, useRef } from 'react';
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

const Index = () => {
  const { setLanguage } = useTranslation();
  const solutionsSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure English is the default language on initial load
    setLanguage('en');

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

    // Setup scroll listener for premium solutions overlap effect with improved performance
    const handleScroll = () => {
      if (solutionsSectionRef.current) {
        const scrollPosition = window.scrollY;
        const heroHeight = window.innerHeight * 0.8; // 80% of viewport height for more overlap
        
        // Apply transform only when necessary to avoid layout thrashing
        if (scrollPosition < heroHeight) {
          // Calculate translateY with a smoother curve
          const translateYValue = Math.max(0, (heroHeight - scrollPosition) * 0.8);
          
          // Using requestAnimationFrame for smoother animation
          window.requestAnimationFrame(() => {
            if (solutionsSectionRef.current) {
              solutionsSectionRef.current.style.transform = `translateY(-${translateYValue}px)`;
            }
          });
        } else if (scrollPosition >= heroHeight) {
          // Snap to final position when scrolled past the hero
          solutionsSectionRef.current.style.transform = 'translateY(0)';
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Run once on load to set initial position
    handleScroll();

    return () => {
      // Clean up
      document.body.classList.remove('has-video-header');
      animatedElements.forEach(el => observer.unobserve(el));
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setLanguage]);

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
      
      <HeroSection />
      
      {/* Premium Solutions section with the slide-up overlap effect */}
      <div ref={solutionsSectionRef} className="relative z-20 transition-transform duration-300 will-change-transform" style={{ marginTop: '-6rem' }}>
        <div className="bg-white rounded-t-3xl shadow-xl">
          <PremiumSolutionsSection />
          <FeaturedProjectSection />
          <ScreenCleaningSection />
          <OwnerOperatedSection />
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
        </div>
      </div>
      <CTABanner />
      <ReferralButton />
    </Layout>
  );
};

export default Index;
