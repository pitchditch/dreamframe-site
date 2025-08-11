
import React from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, AlertTriangle, Droplets, Zap, Shield, Star, Clock, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const PressureWashing = () => {
  return (
    <Layout
      title="Pressure Washing Services - Surrey & White Rock | BC Pressure Washing"
      description="Professional pressure washing services in Surrey, White Rock & Metro Vancouver. Learn about our soft washing vs pressure washing methods."
    >
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Professional Pressure Washing Services
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Expert pressure washing and soft washing services in Surrey, White Rock & Metro Vancouver
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild variant="bc-red" size="lg" className="text-lg font-semibold">
                  <Link to="/calculator">Get Free Quote</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-bc-red text-bc-red hover:bg-bc-red hover:text-white">
                  <a href="tel:7788087620">Call (778) 808-7620</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-8 text-center">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-green-600" />
                <span className="font-medium">Fully Insured & Licensed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="font-medium">5-Star Google Reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-6 h-6 text-blue-600" />
                <span className="font-medium">Same-Day Service Available</span>
              </div>
            </div>
          </div>
        </section>

        {/* Soft Washing vs Pressure Washing Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Droplets className="h-8 w-8 text-blue-600" />
                <span className="text-4xl">🧼</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Soft Washing vs. Pressure Washing
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                What's the Difference – and Why It Matters for Your Home
              </p>
              <p className="text-lg text-gray-700 mt-4 max-w-4xl mx-auto">
                Not all exterior cleaning is created equal. At BC Pressure Washing, we use both soft washing and pressure washing depending on the surface and level of grime. Here's how they differ:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Soft Washing Card */}
              <Card className="border-2 border-blue-200 hover:border-blue-300 transition-colors">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Droplets className="h-8 w-8 text-blue-600" />
                    <h3 className="text-2xl font-bold text-gray-900">Soft Washing</h3>
                    <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
                      Gentle & Effective
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-semibold text-gray-900">Ideal for:</span>
                      </div>
                      <p className="text-gray-700 ml-7">Siding, roofs, painted surfaces, vinyl, and wood</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-semibold text-gray-900">Method:</span>
                      </div>
                      <p className="text-gray-700 ml-7">Low-pressure rinse + eco-safe cleaning solution</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-semibold text-gray-900">Purpose:</span>
                      </div>
                      <p className="text-gray-700 ml-7">Kills mold, algae, mildew, and organic buildup</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-semibold text-gray-900">Won't damage:</span>
                      </div>
                      <p className="text-gray-700 ml-7">Paint, shingles, or delicate finishes</p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800 font-medium">
                      We always use soft washing on roofs and home exteriors to preserve materials and deliver long-lasting results.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Pressure Washing Card */}
              <Card className="border-2 border-orange-200 hover:border-orange-300 transition-colors">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Zap className="h-8 w-8 text-orange-600" />
                    <h3 className="text-2xl font-bold text-gray-900">Pressure Washing</h3>
                    <span className="text-sm bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-medium">
                      Powerful & Deep Cleaning
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-semibold text-gray-900">Ideal for:</span>
                      </div>
                      <p className="text-gray-700 ml-7">Concrete driveways, patios, pavers, decks</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-semibold text-gray-900">Method:</span>
                      </div>
                      <p className="text-gray-700 ml-7">High-pressure water spray</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-semibold text-gray-900">Purpose:</span>
                      </div>
                      <p className="text-gray-700 ml-7">Removes tough dirt, grease, moss, and surface stains</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-5 w-5 text-orange-600" />
                        <span className="font-semibold text-gray-900">Used with caution:</span>
                      </div>
                      <p className="text-gray-700 ml-7">Only where safe for hard surfaces</p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                    <p className="text-sm text-orange-800 font-medium">
                      Our team uses commercial-grade surface cleaners to make your driveway look brand new — without striping or damage.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Which Is Right Section */}
            <div className="text-center bg-white rounded-xl p-8 shadow-lg max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <h3 className="text-2xl font-bold text-gray-900">Which Is Right for You?</h3>
              </div>
              <p className="text-lg text-gray-700 mb-6">
                Don't worry — we assess every job personally to choose the right method. That's why every job is inspected by Jayden, the owner himself.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Link to="/calculator">
                    🔎 Get Free Estimate
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  <Link to="/services">
                    Learn More About Our Services
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* What We Clean Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What We Clean</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🏠</span>
                </div>
                <h3 className="font-semibold mb-2">House Siding</h3>
                <p className="text-sm text-gray-600">Vinyl, stucco, brick, wood</p>
              </div>
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🚗</span>
                </div>
                <h3 className="font-semibold mb-2">Driveways</h3>
                <p className="text-sm text-gray-600">Concrete, asphalt, pavers</p>
              </div>
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🌲</span>
                </div>
                <h3 className="font-semibold mb-2">Decks & Patios</h3>
                <p className="text-sm text-gray-600">Wood, composite, stone</p>
              </div>
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🚪</span>
                </div>
                <h3 className="font-semibold mb-2">Fences</h3>
                <p className="text-sm text-gray-600">Wood, vinyl, metal</p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Professional Process</h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-bc-red text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="text-xl font-semibold mb-3">Inspection & Assessment</h3>
                <p className="text-gray-600">We evaluate your property's needs and choose the safest, most effective cleaning method.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-bc-red text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="text-xl font-semibold mb-3">Professional Cleaning</h3>
                <p className="text-gray-600">Using commercial-grade equipment and eco-friendly solutions for optimal results.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-bc-red text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="text-xl font-semibold mb-3">Quality Check</h3>
                <p className="text-gray-600">Final inspection to ensure every surface meets our high standards.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose BC Pressure Washing?</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="text-center p-6">
                <Shield className="w-12 h-12 text-bc-red mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Fully Insured</h3>
                <p className="text-gray-600">Complete liability coverage for your peace of mind.</p>
              </div>
              <div className="text-center p-6">
                <Star className="w-12 h-12 text-bc-red mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">5-Star Rated</h3>
                <p className="text-gray-600">Consistently high ratings from satisfied customers.</p>
              </div>
              <div className="text-center p-6">
                <Clock className="w-12 h-12 text-bc-red mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Prompt Service</h3>
                <p className="text-gray-600">Same-day and next-day appointments available.</p>
              </div>
              <div className="text-center p-6">
                <Droplets className="w-12 h-12 text-bc-red mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Eco-Friendly</h3>
                <p className="text-gray-600">Biodegradable cleaning solutions safe for your family and pets.</p>
              </div>
              <div className="text-center p-6">
                <CheckCircle className="w-12 h-12 text-bc-red mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Satisfaction Guaranteed</h3>
                <p className="text-gray-600">100% satisfaction or we'll make it right.</p>
              </div>
              <div className="text-center p-6">
                <Phone className="w-12 h-12 text-bc-red mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Local & Reliable</h3>
                <p className="text-gray-600">Surrey-based team serving Metro Vancouver.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Areas We Serve</h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-white p-4 rounded-lg shadow-sm">Surrey</div>
                <div className="bg-white p-4 rounded-lg shadow-sm">White Rock</div>
                <div className="bg-white p-4 rounded-lg shadow-sm">Langley</div>
                <div className="bg-white p-4 rounded-lg shadow-sm">Delta</div>
                <div className="bg-white p-4 rounded-lg shadow-sm">Richmond</div>
                <div className="bg-white p-4 rounded-lg shadow-sm">Burnaby</div>
                <div className="bg-white p-4 rounded-lg shadow-sm">Vancouver</div>
                <div className="bg-white p-4 rounded-lg shadow-sm">New Westminster</div>
              </div>
              <p className="text-center text-gray-600 mt-6">
                Don't see your city? <a href="tel:7788087620" className="text-bc-red hover:underline">Call us</a> - we may still service your area!
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-bc-red text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Property?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Get professional pressure washing that protects and beautifies your home or business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Button asChild variant="outline" size="lg" className="bg-white text-bc-red hover:bg-gray-100 border-white">
                <Link to="/calculator">Get Free Quote</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <a href="tel:7788087620">Call (778) 808-7620</a>
              </Button>
            </div>
            <div className="text-sm opacity-90">
              <Mail className="inline w-4 h-4 mr-1" />
              info@bcpressurewashing.ca
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default PressureWashing;
