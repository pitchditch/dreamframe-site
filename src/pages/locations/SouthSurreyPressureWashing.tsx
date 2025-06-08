
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

const SouthSurreyPressureWashing = () => {
  const southSurreyFaqs = [
    {
      question: "Do you service the Morgan Creek and Crescent Beach areas?",
      answer: "Absolutely! We regularly service all of South Surrey including Morgan Creek, Crescent Beach, Elgin, and Grandview Heights. We're familiar with the unique property types and maintenance needs in these upscale neighborhoods."
    },
    {
      question: "Can you clean large estate homes in South Surrey?",
      answer: "Yes, we specialize in large residential properties and estates. Our equipment and team can handle multi-story homes, extensive driveways, and complex rooflines common in South Surrey's luxury neighborhoods."
    },
    {
      question: "Do you work with South Surrey strata complexes?",
      answer: "We have extensive experience with strata properties throughout South Surrey. We can provide proper insurance documentation and work within strata maintenance schedules and requirements."
    },
    {
      question: "How often should properties near the ocean be cleaned?",
      answer: "Properties in South Surrey, especially those near Crescent Beach, benefit from more frequent cleaning due to salt air exposure. We typically recommend window cleaning every 2-3 months and pressure washing annually."
    }
  ];

  return (
    <Layout 
      title="Professional Pressure Washing Services in South Surrey, BC | BC Pressure Washing" 
      description="Expert pressure washing, window cleaning & roof cleaning services in South Surrey. Specializing in Morgan Creek, Crescent Beach & luxury properties. Licensed & insured. Call (778) 808-7620!"
      canonicalUrl="/south-surrey-pressure-washing"
    >
      <ServiceHeader 
        title="Professional Pressure Washing in South Surrey, BC"
        description="Premium cleaning services for South Surrey's finest properties. From Morgan Creek estates to Crescent Beach oceanfront homes, we deliver exceptional results for discerning homeowners."
        youtubeId="HuXyYAxC4Fs"
        youtubeDesktopId="lYnXijewxCM"
      />
      
      {/* Local Service Area Banner */}
      <section className="py-8 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <MapPin className="w-6 h-6 text-bc-red mr-2" />
              <span className="text-lg font-semibold">Proudly Serving South Surrey & Surrounding Areas</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
              Premium service for luxury properties
            </div>
          </div>
        </div>
      </section>

      {/* Local Expertise Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">South Surrey's Premier Pressure Washing Experts</h2>
            <p className="text-lg text-gray-700 mb-8">
              South Surrey's upscale neighborhoods demand premium care. We understand the unique requirements of 
              luxury properties, estate homes, and oceanfront residences throughout Morgan Creek, Crescent Beach, and beyond.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="/lovable-uploads/c0750156-e7a2-4f23-bffc-fa6aadabc8af.png" alt="Luxury Homes" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Estate Properties</h3>
              <p className="text-gray-600">Specialized cleaning for large homes, extensive driveways, and complex architectural features.</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="/lovable-uploads/09259a98-7e2b-4244-b338-ffb0d146e979.png" alt="Morgan Creek" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Morgan Creek Specialist</h3>
              <p className="text-gray-600">Regular service in Morgan Creek's prestigious neighborhoods with attention to HOA standards.</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="/lovable-uploads/1365dd51-01ea-4a4a-be27-dadd88cf8a5c.png" alt="Oceanfront Properties" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Crescent Beach</h3>
              <p className="text-gray-600">Expert care for oceanfront properties dealing with salt air and coastal weather conditions.</p>
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
            <h2 className="text-2xl font-bold mb-4">Serving All of South Surrey</h2>
            <p className="text-gray-600">From Highway 99 to the ocean, covering all premium neighborhoods</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-bc-red mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Premium Service Areas</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Morgan Creek & Morgan Heights</li>
                  <li>• Crescent Beach & Blackie Spit</li>
                  <li>• Elgin & Chantrell Creek</li>
                  <li>• Grandview Heights</li>
                  <li>• Redwood Heights</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <TestimonialsSection />
      
      <FAQSection
        title="South Surrey Pressure Washing FAQ"
        subtitle="Common questions from South Surrey residents"
        faqs={southSurreyFaqs}
      />
      
      <CallToAction 
        title="Ready to Clean Your South Surrey Property?"
        subtitle="Call us today for premium service that matches your property's standards!"
        backgroundImage="/lovable-uploads/8c08e928-8546-49ad-a380-ba9e5641643a.png"
      />
    </Layout>
  );
};

export default SouthSurreyPressureWashing;
