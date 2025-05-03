import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import CallToAction from '../../components/CallToAction';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Droplets } from 'lucide-react';
import MoreServicesSection from '../../components/MoreServicesSection';
import ServiceAreasCarousel from '../../components/ServiceAreasCarousel';
import TestimonialsSection from '../../components/home/TestimonialsSection';
import FAQSection from '../../components/FAQSection';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import WindowCleaningForm from '@/components/forms/WindowCleaningForm';

const WindowCleaning = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Set videoLoaded to true after a short delay
    // This is a workaround since readyState is not available on HTMLIFrameElement
    const timer = setTimeout(() => {
      setVideoLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const windowCleaningFaqs = [{
    question: "How often should I have my windows professionally cleaned?",
    answer: "We recommend professional window cleaning twice a year for most homes. However, properties in areas with high pollen, near construction, or close to the ocean may benefit from quarterly cleaning to maintain optimal clarity and prevent mineral buildup."
  }, {
    question: "What is the water-fed pole system?",
    answer: "Our water-fed pole system uses purified water to clean windows up to five stories high without chemicals. The purified water naturally attracts dirt and dries spot-free, leaving your windows crystal clear without streaks or residue."
  }, {
    question: "Do you clean the screens and tracks too?",
    answer: "Yes! Our comprehensive window cleaning service includes cleaning the glass, frames, sills, screens, and tracks. We ensure every component is thoroughly cleaned for a complete window cleaning experience."
  }, {
    question: "Will your cleaning solutions harm my plants or lawn?",
    answer: "No, we use environmentally friendly, biodegradable cleaning solutions that are safe for your landscaping, pets, and family while still delivering exceptional results."
  }, {
    question: "How long does window cleaning take?",
    answer: "The time required depends on the number and size of windows, their condition, and accessibility. A typical residential service takes between 2-4 hours. We'll provide a more accurate timeframe when scheduling your appointment."
  }];

  return (
    <Layout title="Professional Window Cleaning in Surrey & White Rock" description="Expert window cleaning services for crystal clear, streak-free windows. Using pure water technology and professional equipment for stunning results.">
      {/* Hero Section with Video Background */}
      <section className="relative h-screen w-full">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className={`absolute w-full h-full top-0 left-0 ${videoLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
            <iframe 
              id="hero-video"
              className="w-full h-full scale-[1.5]"
              src="https://www.youtube.com/embed/videoseries?list=PLbVHz4urQBZkJiAWdG8HWoJTdgEysigIO&autoplay=1&mute=1&controls=0&loop=1&playlist=bbHnt4UNPcU,03njfGLUDUQ&showinfo=0&rel=0"
              title="Window Cleaning Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              loading="eager"
              onLoad={() => setVideoLoaded(true)}
            ></iframe>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative h-full w-full flex items-center justify-center flex-col pb-20 z-10">
          <div className="text-center max-w-4xl px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white text-shadow">Professional Window Cleaning</h1>
            <p className="text-lg md:text-xl text-white text-shadow-sm mb-8">Crystal clear, streak-free windows using our advanced pure water technology</p>
            
            <Button asChild variant="bc-red" size="lg" className="text-lg font-semibold">
              <Link to="/calculator">Check Prices & Availability</Link>
            </Button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <span className="text-white text-sm mb-2">Scroll</span>
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* Main Content with Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">See Our Window Cleaning in Action</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Traditional Squeegee Method */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-center">Traditional Squeegee Method</h3>
              <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl shadow-xl">
                <iframe 
                  className="absolute top-0 left-0 w-full h-full" 
                  src="https://www.youtube.com/embed/bbHnt4UNPcU?autoplay=0&controls=1&rel=0" 
                  title="Window Cleaning with Squeegee" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            
            {/* Water-Fed Pole System */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-center">Water-Fed Pole System</h3>
              <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl shadow-xl">
                <iframe 
                  className="absolute top-0 left-0 w-full h-full" 
                  src="https://www.youtube.com/embed/03njfGLUDUQ?autoplay=0&controls=1&rel=0" 
                  title="Window Cleaning with Water-Fed Pole" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
                <Droplets size={16} className="mr-1" /> Pure Water Technology
              </div>
              <h2 className="text-3xl font-bold mb-6">Streak-Free Window Cleaning</h2>
              <p className="text-gray-600 mb-6">
                Dirty windows can drastically reduce the amount of natural light entering your home or business, and diminish your view of the outside world. Our professional window cleaning service restores clarity and brilliance to your windows, enhancing the appearance and value of your property.
              </p>
              <p className="text-gray-600 mb-6">
                Using our advanced pure water technology and professional-grade equipment, we deliver exceptional results that last longer than traditional cleaning methods. Our process removes all dirt, dust, pollen, water spots, and other contaminants to leave your windows perfectly clean.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="text-bc-red mr-2 mt-1" size={20} />
                  <span>Crystal clear, streak-free results</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-bc-red mr-2 mt-1" size={20} />
                  <span>Interior and exterior window cleaning</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-bc-red mr-2 mt-1" size={20} />
                  <span>Screen, track, and frame cleaning</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-bc-red mr-2 mt-1" size={20} />
                  <span>Window sill and ledge detailing</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-bc-red mr-2 mt-1" size={20} />
                  <span>Hard water stain removal options</span>
                </li>
              </ul>
              <img alt="Window cleaning with pure water technology" className="rounded-lg shadow-xl w-full" src="/lovable-uploads/ac4de5e1-110f-43da-9a26-3454d0529608.jpg" />
            </div>
            
            <div>
              <WindowCleaningForm />
            </div>
          </div>
        </div>
      </section>

      {/* Remaining sections */}
      
      {/* Our Process */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Window Cleaning Process</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We follow a comprehensive approach to ensure your windows are perfectly clean, from assessment to final inspection.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                  <span className="font-bold text-lg">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Assessment</h3>
                <p className="text-gray-600">
                  We carefully assess your windows to identify any special needs or challenges, and determine the best cleaning approach.
                </p>
              </CardContent>
            </Card>
            
            <Card className="transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                  <span className="font-bold text-lg">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Pure Water Cleaning</h3>
                <p className="text-gray-600">
                  Using our water-fed pole system, we clean external windows with purified water that leaves no streaks or residue behind.
                </p>
              </CardContent>
            </Card>
            
            <Card className="transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                  <span className="font-bold text-lg">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Detailed Finishing</h3>
                <p className="text-gray-600">
                  We clean all frames, sills, and tracks, and perform a final inspection to ensure perfect clarity from every angle.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* FAQ Section - Window Cleaning Specific */}
      <FAQSection 
        title="Window Cleaning FAQs" 
        subtitle="Common questions about our window cleaning services" 
        faqs={windowCleaningFaqs} 
      />
      
      {/* More Services Section with bigger images */}
      <MoreServicesSection />
      
      {/* Service Areas Map and Carousel */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Areas We Service</h2>
          <ServiceAreaMap />
          <div className="mt-8">
            <ServiceAreasCarousel />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CallToAction 
        title="Ready for Crystal Clear Windows?" 
        subtitle="Contact us today for a free quote on professional window cleaning for your home or business." 
      />
    </Layout>
  );
};

export default WindowCleaning;
