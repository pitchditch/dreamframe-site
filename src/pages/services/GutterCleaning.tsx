import React, { useEffect, useRef } from 'react';
import Layout from '../../components/Layout';
import ServiceHeader from '../../components/ServiceHeader';
import FAQSection from '../../components/FAQSection';
import ServiceBenefits from '../../components/ServiceBenefits';
import CallToAction from '../../components/CallToAction';
import GutterQuadrantSection from '../../components/services/GutterQuadrantSection';
import { Shield, Droplets, Cloud, CheckCircle } from 'lucide-react';
import PriceCalculatorOverlay from '@/components/PriceCalculatorOverlay';
import GutterCleaningQuoteOverlay from '@/components/forms/GutterCleaningQuoteOverlay';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import GutterProcessCarousel from '../../components/services/gutter-cleaning/GutterProcessCarousel';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
const GutterCleaning = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    // Intersection Observer to handle video autoplay when scrolled into view
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1 // Lowered threshold to trigger earlier
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
  const benefits = [{
    title: "Prevent Water Damage",
    description: "Clogged gutters can cause water to overflow and damage your home's foundation, walls, and landscaping."
  }, {
    title: "Avoid Pest Infestations",
    description: "Debris-filled gutters create perfect breeding grounds for mosquitoes, rodents, and other pests."
  }, {
    title: "Extend Gutter Lifespan",
    description: "Regular cleaning prevents rust and deterioration, adding years to your gutter system."
  }, {
    title: "Protect Roof & Fascia",
    description: "Prevent water backup that can damage shingles, roof underlayment, and fascia boards."
  }, {
    title: "Prevent Ice Dams",
    description: "Clean gutters help prevent ice dams in winter that can cause serious roof and interior damage."
  }, {
    title: "Maintain Curb Appeal",
    description: "Clean, well-functioning gutters enhance your home's appearance and value."
  }];
  const faqs = [{
    question: "How often should I have my gutters cleaned?",
    answer: "Most homes benefit from gutter cleaning twice per year – once in spring and once in fall. However, if your property has many trees nearby, you may need more frequent cleanings, especially during fall when leaves are dropping."
  }, {
    question: "What happens if I don't clean my gutters?",
    answer: "Neglected gutters can lead to water damage to your roof, walls, and foundation. They can also become homes for pests, develop rust and corrosion, and in winter, form ice dams that cause extensive damage."
  }, {
    question: "Do you install gutter guards?",
    answer: "Yes, we offer gutter guard installation services. While they don't eliminate the need for cleaning entirely, quality gutter guards significantly reduce cleaning frequency and make maintenance easier."
  }, {
    question: "How long does gutter cleaning take?",
    answer: "For an average-sized home, professional gutter cleaning typically takes 1-2 hours. Larger homes or those with severe clogging may take longer. We'll provide a time estimate when you book your service."
  }, {
    question: "Do I need to be home during the service?",
    answer: "Not necessarily. As long as we have access to your gutters and exterior water sources, we can perform the cleaning while you're away. Many of our customers prefer this convenience."
  }];
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
      "itemListElement": [{
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Complete Gutter Cleaning"
        }
      }, {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Gutter Face Cleaning"
        }
      }, {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Downspout Flushing"
        }
      }]
    }
  };

  // Filter testimonials to show only gutter-related ones
  const gutterTestimonials = [{
    name: "Sarah M.",
    location: "Surrey, BC",
    text: "Had my gutters cleaned today, and I couldn't be happier with the results. The team was professional and thorough.",
    rating: 5
  }, {
    name: "Mike T.",
    location: "White Rock, BC",
    text: "These guys were awesome. I called them when I noticed my gutters were clogged and they came out the same week.",
    rating: 5
  }, {
    name: "Jennifer L.",
    location: "Langley, BC",
    text: "Excellent gutter cleaning service! They removed all the debris and even cleaned the gutter faces. Highly recommend!",
    rating: 5
  }];
  return <Layout title="Professional Gutter Cleaning in Surrey & White Rock | BC Pressure Washing" description="Protect your home from water damage with expert gutter cleaning by BC Pressure Washing. Serving Surrey, White Rock & Metro Vancouver. Free quote today!">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <ServiceHeader title="Professional Gutter Cleaning" description="Keep your home protected with our thorough gutter cleaning services." youtubeId="EdMlx1sYJDc" youtubeDesktopId="m5wfZZCuFeg" />
      
      {/* Get Your Gutters Cleaned Today Section - Full Width */}
      <section className="w-full py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-6 heading-text">Get Your Gutters Cleaned Today</h2>
            <p className="text-lg text-gray-700 mb-8 content-text">
              Clogged gutters can cause serious damage to your home's foundation, roof, and exterior. Our professional gutter cleaning service ensures your gutters function properly year-round. We serve <Link to="/locations/surrey" className="text-bc-red hover:underline">Surrey</Link>, <Link to="/locations/white-rock" className="text-bc-red hover:underline">White Rock</Link>, and all of Metro Vancouver.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="flex flex-col items-center space-y-4 bg-gray-50 p-6 rounded-lg">
                <div className="bg-green-100 p-3 rounded-full text-green-600">
                  <Shield size={24} />
                </div>
                <h3 className="font-semibold text-lg text-center">Complete System Cleaning</h3>
                <p className="text-gray-600 text-center text-sm">
                  Thorough removal of all debris from gutters and downspouts
                </p>
              </div>
              
              <div className="flex flex-col items-center space-y-4 bg-gray-50 p-6 rounded-lg">
                <div className="bg-green-100 p-3 rounded-full text-green-600">
                  <Droplets size={24} />
                </div>
                <h3 className="font-semibold text-lg text-center">Downspout Flushing</h3>
                <p className="text-gray-600 text-center text-sm">
                  Professional testing and clearing of all blockages
                </p>
              </div>
              
              <div className="flex flex-col items-center space-y-4 bg-gray-50 p-6 rounded-lg">
                <div className="bg-green-100 p-3 rounded-full text-green-600">
                  <Cloud size={24} />
                </div>
                <h3 className="font-semibold text-lg text-center">Gutter Face Cleaning</h3>
                <p className="text-gray-600 text-center text-sm">
                  Remove black streaks and improve curb appeal
                </p>
              </div>

              <div className="flex flex-col items-center space-y-4 bg-gray-50 p-6 rounded-lg">
                <div className="bg-green-100 p-3 rounded-full text-green-600">
                  <CheckCircle size={24} />
                </div>
                <h3 className="font-semibold text-lg text-center">100% Satisfaction</h3>
                <p className="text-gray-600 text-center text-sm">
                  We guarantee your complete satisfaction
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GutterCleaningQuoteOverlay buttonText="Check Prices & Availability" variant="bc-red" />
              <Button className="bg-green-600 hover:bg-green-700 text-white" size="lg" asChild>
                <a href="tel:7788087620" className="flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  Call Now: (778) 808-7620
                </a>
              </Button>
            </div>
            <p className="text-gray-600 text-sm mt-2">From just $129 - Fall cleanings fill fast!</p>
            
            <div className="mt-10 p-6 bg-amber-50 rounded-lg border border-amber-200">
              <h3 className="text-xl font-bold mb-2 text-amber-800">Gutter Cleaning Warning!</h3>
              <p className="text-amber-700 mb-4">
                Neglected gutters can lead to costly water damage to your foundation, roof, and interior walls. Don't wait until it's too late - regular maintenance is much more affordable than repairs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <GutterCleaningQuoteOverlay buttonText="Check Prices & Availability" variant="bc-red" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <ServiceBenefits title="Benefits of Regular Gutter Cleaning" subtitle="Protect your home's structural integrity and prevent costly damage with our professional gutter cleaning services" benefits={benefits} />
          
          {/* Add CTA after benefits */}
          <div className="text-center mt-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GutterCleaningQuoteOverlay buttonText="Check Prices & Availability" variant="bc-red" />
              <p className="text-gray-600 text-sm mt-2">From just $129 - Get your instant quote!</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Gutter Cleaning Process - Refined 4-Step Process */}
      
      
      <GutterQuadrantSection />
      
      {/* Replace the old process section with the new carousel */}
      <GutterProcessCarousel />
      
      {/* Gutter Sticks Section - Enhanced */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Gutter Protection Options</h2>
            
            {/* Comparison Table */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-6 border-r border-gray-200">
                  <h3 className="text-2xl font-bold mb-4 text-center">Gutter Sticks</h3>
                  <img src="/lovable-uploads/3312e648-cdca-4c6c-8369-bcf99dd6db02.png" alt="Gutter Stick Installation in Surrey" className="rounded-lg shadow-lg w-full mb-4" />
                  <ul className="space-y-2">
                    <li className="flex items-center"><CheckCircle className="text-green-600 mr-2" size={16} />Budget-friendly option</li>
                    <li className="flex items-center"><CheckCircle className="text-green-600 mr-2" size={16} />Easy installation</li>
                    <li className="flex items-center"><CheckCircle className="text-green-600 mr-2" size={16} />Prevents leaf buildup</li>
                    <li className="flex items-center"><CheckCircle className="text-green-600 mr-2" size={16} />Removable for cleaning</li>
                  </ul>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-4 text-center">Full Gutter Guards</h3>
                  <img src="/lovable-uploads/5ccb5fa4-0911-43f2-9ea9-ad1336cbcbe9.png" alt="Gutter Guard Installation in White Rock" className="rounded-lg shadow-lg w-full mb-4" />
                  <ul className="space-y-2">
                    <li className="flex items-center"><CheckCircle className="text-green-600 mr-2" size={16} />Maximum protection</li>
                    <li className="flex items-center"><CheckCircle className="text-green-600 mr-2" size={16} />Reduces cleaning frequency</li>
                    <li className="flex items-center"><CheckCircle className="text-green-600 mr-2" size={16} />Professional installation</li>
                    <li className="flex items-center"><CheckCircle className="text-green-600 mr-2" size={16} />Long-term investment</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Link to="/calculator">
                <Button className="bg-bc-red hover:bg-red-700 text-white" size="lg">
                  Compare Gutter Protection Options
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Water Fed Pole System Video Section */}
      

      {/* Traditional Squeegee Cleaning Technique Video Section */}
      
      
      {/* Gutter Guards Installation Section with larger autoplay video */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Professional Gutter Guards Installation</h2>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="order-2 md:order-1 w-full">
                <iframe className="w-full h-full aspect-video rounded-lg shadow-lg" src="https://www.youtube.com/embed/OICbIRmx-80?autoplay=1&mute=1&controls=0&loop=1&playlist=OICbIRmx-80&showinfo=0&rel=0" title="Gutter Guards Installation in Metro Vancouver" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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
                    <span>Reduce cleaning frequency</span>
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
                  <PriceCalculatorOverlay buttonText="Get a Quote for Gutter Guards" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Relevant Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Gutter Cleaning Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {gutterTestimonials.map((testimonial, index) => <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => <span key={i} className="text-yellow-400">★</span>)}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-gray-600 text-sm">{testimonial.location}</div>
              </div>)}
          </div>
          
          {/* Seasonal Callout */}
          <div className="text-center mt-12 p-6 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg">
            <h3 className="text-2xl font-bold mb-2 text-orange-800">Fall Cleanings Fill Fast!</h3>
            <p className="text-orange-700 mb-4">Book now before the next heavy rain. Don't let clogged gutters damage your home.</p>
            <GutterCleaningQuoteOverlay buttonText="Book Your Fall Cleaning" variant="bc-red" />
          </div>
        </div>
      </section>
      
      <FAQSection title="Frequently Asked Questions About Gutter Cleaning" subtitle="Get answers to common questions about our gutter cleaning services" faqs={faqs} />
      
      <CallToAction title="Ready to Book Your Gutter Cleaning?" subtitle="Contact us today for a free estimate and experience the difference professional gutter maintenance makes. We also offer <Link to='/services/roof-cleaning' className='text-white underline hover:text-gray-200'>roof cleaning</Link> and <Link to='/services/window-cleaning' className='text-white underline hover:text-gray-200'>window cleaning</Link> services." backgroundImage="/lovable-uploads/b746ec68-b615-4294-b8f8-a19b14a4606c.png" />
    </Layout>;
};
export default GutterCleaning;