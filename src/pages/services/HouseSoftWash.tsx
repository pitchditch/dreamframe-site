
import React from 'react';
import Layout from '../../components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Shield, Home, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';
import TestimonialsSection from '../../components/home/TestimonialsSection';
import FAQSection from '../../components/FAQSection';
import ServiceAreaMap from '@/components/ServiceAreaMap';

const HouseSoftWash = () => {
  const faqs = [
    {
      question: "What is soft washing and how is it different from pressure washing?",
      answer: "Soft washing uses low pressure (under 100 PSI) combined with specialized cleaning solutions to safely clean exterior surfaces. Unlike pressure washing, it won't damage siding, paint, or delicate materials."
    },
    {
      question: "Is soft washing safe for all types of siding?",
      answer: "Yes! Soft washing is safe for vinyl, wood, stucco, brick, fiber cement, and all other common siding materials. The low pressure and gentle cleaning solutions won't cause damage."
    },
    {
      question: "How often should I have my house soft washed?",
      answer: "Most homes benefit from soft washing every 1-2 years. Homes in shaded areas or near trees may need cleaning more frequently due to increased organic growth."
    },
    {
      question: "Will soft washing harm my landscaping?",
      answer: "No, we use biodegradable, eco-friendly cleaning solutions and take precautions to protect your plants. We pre-wet vegetation and rinse thoroughly after cleaning."
    },
    {
      question: "How long does the cleaning last?",
      answer: "Soft washing results typically last 2-3 times longer than pressure washing alone because the cleaning solutions kill organic growth at the source, preventing quick regrowth."
    }
  ];

  return (
    <Layout
      title="House Soft Washing Services in Surrey & White Rock | BC Pressure Washing"
      description="Safe, effective house exterior cleaning with soft wash technology. Removes dirt, mold, and algae without damage. Professional house washing in Metro Vancouver."
    >
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-green-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                House Soft Washing Services
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Safe, low-pressure house washing that removes dirt, algae, and mildew without damaging your home's exterior
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

        {/* Why Choose Soft Washing */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Soft Washing for Your Home</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <Card className="border-2 border-blue-100 hover:border-blue-200 transition-colors">
                <CardContent className="p-6 text-center">
                  <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">Safe for All Surfaces</h3>
                  <p className="text-gray-600">
                    Low pressure won't damage siding, paint, or delicate materials
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-100 hover:border-green-200 transition-colors">
                <CardContent className="p-6 text-center">
                  <Droplets className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">Deep Cleaning</h3>
                  <p className="text-gray-600">
                    Kills mold, algae, and bacteria at the root for longer-lasting results
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-100 hover:border-purple-200 transition-colors">
                <CardContent className="p-6 text-center">
                  <img src="/lovable-uploads/bed5edc5-3ddc-443c-b591-b46a2d863422.png" alt="Eco-Friendly" className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">Eco-Friendly</h3>
                  <p className="text-gray-600">
                    Biodegradable solutions safe for family, pets, and landscaping
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-orange-100 hover:border-orange-200 transition-colors">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">Long-Lasting</h3>
                  <p className="text-gray-600">
                    Results last 2-3x longer than pressure washing alone
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button asChild size="lg" className="bg-bc-red hover:bg-red-700 text-lg font-bold">
                <Link to="/calculator">Schedule Your House Washing</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* What We Clean */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What We Remove from Your Home's Exterior</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Dirt & Grime</h3>
                <p className="text-gray-600">
                  Years of accumulated dirt, dust, and environmental pollutants that dull your home's appearance.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Mold & Mildew</h3>
                <p className="text-gray-600">
                  Organic growth that can cause health issues and damage your siding over time.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Algae & Moss</h3>
                <p className="text-gray-600">
                  Green and black organic growth that feeds on your siding materials and creates unsightly stains.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Spider Webs</h3>
                <p className="text-gray-600">
                  Webs and egg sacs in corners, eaves, and hard-to-reach areas around your home.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Pollen & Stains</h3>
                <p className="text-gray-600">
                  Seasonal pollen buildup and various stains that accumulate on exterior surfaces.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Oxidation</h3>
                <p className="text-gray-600">
                  Chalky residue from aged paint and siding that makes colors appear faded and dull.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Professional Soft Washing Process</h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-bc-red text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="text-xl font-semibold mb-4">Pre-Treatment Assessment</h3>
                <p className="text-gray-600">We inspect your home's exterior to identify problem areas and determine the best cleaning approach for each surface.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-bc-red text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="text-xl font-semibold mb-4">Soft Wash Application</h3>
                <p className="text-gray-600">We apply our eco-friendly cleaning solution using low pressure to safely clean and disinfect all surfaces.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-bc-red text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="text-xl font-semibold mb-4">Thorough Rinse & Inspection</h3>
                <p className="text-gray-600">We carefully rinse all surfaces and perform a final inspection to ensure complete cleaning and customer satisfaction.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Before/After Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Amazing Transformations</h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <img 
                    src="/lovable-uploads/ef54ad3a-1e61-4d1e-b827-b556187487ef.png" 
                    alt="House before soft washing - dirty siding"
                    className="rounded-lg shadow-md w-full h-auto"
                  />
                  <p className="text-center mt-2 text-gray-600 font-medium">Before: Dirty, stained siding</p>
                </div>
                <div>
                  <img 
                    src="/lovable-uploads/77a691e2-8b93-4749-be35-5ca5bbf137b3.png" 
                    alt="House after soft washing - clean siding"
                    className="rounded-lg shadow-md w-full h-auto"
                  />
                  <p className="text-center mt-2 text-gray-600 font-medium">After: Like-new appearance</p>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <p className="text-lg text-gray-700 mb-6">
                  See the dramatic difference soft washing makes! Your home will look years newer and increase in value.
                </p>
                <Button asChild size="lg" className="bg-bc-red hover:bg-red-700 text-lg font-bold">
                  <Link to="/calculator">Transform Your Home Today</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <TestimonialsSection />

        <FAQSection
          title="Frequently Asked Questions About House Soft Washing"
          subtitle="Get answers to common questions about our safe, effective house cleaning process"
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
            <h2 className="text-3xl font-bold mb-6">Ready to Restore Your Home's Beauty?</h2>
            <p className="text-xl mb-8">
              Contact us today for a free estimate and see the amazing difference professional soft washing makes for your home's exterior.
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

export default HouseSoftWash;
