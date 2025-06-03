
import React, { useEffect, useRef } from 'react';
import Layout from '../../components/Layout';
import FAQSection from '../../components/FAQSection';
import ServiceBenefits from '../../components/ServiceBenefits';
import CallToAction from '../../components/CallToAction';
import GutterQuadrantSection from '../../components/services/GutterQuadrantSection';
import { Shield, Droplets, Cloud, CheckCircle } from 'lucide-react';
import GutterCleaningQuoteOverlay from '@/components/forms/GutterCleaningQuoteOverlay';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import GutterProcessCarousel from '../../components/services/gutter-cleaning/GutterProcessCarousel';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import HeroSlider from '../../components/services/gutter-cleaning/HeroSlider';
import StickyQuoteButton from '../../components/services/gutter-cleaning/StickyQuoteButton';
import TrustBar from '../../components/services/gutter-cleaning/TrustBar';
import ServiceAreasMap from '../../components/services/gutter-cleaning/ServiceAreasMap';
import EnhancedComparisonTable from '../../components/services/gutter-cleaning/EnhancedComparisonTable';

const GutterCleaning = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play().catch(e => console.log('Auto-play prevented:', e));
        } else if (videoRef.current) {
          videoRef.current.pause();
        }
      });
    }, options);
    
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
    
    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  const benefits = [
    {
      title: "Prevent Water Damage",
      description: "Clogged gutters can cause water to overflow and damage your home's foundation, walls, and landscaping."
    },
    {
      title: "Avoid Pest Infestations", 
      description: "Debris-filled gutters create perfect breeding grounds for mosquitoes, rodents, and other pests."
    },
    {
      title: "Extend Gutter Lifespan",
      description: "Regular cleaning prevents rust and deterioration, adding years to your gutter system."
    },
    {
      title: "Protect Roof & Fascia",
      description: "Prevent water backup that can damage shingles, roof underlayment, and fascia boards."
    },
    {
      title: "Prevent Ice Dams",
      description: "Clean gutters help prevent ice dams in winter that can cause serious roof and interior damage."
    },
    {
      title: "Maintain Curb Appeal",
      description: "Clean, well-functioning gutters enhance your home's appearance and value."
    }
  ];

  const faqs = [
    {
      question: "How often should I have my gutters cleaned?",
      answer: "Most homes benefit from gutter cleaning twice per year – once in spring and once in fall. However, if your property has many trees nearby, you may need more frequent cleanings, especially during fall when leaves are dropping."
    },
    {
      question: "What happens if I don't clean my gutters?",
      answer: "Neglected gutters can lead to water damage to your roof, walls, and foundation. They can also become homes for pests, develop rust and corrosion, and in winter, form ice dams that cause extensive damage."
    },
    {
      question: "Do you install gutter guards?",
      answer: "Yes, we offer gutter guard installation services. While they don't eliminate the need for cleaning entirely, quality gutter guards significantly reduce cleaning frequency and make maintenance easier."
    },
    {
      question: "How long does gutter cleaning take?",
      answer: "For an average-sized home, professional gutter cleaning typically takes 1-2 hours. Larger homes or those with severe clogging may take longer. We'll provide a time estimate when you book your service."
    },
    {
      question: "Do I need to be home during the service?",
      answer: "Not necessarily. As long as we have access to your gutters and exterior water sources, we can perform the cleaning while you're away. Many of our customers prefer this convenience."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Gutter Cleaning",
    "provider": {
      "@type": "LocalBusiness",
      "name": "BC Pressure Washing",
      "url": "https://bcpressurewashing.ca",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "White Rock",
        "addressRegion": "BC", 
        "postalCode": "V4B",
        "addressCountry": "CA"
      },
      "telephone": "+1-778-808-7620"
    },
    "areaServed": {
      "@type": "Place",
      "name": "Metro Vancouver"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Gutter Cleaning Packages",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Complete Gutter Cleaning"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Gutter Face Cleaning"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Downspout Flushing"
          }
        }
      ]
    }
  };

  const gutterTestimonials = [
    {
      name: "Sarah M.",
      location: "Surrey, BC", 
      text: "Had my gutters cleaned today, and I couldn't be happier with the results. The team was professional and thorough.",
      rating: 5
    },
    {
      name: "Mike T.",
      location: "White Rock, BC",
      text: "These guys were awesome. I called them when I noticed my gutters were clogged and they came out the same week.",
      rating: 5
    },
    {
      name: "Jennifer L.",
      location: "Langley, BC",
      text: "Excellent gutter cleaning service! They removed all the debris and even cleaned the gutter faces. Highly recommend!",
      rating: 5
    }
  ];

  return (
    <Layout 
      title="Gutter Cleaning in Surrey & White Rock | Prevent Costly Water Damage | BC Pressure Washing" 
      description="Affordable, thorough gutter cleaning in Surrey, White Rock, and Metro Vancouver. Prevent damage to your roof and foundation. Book now from just $129!"
    >
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <meta name="keywords" content="gutter cleaning near me, clogged gutters, surrey gutter cleaning, white rock gutter cleaning services, gutter guard installation, downspout flushing, licensed insured gutter cleaners, affordable gutter cleaning" />
      </Helmet>

      {/* Add spacing to account for navbar */}
      <div className="pt-28 md:pt-32">
        {/* Hero Section with Before/After Slider */}
        <HeroSlider />
        
        {/* Trust Bar */}
        <TrustBar />
        
        {/* Sticky Quote Button */}
        <StickyQuoteButton />

        {/* Benefits Section with Icons */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <ServiceBenefits 
              title="Why Regular Gutter Cleaning is Essential" 
              subtitle="Protect your home's structural integrity and prevent costly damage with our professional gutter cleaning services" 
              benefits={benefits} 
            />
            
            <div className="text-center mt-12">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <GutterCleaningQuoteOverlay buttonText="Check Prices & Availability" variant="bc-red" />
                <p className="text-gray-600 text-sm mt-2">From just $129 - Get your instant quote!</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Enhanced Comparison Table */}
        <EnhancedComparisonTable />
        
        {/* Service Areas Map */}
        <ServiceAreasMap />
        
        {/* Process Section */}
        <GutterQuadrantSection />
        <GutterProcessCarousel />
        
        {/* After Shots of Clean Gutters Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">After Shots of Clean Gutters</h2>
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div className="order-2 md:order-1">
                  <div className="relative overflow-hidden rounded-lg shadow-lg">
                    <img 
                      src="/lovable-uploads/d4b8bd58-58f9-4c12-a772-ba4f86bdc3ac.png"
                      alt="Aerial view of professional gutter cleaning process showing debris removal" 
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <p className="text-white text-sm font-medium">Professional debris removal from aerial perspective</p>
                    </div>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <h3 className="text-2xl font-bold mb-3">Complete Gutter Cleaning Results</h3>
                  <p className="text-gray-700 mb-4 text-lg">
                    Our professional team uses specialized tools to safely remove all debris, including stubborn gutter sticks and accumulated leaves that can cause serious blockages.
                  </p>
                  <h4 className="font-bold text-lg mb-2">What We Remove:</h4>
                  <ul className="list-disc list-inside space-y-3 text-gray-700 mb-4">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span> 
                      <span>Tree branches and large debris</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span> 
                      <span>Accumulated leaves and organic matter</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span> 
                      <span>Sediment and dirt buildup</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span> 
                      <span>Small animal nests and debris</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span> 
                      <span>Moss and algae growth</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <GutterCleaningQuoteOverlay buttonText="Get a Quote for Complete Cleaning" variant="bc-red" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Gutter Sticks Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Gutter Sticks - Professional Gutter Guard System</h2>
              
              <div className="grid md:grid-cols-2 gap-10 items-center mb-12">
                <div className="order-1 md:order-1">
                  <div className="relative overflow-hidden rounded-lg shadow-lg">
                    <img 
                      src="/lovable-uploads/baa94eb2-dd5a-4479-b809-801f52009eab.png"
                      alt="Gutter Stick guard system protecting gutters from debris" 
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <p className="text-white text-sm font-medium">Gutter Stick guard protecting against leaves and debris</p>
                    </div>
                  </div>
                </div>
                <div className="order-2 md:order-2">
                  <h3 className="text-2xl font-bold mb-3">Advanced Gutter Protection</h3>
                  <p className="text-gray-700 mb-4 text-lg">
                    Our Gutter Stick guard system provides superior protection against leaves, pine needles, and debris while maintaining optimal water flow through your gutters.
                  </p>
                  <h4 className="font-bold text-lg mb-2">Key Features:</h4>
                  <ul className="list-disc list-inside space-y-3 text-gray-700 mb-4">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span> 
                      <span>Perforated design allows water flow while blocking debris</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span> 
                      <span>Durable construction withstands harsh weather</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span> 
                      <span>Easy maintenance and long-lasting protection</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span> 
                      <span>Reduces cleaning frequency by up to 90%</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div className="order-2 md:order-1">
                  <h3 className="text-2xl font-bold mb-3">Professional Installation Process</h3>
                  <p className="text-gray-700 mb-4 text-lg">
                    Our certified technicians ensure proper installation of your Gutter Stick guard system with precision and attention to detail.
                  </p>
                  <h4 className="font-bold text-lg mb-2">Installation Benefits:</h4>
                  <ul className="list-disc list-inside space-y-3 text-gray-700 mb-4">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span> 
                      <span>Custom fit for your specific gutter system</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span> 
                      <span>Secure mounting prevents displacement</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span> 
                      <span>Professional warranty on installation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span> 
                      <span>Maintains gutter integrity and appearance</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <GutterCleaningQuoteOverlay buttonText="Get Quote for Gutter Stick Installation" variant="bc-red" />
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <div className="relative overflow-hidden rounded-lg shadow-lg">
                    <img 
                      src="/lovable-uploads/bb606d6a-bd92-4fa1-aceb-93bc03c8e231.png"
                      alt="Professional installation of Gutter Stick guard system" 
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <p className="text-white text-sm font-medium">Expert installation ensuring optimal performance</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Professional Installation Video */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Professional Gutter Guards Installation</h2>
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div className="order-2 md:order-1 w-full">
                  <iframe 
                    className="w-full h-full aspect-video rounded-lg shadow-lg" 
                    src="https://www.youtube.com/embed/OICbIRmx-80?autoplay=1&mute=1&controls=0&loop=1&playlist=OICbIRmx-80&showinfo=0&rel=0" 
                    title="Gutter Guards Installation in Metro Vancouver" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                </div>
                <div className="order-1 md:order-2">
                  <h3 className="text-2xl font-bold mb-3">Protect Your Gutters Year-Round</h3>
                  <p className="text-gray-700 mb-4 text-lg">
                    After cleaning your gutters, consider installing our premium gutter guard systems. These guards prevent leaves, pine needles, and debris from entering your gutters while allowing water to flow freely.
                  </p>
                  <h4 className="font-bold text-lg mb-2">Benefits of Our Gutter Guards:</h4>
                  <ul className="list-disc list-inside space-y-3 text-gray-700 mb-4">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span> 
                      <span>Reduce cleaning frequency by 90%</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span> 
                      <span>Prevent clogs and overflow</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span> 
                      <span>Keep pests and birds out</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span> 
                      <span>Extend the lifespan of your gutters</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span> 
                      <span>Prevent ice dams in winter</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <GutterCleaningQuoteOverlay buttonText="Get a Quote for Gutter Guards" variant="bc-red" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Customer Testimonials Carousel */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Gutter Cleaning Customers Say</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {gutterTestimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-lg">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.location}</div>
                </div>
              ))}
            </div>
            
            {/* Seasonal Callout */}
            <div className="text-center mt-12 p-6 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg">
              <h3 className="text-2xl font-bold mb-2 text-orange-800">Fall Cleanings Fill Fast!</h3>
              <p className="text-orange-700 mb-4">Book now before the next heavy rain. Don't let clogged gutters damage your home.</p>
              <GutterCleaningQuoteOverlay buttonText="Book Your Fall Cleaning" variant="bc-red" />
            </div>
          </div>
        </section>
        
        {/* Enhanced FAQ Section */}
        <FAQSection 
          title="Frequently Asked Questions About Gutter Cleaning" 
          subtitle="Get answers to common questions about our gutter cleaning services in Surrey, White Rock and Metro Vancouver" 
          faqs={faqs} 
        />
        
        {/* Final CTA with Cross-links */}
        <CallToAction 
          title="Ready to Book Your Gutter Cleaning?" 
          subtitle={
            <>
              Contact us today for a free estimate and experience the difference professional gutter maintenance makes. 
              We also offer <Link to='/services/roof-cleaning' className='text-white underline hover:text-gray-200'>roof cleaning</Link> and{' '}
              <Link to='/services/window-cleaning' className='text-white underline hover:text-gray-200'>window cleaning</Link> services.
            </>
          }
          backgroundImage="/lovable-uploads/b746ec68-b615-4294-b8f8-a19b14a4606c.png" 
        />
      </div>
    </Layout>
  );
};

export default GutterCleaning;
