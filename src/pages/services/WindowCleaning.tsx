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
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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

  // your existing benefits, faqs, schemaMarkup...

  return (
    <Layout title="Window Cleaning Surrey, White Rock & Vancouver | BC Pressure Washing"
            description="Professional window cleaning…">
      {/* SEO Schema & slide-up styles */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
        <style>{`
          .content-below-hero { transform: translateY(20px); transition: transform 0.6s ease-out; }
          .content-below-hero.slide-up-active { transform: translateY(0); }
        `}</style>
      </Helmet>

      {/* HERO */}
      <section className="hero-section …">
        {/* retains existing hero markup */}
      </section>

      {/* Main content below hero */}
      <div className="content-below-hero relative z-20 bg-white">
        <WindowCleaningStickyNav activeSection={activeSection} />

        <div id="overview">
          <WhatWeCleanSection />
        </div>

        <div id="how-it-works">{/* your existing two video sections */}</div>

        <WindowCleaningComparisonTable />

        <LocalMediaSection />

        <div id="benefits">
          <ServiceBenefits title="Benefits…" subtitle="Discover why..." benefits={benefits} />
        </div>

        <div id="testimonials">
          <TestimonialsSection />
        </div>

        <div id="faq">
          <FAQSection title="Window Cleaning FAQs"
            subtitle="Expert answers…"
            description="Detailed information…"
            faqs={faqs} />
        </div>

        <MoreServicesSection />

        <div id="get-quote">
          <CallToAction title="Get Your Windows Crystal Clear…"
            subtitle="Contact us now…"
            backgroundImage="/lovable-uploads/...png" />
        </div>
      </div>
    </Layout>
  );
};

export default WindowCleaning;
