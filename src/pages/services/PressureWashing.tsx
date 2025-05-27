
import React from 'react';
import Layout from '../../components/Layout';
import ServiceHeader from '../../components/ServiceHeader';
import CallToAction from '../../components/CallToAction';
import { ExternalLink, MessageCircle, AlertCircle } from 'lucide-react';
import ServiceProcessSection from '../../components/services/pressure-washing/ServiceProcessSection';
import ServiceBenefitsSection from '../../components/services/pressure-washing/ServiceBenefitsSection';
import ServiceFeatures from '../../components/services/pressure-washing/ServiceFeatures';
import DrivewayCleaning from '../../components/services/pressure-washing/DrivewayCleaning';
import ImageCarousel from '../../components/services/pressure-washing/ImageCarousel';
import MoreServicesSection from '../../components/MoreServicesSection';
import CitiesCarousel from '@/components/CitiesCarousel';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import PressureWashingForm from '@/components/forms/PressureWashingForm';
import { Card } from '@/components/ui/card';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import SidingCleaningSection from '../../components/services/pressure-washing/SidingCleaningSection';

const PressureWashing = () => {
  const faqs = [
    {
      question: "Do you use eco-friendly cleaning solutions?",
      answer: "Yes, we use biodegradable, environmentally friendly cleaning solutions that are safe for your property, your family, and your pets, while still delivering excellent cleaning results."
    },
    {
      question: "Will pressure washing damage my property?",
      answer: "Our technicians are trained to use appropriate pressure levels for different surfaces. We utilize soft washing techniques for delicate surfaces and adjust our approach to ensure effective cleaning without damage."
    },
    {
      question: "How often should I have my property pressure washed?",
      answer: "Most residential properties benefit from annual pressure washing. However, homes in areas with high humidity, extensive tree coverage, or near water bodies may require cleaning every 6-8 months to prevent buildup of organic growth."
    },
    {
      question: "How long does pressure washing take?",
      answer: "The time required depends on the size and condition of the area being cleaned. A typical house exterior might take 3-5 hours, while a driveway or deck could take 1-2 hours. We'll provide a time estimate when you book your service."
    },
    {
      question: "What preparation is needed before you arrive?",
      answer: "We ask that you remove any obstacles like furniture, potted plants, garden hoses, and vehicles from the areas to be cleaned. Also, please ensure exterior electrical outlets are accessible and water sources are turned on."
    }
  ];
  
  return (
    <Layout title="Professional Pressure Washing Services | Surrey & White Rock" description="Expert pressure washing services for homes and businesses. Remove dirt, grime, and stains with our specialized equipment and eco-friendly solutions.">
      <ServiceHeader 
        title="Professional Pressure Washing"
        description="Restore the beauty of your exterior surfaces with our specialized pressure washing services."
        youtubeId="HuXyYAxC4Fs" // Updated YouTube ID for mobile
        youtubeDesktopId="lYnXijewxCM" // Added new desktop YouTube ID
      />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 heading-text">Revitalize Your Home's Exterior</h2>
            <p className="text-lg text-gray-700 mb-8 content-text">
              Our professional pressure washing services remove years of built-up dirt, grime, mold, and mildew, instantly transforming your property's appearance and protecting your investment.
            </p>
            <p className="text-lg text-gray-700 mb-8 content-text">
              Using state-of-the-art equipment and eco-friendly cleaning solutions, we safely clean all exterior surfaces including:
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="flex flex-col items-center space-y-4 bg-gray-50 p-4 rounded-lg">
                <img src="/lovable-uploads/77a691e2-8b93-4749-be35-5ca5bbf137b3.png" alt="Siding & Exterior Walls" className="w-20 h-20 object-cover rounded-lg" />
                <span className="font-medium text-center">Siding & exterior walls</span>
              </div>
              <div className="flex flex-col items-center space-y-4 bg-gray-50 p-4 rounded-lg">
                <img src="/lovable-uploads/058537c2-5a7e-47ce-bf9d-ea1ada4c2595.png" alt="Fences & Gates" className="w-20 h-20 object-cover rounded-lg" />
                <span className="font-medium text-center">Fences & gates</span>
              </div>
              <div className="flex flex-col items-center space-y-4 bg-gray-50 p-4 rounded-lg">
                <img src="/lovable-uploads/197efc6d-85e4-474e-8c04-38e42cc66919.png" alt="Decks & Patios" className="w-20 h-20 object-cover rounded-lg" />
                <span className="font-medium text-center">Decks & patios</span>
              </div>
              <div className="flex flex-col items-center space-y-4 bg-gray-50 p-4 rounded-lg">
                <img src="/lovable-uploads/8f646c66-5a09-4335-a82d-e15a1d86a4c4.png" alt="Driveways & Walkways" className="w-20 h-20 object-cover rounded-lg" />
                <span className="font-medium text-center">Driveways & walkways</span>
              </div>
            </div>

            <div className="relative inline-block group">
              <button className="bg-bc-red hover:bg-red-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
                Request Pressure Washing Quote
              </button>
              
              {/* Overlay that appears on hover */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="bg-white rounded-lg shadow-2xl p-6 border-2 border-gray-100 w-96 max-w-screen-sm">
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-l-2 border-t-2 border-gray-100 rotate-45"></div>
                  <PressureWashingForm />
                </div>
              </div>
            </div>

            <ServiceFeatures />

            {/* Pressure Washing vs Soft Washing Section */}
            <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="text-2xl font-bold mb-4 text-blue-800">Pressure Washing vs. Soft Washing</h3>
              <div className="flex items-start mb-4">
                <AlertCircle className="text-blue-700 mr-2 flex-shrink-0 mt-1" size={20} />
                <p className="text-blue-700">
                  <strong>We recommend soft washing for most exterior surfaces.</strong> Our professional technicians use specialized equipment and quality products to ensure the best results without damage.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-lg mb-2">Pressure Washing</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-gray-700 mr-2">•</span>
                      <span>Uses high-pressure water spray</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-700 mr-2">•</span>
                      <span>Ideal for concrete, stone, and brick</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-700 mr-2">•</span>
                      <span>Removes tough stains and built-up grime</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-700 mr-2">•</span>
                      <span>Can damage delicate surfaces if not done properly</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-green-200">
                  <h4 className="font-bold text-lg mb-2 text-green-700">Soft Washing <span className="text-sm font-normal text-green-600">(Recommended)</span></h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-gray-700 mr-2">•</span>
                      <span>Uses low pressure and specialized cleaning solutions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-700 mr-2">•</span>
                      <span>Safe for all surfaces including vinyl siding, stucco, and roofs</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-700 mr-2">•</span>
                      <span>Kills mold, mildew, and algae at the root</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-700 mr-2">•</span>
                      <span>Longer-lasting results than pressure washing alone</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 bg-green-50 p-4 rounded-lg border border-green-100">
                <p className="text-green-800">
                  <strong>Our Approach:</strong> We specialize in quality products and proper application techniques, ensuring your property receives the appropriate cleaning method for each surface. 
                  Our technicians are trained to assess your specific needs and recommend the safest, most effective solution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="w-full bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <ServiceBenefitsSection />
        </div>
      </section>
      
      <ServiceProcessSection />
      
      <SidingCleaningSection />
      
      <DrivewayCleaning />
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">Recent Pressure Washing Project</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            See the impressive results we've achieved for commercial clients in the South Surrey and White Rock area.
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-lg shadow-xl">
              <img 
                src="/lovable-uploads/a2a1376b-3da7-4c9d-9a85-60ba24418d4f.png" 
                alt="South Abbotsford Church Pressure Washing Project"
                className="w-full h-auto" 
              />
              <div className="p-6 bg-white">
                <h3 className="font-bold text-xl mb-2">South Abbotsford Church</h3>
                <p className="text-gray-700">Commercial pressure washing service for walkways, entrances and exterior surfaces to remove dirt, grime, and organic growth.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <TestimonialsSection />
      
      <FAQSection
        title="Frequently Asked Questions"
        subtitle="Get answers to common questions about our pressure washing services"
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
        title="Ready to Transform Your Property?"
        subtitle="Contact us today for a free estimate on our pressure washing services."
        backgroundImage="/lovable-uploads/26f6a625-a200-4106-8f94-579be5c566b6.png"
      />
    </Layout>
  );
};

export default PressureWashing;
