
import React from 'react';
import Layout from '../../components/Layout';
import ServiceHeader from '../../components/ServiceHeader';
import FAQSection from '../../components/FAQSection';
import ServiceBenefits from '../../components/ServiceBenefits';
import CallToAction from '../../components/CallToAction';
import { Shield, Droplets, Leaf, Clock, TrendingUp, Heart, CheckCircle, Star, AlertTriangle, Drone, Users, Award } from 'lucide-react';
import RoofCleaningQuoteOverlay from '@/components/forms/RoofCleaningQuoteOverlay';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import RoofCleaningProcessCarousel from '@/components/services/roof-cleaning/RoofCleaningProcessCarousel';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

const RoofCleaning = () => {
  const benefits = [
    {
      title: "Prevent Expensive Repairs",
      description: "Moss and algae deteriorate roofing materials, leading to leaks and costly repairs. Early cleaning saves thousands.",
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: "Extend Roof Lifespan", 
      description: "Regular cleaning can add 5-10 years to your roof's life by preventing organic growth damage.",
      icon: <Clock className="w-6 h-6" />
    },
    {
      title: "Improve Curb Appeal",
      description: "Remove unsightly stains and growths to dramatically enhance your home's appearance and value.",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      title: "Boost Energy Efficiency",
      description: "A clean roof reflects more sunlight and absorbs less heat, potentially reducing cooling costs.",
      icon: <Droplets className="w-6 h-6" />
    },
    {
      title: "Maintain Property Value",
      description: "A well-maintained roof is crucial for your home's market value and appeal to potential buyers.",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      title: "Prevent Mold & Health Issues",
      description: "Stop mold and algae from spreading into your home, protecting your family's health.",
      icon: <Heart className="w-6 h-6" />
    }
  ];
  
  const faqs = [
    {
      question: "Will roof cleaning damage my shingles?",
      answer: "No, our soft washing technique uses low pressure specifically designed to clean without damaging roofing materials. We never use high pressure on asphalt shingles, which can remove protective granules and shorten roof life."
    },
    {
      question: "How often should I get my roof cleaned?",
      answer: "Most homes in Metro Vancouver benefit from roof cleaning every 2-3 years. Properties with heavy tree coverage or in particularly damp areas may need annual cleaning to prevent moss buildup."
    },
    {
      question: "Is the cleaning solution safe for pets and plants?",
      answer: "Yes, we use biodegradable, eco-friendly cleaning solutions. We take precautions to protect your landscaping by pre-wetting plants and covering sensitive areas during treatment."
    },
    {
      question: "How long does the cleaning last?",
      answer: "Our soft washing treatment typically keeps roofs clean for 2-4 years, depending on environmental conditions. We also offer optional moss prevention treatments for longer-lasting results."
    },
    {
      question: "What's the average cost for roof cleaning?",
      answer: "Roof cleaning costs vary based on size, pitch, and condition. Most residential roofs range from $400-$800. Contact us for a free, no-obligation quote tailored to your specific roof."
    }
  ];

  const processSteps = [
    {
      number: "1",
      title: "Inspection",
      description: "We assess the roof condition and moss coverage to determine the best cleaning approach."
    },
    {
      number: "2", 
      title: "Debris Removal",
      description: "Manual brushing of large moss clumps and clearing of gutters and downspouts."
    },
    {
      number: "3",
      title: "Soft Washing Application", 
      description: "Low-pressure wash with eco-safe cleaning solution that kills moss and algae at the root."
    },
    {
      number: "4",
      title: "Post-Treatment",
      description: "Long-lasting moss prevention treatment to keep your roof clean longer."
    }
  ];

  const whyChooseUsPoints = [
    {
      icon: <Shield className="w-8 h-8 text-bc-red" />,
      title: "Fully Insured & Licensed",
      description: "Complete liability coverage and WorkSafeBC compliance for your peace of mind."
    },
    {
      icon: <Star className="w-8 h-8 text-bc-red" />,
      title: "5-Star Local Reviews", 
      description: "Hundreds of satisfied customers across Metro Vancouver trust our expertise."
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-bc-red" />,
      title: "Fast Response & Guaranteed Satisfaction",
      description: "Same-day quotes and 100% satisfaction guarantee on all our work."
    }
  ];

  return (
    <Layout 
      title="Professional Roof Cleaning in Metro Vancouver | BC Pressure Washing" 
      description="Eco-friendly roof cleaning using soft washing in Metro Vancouver. Remove moss, algae & debris safely. Free quotes! Serving Surrey, White Rock, Langley."
    >
      <ServiceHeader 
        title="Restore Your Roof & Extend Its Lifespan" 
        description="Safe, eco-friendly roof moss removal and cleaning across Surrey, White Rock, Langley & beyond." 
        youtubeId="twtzf2gRdFU"
        youtubeDesktopId="eQSgdx9ujcc"
      />
      
      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Benefits of Professional Roof Cleaning</h2>
          <ServiceBenefits benefits={benefits} />
        </div>
      </section>
      
      {/* Warning Banner */}
      <section className="py-8 bg-red-50 border-y-2 border-red-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-red-100 rounded-lg p-6 border border-red-300">
            <div className="flex items-start">
              <AlertTriangle className="w-8 h-8 text-red-600 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-red-800 mb-2">Roof Cleaning Warning!</h3>
                <p className="text-red-700 text-lg">
                  Moss and algae can cause thousands in hidden roof damage if not treated. Book a cleaning before it gets worse!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How Our Process Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How Our Process Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-bc-red text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild variant="bc-red" size="lg">
              <Link to="/contact">Schedule a Free Roof Inspection</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Before & After Gallery */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Before & After Gallery</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
              <img 
                src="/lovable-uploads/9454f467-d96c-435e-b88d-8a78e379102a.png" 
                alt="Roof cleaning before and after - White Rock"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">White Rock Roof Transformation</h3>
                <p className="text-gray-600">Complete moss removal and soft washing</p>
              </div>
            </div>
            
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
              <img 
                src="/lovable-uploads/51f10eb0-c939-49d5-8ab5-2235a162169e.png" 
                alt="Roof cleaning before and after - Langley"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">Langley Moss Removal</h3>
                <p className="text-gray-600">Eco-friendly cleaning solution applied</p>
              </div>
            </div>
            
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
              <img 
                src="/lovable-uploads/b5967047-dddc-47e1-a23c-dd4a5feb9125.png" 
                alt="Roof cleaning before and after - Richmond"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">Richmond Roof Restoration</h3>
                <p className="text-gray-600">Professional soft washing results</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose BC Pressure Washing?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {whyChooseUsPoints.map((point, index) => (
              <div key={index} className="text-center bg-white p-8 rounded-lg shadow-sm">
                <div className="flex justify-center mb-4">
                  {point.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{point.title}</h3>
                <p className="text-gray-600">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Standout Testimonial */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex justify-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-current" />
                  ))}
                </div>
              </div>
              <blockquote className="text-xl italic text-gray-700 mb-6">
                "BC Pressure Washing saved me $4,000 in roof repairs by removing all moss and debris. Their thorough service made my roof look new again."
              </blockquote>
              <cite className="text-lg font-semibold text-gray-900">
                — Elizabeth Turner, Abbotsford
              </cite>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* FAQ Section */}
      <FAQSection 
        title="Frequently Asked Questions About Roof Cleaning" 
        subtitle="Get answers to common questions about our roof cleaning services" 
        faqs={faqs} 
      />
      
      {/* Final Call to Action */}
      <section className="py-16 bg-bc-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready for a Cleaner, Healthier Roof?</h2>
          <p className="text-xl mb-8">Get a same-day quote or book a free inspection online.</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <RoofCleaningQuoteOverlay 
              buttonText="Check Prices & Availability" 
              variant="outline" 
              className="bg-white text-bc-red hover:bg-gray-100 border-white" 
            />
            <Button asChild variant="outline" size="lg" className="bg-white text-bc-red hover:bg-gray-100 border-white">
              <Link to="/contact">Get Free Quote</Link>
            </Button>
          </div>
          
          <div className="text-center">
            <a 
              href="tel:7788087620" 
              className="inline-flex items-center justify-center bg-white text-bc-red px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg"
            >
              📞 Call Now: (778) 808-7620
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RoofCleaning;
