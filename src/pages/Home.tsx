import { useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import Layout from '../components/Layout';
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import SpringSaleCarousel from '../components/home/SpringSaleCarousel';
import PackagesSection from '../components/home/PackagesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import ReferralButton from '../components/ReferralButton';
import { useTranslation } from '@/hooks/use-translation';
import LocationBanner from '@/components/LocationBanner';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import FAQSection from '@/components/FAQSection';

const Home = () => {
  const { setLanguage } = useTranslation();

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

    return () => {
      // Clean up
      document.body.classList.remove('has-video-header');
      animatedElements.forEach(el => observer.unobserve(el));
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
    }
  ];

  return (
    <Layout image="/open.png">
      <Helmet>
        <title>BC Pressure Washing - #1 Window & Pressure Washing Services in Surrey & White Rock</title>
        <meta name="description" content="Professional pressure washing, window cleaning, roof & gutter cleaning services in Surrey, White Rock & Metro Vancouver. Top-rated local cleaning experts." />
        <meta name="keywords" content="pressure washing Surrey, window cleaning White Rock, roof cleaning BC, gutter cleaning services, exterior cleaning, house washing, driveway cleaning, commercial pressure washing" />
        <meta property="og:image" content="/open.png" />
      </Helmet>
      
      <HeroSection />
      <SpringSaleCarousel />
      <TestimonialsSection />
      <ServicesSection />
      <PackagesSection />
      
      {/* Full Width Contact Section */}
      <section className="relative py-20">
        <div className="absolute inset-0">
          <img 
            src="/lovable-uploads/deea00c1-1c27-44fd-b409-09d0f3ff0afa.png"
            alt="Contact Us Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Contact Us Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Ready to transform your property? Get in touch for a free, no-obligation quote.
          </p>
          <div className="flex justify-center gap-4">
            <a href="tel:7788087620" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold transition-all">
              Call Now: 778-808-7620
            </a>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <FAQSection 
        title="Frequently Asked Questions" 
        subtitle="Find answers to common questions about our services"
        faqs={faqItems}
      />
      
      {/* Location Banner */}
      <LocationBanner />
      
      {/* Service Area Map */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Areas We Service</h2>
          <ServiceAreaMap />
        </div>
      </section>
      
      <ReferralButton />
    </Layout>
  );
};

export default Home;
