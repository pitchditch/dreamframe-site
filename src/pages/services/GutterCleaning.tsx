
import React, { useState } from 'react';
import Layout from '../../components/Layout';
import CallToAction from '../../components/CallToAction';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Shield, Droplets, Leaf, Home } from 'lucide-react';
import MoreServicesSection from '../../components/MoreServicesSection';
import TestimonialsSection from '../../components/home/TestimonialsSection';
import FAQSection from '../../components/FAQSection';
import GutterCleaningForm from '@/components/forms/GutterCleaningForm';
import ServiceAreasList from '@/components/ServiceAreasList';
import PriceCalculatorOverlay from '@/components/PriceCalculatorOverlay';
import GutterProcessCarousel from '@/components/services/GutterProcessCarousel';

const GutterCleaning = () => {
  const [showQuoteOverlay, setShowQuoteOverlay] = useState(false);

  const gutterCleaningFaqs = [
    {
      question: "How often should I have my gutters cleaned?",
      answer: "We recommend having your gutters cleaned at least twice a year - once in late spring and once in late fall. However, if you have many trees near your home, you may need more frequent cleaning to prevent clogs and water damage."
    },
    {
      question: "What happens if I don't clean my gutters regularly?",
      answer: "Clogged gutters can cause serious problems including water damage to your roof, siding, and foundation. Standing water in gutters can also become a breeding ground for mosquitoes and other pests, and the extra weight can cause gutters to sag or pull away from your home."
    },
    {
      question: "Do you clean downspouts too?",
      answer: "Yes! Our comprehensive gutter cleaning service includes clearing all debris from gutters and downspouts, ensuring proper water flow throughout your entire gutter system."
    },
    {
      question: "Will you clean up the debris that comes out of my gutters?",
      answer: "Absolutely. We bag and remove all debris from your gutters and clean up any mess created during the process. Your property will be left clean and tidy when we're finished."
    },
    {
      question: "Can you repair damaged gutters while you're cleaning them?",
      answer: "While we focus primarily on cleaning, we can identify issues like loose brackets, small leaks, or damaged sections and provide recommendations for repairs. For major repairs, we can connect you with trusted local contractors."
    }
  ];

  return (
    <Layout title="Professional Gutter Cleaning in Surrey & White Rock" description="Expert gutter cleaning services to protect your home from water damage. Comprehensive debris removal and downspout cleaning.">
      {/* Hero Section */}
      <section className="relative h-screen w-full">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img 
            src="/lovable-uploads/389a6f18-1725-449e-9461-22e9e46dab29.png"
            alt="Professional gutter cleaning service"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
        </div>
        
        <div className="relative h-full w-full flex items-center justify-center flex-col z-10">
          <div className="text-center max-w-4xl px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white text-shadow">Professional Gutter Cleaning</h1>
            <p className="text-lg md:text-xl text-white text-shadow-sm mb-8 max-w-2xl mx-auto">
              Protect your home from water damage with our thorough gutter cleaning and maintenance services
            </p>
            
            <Button asChild variant="bc-red" size="lg" className="text-lg font-semibold px-8 py-7">
              <Link to="/calculator">Check Prices & Availability</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Get Your Gutters Cleaned Today - Full Width */}
      <section className="py-16">
        <div className="w-full px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mb-4">
                  <Shield size={16} className="mr-1" /> Home Protection
                </div>
                <h2 className="text-3xl font-bold mb-6">Get Your Gutters Cleaned Today</h2>
                <p className="text-gray-600 mb-6">
                  Don't let clogged gutters damage your home's foundation, roof, or siding. Our professional gutter cleaning service removes all debris, leaves, and buildup to ensure proper water drainage and protect your property investment.
                </p>
                <p className="text-gray-600 mb-6">
                  We provide comprehensive gutter maintenance including debris removal, downspout clearing, and basic gutter inspection to identify potential issues before they become costly repairs.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <Check className="text-bc-red mr-2 mt-1" size={20} />
                    <span>Complete debris removal from gutters and downspouts</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-bc-red mr-2 mt-1" size={20} />
                    <span>Water flow testing to ensure proper drainage</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-bc-red mr-2 mt-1" size={20} />
                    <span>Basic gutter inspection and maintenance tips</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-bc-red mr-2 mt-1" size={20} />
                    <span>Professional cleanup and debris disposal</span>
                  </li>
                </ul>
              </div>
              
              <div className="relative">
                <div 
                  className="relative"
                  onMouseEnter={() => setShowQuoteOverlay(true)}
                  onMouseLeave={() => setShowQuoteOverlay(false)}
                >
                  <GutterCleaningForm />
                  
                  {showQuoteOverlay && (
                    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center z-10">
                      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm">
                        <h3 className="text-xl font-bold mb-4 text-center">Request Gutter Cleaning Quote</h3>
                        <p className="text-gray-600 text-center mb-4">
                          Get a free, no-obligation quote for professional gutter cleaning services.
                        </p>
                        <PriceCalculatorOverlay 
                          buttonText="Get Free Quote" 
                          variant="bc-red"
                          className="w-full"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Gutter Cleaning Process - Carousel */}
      <GutterProcessCarousel />

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Gutter Cleaning Service?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're committed to protecting your home with thorough, professional gutter maintenance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="transition-all hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <Droplets className="w-12 h-12 text-bc-red mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Prevent Water Damage</h3>
                <p className="text-gray-600">
                  Proper gutter maintenance prevents costly water damage to your roof, foundation, and landscaping.
                </p>
              </CardContent>
            </Card>
            
            <Card className="transition-all hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <Leaf className="w-12 h-12 text-bc-red mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Complete Debris Removal</h3>
                <p className="text-gray-600">
                  We remove all leaves, twigs, and accumulated debris to restore proper water flow through your gutters.
                </p>
              </CardContent>
            </Card>
            
            <Card className="transition-all hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <Home className="w-12 h-12 text-bc-red mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Protect Your Investment</h3>
                <p className="text-gray-600">
                  Regular gutter cleaning extends the life of your gutters and protects your home's structural integrity.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <FAQSection 
        title="Gutter Cleaning FAQs" 
        subtitle="Common questions about our gutter cleaning services" 
        faqs={gutterCleaningFaqs} 
      />
      
      <MoreServicesSection />
      
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Areas We Service</h2>
          <ServiceAreasList />
        </div>
      </section>

      <CallToAction 
        title="Ready to Protect Your Home?" 
        subtitle="Contact us today for professional gutter cleaning services that keep your gutters flowing freely." 
      />
    </Layout>
  );
};

export default GutterCleaning;
