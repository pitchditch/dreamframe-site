import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '../../components/Layout';
import CallToAction from '../../components/CallToAction';
import FAQSection from '../../components/FAQSection';
import ServiceBenefits from '../../components/ServiceBenefits';
import WindowCleaningQuoteOverlay from '../../components/forms/WindowCleaningQuoteOverlay';
import WhatWeCleanSection from '../../components/services/window-cleaning/WhatWeCleanSection';
import WindowCleaningComparisonTable from '../../components/services/window-cleaning/WindowCleaningComparisonTable';
import WindowCleaningStickyNav from '../../components/services/window-cleaning/WindowCleaningStickyNav';
import LocalMediaSection from '../../components/services/window-cleaning/LocalMediaSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import MoreServicesSection from '@/components/MoreServicesSection';

const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "BC Pressure Washing",
  "image": "https://bcpressurewashing.ca/logo.png",
  "url": "https://bcpressurewashing.ca/services/window-cleaning",
  "telephone": "+1-778-808-7620",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "White Rock, BC",
    "addressLocality": "White Rock",
    "addressRegion": "BC",
    "postalCode": "V4B",
    "addressCountry": "CA"
  },
  "description": "Residential window cleaning services in White Rock, BC and South Surrey. Streak-free results using pure-water technology. Get a quote today!",
  "areaServed": {
    "@type": "Place",
    "name": "White Rock, South Surrey, Vancouver"
  },
  "sameAs": [
    "https://www.facebook.com/bcpressurewashing",
    "https://www.instagram.com/bcpressurewashing"
  ]
};

const benefits = [
  // your benefits array here
];

const faqs = [
  // your FAQs array here
];

const WindowCleaning = () => {
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'how-it-works', 'benefits', 'testimonials', 'faq'];
      const scrollPosition = window.scrollY + 200;
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el && scrollPosition >= el.offsetTop && scrollPosition < el.offsetTop + el.offsetHeight) {
          setActiveSection(sec);
          break;
        }
      }

      const heroHeight = document.querySelector('.hero-section')?.clientHeight || 0;
      const content = document.querySelector('.content-below-hero');
      if (content) {
        if (window.scrollY > heroHeight * 0.7) content.classList.add('slide-up-active');
        else content.classList.remove('slide-up-active');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Layout
      title="Residential Window Cleaning White Rock, BC | BC Pressure Washing"
      description="Professional residential window cleaning in White Rock, South Surrey & Vancouver. Using purified water-fed pole systems for safe, streak-free shine. Book a free quote today.">
      
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
        <style>{`
          .content-below-hero {
            transform: translateY(20px);
            transition: transform 0.6s ease-out;
          }
          .content-below-hero.slide-up-active {
            transform: translateY(0);
          }
        `}</style>
      </Helmet>

      {/* HERO */}
      <section className="hero-section bg-cover bg-center
