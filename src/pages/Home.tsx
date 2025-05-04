
import { useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import Layout from '../components/Layout';
import HeroSection from '../components/home/HeroSection';
import SpringSaleCarousel from '../components/home/SpringSaleCarousel';
import PackagesSection from '../components/home/PackagesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import ReferralButton from '../components/ReferralButton';
import { useTranslation } from '@/hooks/use-translation';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import ServiceAreasCarousel from '@/components/ServiceAreasCarousel';

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
      <PackagesSection />
      
      {/* Gutter Face Cleaning Information Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Gutter Face Cleaning Tips</h2>
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-1/3">
                <img 
                  src="/lovable-uploads/f899a443-8930-4364-b538-916f65545f84.png" 
                  alt="Gutter Cleaning" 
                  className="rounded-lg w-full h-auto shadow-md"
                />
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-semibold mb-3 text-bc-red">Keep Your Gutters Looking Brand New</h3>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    <strong>Be careful of algae on light-coloured gutters!</strong> Even after cleaning, algae can leave watermarks that are difficult to remove, permanently affecting your gutter's appearance.
                  </p>
                  <p className="text-gray-700">
                    Regular maintenance is key to preserving your gutter's appearance and functionality. We recommend scheduling professional gutter cleaning at least twice a year to prevent buildup and staining.
                  </p>
                  <p className="text-gray-700">
                    Our professional services include thorough gutter face cleaning that removes all traces of algae and prevents watermark formation, keeping your property looking pristine year-round.
                  </p>
                </div>
                <div className="mt-6">
                  <a 
                    href="/calculator" 
                    className="bg-bc-red hover:bg-red-700 text-white px-6 py-3 rounded-md font-medium inline-block transition-all"
                  >
                    Schedule Regular Cleaning
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
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
      
      {/* Service Area Map */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Areas We Service</h2>
          <ServiceAreaMap />
          <ServiceAreasCarousel />
        </div>
      </section>
      
      <ReferralButton />
    </Layout>
  );
};

export default Home;
