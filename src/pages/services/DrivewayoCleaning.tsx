
import React from 'react';
import Layout from '../../components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Car, Home, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import TestimonialsSection from '../../components/home/TestimonialsSection';
import FAQSection from '../../components/FAQSection';
import ServiceAreaMap from '@/components/ServiceAreaMap';

const DrivewayoCleaning = () => {
  const faqs = [
    {
      question: "How often should I have my driveway cleaned?",
      answer: "Most driveways benefit from professional cleaning 1-2 times per year. High-traffic areas or driveways with heavy staining may need more frequent cleaning."
    },
    {
      question: "Can you remove oil stains from my driveway?",
      answer: "Yes! We use specialized degreasers and techniques to remove oil stains, rust marks, and other stubborn stains from concrete and asphalt surfaces."
    },
    {
      question: "Will pressure washing damage my driveway?",
      answer: "When done properly, pressure washing is safe for driveways. We use appropriate pressure levels and techniques for different surface materials."
    },
    {
      question: "Do you clean other concrete surfaces?",
      answer: "Absolutely! We clean sidewalks, patios, pool decks, garage floors, and other concrete or paved surfaces around your property."
    },
    {
      question: "How long does driveway cleaning take?",
      answer: "Most residential driveways take 1-3 hours depending on size and condition. We'll provide an estimated time when you book your service."
    }
  ];

  return (
    <Layout
      title="Driveway Cleaning Services in Surrey & White Rock | BC Pressure Washing"
      description="Professional driveway pressure washing and stain removal. Remove oil stains, dirt, and grime from concrete and asphalt driveways. Free estimates in Metro Vancouver."
    >
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Professional Driveway Cleaning Services
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Remove oil stains, dirt, and grime to restore your driveway's appearance and boost curb appeal
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

        {/* What We Clean */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What We Remove from Your Driveway</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-2 border-red-100 hover:border-red-200 transition-colors">
                <CardContent className="p-6">
                  <Car className="h-12 w-12 text-red-600 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Oil & Grease Stains</h3>
                  <p className="text-gray-600">
                    Stubborn automotive fluids, oil drips, and grease stains that make your driveway look unsightly.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-orange-100 hover:border-orange-200 transition-colors">
                <CardContent className="p-6">
                  <img src="/lovable-uploads/6d50984b-4523-400a-ae71-f6be7d6f2430.png" alt="Rust Stains" className="h-12 w-12 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Rust & Metal Stains</h3>
                  <p className="text-gray-600">
                    Orange and brown stains from metal objects, sprinkler systems, or automotive parts.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-100 hover:border-green-200 transition-colors">
                <CardContent className="p-6">
                  <img src="/lovable-uploads/970e3c9b-99cf-4d26-b9f1-825193b4cc3e.png" alt="Algae" className="h-12 w-12 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Mold & Algae</h3>
                  <p className="text-gray-600">
                    Green and black organic growth that can make surfaces slippery and dangerous.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-100 hover:border-blue-200 transition-colors">
                <CardContent className="p-6">
                  <img src="/lovable-uploads/c445485c-8dd6-4dcf-8896-5c61eee4d27f.png" alt="Tire Marks" className="h-12 w-12 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Tire Marks & Scuffs</h3>
                  <p className="text-gray-600">
                    Black rubber marks from tires and scuff marks from turning wheels.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-100 hover:border-purple-200 transition-colors">
                <CardContent className="p-6">
                  <img src="/lovable-uploads/63a1c6a7-8585-4825-9b95-aaf922a4fb3b.png" alt="General Dirt" className="h-12 w-12 mb-4" />
                  <h3 className="text-xl font-bold mb-3">General Dirt & Grime</h3>
                  <p className="text-gray-600">
                    Accumulated dirt, mud, and environmental pollutants that dull your driveway's appearance.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-yellow-100 hover:border-yellow-200 transition-colors">
                <CardContent className="p-6">
                  <img src="/lovable-uploads/5f513861-3c9c-4e8c-a0f1-254574396881.png" alt="Weeds" className="h-12 w-12 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Weeds & Growth</h3>
                  <p className="text-gray-600">
                    Weeds growing through cracks and organic matter buildup in expansion joints.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Benefits of Professional Driveway Cleaning</h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Boost Curb Appeal</h3>
                    <p className="text-gray-600">A clean driveway dramatically improves your home's first impression and overall appearance.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Increase Property Value</h3>
                    <p className="text-gray-600">Well-maintained driveways add value to your property and appeal to potential buyers.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Prevent Damage</h3>
                    <p className="text-gray-600">Regular cleaning prevents permanent staining and surface deterioration.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Safety Improvement</h3>
                    <p className="text-gray-600">Remove slippery algae and moss that can cause dangerous falls.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Extend Surface Life</h3>
                    <p className="text-gray-600">Professional cleaning helps prevent cracking and extends your driveway's lifespan.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Environmental Benefits</h3>
                    <p className="text-gray-600">Proper cleaning prevents contaminants from entering storm drains and waterways.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg" className="bg-bc-red hover:bg-red-700 text-lg font-bold">
                <Link to="/calculator">Schedule Driveway Cleaning</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Professional Cleaning Process</h2>
            
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-bc-red text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="text-lg font-semibold mb-3">Surface Assessment</h3>
                <p className="text-gray-600 text-sm">We evaluate your driveway's material and identify specific stains and problem areas.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-bc-red text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="text-lg font-semibold mb-3">Pre-Treatment</h3>
                <p className="text-gray-600 text-sm">Apply specialized degreasers and stain removers to break down stubborn spots.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-bc-red text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="text-lg font-semibold mb-3">Pressure Washing</h3>
                <p className="text-gray-600 text-sm">Use professional equipment with appropriate pressure for your surface type.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-bc-red text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
                <h3 className="text-lg font-semibold mb-3">Final Inspection</h3>
                <p className="text-gray-600 text-sm">Thorough review to ensure complete cleaning and customer satisfaction.</p>
              </div>
            </div>
          </div>
        </section>

        <TestimonialsSection />

        <FAQSection
          title="Frequently Asked Questions About Driveway Cleaning"
          subtitle="Get answers to common questions about our professional driveway cleaning services"
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
            <h2 className="text-3xl font-bold mb-6">Ready for a Spotless Driveway?</h2>
            <p className="text-xl mb-8">
              Contact us today for a free estimate and transform your driveway's appearance with our professional cleaning services.
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

export default DrivewayoCleaning;
