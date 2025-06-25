
import React from 'react';
import Layout from '../../components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Shield, TreePine } from 'lucide-react';
import { Link } from 'react-router-dom';
import TestimonialsSection from '../../components/home/TestimonialsSection';
import FAQSection from '../../components/FAQSection';
import ServiceAreaMap from '@/components/ServiceAreaMap';

const FenceWashing = () => {
  const faqs = [
    {
      question: "What types of fences can you clean?",
      answer: "We clean all types of fencing including wood, vinyl, composite, aluminum, and wrought iron. Each material requires a different approach for optimal results."
    },
    {
      question: "Will pressure washing damage my wood fence?",
      answer: "We use appropriate pressure levels for each fence type. For wood fences, we typically use soft washing or low pressure to avoid damaging the wood fibers."
    },
    {
      question: "How often should I have my fence cleaned?",
      answer: "Most fences benefit from annual cleaning. Wood fences in shaded areas may need cleaning twice yearly due to increased moss and algae growth."
    },
    {
      question: "Do you clean both sides of the fence?",
      answer: "Yes, we clean both sides of your fence when accessible. We'll discuss access requirements and any neighbor considerations during our assessment."
    },
    {
      question: "Can you remove graffiti from fences?",
      answer: "Yes, we have specialized techniques and solutions for graffiti removal on most fence materials. Results vary depending on the type of paint and how long it's been there."
    }
  ];

  return (
    <Layout
      title="Fence Washing Services in Surrey & White Rock | BC Pressure Washing"
      description="Professional fence cleaning for wood, vinyl, and composite fencing. Restore your fence's appearance and extend its lifespan. Free estimates in Metro Vancouver."
    >
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-amber-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Professional Fence Washing Services
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Restore your fence's beauty and extend its lifespan with our specialized cleaning services
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

        {/* Fence Types We Clean */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Types of Fencing We Clean</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-2 border-amber-100 hover:border-amber-200 transition-colors">
                <CardContent className="p-6">
                  <TreePine className="h-12 w-12 text-amber-600 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Wood Fencing</h3>
                  <p className="text-gray-600 mb-4">
                    Cedar, pine, and treated lumber fences. We use gentle soft washing to preserve wood integrity while removing dirt, moss, and algae.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Cedar fence cleaning</li>
                    <li>• Pressure-treated lumber</li>
                    <li>• Picket fences</li>
                    <li>• Privacy fences</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-100 hover:border-blue-200 transition-colors">
                <CardContent className="p-6">
                  <img src="/lovable-uploads/b18323e2-db3c-4f96-af15-171ee39301bc.png" alt="Vinyl Fence" className="h-12 w-12 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Vinyl Fencing</h3>
                  <p className="text-gray-600 mb-4">
                    PVC and vinyl fences that have lost their bright white appearance. We restore them to like-new condition.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• White vinyl fencing</li>
                    <li>• Colored vinyl panels</li>
                    <li>• PVC privacy fences</li>
                    <li>• Decorative vinyl fencing</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-100 hover:border-green-200 transition-colors">
                <CardContent className="p-6">
                  <Shield className="h-12 w-12 text-green-600 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Metal & Composite</h3>
                  <p className="text-gray-600 mb-4">
                    Aluminum, steel, wrought iron, and composite materials require specialized cleaning approaches.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Aluminum fencing</li>
                    <li>• Wrought iron gates</li>
                    <li>• Composite materials</li>
                    <li>• Chain link fencing</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Clean Your Fence Regularly</h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Restore Curb Appeal</h3>
                    <p className="text-gray-600">A clean fence dramatically improves your property's appearance and can increase home value.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Extend Fence Lifespan</h3>
                    <p className="text-gray-600">Regular cleaning prevents rot, decay, and material breakdown, saving you money on replacements.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Prevent Damage</h3>
                    <p className="text-gray-600">Remove harmful mold, mildew, and organic growth before they cause permanent damage.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Better Staining Results</h3>
                    <p className="text-gray-600">Clean fences absorb stain and sealers more evenly, providing better protection and appearance.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Neighbor Relations</h3>
                    <p className="text-gray-600">A well-maintained fence shows consideration for your neighbors and community.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Prepare for Maintenance</h3>
                    <p className="text-gray-600">Clean fencing is essential before applying stains, sealers, or making repairs.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg" className="bg-bc-red hover:bg-red-700 text-lg font-bold">
                <Link to="/calculator">Schedule Fence Cleaning</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Fence Cleaning Process</h2>
            
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-bc-red text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="text-lg font-semibold mb-3">Assessment</h3>
                <p className="text-gray-600 text-sm">We inspect your fence material and condition to determine the best cleaning method.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-bc-red text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="text-lg font-semibold mb-3">Pre-Treatment</h3>
                <p className="text-gray-600 text-sm">Apply specialized cleaning solutions to break down dirt, mold, and organic growth.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-bc-red text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="text-lg font-semibold mb-3">Cleaning</h3>
                <p className="text-gray-600 text-sm">Use appropriate pressure and technique for your specific fence material and condition.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-bc-red text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
                <h3 className="text-lg font-semibold mb-3">Final Rinse</h3>
                <p className="text-gray-600 text-sm">Thorough rinse and inspection to ensure complete cleaning and customer satisfaction.</p>
              </div>
            </div>
          </div>
        </section>

        <TestimonialsSection />

        <FAQSection
          title="Frequently Asked Questions About Fence Washing"
          subtitle="Get answers to common questions about our professional fence cleaning services"
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
            <h2 className="text-3xl font-bold mb-6">Ready to Restore Your Fence?</h2>
            <p className="text-xl mb-8">
              Contact us today for a free estimate and see how professional fence washing can transform your property's appearance.
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

export default FenceWashing;
