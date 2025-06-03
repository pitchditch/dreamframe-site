import React from 'react';
import Layout from '../../components/Layout';
import ServiceHeader from '../../components/ServiceHeader';
import FAQSection from '../../components/FAQSection';
import ServiceBenefits from '../../components/ServiceBenefits';
import CallToAction from '../../components/CallToAction';
import { Home, Shield, Star, Droplets, Leaf, Zap } from 'lucide-react';
import WindowCleaningQuoteOverlay from '@/components/forms/WindowCleaningQuoteOverlay';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

const WindowCleaning = () => {
  const benefits = [{
    title: "Enhances Curb Appeal",
    description: "Clean, streak-free windows dramatically improve your home's appearance and make a great first impression.",
    icon: <Home className="w-6 h-6" />
  }, {
    title: "Extends Window Lifespan",
    description: "Regular cleaning removes harmful pollutants and hard water stains that can etch and damage glass over time.",
    icon: <Shield className="w-6 h-6" />
  }, {
    title: "Improves Natural Light",
    description: "Remove dirt and grime buildup to maximize sunlight and brighten your interior spaces.",
    icon: <Star className="w-6 h-6" />
  }, {
    title: "Prevents Damage",
    description: "Early removal of mineral deposits and mildew prevents permanent staining and costly repairs.",
    icon: <Droplets className="w-6 h-6" />
  }, {
    title: "Eco-Friendly Solutions",
    description: "We use environmentally safe cleaning products that are gentle on your family, pets, and landscaping.",
    icon: <Leaf className="w-6 h-6" />
  }, {
    title: "Professional Results",
    description: "Our experienced technicians use specialized equipment and techniques to deliver a spotless, streak-free shine every time.",
    icon: <Zap className="w-6 h-6" />
  }];
  
  const faqs = [{
    question: "How often should I have my windows cleaned?",
    answer: "We recommend professional window cleaning at least twice a year to maintain clarity and prevent damage from dirt and mineral buildup. Homes near the ocean or with heavy tree coverage may benefit from more frequent cleaning."
  }, {
    question: "Do I need to be home during the window cleaning service?",
    answer: "Not necessarily. As long as we have access to all windows, you're welcome to leave us to work. We'll send you before-and-after photos upon completion."
  }, {
    question: "Are your cleaning products safe for my family and pets?",
    answer: "Yes! We use eco-friendly, biodegradable cleaning solutions that are safe for your family, pets, and landscaping. We prioritize your well-being and the environment."
  }, {
    question: "What if it rains after my windows are cleaned?",
    answer: "Don't worry! Our purified water cleaning system leaves windows spotless, even if it rains. We guarantee streak-free results, rain or shine."
  }, {
    question: "Do you offer a satisfaction guarantee?",
    answer: "Absolutely! We're committed to your satisfaction. If you're not completely happy with our service, we'll return to address any issues at no charge."
  }];

  return (
    <Layout 
      title="Professional Window Cleaning Services in Surrey & White Rock | BC Pressure Washing" 
      description="Get spotless, streak-free windows with BC Pressure Washing's professional window cleaning services in Surrey & White Rock. Book your free estimate today!"
    >
      {/* Hero Section with Before/After Slider */}
      <ServiceHeader 
        title="Professional Window Cleaning" 
        description="Spotless windows that enhance your home's beauty and let the sunshine in" 
        youtubeId="MdJ-n2kTgMw"
        youtubeDesktopId="vhv-WHWJLGc"
      />
      
      {/* Trust Bar */}
      <section className="bg-blue-50 py-4 border-b border-blue-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm font-medium text-blue-800">
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Licensed & Insured
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-2" />
              Streak-Free Guarantee
            </div>
            <div className="flex items-center">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              5-Star Google Rated
            </div>
          </div>
        </div>
      </section>
      
      {/* Sticky Quote Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <WindowCleaningQuoteOverlay buttonText="Get Quote" variant="bc-red" />
      </div>
      
      {/* Why Choose Professional Window Cleaning Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Professional Window Cleaning?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experience the difference of crystal-clear windows and a brighter, more inviting home
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-600 p-2 rounded-full mr-3">
                    <Home className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-800">Professional Cleaning</h3>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    Streak-free results every time
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    Safe for all window types
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    Eco-friendly cleaning solutions
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    Experienced and insured technicians
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    Convenient and hassle-free service
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200 bg-gray-50">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-gray-600 p-2 rounded-full mr-3">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">DIY Cleaning</h3>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <span className="text-gray-600 mr-2">✗</span>
                    Often leaves streaks and residue
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600 mr-2">✗</span>
                    Can damage windows with harsh chemicals
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600 mr-2">✗</span>
                    Time-consuming and labor-intensive
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600 mr-2">✗</span>
                    Risk of injury from ladder use
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600 mr-2">✗</span>
                    Inconsistent results
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-8">
            <WindowCleaningQuoteOverlay buttonText="Check Price & Availability" variant="bc-red" />
          </div>
        </div>
      </section>
      
      {/* Benefits Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <ServiceBenefits 
            title="The Benefits of Professional Window Cleaning" 
            subtitle="Enjoy crystal-clear views and a brighter home with our expert window cleaning services" 
            benefits={benefits} 
          />
        </div>
      </section>
      
      {/* Customer Testimonials */}
      <TestimonialsSection />
      
      {/* FAQ Section */}
      <FAQSection 
        title="Frequently Asked Questions About Window Cleaning" 
        subtitle="Get answers to common questions about our safe, effective window cleaning process" 
        faqs={faqs} 
      />
      
      {/* Final CTA */}
      <CallToAction 
        title="Ready for Crystal Clear Windows?" 
        subtitle="Contact us today for a free estimate and experience the difference professional window cleaning makes for your home or business."
        backgroundImage="/lovable-uploads/9454f467-d96c-435e-b88d-8a78e379102a.png" 
      />
    </Layout>
  );
};

export default WindowCleaning;
