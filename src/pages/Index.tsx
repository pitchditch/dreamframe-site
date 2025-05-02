
import { useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import Layout from '../components/Layout';
import HeroSection from '../components/home/HeroSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import ServicesSection from '../components/home/ServicesSection';
import PremiumSolutionsSection from '../components/home/PremiumSolutionsSection';
import ReferralButton from '../components/ReferralButton';
import { useTranslation } from '@/hooks/use-translation';
import { Shield, Award, ThumbsUp, Clock, Check } from 'lucide-react';
import LocationBanner from '@/components/LocationBanner';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import TrustedCustomersSection from '../components/home/TrustedCustomersSection';

const Index = () => {
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
      <div className="relative z-20 -mt-32 bg-white pt-32 rounded-t-[50px] shadow-lg">
        <PremiumSolutionsSection />
        
        {/* Owner Operated Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl font-bold mb-6">Owner-Operated Excellence</h2>
                <p className="text-lg text-gray-700 mb-8">
                  As the owner of BC Pressure Washing, I personally oversee every project to ensure the highest standards of quality and customer satisfaction. When you choose us, you're working directly with the business owner who takes pride in delivering exceptional results.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-start">
                    <Shield className="text-bc-red mr-3 mt-1" size={24} />
                    <div>
                      <h3 className="font-bold mb-1">Fully Insured</h3>
                      <p className="text-sm text-gray-600">WCB & liability insurance protection for your complete peace of mind.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Award className="text-bc-red mr-3 mt-1" size={24} />
                    <div>
                      <h3 className="font-bold mb-1">5-Star Rated</h3>
                      <p className="text-sm text-gray-600">Our service excellence is reflected in our customer reviews.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <ThumbsUp className="text-bc-red mr-3 mt-1" size={24} />
                    <div>
                      <h3 className="font-bold mb-1">Satisfaction Guaranteed</h3>
                      <p className="text-sm text-gray-600">We're not happy until you're completely satisfied with our work.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="text-bc-red mr-3 mt-1" size={24} />
                    <div>
                      <h3 className="font-bold mb-1">Prompt & Reliable</h3>
                      <p className="text-sm text-gray-600">We show up when scheduled and complete work efficiently.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2 flex justify-center">
                <div className="rounded-full border-4 border-white shadow-xl overflow-hidden w-64 h-64">
                  <img src="/lovable-uploads/10e953e1-c5f0-4899-a3b7-944cf15bca76.png" alt="Jayden Fisher - Owner of BC Pressure Washing" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <TrustedCustomersSection />
        
        {/* Why Homeowners Trust Us Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Why Surrey Homeowners Trust Us More Than Shackshine or Men In Kilts</h2>
              <p className="text-gray-600">
                When it comes to exterior cleaning services, BC Pressure Washing stands above the competition with our personalized service, competitive pricing, and exceptional results.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="bg-gray-50 rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-bc-red rounded-full">
                  <Shield className="text-white" size={32} />
                </div>
                <h3 className="font-bold mb-2">Owner Operated</h3>
                <p className="text-sm text-gray-600">Not a franchise - get personal attention from the business owner</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-blue-500 rounded-full">
                  <Award className="text-white" size={32} />
                </div>
                <h3 className="font-bold mb-2">Better Value</h3>
                <p className="text-sm text-gray-600">Competitive pricing without franchise fees or corporate overhead</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-green-500 rounded-full">
                  <ThumbsUp className="text-white" size={32} />
                </div>
                <h3 className="font-bold mb-2">Superior Results</h3>
                <p className="text-sm text-gray-600">Professional-grade equipment and personalized attention to detail</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-purple-500 rounded-full">
                  <Clock className="text-white" size={32} />
                </div>
                <h3 className="font-bold mb-2">Local Knowledge</h3>
                <p className="text-sm text-gray-600">Deep understanding of Surrey & White Rock conditions and properties</p>
              </div>
            </div>
          </div>
        </section>
        
        <ServicesSection />
        <TestimonialsSection />
      </div>
      
      {/* 100% Satisfaction Guarantee Section (improved) */}
      <section className="py-16 bg-gradient-to-r from-bc-red/90 to-red-700/90 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 z-10 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 drop-shadow-md">100% Satisfaction Guarantee</h2>
            <div className="flex items-center justify-center mb-8">
              <div className="w-24 h-24 rounded-full bg-white/90 flex items-center justify-center shadow-xl">
                <Check className="text-bc-red" size={48} />
              </div>
            </div>
            <p className="text-xl mb-8 drop-shadow">
              If you're not completely satisfied with our work, we'll come back and make it right at no additional cost to you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
              <a href="tel:7788087620" className="transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 bg-white text-bc-red px-8 py-4 rounded-lg text-lg font-bold shadow-lg">
                Call Now: 778-808-7620
              </a>
              <div className="flex items-center text-lg bg-black/20 p-3 rounded-lg">
                <ThumbsUp className="mr-2" size={24} />
                <span>Trusted by 1000+ Homeowners</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
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

export default Index;
