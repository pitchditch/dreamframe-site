
import React from 'react';
import Layout from '../../components/Layout';
import ServiceHeader from '../../components/ServiceHeader';
import CallToAction from '../../components/CallToAction';
import { CheckCircle, Shield, Clock, Award } from 'lucide-react';
import BeforeAfterGallery from '../../components/BeforeAfterGallery';
import TestimonialsSection from '../../components/home/TestimonialsSection';
import FAQSection from '../../components/FAQSection';
import QuickContactForm from '../../components/home/QuickContactForm';
import TrustBadgesSection from '../../components/TrustBadgesSection';

const FenceWashing = () => {
  const fenceFaqs = [
    {
      question: "What types of fences can you clean?",
      answer: "We clean all types of fences including wood, vinyl, aluminum, chain link, and composite materials. Our soft washing technique is safe for all fence materials and won't cause damage."
    },
    {
      question: "How often should I have my fence cleaned?",
      answer: "We recommend annual fence cleaning to maintain appearance and longevity. In coastal areas like White Rock, twice yearly cleaning may be beneficial due to salt air exposure."
    },
    {
      question: "Will pressure washing damage my wooden fence?",
      answer: "We use soft washing techniques with appropriate pressure settings for each fence material. Our experienced team knows exactly how to clean wooden fences safely without causing damage."
    },
    {
      question: "Do you clean both sides of the fence?",
      answer: "Yes, we clean both sides of your fence when accessible. We coordinate with neighbors when necessary and always respect property boundaries."
    },
    {
      question: "Can you remove moss and mildew from fences?",
      answer: "Absolutely! Our eco-friendly cleaning solutions effectively remove moss, mildew, algae, and other organic growth while preventing regrowth."
    }
  ];

  return (
    <Layout 
      title="Professional Fence Washing Services | BC Pressure Washing Surrey & White Rock" 
      description="Expert fence cleaning and pressure washing services in Surrey & White Rock. Remove moss, mildew & stains from wood, vinyl & composite fences. Free quotes!"
      canonicalUrl="/services/fence-washing"
    >
      <ServiceHeader 
        title="Professional Fence Washing & Cleaning Services"
        description="Restore your fence's beauty with our expert cleaning services. Safe for all fence materials including wood, vinyl, and composite."
        youtubeId="HuXyYAxC4Fs"
        youtubeDesktopId="lYnXijewxCM"
      />
      
      {/* Fence Washing Hero Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Expert Fence Cleaning for All Materials</h2>
              <p className="text-lg text-gray-700 mb-6">
                Your fence is often the first thing people notice about your property. Over time, fences accumulate dirt, 
                moss, mildew, and stains that can make your entire property look neglected. Our professional fence washing 
                services restore your fence to like-new condition.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Safe for All Fence Types</h4>
                    <p className="text-gray-600">Wood, vinyl, aluminum, chain link, and composite materials</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Eco-Friendly Solutions</h4>
                    <p className="text-gray-600">Biodegradable cleaners that won't harm plants or pets</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Quick & Efficient</h4>
                    <p className="text-gray-600">Most residential fences cleaned in 2-4 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Award className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Satisfaction Guaranteed</h4>
                    <p className="text-gray-600">100% satisfaction guarantee on all our work</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:text-center">
              <img 
                src="/lovable-uploads/11f4b1f5-bb46-4021-a01f-2bbf81c134be.png" 
                alt="Professional fence pressure washing in action" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Fence Types Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Fence Types We Clean</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="/lovable-uploads/09259a98-7e2b-4244-b338-ffb0d146e979.png" alt="Wood Fence" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Wood Fences</h3>
              <p className="text-gray-600">Cedar, pine, pressure-treated lumber, and exotic hardwoods</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="/lovable-uploads/c0750156-e7a2-4f23-bffc-fa6aadabc8af.png" alt="Vinyl Fence" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Vinyl Fences</h3>
              <p className="text-gray-600">PVC and vinyl composite fencing materials</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="/lovable-uploads/1365dd51-01ea-4a4a-be27-dadd88cf8a5c.png" alt="Metal Fence" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Metal Fences</h3>
              <p className="text-gray-600">Aluminum, chain link, and wrought iron fencing</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="/lovable-uploads/09259a98-7e2b-4244-b338-ffb0d146e979.png" alt="Composite Fence" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Composite Fences</h3>
              <p className="text-gray-600">Wood-plastic composite and recycled materials</p>
            </div>
          </div>
        </div>
      </section>

      <TrustBadgesSection />
      
      <BeforeAfterGallery />
      
      <QuickContactForm />
      
      <TestimonialsSection />
      
      <FAQSection
        title="Fence Washing FAQ"
        subtitle="Common questions about our fence cleaning services"
        faqs={fenceFaqs}
      />
      
      <CallToAction 
        title="Ready to Restore Your Fence?"
        subtitle="Get a free quote for professional fence washing services today!"
        backgroundImage="/lovable-uploads/11f4b1f5-bb46-4021-a01f-2bbf81c134be.png"
      />
    </Layout>
  );
};

export default FenceWashing;
