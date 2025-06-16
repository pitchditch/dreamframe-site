
import ServiceBanner from './ServiceBanner';
import ServiceSelectionSection from './home/ServiceSelectionSection';
import EnhancedBeforeAfterGallery from './EnhancedBeforeAfterGallery';
import TrustBadgesSection from './TrustBadgesSection';
import QuickContactForm from './home/QuickContactForm';
import HowWeCompleteJobsSection from './home/HowWeCompleteJobsSection';
import FeaturedProjectSection from './home/FeaturedProjectSection';
import TestimonialsSection from './home/TestimonialsSection';
import PropertySpecificSection from './home/PropertySpecificSection';
import OwnerOperatedSection from './home/OwnerOperatedSection';
import TrustedCustomersSection from './home/TrustedCustomersSection';
import SoftWashingVsPressureSection from './home/SoftWashingVsPressureSection';
import ReferralProgramSection from './ReferralProgramSection';
import CompetitorComparisonSection from './home/CompetitorComparisonSection';
import FAQSection from './FAQSection';
import { useTranslation } from '@/hooks/use-translation';

interface MainContentSectionsProps {
  faqItems: Array<{
    question: string;
    answer: string;
  }>;
}

const MainContentSections = ({ faqItems }: MainContentSectionsProps) => {
  const { t } = useTranslation();

  return (
    <>
      <ServiceBanner />
      
      {/* What Do You Need Pressure Washed */}
      <div className="bg-white relative z-50">
        <ServiceSelectionSection />
      </div>
      
      <div className="bg-white relative z-50">
        {/* Enhanced Before/After Gallery with filtering */}
        <EnhancedBeforeAfterGallery />
        
        {/* Trust Badges Section */}
        <TrustBadgesSection />
        
        {/* Contact Form */}
        <QuickContactForm />
        
        {/* How We Complete Our Jobs */}
        <HowWeCompleteJobsSection />
        
        {/* Featured Project */}
        <FeaturedProjectSection />
        
        {/* Testimonials - Moved higher for social proof */}
        <TestimonialsSection />
        
        {/* Merged Property Types + Trust Elements */}
        <PropertySpecificSection />
        <OwnerOperatedSection />
        
        {/* Trusted Customers Slideshow */}
        <TrustedCustomersSection />
        
        {/* Soft Washing vs Pressure Washing Section */}
        <SoftWashingVsPressureSection />
        
        {/* Referral Program Section - New prominent placement */}
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
  );
};

export default MainContentSections;
