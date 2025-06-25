
import React from 'react';
import Layout from '../../components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Shield, AlertTriangle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import TestimonialsSection from '../../components/home/TestimonialsSection';
import FAQSection from '../../components/FAQSection';
import ServiceAreaMap from '@/components/ServiceAreaMap';

const RoofCleaning = () => {
  const faqs = [
    {
      question: "Is soft washing safe for my roof?",
      answer: "Yes, soft washing is the safest method for roof cleaning. We use low pressure (under 100 PSI) and specialized cleaning solutions that won't damage shingles or void your warranty."
    },
    {
      question: "How often should I have my roof soft washed?",
      answer: "Most roofs benefit from soft washing every 2-3 years. However, homes in heavily shaded areas or near trees may need cleaning more frequently to prevent moss buildup."
    },
    {
      question: "Will the cleaning solution harm my plants?",
      answer: "We use biodegradable, eco-friendly cleaning solutions and take precautions to protect your landscaping. We pre-wet plants and rinse thoroughly after treatment."
    },
    {
      question: "How long does the moss removal process take?",
      answer: "Most residential roof cleaning takes 3-5 hours. The cleaning solution continues working for several days after application, gradually removing dead moss and algae."
    },
    {
      question: "Do you offer a guarantee on moss removal?",
      answer: "Yes! We offer a 2-year moss-free guarantee. If moss returns within 2 years, we'll retreat your roof at no additional charge."
    }
  ];

  return (
    <Layout
      title="Soft Wash Roof Cleaning in Surrey & White Rock | BC Pressure Washing"
      description="Safe, effective moss removal that protects your roof and increases your home's value. 2-year moss-free guarantee. Licensed & insured roof cleaning experts."
    >
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-green-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Soft Wash Roof Cleaning
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Safe, effective moss removal that protects your roof and increases your home's value
              </p>
              
              <div className="flex items-center justify-center gap-8 mb-8">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="font-semibold">Licensed & Insured</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">2-Year Moss-Free Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="font-semibold">5-Star Google Rated</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button asChild size="lg" className="bg-bc-red hover:bg-red-700 text-lg font-bold">
                  <Link to="/calculator">Check Prices & Availability</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-bc-red text-bc-red hover:bg-red-50">
                  <Link to="/calculator">Get Quote</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Soft Wash vs Pressure Washing Comparison */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Soft Wash is Better Than Pressure Washing</h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Protect your roof investment with the safe, effective cleaning method recommended by roofing professionals
            </p>

            <div className="max-w-5xl mx-auto">
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-4 text-left font-semibold text-gray-900">Method</th>
                      <th className="px-6 py-4 text-center font-semibold text-green-700">
                        Soft Wash (Recommended)
                      </th>
                      <th className="px-6 py-4 text-center font-semibold text-red-700">
                        High Pressure (Not Recommended)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-6 py-4 font-medium">Pressure Level</td>
                      <td className="px-6 py-4 text-center text-green-700">
                        <CheckCircle className="w-5 h-5 inline mr-2" />
                        Low pressure (under 100 PSI) - safe for all roof types
                      </td>
                      <td className="px-6 py-4 text-center text-red-700">
                        <AlertTriangle className="w-5 h-5 inline mr-2" />
                        High pressure can damage shingles
                      </td>
                    </tr>
                    <tr className="border-t bg-gray-50">
                      <td className="px-6 py-4 font-medium">Moss Removal</td>
                      <td className="px-6 py-4 text-center text-green-700">
                        <CheckCircle className="w-5 h-5 inline mr-2" />
                        Kills moss and algae at the root
                      </td>
                      <td className="px-6 py-4 text-center text-red-700">
                        <AlertTriangle className="w-5 h-5 inline mr-2" />
                        Only removes surface growth
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-6 py-4 font-medium">Longevity</td>
                      <td className="px-6 py-4 text-center text-green-700">
                        <CheckCircle className="w-5 h-5 inline mr-2" />
                        Prevents regrowth for 2-3 years
                      </td>
                      <td className="px-6 py-4 text-center text-red-700">
                        <AlertTriangle className="w-5 h-5 inline mr-2" />
                        Moss returns within months
                      </td>
                    </tr>
                    <tr className="border-t bg-gray-50">
                      <td className="px-6 py-4 font-medium">Roof Protection</td>
                      <td className="px-6 py-4 text-center text-green-700">
                        <CheckCircle className="w-5 h-5 inline mr-2" />
                        Preserves shingle granules and integrity
                      </td>
                      <td className="px-6 py-4 text-center text-red-700">
                        <AlertTriangle className="w-5 h-5 inline mr-2" />
                        Strips protective granules
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-6 py-4 font-medium">Warranty</td>
                      <td className="px-6 py-4 text-center text-green-700">
                        <CheckCircle className="w-5 h-5 inline mr-2" />
                        Won't void roof warranty
                      </td>
                      <td className="px-6 py-4 text-center text-red-700">
                        <AlertTriangle className="w-5 h-5 inline mr-2" />
                        May void manufacturer warranty
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-8 text-center">
                <Button asChild size="lg" className="bg-bc-red hover:bg-red-700 text-lg font-bold">
                  <Link to="/calculator">Check Price & Availability</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Professional Roof Soft Washing</h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Protect your investment with safe, effective moss removal that extends your roof's lifespan
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-2 border-blue-100 hover:border-blue-200 transition-colors">
                <CardContent className="p-6">
                  <Shield className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Prevents Roof Damage</h3>
                  <p className="text-gray-600">
                    Moss and algae can deteriorate roofing materials, leading to leaks and expensive repairs. Our soft wash technique safely removes growth without damage.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-100 hover:border-green-200 transition-colors">
                <CardContent className="p-6">
                  <img src="/lovable-uploads/c3789024-080d-4399-b348-ac2d5a1b744f.png" alt="Moss Removal" className="h-12 w-12 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Professional Moss Removal</h3>
                  <p className="text-gray-600">
                    Specialized treatment kills moss at the root and prevents regrowth for years, protecting your investment.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-100 hover:border-purple-200 transition-colors">
                <CardContent className="p-6">
                  <Star className="h-12 w-12 text-purple-600 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Boosts Curb Appeal</h3>
                  <p className="text-gray-600">
                    Remove unsightly black streaks and moss to dramatically improve your home's appearance and market value.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-orange-100 hover:border-orange-200 transition-colors">
                <CardContent className="p-6">
                  <CheckCircle className="h-12 w-12 text-orange-600 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Increases Roof Lifespan</h3>
                  <p className="text-gray-600">
                    Regular soft washing can add 5-10 years to your roof's life by preventing organic growth damage.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-100 hover:border-green-200 transition-colors">
                <CardContent className="p-6">
                  <img src="/lovable-uploads/bed5edc5-3ddc-443c-b591-b46a2d863422.png" alt="Eco-Friendly" className="h-12 w-12 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Eco-Friendly Process</h3>
                  <p className="text-gray-600">
                    Our biodegradable cleaning solutions are safe for your family, pets, and landscaping.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-100 hover:border-blue-200 transition-colors">
                <CardContent className="p-6">
                  <img src="/lovable-uploads/945062d9-44b6-4de9-8837-15314feb633a.png" alt="Energy Efficiency" className="h-12 w-12 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Energy Efficiency</h3>
                  <p className="text-gray-600">
                    Clean roofs reflect more heat, potentially reducing cooling costs by up to 15%.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Black Streak Removal Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Black Streak & Stain Removal</h2>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800">What We Remove</h3>
                  <p className="text-lg text-gray-700 mb-6">
                    Those black streaks on your roof aren't just cosmetic issues—they're actually colonies of algae (Gloeocapsa magnifera) 
                    that feed on the limestone filler in asphalt shingles. Beyond being unsightly, these organisms gradually break down your 
                    roofing materials. Our cleaning solution thoroughly eliminates these stains without damaging your roof's surface.
                  </p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                      <strong>* Black streaks can reduce your home's value by up to 5%</strong> according to real estate professionals
                    </p>
                  </div>
                </div>
                <div>
                  <img 
                    src="/lovable-uploads/47504564-617f-4553-85c8-0f9f5d5ec715.png" 
                    alt="Before and after roof cleaning showing black streak removal"
                    className="rounded-lg shadow-md w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Urgent CTA Section */}
        <section className="py-16 bg-gradient-to-r from-bc-red to-red-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Schedule Your Roof Cleaning</h2>
            <p className="text-xl mb-4">Fall Spots Filling Fast — Book Before Rain Returns!</p>
            <p className="text-lg mb-8 text-white/90">
              Don't let another wet season damage your roof. Our moss treatment works best when applied before heavy rains.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Button asChild variant="outline" size="lg" className="bg-white text-bc-red hover:bg-gray-100 border-white">
                <Link to="/calculator">Book Now - Limited Spots</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white text-bc-red hover:bg-gray-100 border-white">
                <a href="tel:7788087620">Call (778) 808-7620</a>
              </Button>
            </div>
          </div>
        </section>

        <TestimonialsSection />

        <FAQSection
          title="Frequently Asked Questions About Roof Soft Washing"
          subtitle="Get answers to common questions about our safe, effective roof cleaning process"
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
            <h2 className="text-3xl font-bold mb-6">Ready for a Cleaner, Safer Roof?</h2>
            <p className="text-xl mb-8">
              Contact us today for a free estimate and protect your home with our professional soft wash roof cleaning. 
              Prevent further damage by pairing with gutter cleaning and complete your exterior cleanup with crystal-clear windows.
            </p>
            
            <Button asChild variant="outline" size="lg" className="bg-white text-bc-red hover:bg-gray-100 border-white">
              <Link to="/calculator">Get Your Free Quote Today</Link>
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default RoofCleaning;
