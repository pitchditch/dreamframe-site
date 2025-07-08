
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
      question: "Do you service rural properties in Langley Township?",
      answer: "Yes! We service both Langley City and Township, including rural properties, hobby farms, and acreages. We have the equipment and experience to handle larger properties with extensive driveways and outbuildings."
    },
    {
      question: "Can you clean farm buildings and agricultural structures?",
      answer: "Absolutely. We regularly clean barns, workshops, equipment storage buildings, and other agricultural structures throughout Langley. We understand the unique cleaning needs of rural properties."
    },
    {
      question: "Do you work in Willoughby and Yorkson areas?",
      answer: "Yes, we provide regular service to all Langley neighborhoods including Willoughby, Yorkson, Walnut Grove, Fort Langley, and Murrayville. We're familiar with both new developments and heritage areas."
    },
    {
      question: "How do you handle moss and algae common in Langley's climate?",
      answer: "Langley's moist climate creates ideal conditions for moss and algae growth. We use specialized soft washing techniques and eco-friendly treatments that eliminate growth at the root and prevent quick regrowth."
    }
  ];

  return (
    <Layout 
      title="Professional Pressure Washing Services in Langley, BC | BC Pressure Washing" 
      description="Expert pressure washing, window cleaning & roof cleaning in Langley City & Township. Serving Willoughby, Fort Langley, rural properties & more. Licensed & insured. Call (778) 808-7620!"
      canonicalUrl="/langley-pressure-washing"
    >
      <ServiceHeader 
        title="Professional Pressure Washing in Langley, BC"
        description="Comprehensive cleaning services for Langley's diverse properties. From downtown condos to rural acreages, we provide reliable, professional cleaning throughout Langley City and Township."
        youtubeId="HuXyYAxC4Fs"
        youtubeDesktopId="lYnXijewxCM"
      />
      
      {/* Local Service Area Banner */}
      <section className="py-8 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <MapPin className="w-6 h-6 text-bc-red mr-2" />
              <span className="text-lg font-semibold">Proudly Serving Langley City & Township</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
              Urban to rural property expertise
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
              Langley's unique mix of urban developments and rural properties requires versatile cleaning expertise. 
              We service everything from heritage homes in Fort Langley to modern townhomes in Willoughby, plus rural acreages and farms.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="/lovable-uploads/c0750156-e7a2-4f23-bffc-fa6aadabc8af.png" alt="Rural Properties" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Rural & Acreage</h3>
              <p className="text-gray-600">Specialized service for farms, hobby farms, and large rural properties with extensive cleaning needs.</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="/lovable-uploads/09259a98-7e2b-4244-b338-ffb0d146e979.png" alt="New Developments" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">New Developments</h3>
              <p className="text-gray-600">Expert cleaning for Willoughby, Yorkson, and other growing neighborhoods with modern construction.</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="/lovable-uploads/1365dd51-01ea-4a4a-be27-dadd88cf8a5c.png" alt="Heritage Areas" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Heritage Properties</h3>
              <p className="text-gray-600">Gentle, specialized cleaning for Fort Langley's historic homes and heritage buildings.</p>
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
            <p className="text-gray-600">From Highway 1 to the US border, serving all Langley communities</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-bc-red mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Service Coverage Areas</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Fort Langley & Glen Valley</li>
                  <li>• Willoughby & Yorkson Creek</li>
                  <li>• Walnut Grove & Murrayville</li>
                  <li>• Brookswood & Fernridge</li>
                  <li>• Aldergrove & Rural Township</li>
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
        subtitle="From downtown to rural properties, we've got you covered. Call today!"
        backgroundImage="/lovable-uploads/8c08e928-8546-49ad-a380-ba9e5641643a.png"
      />
    </Layout>
  );
};

export default LangleyPressureWashing;
