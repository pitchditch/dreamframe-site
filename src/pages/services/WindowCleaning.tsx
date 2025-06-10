import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import WhatWeCleanSection from '../components/services/window-cleaning/WhatWeCleanSection';
import TestimonialSection from '../components/home/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import CallToAction from '../components/CallToAction';

const WindowCleaning = () => {
  const windowCleaningFAQs = [
    {
      question: "How often should I have my windows cleaned in White Rock?",
      answer: "We recommend having your windows professionally cleaned at least twice a year (spring & fall) to maintain clarity and prevent buildup."
    },
    {
      question: "How do you clean windows without streaks?",
      answer: "We use purified water and biodegradable cleaners, followed by squeegee and microfiber cloths for streak-free results."
    },
    {
      question: "Are your products eco-friendly?",
      answer: "Yes! All soaps are biodegradable and safe for your home, plants, and landscape."
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>White Rock Window Cleaning | BC Pressure Washing</title>
        <meta name="description" content="Expert residential & commercial window cleaning in White Rock, Surrey & Metro Vancouver. Streak-free, eco‑friendly. Fully insured. Call for a free quote!" />
        <meta property="og:title" content="White Rock Window Cleaning | BC Pressure Washing" />
        <meta property="og:description" content="Local family‑owned window cleaning in White Rock & Metro Vancouver — streak‑free, safe, and fully insured." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.bcpressurewashing.ca/services/window-cleaning" />
        <meta property="og:image" content="https://www.bcpressurewashing.ca/images/window-cleaning-hero.jpg" />
        
        {/* LocalBusiness Structured Data */}
        <script type="application/ld+json">{`
          {
            "@context":"https://schema.org",
            "@type":"LocalBusiness",
            "name":"BC Pressure Washing",
            "description":"Professional residential & commercial window cleaning in White Rock, Surrey & Metro Vancouver",
            "telephone":"+1-778-808-7620",
            "email":"bcpressurewashing.ca@gmail.com",
            "address":{
              "@type":"PostalAddress",
              "streetAddress":"5727 179 St #205",
              "addressLocality":"Surrey",
              "addressRegion":"BC",
              "postalCode":"V3S 4B6",
              "addressCountry":"CA"
            },
            "url":"https://www.bcpressurewashing.ca/services/window-cleaning",
            "openingHours":"Mo-Fr 08:00-18:00, Sa 09:00-17:00",
            "priceRange":"$$",
            "areaServed":{"@type":"City","name":"White Rock, BC"},
            "geo":{"@type":"GeoCoordinates","latitude":49.0250,"longitude":-122.8028}
          }
        `}</script>

        {/* FAQPage Structured Data */}
        <script type="application/ld+json">{`
          {
            "@context":"https://schema.org",
            "@type":"FAQPage",
            "mainEntity":[
              {
                "@type":"Question",
                "name":"How often should I have my windows cleaned in White Rock?",
                "acceptedAnswer":{
                  "@type":"Answer",
                  "text":"We recommend having your windows professionally cleaned at least twice a year (spring & fall)."
                }
              },
              {
                "@type":"Question",
                "name":"How do you clean windows without streaks?",
                "acceptedAnswer":{
                  "@type":"Answer",
                  "text":"Using purified water, biodegradable cleaner, squeegee and microfiber cloth technique."
                }
              },
              {
                "@type":"Question",
                "name":"Are your cleaning products eco‑friendly?",
                "acceptedAnswer":{
                  "@type":"Answer",
                  "text":"Yes, all products are biodegradable, plant‑safe, and non-toxic."
                }
              }
            ]
          }
        `}</script>
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage:"url('/lovable-uploads/f7abf414-3ad9-4c10-a077-7cbb8881d937.png')"}}>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Professional White Rock Window Cleaning
          </h1>
          <p className="mt-4 text-xl text-white max-w-2xl mx-auto">
            Streak‑free, eco‑friendly cleaning for homes & businesses — fully insured & locally owned.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
            <Button asChild size="lg" variant="bc-red">
              <Link to="/calculator">Check Prices & Availability</Link>
            </Button>
            <Button asChild size="lg" variant="outline-light">
              <a href="tel:+17788087620">Call Us Now</a>
            </Button>
          </div>
          <p className="mt-4 text-sm text-white">Serving White Rock, Surrey, Langley & Metro Vancouver</p>
        </div>
      </section>

      {/* Mini Pricing Highlight */}
      <section className="bg-gray-100 py-8 w-full">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg font-semibold text-bc-red">
            Window cleaning from <strong>$299</strong> for full home (up to 20 windows) — includes frames & screens!
          </p>
          <p className="text-sm text-gray-600 mt-2">
            No hidden fees. Taxes included. See full pricing under "Check Prices & Availability".
          </p>
        </div>
      </section>

      {/* What We Clean */}
      <WhatWeCleanSection />

      {/* Benefits */}
      <section className="py-16 bg-white w-full">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Window Cleaning Service?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Repeat benefit blocks… */}
            <div className="flex items-start gap-4">
              <div className="bg-bc-red p-2 rounded-full">
                <span className="text-white">✔</span>
              </div>
              <div>
                <h3 className="font-semibold">Purified Water System</h3>
                <p>Deionized water ­— no spots, no streaks, just crystal-clear shine.</p>
              </div>
            </div>
            {/* …other benefits follow */}
          </div>
        </div>
      </section>

      {/* Before/After Placeholder */}
      {/* Add your actual slider or component here */}
      <section className="bg-gray-50 py-16 w-full">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Real Before & After Results</h2>
          <div className="h-64 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">[Your Before/After Slider Here]</span>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 w-full">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Window Cleaning Process</h2>
          {/* Process steps here, matching your current styling */}
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection />

      {/* FAQ */}
      <FAQSection
        title="Frequently Asked Questions"
        description="Expert answers about our White Rock window cleaning service"
        faqs={windowCleaningFAQs}
      />

      {/* Final CTA */}
      <CallToAction
        title="Ready for Crystal‑Clear Windows?"
        subtitle="Get your free quote from our local White Rock & Surrey team today — we respond within minutes!"
        backgroundImage="/lovable-uploads/26f6a625-a200-4106-8f94-579be5c566b6.png"
      />
    </Layout>
  );
};

export default WindowCleaning;
