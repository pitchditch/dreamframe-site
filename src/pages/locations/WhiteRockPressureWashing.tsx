
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

const WhiteRockPressureWashing = () => {
  const whiteRockFaqs = [
    {
      question: "Do you clean homes on Marine Drive in White Rock?",
      answer: "Absolutely! We regularly service properties along Marine Drive and throughout White Rock. We're familiar with the unique challenges of ocean-facing homes, including salt air effects on siding and windows."
    },
    {
      question: "Can you remove moss from ocean-facing roofs in White Rock?",
      answer: "Yes, our soft washing technique is perfect for moss removal on ocean-facing roofs. The salt air in White Rock can accelerate moss growth, but our eco-friendly treatment kills moss at the root and prevents regrowth."
    },
    {
      question: "Are you familiar with strata rules in White Rock apartments?",
      answer: "We work with many strata complexes in White Rock and are familiar with their requirements. We can provide proper insurance documentation and work within strata guidelines for exterior cleaning projects."
    },
    {
      question: "How often should I clean my windows in White Rock's salty air?",
      answer: "Due to White Rock's ocean proximity, we recommend window cleaning every 2-3 months to combat salt buildup and maintain crystal-clear views of the beautiful coastline."
    }
  ];

  const whiteRockTestimonials = [
    {
      name: "Sarah Chen",
      location: "Marine Drive, White Rock",
      rating: 5,
      text: "Jayden did an amazing job on our oceanfront condo windows. The salt buildup was terrible, but now we have crystal clear views of the beach again!"
    },
    {
      name: "Mike Thompson", 
      location: "Hillside Drive, White Rock",
      rating: 5,
      text: "Professional service! They understood exactly how to handle the moss on our roof caused by the ocean air. Highly recommend for White Rock residents."
    }
  ];

  return (
    <Layout 
      title="Professional Pressure Washing Services in White Rock, BC | BC Pressure Washing" 
      description="Top-rated pressure washing, window cleaning & roof cleaning services in White Rock. Specialized in ocean-facing properties. Licensed, insured & local. Call (778) 808-7620!"
      canonicalUrl="/white-rock-pressure-washing"
    >
      <ServiceHeader 
        title="Professional Pressure Washing in White Rock, BC"
        description="Specialized cleaning services for White Rock's unique coastal environment. From Marine Drive to Hillside, we keep your property looking pristine against salt air and ocean elements."
        youtubeId="HuXyYAxC4Fs"
        youtubeDesktopId="lYnXijewxCM"
        backgroundImage="/lovable-uploads/06e9bd14-b601-4e6f-bcd9-01217b067c47.png"
      />
      
      {/* Local Service Area Banner */}
      <section className="py-8 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <MapPin className="w-6 h-6 text-bc-red mr-2" />
              <span className="text-lg font-semibold">Proudly Serving White Rock & Surrounding Areas</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
              Same-day service available
            </div>
          </div>
        </div>
      </section>

      {/* Local Expertise Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">White Rock's Trusted Pressure Washing Experts</h2>
            <p className="text-lg text-gray-700 mb-8">
              Living in White Rock means dealing with unique challenges like salt air, ocean spray, and coastal weather. 
              We understand these conditions and have specialized techniques to protect and clean your property effectively.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="/lovable-uploads/c0750156-e7a2-4f23-bffc-fa6aadabc8af.png" alt="Ocean Views" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Ocean-Facing Properties</h3>
              <p className="text-gray-600">Specialized cleaning for homes facing the ocean, dealing with salt buildup and coastal elements.</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="/lovable-uploads/09259a98-7e2b-4244-b338-ffb0d146e979.png" alt="Moss Removal" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Marine Drive Expertise</h3>
              <p className="text-gray-600">Regular service along Marine Drive and understanding of waterfront property maintenance needs.</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="/lovable-uploads/1365dd51-01ea-4a4a-be27-dadd88cf8a5c.png" alt="Strata Compliance" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Strata Friendly</h3>
              <p className="text-gray-600">Experienced with strata requirements and building maintenance standards in White Rock complexes.</p>
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
            <h2 className="text-2xl font-bold mb-4">Easy to Find Us in White Rock</h2>
            <p className="text-gray-600">Servicing near White Rock Pier, Memorial Park, and all of Marine Drive</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-bc-red mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Service Area Coverage</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Marine Drive waterfront properties</li>
                  <li>• Hillside residential areas</li>
                  <li>• White Rock Pier vicinity</li>
                  <li>• Memorial Park neighborhood</li>
                  <li>• Centennial Park area</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <TestimonialsSection testimonials={whiteRockTestimonials} />
      
      <FAQSection
        title="White Rock Pressure Washing FAQ"
        subtitle="Common questions from White Rock residents"
        faqs={whiteRockFaqs}
      />
      
      <CallToAction 
        title="Ready to Clean Your White Rock Property?"
        subtitle="Call us today for a free estimate. We know White Rock properties inside and out!"
        backgroundImage="/lovable-uploads/06e9bd14-b601-4e6f-bcd9-01217b067c47.png"
      />
    </Layout>
  );
};

export default WhiteRockPressureWashing;
