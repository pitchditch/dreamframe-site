
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import ServiceSlideshow from '../components/home/ServiceSlideshow';
import PackagesSection from '../components/home/PackagesSection';
import ProcessSection from '../components/home/ProcessSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FeaturedProjectSection from '../components/home/FeaturedProjectSection';
import ReferralButton from '../components/ReferralButton';
import PriceCalculatorForm from '../components/PriceCalculator/PriceCalculatorForm';
import { useTranslation } from '@/hooks/use-translation';
import { MapPin, ArrowRight } from 'lucide-react';

const Index = () => {
  const { setLanguage } = useTranslation();

  useEffect(() => {
    // Ensure English is the default language on initial load
    setLanguage('en');
    
    // Set metadata for SEO
    document.title = "BC Pressure Washing - Professional Cleaning Services in White Rock & Surrey";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Professional pressure washing, window cleaning, and exterior cleaning services for residential and commercial properties in White Rock, Surrey, and Metro Vancouver.');
    }
    
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
    <Layout>
      <HeroSection />
      <ServicesSection />
      <ServiceSlideshow />
      
      {/* New White Rock Featured Location Section */}
      <section className="py-16 bg-bc-gray">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="badge-pill mb-4">Featured Location</div>
              <h2 className="text-3xl font-bold mb-6">White Rock Pressure Washing Experts</h2>
              <p className="text-gray-600 mb-6">
                Based in White Rock, we understand the unique challenges that our coastal climate presents for property maintenance. From salt air corrosion to moss growth, our specialized services are tailored to the specific needs of White Rock homes and businesses.
              </p>
              <div className="flex items-center mb-6">
                <MapPin className="text-bc-red mr-2" />
                <span className="font-medium">Locally owned and operated in White Rock, BC</span>
              </div>
              <Link to="/locations/white-rock">
                <button className="btn-primary">
                  White Rock Services <ArrowRight className="ml-2 inline-block" size={16} />
                </button>
              </Link>
            </div>
            <div>
              <Link to="/locations/white-rock">
                <img 
                  src="/lovable-uploads/9044bb24-865d-4974-8d4a-8807df54ea8c.png" 
                  alt="White Rock Pressure Washing Services" 
                  className="rounded-lg shadow-xl hover:opacity-90 transition-opacity"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <FeaturedProjectSection />
      <PackagesSection />
      <PriceCalculatorForm />
      <ProcessSection />
      <TestimonialsSection />
      <ReferralButton />
    </Layout>
  );
};

export default Index;
