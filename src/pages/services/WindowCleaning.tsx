
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
    // Add scroll behavior for hero section slide effect
    const handleScroll = () => {
      const sections = ['overview', 'how-it-works', 'benefits', 'testimonials', 'faq'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element as HTMLElement;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }

      // Add slide-up effect for content below hero
      const heroSection = document.querySelector('.hero-section') as HTMLElement;
      const contentBelow = document.querySelector('.content-below-hero') as HTMLElement;
      
      if (heroSection && contentBelow) {
        const heroHeight = heroSection.offsetHeight;
        const scrollY = window.scrollY;
        
        if (scrollY > heroHeight * 0.7) {
          contentBelow.classList.add('slide-up-active');
        } else {
          contentBelow.classList.remove('slide-up-active');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const benefits = [
    {
      title: "Crystal Clear Views",
      description: "Enjoy unobstructed views with our streak-free cleaning technology using purified water systems."
    },
    {
      title: "Extended Window Life",
      description: "Regular cleaning prevents buildup of corrosive elements that can permanently damage glass surfaces."
    },
    {
      title: "Enhanced Curb Appeal",
      description: "Clean windows dramatically improve your property's appearance and make a great first impression."
    },
    {
      title: "Natural Light Maximization",
      description: "Clean windows allow up to 30% more natural light into your home, reducing energy costs."
    },
    {
      title: "Professional Equipment",
      description: "We use commercial-grade squeegees, pure water systems, and eco-friendly cleaning solutions."
    },
    {
      title: "Safety First",
      description: "Our insured technicians use proper safety equipment and techniques for all window cleaning jobs."
    }
  ];

  const faqs = [
    {
      question: "How often should I have my windows cleaned in Surrey?",
      answer: "For residential properties in Surrey and White Rock, we recommend quarterly cleanings (4 times per year). Commercial properties may benefit from monthly or bi-monthly service depending on location and foot traffic.",
      category: "Frequency & Scheduling"
    },
    {
      question: "Do you clean windows in winter in Metro Vancouver?",
      answer: "Yes, we provide window cleaning services year-round throughout Surrey, White Rock, and Greater Vancouver. However, we may reschedule appointments during severe weather conditions for safety reasons.",
      category: "Scheduling"
    },
    {
      question: "What's included in your Surrey window cleaning service?",
      answer: "Our standard service includes cleaning both interior and exterior window surfaces, sills, and frames. We also remove screens when necessary and clean them separately. For an additional fee, we can clean gutters and pressure wash exterior surfaces.",
      category: "Service Details"
    },
    {
      question: "Are you insured for window cleaning in White Rock?",
      answer: "Yes, we are fully insured with general liability and workers' compensation insurance for all our services in Surrey, White Rock, and Metro Vancouver. We can provide proof of insurance upon request.",
      category: "Insurance & Safety"
    },
    {
      question: "What if it rains after you clean my windows in Vancouver?",
      answer: "Rain actually keeps windows cleaner longer when properly cleaned with purified water. However, if you're not satisfied with the results within 24 hours of service, we'll return to re-clean at no charge.",
      category: "Guarantee"
    },
    {
      question: "How do you clean high windows safely?",
      answer: "We use professional water-fed pole systems that allow us to clean windows up to 6 stories high while staying safely on the ground. For extremely high windows, we use professional ladder systems with proper safety equipment.",
      category: "Safety & Equipment"
    },
    {
      question: "Do you use eco-friendly cleaning products?",
      answer: "Yes, we use biodegradable, eco-friendly cleaning solutions and purified water systems. Our methods are safe for your family, pets, and the environment.",
      category: "Environmental"
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept cash, check, credit cards (Visa, MasterCard, American Express), and e-transfers. Payment is due upon completion of service unless other arrangements are made in advance.",
      category: "Payment & Pricing"
    },
    {
      question: "How long does window cleaning take?",
      answer: "The time varies based on the size of your property and number of windows. A typical residential home takes 1-3 hours, while larger commercial properties may take a full day or more.",
      category: "Service Details"
    },
    {
      question: "Can you clean windows with hard water stains?",
      answer: "Yes, we specialize in removing hard water stains, mineral deposits, and other stubborn marks using specialized tools and techniques. Severe cases may require additional treatment at an extra cost.",
      category: "Specialized Cleaning"
    }
  ];

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "BC Pressure Washing - Window Cleaning",
    "description": "Professional window cleaning services in Surrey, White Rock & Greater Vancouver using purified water technology",
    "url": "https://bcpressurewashing.ca/services/window-cleaning",
    "telephone": "+1-778-808-7620",
    "priceRange": "$$",
    "image": "https://bcpressurewashing.ca/lovable-uploads/43f837f2-f6f3-404b-85de-ba0901296f83.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "White Rock",
      "addressRegion": "BC",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "49.0258",
      "longitude": "-122.8031"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Surrey, BC"
      },
      {
        "@type": "City", 
        "name": "White Rock, BC"
      },
      {
        "@type": "City",
        "name": "Vancouver, BC"
      },
      {
        "@type": "City",
        "name": "Langley, BC"
      },
      {
        "@type": "City",
        "name": "Coquitlam, BC"
      }
    ],
    "service": {
      "@type": "Service",
      "name": "Window Cleaning",
      "description": "Professional residential and commercial window cleaning using purified water technology"
    }
  };

  return (
    <Layout 
      title="Window Cleaning Surrey, White Rock & Vancouver | BC Pressure Washing" 
      description="Professional window cleaning in Surrey, White Rock & Greater Vancouver. Streak-free results using purified water technology. Fully insured. Book online!"
    >
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
        <style>
          {`
            .content-below-hero {
              transform: translateY(20px);
              transition: transform 0.6s ease-out;
            }
            .content-below-hero.slide-up-active {
              transform: translateY(0);
            }
          `}
        </style>
      </Helmet>

      {/* Hero Section */}
      <section className="hero-section relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/lovable-uploads/001435bd-720d-4245-93b4-8a7a52252646.png')" }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        {/* Hero Content - Centered */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Window Cleaning in Surrey, White Rock & Greater Vancouver
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-4xl mx-auto leading-relaxed">
            Crystal-clear, streak-free windows using our purified water technology.
          </p>
          <Button asChild size="lg" variant="bc-red" className="text-lg px-8 py-4 hover:scale-105 transition-transform">
            <Link to="/calculator">Check Prices & Availability</Link>
          </Button>
        </div>
      </section>

      {/* Content below hero with slide-up effect */}
      <div className="content-below-hero relative z-20 bg-white">
        <WindowCleaningStickyNav activeSection={activeSection} />
        
        <div id="overview">
          <WhatWeCleanSection />
        </div>
        
        <div id="how-it-works">
          {/* Water Fed Pole System Video Section */}
          <section className="w-full py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6 heading-text">Water Fed Pole System</h2>
                  <p className="text-lg text-gray-700 mb-6 content-text">
                    Our state-of-the-art water fed pole system revolutionizes window cleaning by using purified water 
                    and extending telescopic poles to reach heights up to 60 feet safely from the ground.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-bc-red rounded-full mt-2 mr-4 flex-shrink-0"></div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Purified Water Technology</h3>
                        <p className="text-gray-600">
                          Our system uses deionized water that leaves no spots, streaks, or residue, 
                          providing crystal-clear results every time.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-bc-red rounded-full mt-2 mr-4 flex-shrink-0"></div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Enhanced Safety</h3>
                        <p className="text-gray-600">
                          No ladders required - our technicians stay safely on the ground while 
                          cleaning windows up to 6 stories high.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <WindowCleaningQuoteOverlay buttonText="Get My Free Quote" variant="bc-red" />
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                    <iframe 
                      src="https://www.youtube.com/embed/03njfGLUDUQ" 
                      title="Water Fed Pole System for Window Cleaning"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Traditional Squeegee Cleaning Technique Video Section */}
          <section className="w-full py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="lg:order-2">
                  <h2 className="text-3xl font-bold mb-6 heading-text">Traditional Squeegee Cleaning</h2>
                  <p className="text-lg text-gray-700 mb-6 content-text">
                    For interior windows and detailed cleaning work, our skilled technicians use traditional squeegee 
                    techniques combined with eco-friendly cleaning solutions for perfect results.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-bc-red rounded-full mt-2 mr-4 flex-shrink-0"></div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Expert Technique</h3>
                        <p className="text-gray-600">
                          Our trained professionals use proper squeegee techniques for streak-free results every time.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-bc-red rounded-full mt-2 mr-4 flex-shrink-0"></div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Interior Cleaning</h3>
                        <p className="text-gray-600">
                          Perfect for interior windows where water fed pole systems aren't suitable.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="lg:order-1 relative">
                  <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                    <iframe 
                      src="https://www.youtube.com/embed/bbHnt4UNPcU" 
                      title="Professional Squeegee Window Cleaning Technique"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        
        <WindowCleaningComparisonTable />
        
        <LocalMediaSection />
        
        <div id="benefits">
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <ServiceBenefits 
                title="Benefits of Professional Window Cleaning" 
                subtitle="Discover why regular professional window cleaning is essential for your property"
                benefits={benefits} 
              />
            </div>
          </section>
        </div>
        
        <div id="testimonials">
          <TestimonialsSection />
        </div>
        
        <div id="faq">
          <FAQSection
            title="Window Cleaning Frequently Asked Questions"
            subtitle="Expert answers to your most common window cleaning questions"
            description="Get detailed information about our window cleaning services, processes, and policies."
            faqs={faqs}
          />
        </div>
        
        <MoreServicesSection />
        
        <div id="get-quote">
          <CallToAction 
            title="Get Your Windows Crystal Clear – Book Today & Get a Response in Minutes!"
            subtitle="Contact us now for professional window cleaning in Surrey, White Rock & Greater Vancouver."
            backgroundImage="/lovable-uploads/26f6a625-a200-4106-8f94-579be5c566b6.png"
          />
        </div>
      </div>
    </Layout>
  );
};

export default WindowCleaning;
