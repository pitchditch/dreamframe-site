
import React from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Zap, Shield, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import ServiceAreaMap from '@/components/ServiceAreaMap';

const PressureWashing = () => {
  const faqs = [
    {
      question: "What surfaces can you pressure wash?",
      answer: "We can safely pressure wash driveways, sidewalks, decks, patios, fences, house siding, and many other exterior surfaces. We adjust pressure levels based on the material to prevent damage."
    },
    {
      question: "Will pressure washing damage my property?",
      answer: "When done by professionals with proper equipment and techniques, pressure washing is safe. We use appropriate pressure levels for each surface and have years of experience protecting your property."
    },
    {
      question: "How often should I have pressure washing done?",
      answer: "Most properties benefit from annual pressure washing. High-traffic areas or properties with lots of organic growth may need cleaning twice per year."
    },
    {
      question: "Do you use eco-friendly cleaning solutions?",
      answer: "Yes, we use biodegradable, environmentally-safe cleaning solutions that are effective while being safe for your family, pets, and landscaping."
    },
    {
      question: "How long does pressure washing take?",
      answer: "Time varies based on the size and scope of the project. Most residential jobs take 2-6 hours. We'll provide an estimated timeframe when you book."
    }
  ];

  return (
    <Layout
      title="Pressure Washing Services in Surrey & White Rock | BC Pressure Washing"
      description="Professional pressure washing services for driveways, decks, siding, and more. Transform your property with our expert cleaning in Metro Vancouver."
    >
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Professional Pressure Washing Services
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Transform your property with our expert pressure washing services in Surrey, White Rock & Metro Vancouver
              </p>
              
              <div className="flex items-center justify-center gap-8 mb-8">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="font-semibold">5.0 Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="font-semibold">Licensed & Insured</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">Same-Day Service</span>
                </div>
              </div>

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

        {/* Services We Offer */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Pressure Washing Services We Offer</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-2 border-blue-100 hover:border-blue-200 transition-colors">
                <CardContent className="p-6">
                  <img src="/lovable-uploads/b5967047-dddc-47e1-a23c-dd4a5feb9125.png" alt="Driveway Cleaning" className="h-12 w-12 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Driveway Cleaning</h3>
                  <p className="text-gray-600">
                    Remove oil stains, tire marks, and built-up grime to restore your driveway's appearance.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-100 hover:border-green-200 transition-colors">
                <CardContent className="p-6">
                  <img src="/lovable-uploads/6efc066c-cf14-4550-a6ab-dd1184a2b519.png" alt="Deck Cleaning" className="h-12 w-12 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Deck & Patio Cleaning</h3>
                  <p className="text-gray-600">
                    Specialized cleaning for wood and composite decks to restore their natural beauty.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-100 hover:border-purple-200 transition-colors">
                <CardContent className="p-6">
                  <img src="/lovable-uploads/ef54ad3a-1e61-4d1e-b827-b556187487ef.png" alt="House Washing" className="h-12 w-12 mb-4" />
                  <h3 className="text-xl font-bold mb-3">House Washing</h3>
                  <p className="text-gray-600">
                    Safe, low-pressure house washing that removes dirt, algae, and mildew from siding.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-orange-100 hover:border-orange-200 transition-colors">
                <CardContent className="p-6">
                  <Zap className="h-12 w-12 text-orange-600 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Fence Washing</h3>
                  <p className="text-gray-600">
                    Restore your fence to its original condition with professional pressure washing.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-cyan-100 hover:border-cyan-200 transition-colors">
                <CardContent className="p-6">
                  <img src="/lovable-uploads/0413d26c-fb32-4ac3-ad1c-8e24f7878b90.png" alt="Commercial Cleaning" className="h-12 w-12 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Commercial Surfaces</h3>
                  <p className="text-gray-600">
                    Professional cleaning for parking lots, sidewalks, and commercial building exteriors.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-pink-100 hover:border-pink-200 transition-colors">
                <CardContent className="p-6">
                  <Shield className="h-12 w-12 text-pink-600 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Specialized Cleaning</h3>
                  <p className="text-gray-600">
                    Custom pressure washing solutions for unique surfaces and challenging stains.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg" className="bg-bc-red hover:bg-red-700 text-lg font-bold">
                <Link to="/calculator">Get Your Custom Quote</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Professional Pressure Washing?</h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Boost Curb Appeal</h3>
                    <p className="text-gray-600">Dramatically improve your property's appearance and make a great first impression.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Increase Property Value</h3>
                    <p className="text-gray-600">Well-maintained properties have higher market value and attract more buyers.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Prevent Damage</h3>
                    <p className="text-gray-600">Remove harmful substances that can cause permanent staining and deterioration.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Health & Safety</h3>
                    <p className="text-gray-600">Remove slippery algae, mold, and mildew that can cause accidents.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Save Time & Effort</h3>
                    <p className="text-gray-600">Let professionals handle the heavy work with proper equipment and expertise.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Eco-Friendly Methods</h3>
                    <p className="text-gray-600">Environmentally responsible cleaning solutions and water conservation practices.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <TestimonialsSection />

        <FAQSection
          title="Frequently Asked Questions About Pressure Washing"
          subtitle="Get answers to common questions about our professional pressure washing services"
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
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Property?</h2>
            <p className="text-xl mb-8">
              Contact us today for a free estimate and see the difference professional pressure washing makes.
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

export default PressureWashing;
