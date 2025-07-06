
import React from 'react';
import Layout from '../../components/Layout';
import ServiceHeader from '../../components/ServiceHeader';
import CallToAction from '../../components/CallToAction';
import { MapPin, Star, Phone, CheckCircle } from 'lucide-react';
import BeforeAfterGallery from '../../components/BeforeAfterGallery';
import TestimonialsSection from '../../components/home/TestimonialsSection';
import FAQSection from '../../components/FAQSection';
import QuickContactForm from '../../components/home/QuickContactForm';
import TrustBadgesSection from '../../components/TrustBadgesSection';

const LangleyPressureWashing = () => {
  const langleyFaqs = [
    {
      question: "Do you service all areas of Langley?",
      answer: "Yes! We provide comprehensive service throughout Langley City, including all neighborhoods and residential areas. We have the equipment and experience to handle both urban properties and larger residential lots."
    },
    {
      question: "Can you clean commercial buildings and larger properties?",
      answer: "Absolutely. We regularly clean commercial buildings, multi-unit residential properties, and larger facilities throughout Langley. We understand the unique cleaning needs of different property types."
    },
    {
      question: "Do you work in Willoughby and newer development areas?",
      answer: "Yes, we provide regular service to all Langley neighborhoods including Willoughby, Walnut Grove, Murrayville, and newer developments. We're familiar with both established and new construction areas."
    },
    {
      question: "How do you handle moss and algae common in Langley's climate?",
      answer: "Langley's moist climate creates ideal conditions for moss and algae growth. We use specialized soft washing techniques and eco-friendly treatments that eliminate growth at the root and prevent quick regrowth."
    }
  ];

  return (
    <Layout 
      title="Professional Pressure Washing Services in Langley, BC | BC Pressure Washing" 
      description="Expert pressure washing, window cleaning & roof cleaning in Langley. Serving Willoughby, Walnut Grove, residential & commercial properties. Licensed & insured. Call (778) 808-7620!"
      canonicalUrl="/langley-pressure-washing"
    >
      <ServiceHeader 
        title="Professional Pressure Washing in Langley, BC"
        description="Comprehensive cleaning services for Langley's diverse properties. From urban condos to larger residential lots, we provide reliable, professional cleaning throughout Langley."
        youtubeId="HuXyYAxC4Fs"
        youtubeDesktopId="lYnXijewxCM"
      />
      
      {/* Local Service Area Banner */}
      <section className="py-8 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <MapPin className="w-6 h-6 text-bc-red mr-2" />
              <span className="text-lg font-semibold">Proudly Serving Langley</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
              Urban to residential property expertise
            </div>
          </div>
        </div>
      </section>

      {/* Local Expertise Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Langley's Trusted Pressure Washing Professionals</h2>
            <p className="text-lg text-gray-700 mb-8">
              Langley's diverse mix of urban developments and residential properties requires versatile cleaning expertise. 
              We service everything from modern townhomes in Willoughby to established homes in Walnut Grove and Murrayville.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="/lovable-uploads/c0750156-e7a2-4f23-bffc-fa6aadabc8af.png" alt="Residential Properties" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Residential Properties</h3>
              <p className="text-gray-600">Specialized service for single-family homes, townhouses, and residential properties with comprehensive cleaning needs.</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="/lovable-uploads/09259a98-7e2b-4244-b338-ffb0d146e979.png" alt="New Developments" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">New Developments</h3>
              <p className="text-gray-600">Expert cleaning for Willoughby and other growing neighborhoods with modern construction and updated building materials.</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="/lovable-uploads/1365dd51-01ea-4a4a-be27-dadd88cf8a5c.png" alt="Established Areas" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Established Areas</h3>
              <p className="text-gray-600">Gentle, specialized cleaning for established neighborhoods like Walnut Grove and Murrayville with mature properties.</p>
            </div>
          </div>
        </div>
      </section>

      <TrustBadgesSection />
      
      <BeforeAfterGallery />
      
      <QuickContactForm />
      
      {/* Driving Directions */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Comprehensive Langley Coverage</h2>
            <p className="text-gray-600">Serving all Langley neighborhoods and communities</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-bc-red mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Service Coverage Areas</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Willoughby & Yorkson Creek</li>
                  <li>• Walnut Grove & Murrayville</li>
                  <li>• Brookswood & Fernridge</li>
                  <li>• Downtown Langley</li>
                  <li>• All Langley Residential Areas</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <TestimonialsSection />
      
      <FAQSection
        title="Langley Pressure Washing FAQ"
        subtitle="Common questions from Langley residents"
        faqs={langleyFaqs}
      />
      
      <CallToAction 
        title="Ready to Clean Your Langley Property?"
        subtitle="From downtown to residential areas, we've got you covered. Call today!"
        backgroundImage="/lovable-uploads/8c08e928-8546-49ad-a380-ba9e5641643a.png"
      />
    </Layout>
  );
};

export default LangleyPressureWashing;
