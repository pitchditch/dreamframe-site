
import React from 'react';
import Layout from '../../components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Car, Shield, Clock, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import TestimonialsSection from '../../components/home/TestimonialsSection';
import FAQSection from '../../components/FAQSection';
import ServiceAreaMap from '@/components/ServiceAreaMap';

const ParkingLotCleaning = () => {
  const faqs = [
    {
      question: "How often should commercial parking lots be cleaned?",
      answer: "Most commercial parking lots benefit from cleaning 2-4 times per year. High-traffic areas may need monthly cleaning, while less busy lots can be cleaned seasonally."
    },
    {
      question: "Can you work around business hours?",
      answer: "Absolutely! We can schedule cleaning during off-hours, early mornings, evenings, or weekends to minimize disruption to your business."
    },
    {
      question: "Do you remove oil stains from parking lots?",
      answer: "Yes, we specialize in removing oil stains, tire marks, and other automotive fluid stains using industrial-grade degreasers and specialized equipment."
    },
    {
      question: "What about parking lot striping after cleaning?",
      answer: "We can coordinate with striping contractors or recommend trusted partners to refresh parking lot markings after cleaning if needed."
    },
    {
      question: "Are your services environmentally friendly?",
      answer: "We use eco-friendly cleaning solutions and proper containment methods to prevent runoff from entering storm drains or waterways."
    }
  ];

  return (
    <Layout
      title="Commercial Parking Lot Cleaning Services in Surrey & White Rock | BC Pressure Washing"
      description="Professional parking lot pressure washing and cleaning services. Remove oil stains, tire marks, and debris from commercial parking areas. Licensed and insured."
    >
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Commercial Parking Lot Cleaning
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Professional parking lot pressure washing to maintain a clean, safe, and professional appearance for your business
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button asChild size="lg" className="bg-bc-red hover:bg-red-700 text-lg font-bold">
                  <Link to="/calculator">Get Commercial Quote</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-bc-red text-bc-red hover:bg-red-50">
                  <a href="tel:7788087620">Call (778) 808-7620</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Clean Your Parking Lot */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Professional Parking Lot Cleaning Matters</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="border-2 border-blue-100 hover:border-blue-200 transition-colors">
                <CardContent className="p-6 text-center">
                  <Car className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">Professional Image</h3>
                  <p className="text-gray-600">
                    Create positive first impressions with a clean, well-maintained parking area
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-100 hover:border-green-200 transition-colors">
                <CardContent className="p-6 text-center">
                  <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">Safety First</h3>
                  <p className="text-gray-600">
                    Remove slippery substances and debris that could cause accidents
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-100 hover:border-purple-200 transition-colors">
                <CardContent className="p-6 text-center">
                  <img src="/lovable-uploads/bed5edc5-3ddc-443c-b591-b46a2d863422.png" alt="Environmental" className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">Environmental Compliance</h3>
                  <p className="text-gray-600">
                    Proper cleaning prevents contaminants from entering storm drains
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-orange-100 hover:border-orange-200 transition-colors">
                <CardContent className="p-6 text-center">
                  <Zap className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">Asset Protection</h3>
                  <p className="text-gray-600">
                    Extend pavement life by removing damaging substances before they penetrate
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What We Clean */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What We Remove from Parking Lots</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Oil & Automotive Fluids</h3>
                <p className="text-gray-600 mb-4">
                  Remove oil stains, transmission fluid, coolant, and other automotive leaks that create unsightly spots.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Motor oil stains</li>
                  <li>• Transmission fluid</li>
                  <li>• Power steering fluid</li>
                  <li>• Brake fluid spots</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Tire Marks & Rubber</h3>
                <p className="text-gray-600 mb-4">
                  Eliminate black tire marks, rubber buildup, and scuff marks from heavy vehicle traffic.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Tire skid marks</li>
                  <li>• Rubber buildup</li>
                  <li>• Burnout marks</li>
                  <li>• Loading dock scuffs</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Dirt & Debris</h3>
                <p className="text-gray-600 mb-4">
                  Clear away accumulated dirt, leaves, trash, and general debris that makes lots look unkempt.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• General dirt buildup</li>
                  <li>• Leaf accumulation</li>
                  <li>• Trash and litter</li>
                  <li>• Sand and salt residue</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Organic Growth</h3>
                <p className="text-gray-600 mb-4">
                  Remove moss, algae, and weeds that can make surfaces slippery and damage pavement.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Moss growth</li>
                  <li>• Algae buildup</li>
                  <li>• Weed removal</li>
                  <li>• Lichen treatment</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Gum & Adhesives</h3>
                <p className="text-gray-600 mb-4">
                  Specialized removal of chewing gum, tape residue, and other sticky substances.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Chewing gum spots</li>
                  <li>• Tape residue</li>
                  <li>• Sticker adhesive</li>
                  <li>• Paint drips</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Snow & Ice Treatment</h3>
                <p className="text-gray-600 mb-4">
                  Remove salt stains and residue from winter ice and snow removal treatments.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Road salt residue</li>
                  <li>• De-icer stains</li>
                  <li>• Sand accumulation</li>
                  <li>• Winter chemical buildup</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Our Process */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Professional Cleaning Process</h2>
            
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-bc-red text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="text-lg font-semibold mb-3">Site Assessment</h3>
                <p className="text-gray-600 text-sm">Evaluate the parking lot condition and identify problem areas that need special attention.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-bc-red text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="text-lg font-semibold mb-3">Pre-Treatment</h3>
                <p className="text-gray-600 text-sm">Apply specialized degreasers and cleaning agents to break down stubborn stains and buildup.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-bc-red text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="text-lg font-semibold mb-3">Power Washing</h3>
                <p className="text-gray-600 text-sm">Use commercial-grade pressure washing equipment to thoroughly clean all surfaces.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-bc-red text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
                <h3 className="text-lg font-semibold mb-3">Final Inspection</h3>
                <p className="text-gray-600 text-sm">Complete quality check and proper disposal of all cleaning materials and debris.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Benefits of Regular Parking Lot Cleaning</h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Enhanced Business Image</h3>
                    <p className="text-gray-600">A clean parking lot creates positive first impressions for customers and visitors.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Improved Safety</h3>
                    <p className="text-gray-600">Remove slippery substances and debris that could cause slips and falls.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Extend Pavement Life</h3>
                    <p className="text-gray-600">Regular cleaning prevents damage and extends the life of your parking lot surface.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Environmental Compliance</h3>
                    <p className="text-gray-600">Proper cleaning helps meet environmental regulations and prevents pollution.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Cost Savings</h3>
                    <p className="text-gray-600">Prevent costly repairs and premature replacement of parking lot surfaces.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Better Visibility</h3>
                    <p className="text-gray-600">Clean surfaces improve visibility of parking lines and safety markings.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg" className="bg-bc-red hover:bg-red-700 text-lg font-bold">
                <Link to="/calculator">Get Commercial Quote</Link>
              </Button>
            </div>
          </div>
        </section>

        <TestimonialsSection />

        <FAQSection
          title="Frequently Asked Questions About Parking Lot Cleaning"
          subtitle="Get answers to common questions about our commercial parking lot cleaning services"
          faqs={faqs}
        />

        {/* Service Areas */}
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Commercial Service Areas</h2>
            <ServiceAreaMap />
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-bc-red text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready for a Professional-Looking Parking Lot?</h2>
            <p className="text-xl mb-8">
              Contact us today for a free commercial cleaning estimate and enhance your business's professional image.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild variant="outline" size="lg" className="bg-white text-bc-red hover:bg-gray-100 border-white">
                <Link to="/calculator">Get Commercial Quote</Link>
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

export default ParkingLotCleaning;
