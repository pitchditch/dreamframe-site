
import React from 'react';
import Layout from '../../components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Shield, TreePine, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';
import TestimonialsSection from '../../components/home/TestimonialsSection';
import FAQSection from '../../components/FAQSection';
import ServiceAreaMap from '@/components/ServiceAreaMap';

const DeckCleaning = () => {
  const faqs = [
    {
      question: "What types of decks can you clean?",
      answer: "We clean all types of decking materials including cedar, pine, composite, Trex, TimberTech, and other synthetic materials. Each material requires specific cleaning techniques."
    },
    {
      question: "Will pressure washing damage my deck?",
      answer: "We use appropriate pressure levels for each deck material. For wood decks, we typically use soft washing to avoid damaging the wood fibers and composite materials."
    },
    {
      question: "How often should I have my deck cleaned?",
      answer: "Most decks benefit from annual cleaning. Decks in shaded areas or with heavy use may need cleaning twice yearly."
    },
    {
      question: "Do you apply deck stain after cleaning?",
      answer: "We focus on cleaning and can recommend trusted deck staining contractors. Proper cleaning is essential before any staining or sealing work."
    },
    {
      question: "Can you remove mold and algae from my deck?",
      answer: "Yes, our cleaning solutions are specifically designed to remove mold, algae, and organic growth while being safe for your deck material."
    }
  ];

  return (
    <Layout
      title="Deck Cleaning Services in Surrey & White Rock | BC Pressure Washing"
      description="Professional deck cleaning for wood, composite, and synthetic decking. Restore your deck's beauty and safety. Free estimates in Metro Vancouver."
    >
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-amber-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Professional Deck Cleaning Services
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Restore your deck's beauty and extend its lifespan with our specialized cleaning services
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button asChild size="lg" className="bg-bc-red hover:bg-red-700 text-lg font-bold">
                  <Link to="/calculator">Get Free Estimate</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-bc-red text-bc-red hover:bg-red-50">
                  <a href="tel:7788087620">Call (778) 808-7620</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Deck Types We Clean */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Types of Decking We Clean</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-2 border-amber-100 hover:border-amber-200 transition-colors">
                <CardContent className="p-6">
                  <TreePine className="h-12 w-12 text-amber-600 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Wood Decking</h3>
                  <p className="text-gray-600 mb-4">
                    Cedar, pine, and pressure-treated lumber decks. We use gentle cleaning methods to preserve wood integrity.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Cedar decks</li>
                    <li>• Pressure-treated lumber</li>
                    <li>• Hardwood decking</li>
                    <li>• Reclaimed wood decks</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-100 hover:border-green-200 transition-colors">
                <CardContent className="p-6">
                  <Droplets className="h-12 w-12 text-green-600 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Composite Decking</h3>
                  <p className="text-gray-600 mb-4">
                    Trex, TimberTech, and other composite materials that require specialized cleaning approaches.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Trex decking</li>
                    <li>• TimberTech boards</li>
                    <li>• Fiberon materials</li>
                    <li>• Other composite brands</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-100 hover:border-blue-200 transition-colors">
                <CardContent className="p-6">
                  <Shield className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Synthetic Materials</h3>
                  <p className="text-gray-600 mb-4">
                    PVC and other synthetic decking materials that need gentle but effective cleaning.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• PVC decking</li>
                    <li>• Vinyl materials</li>
                    <li>• Aluminum decking</li>
                    <li>• Other synthetic options</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Professional Deck Cleaning Matters</h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Safety First</h3>
                    <p className="text-gray-600">Remove slippery algae, moss, and mildew that can cause dangerous falls.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Extend Deck Life</h3>
                    <p className="text-gray-600">Regular cleaning prevents rot, decay, and premature replacement costs.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Prepare for Staining</h3>
                    <p className="text-gray-600">Clean surfaces accept stains and sealers more evenly for better protection.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Restore Beauty</h3>
                    <p className="text-gray-600">Bring back your deck's original color and grain pattern.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Increase Home Value</h3>
                    <p className="text-gray-600">A clean, well-maintained deck adds significant value to your property.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Remove Stains</h3>
                    <p className="text-gray-600">Eliminate food spills, pet stains, and weather-related discoloration.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg" className="bg-bc-red hover:bg-red-700 text-lg font-bold">
                <Link to="/calculator">Schedule Deck Cleaning</Link>
              </Button>
            </div>
          </div>
        </section>

        <TestimonialsSection />

        <FAQSection
          title="Frequently Asked Questions About Deck Cleaning"
          subtitle="Get answers to common questions about our professional deck cleaning services"
          faqs={faqs}
        />

        {/* Service Areas */}
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Areas We Service</h2>
            <ServiceAreaMap />
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-bc-red text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Restore Your Deck?</h2>
            <p className="text-xl mb-8">
              Contact us today for a free estimate and make your deck safe and beautiful again.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild variant="outline" size="lg" className="bg-white text-bc-red hover:bg-gray-100 border-white">
                <Link to="/calculator">Get Free Estimate</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white text-bc-red hover:bg-gray-100 border-white">
                <a href="tel:7788087620">Call (778) 808-7620</a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default DeckCleaning;
