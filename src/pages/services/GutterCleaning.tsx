
import React from 'react';
import Layout from '../../components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Shield, Droplets, Home, AlertTriangle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import TestimonialsSection from '../../components/home/TestimonialsSection';
import FAQSection from '../../components/FAQSection';
import ServiceAreaMap from '@/components/ServiceAreaMap';

const GutterCleaning = () => {
  const faqs = [
    {
      question: "How often should I have my gutters cleaned?",
      answer: "Most homes should have gutters cleaned twice a year - once in spring and once in fall. Homes with many trees nearby may need cleaning 3-4 times per year."
    },
    {
      question: "What happens if I don't clean my gutters?",
      answer: "Clogged gutters can cause water damage to your foundation, roof, and siding. They can also lead to ice dams in winter and pest infestations. Repair costs can reach $5,000 or more."
    },
    {
      question: "Do you install gutter guards?",
      answer: "Yes! We offer professional gutter guard installation including our premium Gutter Stick system that reduces cleaning frequency by up to 90%."
    },
    {
      question: "How long does gutter cleaning take?",
      answer: "Most residential gutter cleaning takes 2-4 hours depending on the size of your home and the amount of debris. We'll provide an estimated time when you book."
    },
    {
      question: "Do I need to be home during the service?",
      answer: "No, you don't need to be home as long as we have access to your property. We'll send you before and after photos and leave a detailed service report."
    }
  ];

  return (
    <Layout
      title="Gutter Cleaning in Surrey & White Rock | BC Pressure Washing"
      description="Prevent costly water damage with professional gutter cleaning in Surrey, White Rock & Metro Vancouver. Starting at $129. Licensed, insured, 5-star rated."
    >
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Gutter Cleaning in Surrey & White Rock
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Prevent Costly Water Damage
              </p>
              <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
                Affordable, thorough gutter cleaning in Surrey, White Rock, and Metro Vancouver. Protect your home from damage starting at just $129!
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
                  <Home className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">100+ Happy Customers</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button asChild size="lg" className="bg-bc-red hover:bg-red-700 text-lg font-bold">
                  <Link to="/calculator">Get Instant Price - No Email Required</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-bc-red text-bc-red hover:bg-red-50">
                  <a href="tel:7788087620">📞 Call Now: (778) 808-7620</a>
                </Button>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-2xl mx-auto">
                <div className="flex items-center gap-2 text-red-800">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-semibold">Only 5 fall cleaning slots left this week!</span>
                </div>
                <p className="text-red-700 text-sm mt-1">
                  Clogged gutters can cause $5,000+ in damages.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Regular Gutter Cleaning is Essential */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Regular Gutter Cleaning is Essential</h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Protect your home's structural integrity and prevent costly damage with our professional gutter cleaning services
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-2 border-blue-100 hover:border-blue-200 transition-colors">
                <CardContent className="p-6">
                  <Droplets className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Prevent Water Damage</h3>
                  <p className="text-gray-600">
                    Clogged gutters can cause water to overflow and damage your home's foundation, walls, and landscaping.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-100 hover:border-green-200 transition-colors">
                <CardContent className="p-6">
                  <img src="/lovable-uploads/4c194a64-57a3-4315-baab-181509b591a1.png" alt="Pest Prevention" className="h-12 w-12 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Avoid Pest Infestations</h3>
                  <p className="text-gray-600">
                    Debris-filled gutters create perfect breeding grounds for mosquitoes, rodents, and other pests.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-100 hover:border-purple-200 transition-colors">
                <CardContent className="p-6">
                  <Shield className="h-12 w-12 text-purple-600 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Extend Gutter Lifespan</h3>
                  <p className="text-gray-600">
                    Regular cleaning prevents rust and deterioration, adding years to your gutter system.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-orange-100 hover:border-orange-200 transition-colors">
                <CardContent className="p-6">
                  <Home className="h-12 w-12 text-orange-600 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Protect Roof & Fascia</h3>
                  <p className="text-gray-600">
                    Prevent water backup that can damage shingles, roof underlayment, and fascia boards.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-cyan-100 hover:border-cyan-200 transition-colors">
                <CardContent className="p-6">
                  <img src="/lovable-uploads/c3789024-080d-4399-b348-ac2d5a1b744f.png" alt="Ice Dam Prevention" className="h-12 w-12 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Prevent Ice Dams</h3>
                  <p className="text-gray-600">
                    Clean gutters help prevent ice dams in winter that can cause serious roof and interior damage.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-pink-100 hover:border-pink-200 transition-colors">
                <CardContent className="p-6">
                  <Star className="h-12 w-12 text-pink-600 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Maintain Curb Appeal</h3>
                  <p className="text-gray-600">
                    Clean, well-functioning gutters enhance your home's appearance and value.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg" className="bg-bc-red hover:bg-red-700 text-lg font-bold">
                <Link to="/calculator">Check Prices & Availability</Link>
              </Button>
              <p className="text-gray-600 mt-2">From just $129 - Get your instant quote!</p>
            </div>
          </div>
        </section>

        {/* Gutter Protection Options */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Choose Your Gutter Protection Level</h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Compare our gutter protection options to find the perfect solution for your home
            </p>

            <div className="max-w-4xl mx-auto">
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-4 text-left font-semibold text-gray-900">Feature</th>
                      <th className="px-6 py-4 text-center font-semibold text-gray-900">
                        <div>Gutter Sticks</div>
                        <div className="text-sm font-normal text-gray-600">Budget Option</div>
                      </th>
                      <th className="px-6 py-4 text-center font-semibold text-gray-900">
                        <div>Gutter Guards</div>
                        <div className="text-sm font-normal text-gray-600">Premium</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-6 py-4 font-medium">Prevents Leaf Buildup</td>
                      <td className="px-6 py-4 text-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                      </td>
                    </tr>
                    <tr className="border-t bg-gray-50">
                      <td className="px-6 py-4 font-medium">Easy Installation</td>
                      <td className="px-6 py-4 text-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                      </td>
                      <td className="px-6 py-4 text-center text-sm">Professional Required</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-6 py-4 font-medium">Blocks Small Debris</td>
                      <td className="px-6 py-4 text-center text-sm">Partial</td>
                      <td className="px-6 py-4 text-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                      </td>
                    </tr>
                    <tr className="border-t bg-gray-50">
                      <td className="px-6 py-4 font-medium">Reduces Cleaning Frequency</td>
                      <td className="px-6 py-4 text-center">50%</td>
                      <td className="px-6 py-4 text-center">90%</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-6 py-4 font-medium">Warranty</td>
                      <td className="px-6 py-4 text-center">1 Year</td>
                      <td className="px-6 py-4 text-center">5 Years</td>
                    </tr>
                    <tr className="border-t bg-gray-50">
                      <td className="px-6 py-4 font-medium">Starting Price</td>
                      <td className="px-6 py-4 text-center">
                        <div className="font-bold text-lg">$199</div>
                        <div className="text-sm text-gray-600">+ Installation</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="font-bold text-lg">$499</div>
                        <div className="text-sm text-gray-600">Installed</div>
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-6 py-4"></td>
                      <td className="px-6 py-4 text-center">
                        <Button asChild variant="outline" className="border-bc-red text-bc-red hover:bg-red-50">
                          <Link to="/calculator">Get Quote</Link>
                        </Button>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Button asChild className="bg-bc-red hover:bg-red-700">
                          <Link to="/calculator">Get Quote</Link>
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-lg text-gray-700 mb-4">
                  Not sure which option is right for you? Our experts can help you choose based on your specific needs.
                </p>
                <Button asChild variant="outline" size="lg" className="border-bc-red text-bc-red hover:bg-red-50">
                  <a href="tel:7788087620">Call for Free Consultation: (778) 808-7620</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Serving Gutter Cleaning Throughout Metro Vancouver</h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Professional gutter cleaning services across Surrey, White Rock, and surrounding communities
            </p>
            
            <ServiceAreaMap />
            
            <div className="mt-12 bg-blue-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4 text-center">Based in White Rock</h3>
              <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
                As local Surrey and White Rock gutter cleaning experts, we understand the unique challenges of Pacific Northwest weather. 
                Our team knows which areas are prone to heavy leaf buildup and how different neighborhoods require specialized gutter maintenance approaches.
              </p>
            </div>
          </div>
        </section>

        <TestimonialsSection />

        <FAQSection
          title="Frequently Asked Questions About Gutter Cleaning"
          subtitle="Get answers to common questions about our gutter cleaning services in Surrey, White Rock and Metro Vancouver"
          faqs={faqs}
        />

        {/* Final CTA */}
        <section className="py-16 bg-bc-red text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Fall Cleanings Fill Fast!</h2>
            <p className="text-xl mb-8">Book now before the next heavy rain. Don't let clogged gutters damage your home.</p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Button asChild variant="outline" size="lg" className="bg-white text-bc-red hover:bg-gray-100 border-white">
                <Link to="/calculator">Book Your Fall Cleaning</Link>
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

export default GutterCleaning;
