
import React from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Droplets, Shield, Star, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import ServiceAreaMap from '@/components/ServiceAreaMap';

const WindowCleaning = () => {
  const faqs = [
    {
      question: "How often should I have my windows cleaned?",
      answer: "For residential properties, we recommend cleaning windows every 3-6 months. Commercial properties may need monthly or bi-monthly cleaning depending on location and environmental factors."
    },
    {
      question: "Do you clean windows in winter?",
      answer: "Yes, we provide window cleaning services year-round. However, we may reschedule during severe weather conditions for safety reasons."
    },
    {
      question: "What's included in your window cleaning service?",
      answer: "Our service includes cleaning both sides of windows, frames, sills, and screens. We use professional-grade equipment and streak-free cleaning solutions."
    },
    {
      question: "Are your cleaning solutions safe?",
      answer: "Absolutely! We use eco-friendly, biodegradable cleaning solutions that are safe for your family, pets, and the environment."
    },
    {
      question: "Do you offer commercial window cleaning?",
      answer: "Yes, we provide professional window cleaning services for offices, retail stores, restaurants, and other commercial properties throughout Metro Vancouver."
    }
  ];

  return (
    <Layout
      title="Window Cleaning Services in Surrey & White Rock | BC Pressure Washing"
      description="Professional window cleaning using purified water for crystal clear, streak-free results. Residential & commercial window cleaning in Metro Vancouver."
    >
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Professional Window Cleaning Services
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Crystal clear, streak-free windows using purified water technology in Surrey, White Rock & Metro Vancouver
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
                  <Droplets className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">Purified Water System</span>
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
            <h2 className="text-3xl font-bold text-center mb-12">Window Cleaning Services</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-2 border-blue-100 hover:border-blue-200 transition-colors">
                <CardContent className="p-6">
                  <img src="/lovable-uploads/5d9b60f7-561a-4672-acdf-29948d260793.png" alt="Residential Window Cleaning" className="h-12 w-12 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Residential Windows</h3>
                  <p className="text-gray-600">
                    Complete home window cleaning including interior and exterior surfaces, frames, and sills.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-100 hover:border-green-200 transition-colors">
                <CardContent className="p-6">
                  <img src="/lovable-uploads/b3e01fd9-0f50-4524-b794-26a9f6f93ee5.png" alt="Commercial Window Cleaning" className="h-12 w-12 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Commercial Windows</h3>
                  <p className="text-gray-600">
                    Professional window cleaning for offices, retail stores, and commercial buildings.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-100 hover:border-purple-200 transition-colors">
                <CardContent className="p-6">
                  <Eye className="h-12 w-12 text-purple-600 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Post-Construction</h3>
                  <p className="text-gray-600">
                    Specialized cleaning for newly constructed or renovated properties to remove construction debris.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-orange-100 hover:border-orange-200 transition-colors">
                <CardContent className="p-6">
                  <Droplets className="h-12 w-12 text-orange-600 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Purified Water System</h3>
                  <p className="text-gray-600">
                    Advanced purified water technology for spot-free, streak-free cleaning results.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-cyan-100 hover:border-cyan-200 transition-colors">
                <CardContent className="p-6">
                  <Shield className="h-12 w-12 text-cyan-600 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Screen Cleaning</h3>
                  <p className="text-gray-600">
                    Thorough cleaning of window screens to improve air flow and appearance.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-pink-100 hover:border-pink-200 transition-colors">
                <CardContent className="p-6">
                  <Star className="h-12 w-12 text-pink-600 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Regular Maintenance</h3>
                  <p className="text-gray-600">
                    Scheduled window cleaning programs to keep your windows crystal clear year-round.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg" className="bg-bc-red hover:bg-red-700 text-lg font-bold">
                <Link to="/calculator">Schedule Window Cleaning</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Benefits of Professional Window Cleaning</h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Crystal Clear Views</h3>
                    <p className="text-gray-600">Enjoy unobstructed views and natural light with professionally cleaned windows.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Extend Window Life</h3>
                    <p className="text-gray-600">Regular cleaning prevents damage from dirt, grime, and environmental contaminants.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Improve Curb Appeal</h3>
                    <p className="text-gray-600">Clean windows dramatically enhance your property's appearance and value.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Health Benefits</h3>
                    <p className="text-gray-600">More natural light improves mood, productivity, and overall well-being.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Professional Results</h3>
                    <p className="text-gray-600">Streak-free, spot-free results that last longer than DIY cleaning.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Save Time & Effort</h3>
                    <p className="text-gray-600">Let professionals handle the work while you focus on what matters most.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Process */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Professional Window Cleaning Process</h2>
            
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-bc-red text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="text-lg font-semibold mb-3">Initial Assessment</h3>
                <p className="text-gray-600 text-sm">We evaluate your windows and identify any special cleaning requirements.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-bc-red text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="text-lg font-semibold mb-3">Pre-Treatment</h3>
                <p className="text-gray-600 text-sm">Apply eco-friendly cleaning solutions to break down dirt and grime.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-bc-red text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="text-lg font-semibold mb-3">Professional Cleaning</h3>
                <p className="text-gray-600 text-sm">Clean windows using purified water system and professional squeegee techniques.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-bc-red text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
                <h3 className="text-lg font-semibold mb-3">Quality Check</h3>
                <p className="text-gray-600 text-sm">Final inspection to ensure perfect, streak-free results.</p>
              </div>
            </div>
          </div>
        </section>

        <TestimonialsSection />

        <FAQSection
          title="Frequently Asked Questions About Window Cleaning"
          subtitle="Get answers to common questions about our professional window cleaning services"
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
            <h2 className="text-3xl font-bold mb-6">Ready for Crystal Clear Windows?</h2>
            <p className="text-xl mb-8">
              Contact us today for a free estimate and experience the difference professional window cleaning makes.
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

export default WindowCleaning;
