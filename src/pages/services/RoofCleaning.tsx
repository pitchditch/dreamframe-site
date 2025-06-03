
import React from 'react';
import Layout from '../../components/Layout';
import ServiceHeader from '../../components/ServiceHeader';
import FAQSection from '../../components/FAQSection';
import ServiceBenefits from '../../components/ServiceBenefits';
import CallToAction from '../../components/CallToAction';
import { Shield, Droplets, Leaf, Star, Home, Zap } from 'lucide-react';
import RoofCleaningQuoteOverlay from '@/components/forms/RoofCleaningQuoteOverlay';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import RoofCleaningProcessCarousel from '@/components/services/roof-cleaning/RoofCleaningProcessCarousel';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

const RoofCleaning = () => {
  const benefits = [{
    title: "Prevents Roof Damage",
    description: "Moss and algae can deteriorate roofing materials, leading to leaks and expensive repairs. Our soft wash technique safely removes growth without damage.",
    icon: <Shield className="w-6 h-6" />
  }, {
    title: "Professional Moss Removal",
    description: "Specialized treatment kills moss at the root and prevents regrowth for years, protecting your investment.",
    icon: <Leaf className="w-6 h-6" />
  }, {
    title: "Boosts Curb Appeal",
    description: "Remove unsightly black streaks and moss to dramatically improve your home's appearance and market value.",
    icon: <Home className="w-6 h-6" />
  }, {
    title: "Increases Roof Lifespan",
    description: "Regular soft washing can add 5-10 years to your roof's life by preventing organic growth damage.",
    icon: <Star className="w-6 h-6" />
  }, {
    title: "Eco-Friendly Process",
    description: "Our biodegradable cleaning solutions are safe for your family, pets, and landscaping.",
    icon: <Droplets className="w-6 h-6" />
  }, {
    title: "Energy Efficiency",
    description: "Clean roofs reflect more heat, potentially reducing cooling costs by up to 15%.",
    icon: <Zap className="w-6 h-6" />
  }];
  
  const faqs = [{
    question: "Is soft washing safe for my roof?",
    answer: "Absolutely! Soft washing uses low pressure (under 100 PSI) and specialized cleaning solutions to safely remove moss, algae, and stains without damaging shingles or tiles. It's the industry-recommended method for roof cleaning."
  }, {
    question: "How often should I have my roof soft washed?",
    answer: "Most roofs in Metro Vancouver benefit from soft washing every 2-3 years. Homes with heavy tree coverage or north-facing slopes may need annual treatment to prevent moss buildup."
  }, {
    question: "Will the cleaning solution harm my plants?",
    answer: "We take extensive precautions to protect your landscaping, including pre-wetting plants and covering sensitive areas. Our cleaning solutions are biodegradable and, when properly applied, won't harm your garden."
  }, {
    question: "How long does the moss removal process take?",
    answer: "Most residential roof cleaning takes 3-5 hours. The moss treatment continues working for weeks after application, with dead moss naturally washing away with rain."
  }, {
    question: "Do you offer a guarantee on moss removal?",
    answer: "Yes! We offer a 2-year moss-free guarantee. If moss returns within 2 years, we'll retreat your roof at no charge."
  }];

  return (
    <Layout 
      title="Soft Wash Roof Cleaning Surrey & White Rock | Safe Moss Removal Experts | BC Pressure Washing" 
      description="Protect your home with soft wash roof cleaning from BC Pressure Washing. Safe moss removal in Surrey & White Rock — Book today from just $199."
    >
      {/* Hero Section with Before/After Slider */}
      <ServiceHeader 
        title="Soft Wash Roof Cleaning" 
        description="Safe, effective moss removal that protects your roof and increases your home's value" 
        youtubeId="twtzf2gRdFU"
        youtubeDesktopId="eQSgdx9ujcc"
      />
      
      {/* Trust Bar */}
      <section className="bg-green-50 py-4 border-b border-green-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm font-medium text-green-800">
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Licensed & Insured
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-2" />
              2-Year Moss-Free Guarantee
            </div>
            <div className="flex items-center">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              5-Star Google Rated
            </div>
          </div>
        </div>
      </section>
      
      {/* Sticky Quote Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <RoofCleaningQuoteOverlay buttonText="Get Quote" variant="bc-red" />
      </div>
      
      {/* Why Soft Wash is Better Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Soft Wash is Better Than Pressure Washing</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Protect your roof investment with the safe, effective cleaning method recommended by roofing professionals
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="border-2 border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-green-600 p-2 rounded-full mr-3">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-green-800">Soft Wash (Recommended)</h3>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Low pressure (under 100 PSI) - safe for all roof types
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Kills moss and algae at the root
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Prevents regrowth for 2-3 years
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Preserves shingle granules and integrity
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Won't void roof warranty
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 bg-red-50">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-red-600 p-2 rounded-full mr-3">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-red-800">High Pressure (Not Recommended)</h3>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✗</span>
                    High pressure can damage shingles
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✗</span>
                    Only removes surface growth
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✗</span>
                    Moss returns within months
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✗</span>
                    Strips protective granules
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✗</span>
                    May void manufacturer warranty
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-8">
            <RoofCleaningQuoteOverlay buttonText="Check Price & Availability" variant="bc-red" />
          </div>
        </div>
      </section>
      
      {/* Benefits Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <ServiceBenefits 
            title="Why Choose Professional Roof Soft Washing" 
            subtitle="Protect your investment with safe, effective moss removal that extends your roof's lifespan" 
            benefits={benefits} 
          />
        </div>
      </section>
      
      {/* Process Section */}
      <RoofCleaningProcessCarousel />
      
      {/* Urgency Section */}
      <section className="py-12 bg-gradient-to-r from-orange-100 to-red-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-orange-800">
            Fall Spots Filling Fast — Book Before Rain Returns!
          </h2>
          <p className="text-lg text-orange-700 mb-6 max-w-2xl mx-auto">
            Don't let another wet season damage your roof. Our moss treatment works best when applied before heavy rains.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <RoofCleaningQuoteOverlay buttonText="Book Now - Limited Spots" variant="bc-red" />
            <Button className="bg-green-600 hover:bg-green-700 text-white" size="lg" asChild>
              <a href="tel:7788087620">Call (778) 808-7620</a>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Customer Testimonials */}
      <TestimonialsSection />
      
      {/* FAQ Section */}
      <FAQSection 
        title="Frequently Asked Questions About Roof Soft Washing" 
        subtitle="Get answers to common questions about our safe, effective roof cleaning process" 
        faqs={faqs} 
      />
      
      {/* Final CTA with Internal Links */}
      <CallToAction 
        title="Ready for a Cleaner, Safer Roof?" 
        subtitle={
          <>
            Contact us today for a free estimate and protect your home with our professional soft wash roof cleaning. 
            Prevent further damage by pairing with{' '}
            <Link to='/services/gutter-cleaning' className='text-white underline hover:text-gray-200'>
              gutter cleaning
            </Link>
            {' '}and complete your exterior cleanup with{' '}
            <Link to='/services/window-cleaning' className='text-white underline hover:text-gray-200'>
              crystal-clear windows
            </Link>.
          </>
        }
        backgroundImage="/lovable-uploads/9454f467-d96c-435e-b88d-8a78e379102a.png" 
      />
    </Layout>
  );
};

export default RoofCleaning;
