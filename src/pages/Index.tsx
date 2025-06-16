
import { useEffect, useState } from 'react';
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
import HowWeCompleteJobsSection from '../components/home/HowWeCompleteJobsSection';
import DoorToDoorSection from '../components/home/DoorToDoorSection';
import QuickContactForm from '../components/home/QuickContactForm';
import ServiceSelectionSection from '../components/home/ServiceSelectionSection';
import AfkOverlay from '../components/AfkOverlay';
import BeforeAfterGallery from '@/components/BeforeAfterGallery';
import EnhancedBeforeAfterGallery from '@/components/EnhancedBeforeAfterGallery';
import TrustBadgesSection from '@/components/TrustBadgesSection';
import StickyQuoteBar from '@/components/StickyQuoteBar';
import ReferralProgramSection from '@/components/ReferralProgramSection';

const Index = () => {
  const { language, t } = useTranslation();
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  // City-specific SEO data
  const cityKeywords = [
    "White Rock", "Surrey", "South Surrey", "Langley", "Delta", "Richmond", 
    "Vancouver", "Burnaby", "Coquitlam", "Port Moody", "New Westminster",
    "North Vancouver", "West Vancouver", "Tsawwassen", "Ladner"
  ];

  const serviceKeywords = [
    "pressure washing", "window cleaning", "house washing", "roof cleaning", 
    "gutter cleaning", "exterior cleaning", "power washing", "soft washing"
  ];

  // Generate comprehensive keywords for SEO
  const generateSEOKeywords = () => {
    const combinations = [];
    cityKeywords.forEach(city => {
      serviceKeywords.forEach(service => {
        combinations.push(`${service} ${city}`);
        combinations.push(`${city} ${service}`);
      });
    });
    return combinations.join(', ');
  };

  const metaKeywords = generateSEOKeywords();

  useEffect(() => {
    document.body.classList.add('has-video-header');

    // Wait for hero to load before showing content
    const heroLoadTimer = setTimeout(() => {
      setHeroLoaded(true);
      // Small delay to ensure smooth transition
      setTimeout(() => setContentVisible(true), 300);
    }, 1000);

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && contentVisible) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Only observe elements after content is visible
    if (contentVisible) {
      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      animatedElements.forEach(el => observer.observe(el));
    }

    console.log('Current language on Index page:', language);
    console.log('Translation test:', t("Home"));

    return () => {
      document.body.classList.remove('has-video-header');
      clearTimeout(heroLoadTimer);
      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, [language, t, contentVisible]);

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
      title="BC Pressure Washing - #1 White Rock, Surrey & Metro Vancouver Exterior Cleaning"
      description="Professional pressure washing, window cleaning & house washing in White Rock, Surrey, Langley & Metro Vancouver. ⭐ 5-Star Local Service | Free Quotes | Same-Day Availability"
    >
      <Helmet>
        {/* Enhanced city-specific keywords */}
        <meta 
          name="keywords" 
          content={metaKeywords}
        />
        
        {/* Additional location-specific meta tags */}
        <meta name="geo.region" content="CA-BC" />
        <meta name="geo.placename" content="White Rock, Surrey, Metro Vancouver" />
        <meta name="ICBM" content="49.0158, -122.8058" />
        
        {/* Enhanced LocalBusiness schema with comprehensive city coverage */}
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "BC Pressure Washing",
            "description": "Professional exterior cleaning services including pressure washing, window cleaning, house washing, roof & gutter cleaning serving White Rock, Surrey, Langley, Delta, Richmond, Vancouver, Burnaby, Coquitlam and all Metro Vancouver communities.",
            "url": "https://bcpressurewashing.ca",
            "telephone": "(778) 808-7620",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "1-15501 Marine Drive",
              "addressLocality": "White Rock",
              "addressRegion": "BC",
              "postalCode": "V4B 1C9",
              "addressCountry": "CA"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "49.0158",
              "longitude": "-122.8058"
            },
            "areaServed": [
              {
                "@type": "City",
                "name": "White Rock",
                "addressRegion": "BC",
                "addressCountry": "CA"
              },
              {
                "@type": "City", 
                "name": "Surrey",
                "addressRegion": "BC",
                "addressCountry": "CA"
              },
              {
                "@type": "City",
                "name": "South Surrey", 
                "addressRegion": "BC",
                "addressCountry": "CA"
              },
              {
                "@type": "City",
                "name": "Langley",
                "addressRegion": "BC", 
                "addressCountry": "CA"
              },
              {
                "@type": "City",
                "name": "Delta",
                "addressRegion": "BC",
                "addressCountry": "CA"
              },
              {
                "@type": "City",
                "name": "Richmond",
                "addressRegion": "BC",
                "addressCountry": "CA"
              },
              {
                "@type": "City",
                "name": "Vancouver",
                "addressRegion": "BC",
                "addressCountry": "CA"
              },
              {
                "@type": "City",
                "name": "Burnaby",
                "addressRegion": "BC",
                "addressCountry": "CA"
              },
              {
                "@type": "City",
                "name": "Coquitlam",
                "addressRegion": "BC",
                "addressCountry": "CA"
              },
              {
                "@type": "City",
                "name": "Port Moody",
                "addressRegion": "BC",
                "addressCountry": "CA"
              }
            ],
            "image": [
              "https://bcpressurewashing.ca/lovable-uploads/5608bf56-7f0e-4f7f-9bb0-5ba81b9d267e.png",
              "https://bcpressurewashing.ca/lovable-uploads/06e9bd14-b601-4e6f-bcd9-01217b067c47.png"
            ],
            "serviceType": [
              "Pressure Washing White Rock",
              "Window Cleaning Surrey", 
              "House Washing Langley",
              "Roof Cleaning Delta",
              "Gutter Cleaning Richmond",
              "Exterior Cleaning Vancouver"
            ],
            "priceRange": "$$",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5.0",
              "reviewCount": "100+"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Exterior Cleaning Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Pressure Washing",
                    "description": "Professional pressure washing for driveways, decks, and exterior surfaces"
                  }
                },
                {
                  "@type": "Offer", 
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Window Cleaning",
                    "description": "Interior and exterior window cleaning for residential and commercial properties"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service", 
                    "name": "House Washing",
                    "description": "Soft washing and pressure washing for home exteriors"
                  }
                }
              ]
            }
          })}} 
        />

        {/* FAQ Schema for local SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqItems.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}}
        />
      </Helmet>
      
      {/* 1. Hero Section with Video + Price Calculator */}
      <div className="fixed top-0 left-0 w-full h-screen z-10 overflow-hidden">
        <HeroSection />
      </div>
      
      {/* Loading overlay */}
      {!heroLoaded && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      )}
      
      {/* Content that slides over the hero */}
      <div 
        className={`relative z-40 transition-opacity duration-500 ${
          contentVisible ? 'opacity-100' : 'opacity-0'
        }`} 
        style={{ marginTop: '100vh' }}
      >
        <div className="bg-white rounded-t-3xl shadow-2xl -mt-24 md:-mt-32 min-h-screen relative z-50">
          <ServiceBanner />
          
          {/* 2. What Do You Need Pressure Washed */}
          <div className="bg-white relative z-50">
            <ServiceSelectionSection />
          </div>
          
          <div className="bg-white relative z-50">
            {/* 3. Enhanced Before/After Gallery with filtering */}
            <EnhancedBeforeAfterGallery />
            
            {/* 4. Trust Badges Section */}
            <TrustBadgesSection />
            
            {/* 5. Contact Form */}
            <QuickContactForm />
            
            {/* 6. How We Complete Our Jobs */}
            <HowWeCompleteJobsSection />
            
            {/* 7. Featured Project */}
            <FeaturedProjectSection />
            
            {/* 8. Testimonials - Moved higher for social proof */}
            <TestimonialsSection />
            
            {/* 9. Merged Property Types + Trust Elements */}
            <PropertySpecificSection />
            <OwnerOperatedSection />
            
            {/* 10. Trusted Customers Slideshow */}
            <TrustedCustomersSection />
            
            {/* 11. Referral Program Section - New prominent placement */}
            <ReferralProgramSection />
            
            {/* 12. Competitor Comparison */}
            <CompetitorComparisonSection />
            
            {/* 13. FAQ Section */}
            <div data-section="faq">
              <FAQSection 
                title={t("Frequently Asked Questions")} 
                subtitle={t("Everything you need to know about our services")}
                faqs={faqItems}
                darkMode={true}
              />
            </div>
            
            {/* 14. White Rock Footer Image */}
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
      <StickyQuoteBar />
      <AfkOverlay />
    </Layout>
  );
};

export default Index;
