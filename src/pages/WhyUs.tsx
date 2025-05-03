
import React from 'react';
import Layout from '../components/Layout';
import FAQSection from '@/components/FAQSection';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import MoreServicesSection from '@/components/MoreServicesSection';
import ServiceAreasCarousel from '@/components/ServiceAreasCarousel';
import { Shield, Award, ThumbsUp, Clock } from 'lucide-react';
import CompanyHistory from '@/components/CompanyHistory';

const WhyUs = () => {
  const faqs = [
    {
      question: "What makes BC Pressure Washing different from other companies?",
      answer: "As a locally owned and operated business, we provide personalized service with direct owner involvement on every project. We take pride in our attention to detail, use of professional-grade equipment, transparent pricing, and our commitment to customer satisfaction."
    },
    {
      question: "Are you insured and licensed?",
      answer: "Yes, we are fully insured with WCB coverage and liability insurance, giving you peace of mind when we work on your property."
    },
    {
      question: "How experienced is your team?",
      answer: "Our owner/lead technician has extensive experience in all aspects of pressure washing and exterior cleaning, and personally oversees every job to ensure quality standards are met."
    },
    {
      question: "Do you offer free estimates?",
      answer: "Yes, we provide free, no-obligation estimates for all our services. You can request a quote through our online form, or call us directly."
    },
    {
      question: "What areas do you service?",
      answer: "We proudly serve Surrey, White Rock, South Surrey, Langley, and throughout the Metro Vancouver region. See our service area map for more details."
    }
  ];

  return (
    <Layout title="Why Choose BC Pressure Washing | Surrey & White Rock Pressure Washing" description="Discover what makes BC Pressure Washing the top choice for exterior cleaning in Surrey & White Rock. Owner-operated excellence, professional equipment, and guaranteed results.">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-900 to-bc-red py-24">
        <div className="absolute inset-0 z-0">
          <img
            src="/lovable-uploads/b5967047-dddc-47e1-a23c-dd4a5feb9125.png"
            alt="BC Pressure Washing background"
            className="w-full h-full object-cover opacity-25"
          />
        </div>
        <div className="container mx-auto px-4 text-center text-white relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Why Choose BC Pressure Washing</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Experience the difference of working with a locally owned, professional exterior cleaning company that truly cares about results.
          </p>
        </div>
      </div>
      
      {/* Owner Operated Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold mb-6">Owner-Operated Excellence</h2>
              <p className="text-lg text-gray-700 mb-8">
                As the owner of BC Pressure Washing, I personally oversee every project to ensure the highest standards of quality and customer satisfaction. When you choose us, you're working directly with the business owner who takes pride in delivering exceptional results.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start">
                  <Shield className="text-bc-red mr-3 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold mb-1">Fully Insured</h3>
                    <p className="text-sm text-gray-600">WCB & liability insurance protection for your complete peace of mind.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Award className="text-bc-red mr-3 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold mb-1">5-Star Rated</h3>
                    <p className="text-sm text-gray-600">Our service excellence is reflected in our customer reviews.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <ThumbsUp className="text-bc-red mr-3 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold mb-1">Satisfaction Guaranteed</h3>
                    <p className="text-sm text-gray-600">We're not happy until you're completely satisfied with our work.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="text-bc-red mr-3 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold mb-1">Prompt & Reliable</h3>
                    <p className="text-sm text-gray-600">We show up when scheduled and complete work efficiently.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="rounded-full border-4 border-white shadow-xl overflow-hidden w-64 h-64">
                <img 
                  src="/lovable-uploads/10e953e1-c5f0-4899-a3b7-944cf15bca76.png" 
                  alt="Jayden Fisher - Owner of BC Pressure Washing" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section (moved from PostConstructionWindowCleaning page) */}
      <CompanyHistory />

      {/* Professional Equipment Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-12 text-center">Our Professional Equipment</h1>
          
          {/* Professional Equipment Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Pressure Washer */}
            <div className="space-y-4">
              <img 
                src="/lovable-uploads/6e463050-a822-420e-8227-6bc3306b6832.png"
                alt="Industrial Grade Pressure Washer"
                className="rounded-lg shadow-lg w-full"
              />
              <h2 className="text-2xl font-bold">Industrial Grade Pressure Washer</h2>
              <p className="text-gray-700">Our Lifan Hydro Pro 4500 PSI pressure washer is capable of tackling any job, from delicate siding to tough concrete cleaning.</p>
            </div>

            {/* Surface Cleaner */}
            <div className="space-y-4">
              <img 
                src="/lovable-uploads/08b3e837-f205-42f8-894f-b96933f86b7f.png"
                alt="Professional Surface Cleaner"
                className="rounded-lg shadow-lg w-full"
              />
              <h2 className="text-2xl font-bold">Professional Surface Cleaner</h2>
              <p className="text-gray-700">Our surface cleaner ensures perfect, streak-free results on driveways and large flat surfaces, saving time while delivering superior results.</p>
            </div>

            {/* Water Fed Pole System */}
            <div className="space-y-4">
              <img 
                src="/lovable-uploads/c8d5a001-21d5-40a1-9e30-79297ea6e4a6.png"
                alt="Water Fed Pole System"
                className="rounded-lg shadow-lg w-full"
              />
              <h2 className="text-2xl font-bold">Water Fed Pole System</h2>
              <p className="text-gray-700">Our professional water fed pole system allows us to safely clean windows up to 60 feet high while keeping both feet firmly on the ground.</p>
            </div>
          </div>
          
          {/* Eco-Friendly Products Section */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <Shield className="text-green-500 mr-3" size={28} />
                <h2 className="text-2xl font-bold">Eco-Friendly Cleaning Solutions</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-gray-700 mb-4">
                    We use environmentally responsible cleaning products that effectively remove dirt, grime, and organic growth while minimizing impact on your landscape and the environment.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Shield className="text-green-600 mr-2 flex-shrink-0" size={20} />
                      <span>Safe for plants, pets and property</span>
                    </li>
                    <li className="flex items-center">
                      <Shield className="text-green-600 mr-2 flex-shrink-0" size={20} />
                      <span>Biodegradable formulations</span>
                    </li>
                    <li className="flex items-center">
                      <Shield className="text-green-600 mr-2 flex-shrink-0" size={20} />
                      <span>Effective results without harsh chemicals</span>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center">
                  <img 
                    src="/lovable-uploads/f008fab5-05a9-4b20-8297-0d8674099588.png"
                    alt="Eco-Friendly Cleaning Solutions"
                    className="max-h-64 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Company Vehicle */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="space-y-4">
              <img 
                src="/lovable-uploads/4054bbd7-3ebd-48d0-845c-3ec712ac612e.png"
                alt="BC Pressure Washing Company Vehicle"
                className="rounded-lg shadow-lg w-full"
              />
              <h2 className="text-2xl font-bold">Our Local Service Vehicle</h2>
              <p className="text-gray-700">You've probably seen our distinctive red vehicle parked at White Rock Beach. As a locally owned business with deep roots in the community, we're proud to serve the area where we grew up.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 100% Satisfaction Guarantee Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">100% Satisfaction Guarantee</h2>
            <p className="text-lg mb-6">
              We stand behind our work with a complete satisfaction guarantee. If you're not happy with any aspect of our service, we'll come back and make it right at no additional cost to you.
            </p>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 bg-bc-red rounded-full flex items-center justify-center mb-4">
                    <Shield className="text-white" size={32} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Quality Assurance</h3>
                  <p className="text-gray-600">Every service undergoes a final inspection to ensure our high standards are met.</p>
                </div>
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 bg-bc-red rounded-full flex items-center justify-center mb-4">
                    <Clock className="text-white" size={32} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Timely Response</h3>
                  <p className="text-gray-600">We respond quickly to address any concerns you might have after service completion.</p>
                </div>
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 bg-bc-red rounded-full flex items-center justify-center mb-4">
                    <ThumbsUp className="text-white" size={32} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">No-Hassle Policy</h3>
                  <p className="text-gray-600">If you're not completely satisfied, we'll return and fix the issue at no extra charge.</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <a href="tel:7788087620" className="bg-bc-red hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-bold transition-all">
                Call Now: 778-808-7620
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <TestimonialsCarousel />
      
      {/* FAQ Section */}
      <FAQSection faqs={faqs} />
      
      {/* More Services Section */}
      <MoreServicesSection />

      {/* Service Areas Map and Carousel */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Areas We Service</h2>
          <div className="mb-8">
            <iframe
              src="https://www.google.com/maps/d/embed?mid=1EFqLJEb-CuHik9j9h2e0iuzKHJwFD30"
              width="100%"
              height="450"
              style={{ border: 0, borderRadius: '0.5rem' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="BC Pressure Washing Service Area"
              className="shadow-lg"
            ></iframe>
          </div>
          <ServiceAreasCarousel />
        </div>
      </section>
    </Layout>
  );
};

export default WhyUs;
