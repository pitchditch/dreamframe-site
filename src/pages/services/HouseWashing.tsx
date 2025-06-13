
import React from 'react';
import Layout from '../../components/Layout';
import ServiceHeader from '../../components/ServiceHeader';
import CallToAction from '../../components/CallToAction';
import { Droplets, Shield, Home, Zap } from 'lucide-react';
import MoreServicesSection from '../../components/MoreServicesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import ServiceAreaMap from '@/components/ServiceAreaMap';

const HouseWashing = () => {
  const faqs = [
    {
      question: "What is soft washing and how is it different from pressure washing?",
      answer: "Soft washing uses low-pressure water combined with specialized cleaning solutions to safely clean exterior surfaces. Unlike high-pressure washing, soft washing is gentler on delicate surfaces like siding, stucco, and roofing materials while being more effective at killing mold, mildew, and algae at the root."
    },
    {
      question: "Is soft washing safe for all types of siding?",
      answer: "Yes, soft washing is safe for virtually all exterior surfaces including vinyl, wood, fiber cement, stucco, brick, and painted surfaces. Our technicians are trained to adjust cleaning solutions and techniques based on your specific siding material."
    },
    {
      question: "How long do soft washing results last?",
      answer: "Soft washing results typically last 3-5 times longer than traditional pressure washing because we kill organic growth at the source rather than just blasting it away. Most homeowners see results lasting 1-2 years depending on environmental conditions."
    },
    {
      question: "Are your cleaning solutions environmentally safe?",
      answer: "Absolutely. We use biodegradable, eco-friendly cleaning solutions that are safe for your family, pets, and landscaping. Our solutions break down naturally and won't harm your plants or surrounding environment."
    },
    {
      question: "Will soft washing damage my landscaping?",
      answer: "No, we take extensive precautions to protect your landscaping. We pre-wet all plants, cover sensitive vegetation, and use plant-safe cleaning solutions. Our soft washing process is actually gentler on landscaping than traditional pressure washing."
    }
  ];

  return (
    <Layout 
      title="Professional House Washing & Soft Washing Services | Surrey & White Rock" 
      description="Expert soft washing services for your home's exterior. Safe, effective cleaning that protects your siding while removing dirt, mold, and mildew. Free estimates available."
    >
      <ServiceHeader 
        title="Professional House Washing & Soft Washing"
        description="Transform your home's exterior with our gentle yet effective soft washing techniques that protect your property while delivering exceptional results."
        youtubeId="HuXyYAxC4Fs"
        youtubeDesktopId="lYnXijewxCM"
      />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Why Choose Soft Washing for Your Home?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Soft washing is the superior method for cleaning your home's exterior surfaces. Using specialized low-pressure equipment and eco-friendly cleaning solutions, we safely remove dirt, grime, mold, mildew, and algae without damaging your property.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <Droplets className="w-12 h-12 text-bc-red mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Gentle & Safe</h3>
              <p className="text-gray-600">Low-pressure application protects delicate surfaces like siding, stucco, and painted areas.</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <Shield className="w-12 h-12 text-bc-red mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Long-Lasting Results</h3>
              <p className="text-gray-600">Kills organic growth at the source, providing results that last 3-5 times longer than pressure washing.</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <Home className="w-12 h-12 text-bc-red mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Property Protection</h3>
              <p className="text-gray-600">Preserves your home's integrity while effectively cleaning all exterior surfaces.</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <Zap className="w-12 h-12 text-bc-red mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Eco-Friendly</h3>
              <p className="text-gray-600">Biodegradable solutions that are safe for your family, pets, and landscaping.</p>
            </div>
          </div>
          
          <div className="bg-blue-50 p-8 rounded-lg border border-blue-100">
            <h3 className="text-2xl font-bold mb-4 text-blue-800">Soft Washing vs. Pressure Washing</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-green-200">
                <h4 className="font-bold text-lg mb-2 text-green-700">Soft Washing (Recommended)</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">✓</span>
                    <span>Low pressure (under 500 PSI) with cleaning solutions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">✓</span>
                    <span>Safe for all siding types and delicate surfaces</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">✓</span>
                    <span>Kills mold, mildew, and algae at the root</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">✓</span>
                    <span>Results last 3-5 times longer</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">✓</span>
                    <span>Protects landscaping and outdoor furniture</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-bold text-lg mb-2">Traditional Pressure Washing</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">•</span>
                    <span>High pressure water only (1500+ PSI)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">•</span>
                    <span>Can damage siding, paint, and caulking</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">•</span>
                    <span>Only removes surface dirt and grime</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">•</span>
                    <span>Temporary results - growth returns quickly</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">•</span>
                    <span>Risk of water intrusion behind siding</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Fence Washing Section */}
      <section id="fence-washing" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Professional Fence Washing Services</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Restore Your Fence to Like-New Condition</h3>
              <p className="text-gray-700 mb-6">
                Over time, fences accumulate dirt, algae, mold, and weathering that can make them look old and worn. Our professional fence washing service uses specialized techniques to safely clean all types of fencing materials including wood, vinyl, composite, and metal.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="bg-bc-red/10 rounded-full p-1 mr-3 mt-1">
                    <svg className="w-4 h-4 text-bc-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </span>
                  <span>Safe for all fence materials - wood, vinyl, composite, aluminum</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bc-red/10 rounded-full p-1 mr-3 mt-1">
                    <svg className="w-4 h-4 text-bc-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </span>
                  <span>Removes mold, mildew, algae, and years of dirt buildup</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bc-red/10 rounded-full p-1 mr-3 mt-1">
                    <svg className="w-4 h-4 text-bc-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </span>
                  <span>Extends the life of your fence and protects your investment</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bc-red/10 rounded-full p-1 mr-3 mt-1">
                    <svg className="w-4 h-4 text-bc-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </span>
                  <span>Eco-friendly cleaning solutions safe for plants and pets</span>
                </li>
              </ul>
            </div>
            <div>
              <img 
                src="/lovable-uploads/b0019f19-4638-4339-adae-7cf734f98b50.png" 
                alt="Professional Fence Washing Before and After"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Soft Washing Process</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-bc-red rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">1</div>
              <h3 className="text-xl font-bold mb-2">Inspection & Preparation</h3>
              <p className="text-gray-600">We assess your home's exterior, identify problem areas, and protect landscaping and outdoor furniture.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-bc-red rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">2</div>
              <h3 className="text-xl font-bold mb-2">Soft Washing Application</h3>
              <p className="text-gray-600">We apply our eco-friendly cleaning solutions using low-pressure equipment, allowing them to break down organic growth.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-bc-red rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">3</div>
              <h3 className="text-xl font-bold mb-2">Gentle Rinse & Final Inspection</h3>
              <p className="text-gray-600">We thoroughly rinse all surfaces with clean water and perform a final quality inspection to ensure exceptional results.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">Recent House Washing Project</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            See the dramatic transformation achieved with our soft washing techniques on this residential property.
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-lg shadow-xl">
              <img 
                src="/lovable-uploads/77a691e2-8b93-4749-be35-5ca5bbf137b3.png" 
                alt="Before and After House Washing Project"
                className="w-full h-auto" 
              />
              <div className="p-6 bg-white">
                <h3 className="font-bold text-xl mb-2">Residential Soft Washing - White Rock</h3>
                <p className="text-gray-700">Complete exterior house washing using our soft washing technique to safely remove years of dirt, mildew, and organic growth from vinyl siding.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <TestimonialsSection />
      
      <FAQSection
        title="Frequently Asked Questions"
        subtitle="Get answers to common questions about our house washing and soft washing services"
        faqs={faqs}
      />
      
      <MoreServicesSection />
      
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Areas We Service</h2>
          <ServiceAreaMap />
        </div>
      </section>
      
      <CallToAction 
        title="Ready to Transform Your Home's Exterior?"
        subtitle="Contact us today for a free estimate on our professional soft washing services."
        backgroundImage="/lovable-uploads/26f6a625-a200-4106-8f94-579be5c566b6.png"
      />
    </Layout>
  );
};

export default HouseWashing;
