
import { useEffect } from 'react';
import Layout from '../components/Layout';
import ReferralButton from '../components/ReferralButton';
import { useTranslation } from '@/hooks/use-translation';
import StickyQuoteBar from '@/components/StickyQuoteBar';
import AfkOverlay from '../components/AfkOverlay';
import SEOContent from '../components/SEOContent';
import HeroWithContent from '../components/HeroWithContent';
import MainContentSections from '../components/MainContentSections';

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
        <MainContentSections faqItems={faqItems} />
      </HeroWithContent>
      
      <ReferralButton />
      <StickyQuoteBar />
      <AfkOverlay />
    </Layout>
  );
};

export default Index;
