
import { useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import Layout from '../components/Layout';
import HeroWithContent from '../components/HeroWithContent';
import ServiceAreasCarousel from '@/components/ServiceAreasCarousel';
import TestimonialsSection from '../components/home/TestimonialsSection';
import ReferralButton from '../components/ReferralButton';
import { useTranslation } from '@/hooks/use-translation';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import CityNavigation from '../components/home/CityNavigation';
import ServiceSelectionSection from '../components/home/ServiceSelectionSection';
import BeforeAfterGallery from '../components/BeforeAfterGallery';
import RedCarSection from '../components/home/RedCarSection';
import TrustedCustomersSection from '../components/home/TrustedCustomersSection';
import ReferralProgramSection from '../components/ReferralProgramSection';

const Home = () => {
  const { language, setLanguage } = useTranslation();

  useEffect(() => {
    console.log('Current language on Home page:', language);
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
          {`
          {
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
          }
          `}
        </script>
      </Helmet>

      <HeroWithContent>
        {/* Service Locations */}
        <CityNavigation />
        
        {/* Service Selection */}
        <ServiceSelectionSection />
        
        {/* Before/After Gallery */}
        <BeforeAfterGallery />
        
        {/* Testimonials */}
        <TestimonialsSection />
        
        {/* Red Car Section */}
        <RedCarSection />
        
        {/* Trusted Customers */}
        <TrustedCustomersSection />
        
        {/* Referral Program */}
        <ReferralProgramSection />

        {/* Service Areas */}
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
      </HeroWithContent>
    </Layout>
  );
};

export default Home;
