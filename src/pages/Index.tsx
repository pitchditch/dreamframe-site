
import { useEffect } from 'react';
import Layout from '../components/Layout';
import ReferralButton from '../components/ReferralButton';
import { useTranslation } from '@/hooks/use-translation';
import StickyQuoteBar from '@/components/StickyQuoteBar';
import AfkOverlay from '../components/AfkOverlay';
import SEOContent from '../components/SEOContent';
import HeroWithContent from '../components/HeroWithContent';
import TrustSignalsBanner from '../components/home/TrustSignalsBanner';
import EnhancedServiceGrid from '../components/home/EnhancedServiceGrid';
import ServiceAreasClickable from '../components/home/ServiceAreasClickable';
import NeighborhoodGrid from '../components/neighborhoods/NeighborhoodGrid';
import EnhancedBeforeAfterGallery from '../components/EnhancedBeforeAfterGallery';
import TestimonialsSection from '../components/home/TestimonialsSection';
import PricingCTASection from '../components/home/PricingCTASection';
import QuickContactForm from '../components/home/QuickContactForm';
import ReferralRedCarSection from '../components/home/ReferralRedCarSection';
import CompetitorComparisonSection from '../components/home/CompetitorComparisonSection';
import FAQSection from '../components/FAQSection';
import BlogSection from '../components/blog/BlogSection';
import MobileStickyBar from '../components/mobile/MobileStickyBar';

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
      title="BC Pressure Washing - #1 White Rock, Surrey & Metro Vancouver Exterior Cleaning"
      description="Professional pressure washing, window cleaning & house washing in White Rock, Surrey, Langley & Metro Vancouver. ⭐ 5-Star Local Service | Free Quotes | Same-Day Availability"
    >
      <SEOContent faqItems={faqItems} />
      
      <HeroWithContent>
        <>
          {/* SECTION 1: Trust Signals Banner */}
          <TrustSignalsBanner />
          
          <div className="bg-white relative z-50">
            {/* SECTION 3: What Can We Make Shine Today? (Service Grid) */}
            <EnhancedServiceGrid />
            
            {/* SECTION 2: Areas We Serve (Clickable Cities) */}
            <ServiceAreasClickable />
            
            {/* SECTION 4: Local Expertise Cards (Neighborhood Grid) */}
            <NeighborhoodGrid />
            
            {/* SECTION 5: "See the Difference" – Before/After Gallery */}
            <EnhancedBeforeAfterGallery />
            
            {/* SECTION 6: Testimonials */}
            <TestimonialsSection />
            
            {/* SECTION 7: Pricing CTA Section */}
            <PricingCTASection />
            
            {/* SECTION 8: Contact Form */}
            <QuickContactForm />
            
            {/* SECTION 9: Referral Program & Red Car Bonus */}
            <ReferralRedCarSection />
            
            {/* SECTION 10: Comparison Table */}
            <CompetitorComparisonSection />
            
            {/* SECTION 11: Blog Snippets */}
            <BlogSection />
            
            {/* FAQ Section */}
            <div data-section="faq" className="w-full">
              <FAQSection 
                title={t("Still Have Questions?")} 
                subtitle={t("Everything you need to know about our services")}
                faqs={faqItems}
                darkMode={true}
                fullWidth={true}
                largeButtons={true}
              />
            </div>
            
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
      <MobileStickyBar />
      <AfkOverlay />
    </Layout>
  );
};

export default Index;
