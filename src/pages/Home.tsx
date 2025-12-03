import { useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import Layout from '../components/Layout';
import HeroSection from '../components/home/HeroSection';
import SpringSaleCarousel from '../components/home/SpringSaleCarousel';
import TestimonialsSection from '../components/home/TestimonialsSection';
import ReferralButton from '../components/ReferralButton';
import { useTranslation } from '@/hooks/use-translation';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import ServiceAreasCarousel from '@/components/ServiceAreasCarousel';
import PremiumSolutionsSection from '../components/home/PremiumSolutionsSection';
import PackagesSection from '../components/home/PackagesSection';
import OwnerOperatedSection from '../components/home/OwnerOperatedSection';
import SatisfactionGuaranteeSection from '../components/home/SatisfactionGuaranteeSection';
import FeaturedProjectSection from '../components/home/FeaturedProjectSection';

const Home = () => {
  // Explicitly getting language related functions to ensure they're available
  const { language, setLanguage } = useTranslation();

  useEffect(() => {
    // We don't force English as default anymore to allow language selection
    // Leave existing preferred language if set
    
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

    // Log current language for debugging
    console.log('Current language on Home page:', language);

    return () => {
      document.body.classList.remove('has-video-header');
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, [language, setLanguage]);

  return (
    <Layout 
      image="/lovable-uploads/5608bf56-7f0e-4f7f-9bb0-5ba81b9d267e.png"
      canonicalUrl="/"
      title="BC Pressure Washing - #1 Window & Pressure Washing Services in Surrey & White Rock"
      description="Professional pressure washing, window cleaning, roof & gutter cleaning services in Surrey, White Rock & Metro Vancouver. Top-rated local cleaning experts. Mention our red car for 10% off!"
    >
      <Helmet>
        <title>BC Pressure Washing - Top-Rated Exterior Cleaning in White Rock & Surrey</title>
        <meta name="description" content="BC Pressure Washing is your local expert for pressure washing, window cleaning, and gutter cleaning in White Rock, Surrey, and Metro Vancouver. Look for our red car around town!" />
        <meta name="keywords" content="BC Pressure Washing, pressure washing White Rock, window cleaning, gutter cleaning, soft washing, exterior cleaning services, red car pressure washing" />
        <meta property="og:image" content="/lovable-uploads/5608bf56-7f0e-4f7f-9bb0-5ba81b9d267e.png" />
        <link rel="canonical" href="https://www.bcpressurewashing.ca/" />
        <meta property="og:title" content="BC Pressure Washing - Local Cleaning Experts" />
        <meta property="og:description" content="Pressure washing, window cleaning, and gutter services from BC Pressure Washing. Seen our red car at the beach? Get 10% off!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.bcpressurewashing.ca/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BC Pressure Washing - Exterior Cleaning Services" />
        <meta name="twitter:description" content="Seen our red BC Pressure Washing car? Get 10% off! Window, gutter, and pressure washing in White Rock & Surrey." />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "name": "BC Pressure Washing",
                "url": "https://www.bcpressurewashing.ca",
                "logo": "https://www.bcpressurewashing.ca/lovable-uploads/5608bf56-7f0e-4f7f-9bb0-5ba81b9d267e.png",
                "sameAs": [
                  "https://www.facebook.com/bcpressurewashing",
                  "https://www.instagram.com/bc.pressure.washing",
                  "https://www.youtube.com/@bc.pressure.washing"
                ]
              },
              {
                "@type": "LocalBusiness",
                "name": "BC Pressure Washing",
                "image": "https://www.bcpressurewashing.ca/lovable-uploads/5608bf56-7f0e-4f7f-9bb0-5ba81b9d267e.png",
                "telephone": "778-808-7620",
                "email": "bcpressurewashing.ca@gmail.com",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Marine Drive",
                  "addressLocality": "White Rock",
                  "addressRegion": "BC",
                  "postalCode": "V4B",
                  "addressCountry": "CA"
                },
                "url": "https://www.bcpressurewashing.ca",
                "sameAs": [
                  "https://www.facebook.com/bcpressurewashing",
                  "https://www.instagram.com/bc.pressure.washing",
                  "https://www.youtube.com/@bc.pressure.washing"
                ],
                "openingHoursSpecification": [
                  {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday"
                    ],
                    "opens": "08:00",
                    "closes": "18:00"
                  }
                ]
              }
            ]
          })}
        </script>
      </Helmet>

      <HeroSection />
      
      <div className="relative z-20 -mt-24 md:-mt-32">
        <div className="bg-white rounded-t-3xl shadow-xl">
          <FeaturedProjectSection />
          <PremiumSolutionsSection />
          {/* Add data-component attribute to help with visibility detection */}
          <div data-component="owner-operated">
            <OwnerOperatedSection />
          </div>
          <SatisfactionGuaranteeSection />
          <SpringSaleCarousel />
          <TestimonialsSection />
          <PackagesSection />

          <section className="py-16 bg-gray-900 text-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">Areas We Service</h2>
              <ServiceAreaMap />
              <ServiceAreasCarousel />
            </div>
          </section>

          <ReferralButton />

          <footer className="text-center text-sm text-gray-500 mt-12">
            <p>BC Pressure Washing · White Rock, BC · 778-808-7620 · bcpressurewashing.ca@gmail.com</p>
            <p>Follow us: 
              <a href="https://www.instagram.com/bc.pressure.washing" target="_blank" rel="noopener noreferrer" className="ml-1 text-blue-400 underline">Instagram</a> | 
              <a href="https://www.youtube.com/@bc.pressure.washing" target="_blank" rel="noopener noreferrer" className="ml-1 text-blue-400 underline">YouTube</a> | 
              <a href="https://www.facebook.com/bcpressurewashing" target="_blank" rel="noopener noreferrer" className="ml-1 text-blue-400 underline">Facebook</a>
            </p>
          </footer>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
