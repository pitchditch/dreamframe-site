
import React from 'react';
import Layout from '../../components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Building, Shield, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import TestimonialsSection from '../../components/home/TestimonialsSection';
import FAQSection from '../../components/FAQSection';
import ServiceAreaMap from '@/components/ServiceAreaMap';

const CommercialBuildingWashing = () => {
  const faqs = [
    {
      question: "What types of commercial buildings do you service?",
      answer: "We service all types of commercial properties including office buildings, retail stores, restaurants, warehouses, medical facilities, and multi-unit residential complexes."
    },
    {
      question: "Do you work around business hours?",
      answer: "Yes, we can schedule our services during off-hours, weekends, or holidays to minimize disruption to your business operations."
    },
    {
      question: "Are you licensed and insured for commercial work?",
      answer: "Absolutely. We carry comprehensive commercial liability insurance and are fully licensed for commercial building washing services."
    },
    {
      question: "Can you provide regular maintenance schedules?",
      answer: "Yes, we offer customized maintenance programs with scheduled cleanings throughout the year to keep your building looking its best."
    },
    {
      question: "Do you use eco-friendly cleaning solutions?",
      answer: "We use biodegradable, environmentally-safe cleaning solutions that are effective while being safe for your landscaping and the environment."
    }
  ];

  return (
    <Layout
      title="Commercial Building Washing Services in Surrey & White Rock | BC Pressure Washing"
      description="Professional commercial building cleaning services. Expert pressure washing for office buildings, retail stores, and commercial properties. Licensed and insured."
    >
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Commercial Building Washing Services
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Professional exterior cleaning for commercial properties. Maintain your building's professional appearance and protect your investment.
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

        {/* Why Choose Us for Commercial */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Businesses Choose Us</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="border-2 border-blue-100 hover:border-blue-200 transition-colors">
                <CardContent className="p-6 text-center">
                  <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">Fully Insured</h3>
                  <p className="text-gray-600">
                    Comprehensive commercial liability insurance for your peace of mind
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-100 hover:border-green-200 transition-colors">
                <CardContent className="p-6 text-center">
                  <Clock className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">Flexible Scheduling</h3>
                  <p className="text-gray-600">
                    Work around your business hours to minimize disruption
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-100 hover:border-purple-200 transition-colors">
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">Professional Team</h3>
                  <p className="text-gray-600">
                    Trained, uniformed professionals who represent your business well
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-orange-100 hover:border-orange-200 transition-colors">
                <CardContent className="p-6 text-center">
                  <Building className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">Commercial Experience</h3>
                  <p className="text-gray-600">
                    Extensive experience with all types of commercial properties
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Services We Provide */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Commercial Building Services</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Exterior Wall Cleaning</h3>
                <p className="text-gray-600 mb-4">
                  Complete building exterior cleaning including brick, concrete, stucco, and metal siding.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Brick and masonry cleaning</li>
                  <li>• Concrete wall washing</li>
                  <li>• Stucco surface cleaning</li>
                  <li>• Metal siding restoration</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Storefront Cleaning</h3>
                <p className="text-gray-600 mb-4">
                  Professional storefront washing to maintain your business's professional appearance.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Window and glass cleaning</li>
                  <li>• Entrance area washing</li>
                  <li>• Sign cleaning</li>
                  <li>• Awning maintenance</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Parking Areas</h3>
                <p className="text-gray-600 mb-4">
                  Clean and maintain parking lots, sidewalks, and exterior common areas.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Parking lot cleaning</li>
                  <li>• Sidewalk washing</li>
                  <li>• Loading dock cleaning</li>
                  <li>• Dumpster area maintenance</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Multi-Unit Buildings</h3>
                <p className="text-gray-600 mb-4">
                  Specialized cleaning for apartment complexes, condominiums, and townhouse developments.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Building exterior washing</li>
                  <li>• Balcony cleaning</li>
                  <li>• Common area maintenance</li>
                  <li>• Stairwell cleaning</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Industrial Facilities</h3>
                <p className="text-gray-600 mb-4">
                  Heavy-duty cleaning for warehouses, manufacturing facilities, and industrial buildings.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Warehouse exterior cleaning</li>
                  <li>• Loading bay washing</li>
                  <li>• Industrial equipment cleaning</li>
                  <li>• Safety area maintenance</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Maintenance Programs</h3>
                <p className="text-gray-600 mb-4">
                  Scheduled cleaning programs to keep your property looking professional year-round.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Monthly cleaning schedules</li>
                  <li>• Quarterly maintenance</li>
                  <li>• Seasonal deep cleaning</li>
                  <li>• Emergency cleaning services</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Benefits of Professional Commercial Cleaning</h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Professional Image</h3>
                    <p className="text-gray-600">Maintain a clean, professional appearance that reflects well on your business.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Customer Attraction</h3>
                    <p className="text-gray-600">A clean building attracts more customers and creates positive first impressions.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Property Protection</h3>
                    <p className="text-gray-600">Regular cleaning prevents damage and extends the life of your building materials.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Cost Savings</h3>
                    <p className="text-gray-600">Prevent costly repairs and replacements with regular maintenance cleaning.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Health & Safety</h3>
                    <p className="text-gray-600">Remove slippery substances and maintain safe walking surfaces for employees and customers.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Tenant Satisfaction</h3>
                    <p className="text-gray-600">Keep tenants happy with well-maintained common areas and building exteriors.</p>
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
          title="Frequently Asked Questions About Commercial Building Washing"
          subtitle="Get answers to common questions about our commercial cleaning services"
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
            <h2 className="text-3xl font-bold mb-6">Ready to Enhance Your Business Image?</h2>
            <p className="text-xl mb-8">
              Contact us today for a free commercial cleaning estimate and see how we can help maintain your property's professional appearance.
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

export default CommercialBuildingWashing;
