
import { useEffect, useRef } from 'react';
import { Helmet } from "react-helmet-async";
import Layout from '../components/Layout';
import HeroSection from '../components/home/HeroSection';
import FounderSection from '../components/home/FounderSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import ServicesSection from '../components/home/ServicesSection';
import ServiceAreaMap from '../components/ServiceAreaMap';
import ReferralButton from '../components/ReferralButton';
import { useTranslation } from '@/hooks/use-translation';

const Index = () => {
  const { setLanguage } = useTranslation();
  const overlayRef = useRef<HTMLDivElement>(null);

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

    // Scroll effect for the hero section
    const handleScroll = () => {
      if (overlayRef.current) {
        const scrollPosition = window.scrollY;
        if (scrollPosition < window.innerHeight) {
          const opacity = Math.min(0.9, scrollPosition / window.innerHeight * 1.5);
          overlayRef.current.style.opacity = opacity.toString();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      // Clean up
      document.body.classList.remove('has-video-header');
      animatedElements.forEach(el => observer.unobserve(el));
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setLanguage]);

  return (
    <Layout image="/open.png">
      <Helmet>
        <title>BC Pressure Washing - #1 Window & Pressure Washing Services in Surrey & White Rock</title>
        <meta name="description" content="Professional pressure washing, window cleaning, roof & gutter cleaning services in Surrey, White Rock & Metro Vancouver. Top-rated local cleaning experts." />
        <meta name="keywords" content="pressure washing Surrey, window cleaning White Rock, roof cleaning BC, gutter cleaning services, exterior cleaning, house washing, driveway cleaning, commercial pressure washing" />
        <meta property="og:image" content="/open.png" />
        <style>{`
          .hero-section {
            height: 100vh;
            position: relative;
          }
          .text-shadow-lg {
            text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
          }
          .content-overlay {
            position: relative;
            z-index: 10;
          }
          .parallax-hero {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            z-index: -1;
          }
          .scroll-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background-color: #fff;
            z-index: -1;
            opacity: 0;
            transition: opacity 0.1s ease;
          }
        `}</style>
      </Helmet>
      
      <div className="parallax-hero">
        <HeroSection />
        <div ref={overlayRef} className="scroll-overlay"></div>
      </div>
      
      <div className="content-overlay pt-[100vh]">
        <FounderSection />
        <TestimonialsSection />
        <ServicesSection />
        <ServiceAreaMap />
      </div>
      
      <ReferralButton />
    </Layout>
  );
};

export default Index;
