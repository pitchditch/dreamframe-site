
import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout';
import { Shield, Check, Star, Award, Clock, Users, ThumbsUp } from 'lucide-react';
import CallToAction from '@/components/CallToAction';

const About = () => {
  return (
    <Layout>
      <Helmet>
        <title>About BC Pressure Washing | White Rock's Top-Rated Cleaning Service</title>
        <meta name="description" content="Learn about BC Pressure Washing, White Rock's trusted pressure washing and window cleaning experts. Family-owned with over 10 years of experience serving Surrey and Metro Vancouver." />
      </Helmet>
      
      <div className="relative bg-black text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('/lovable-uploads/9fd8e651-7601-4cbe-8e73-c48efe84a1fa.png')" }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative container mx-auto px-4 py-24 text-center z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Our Company</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
            BC Pressure Washing is a family-owned and operated exterior cleaning company dedicated to providing exceptional service to homeowners and businesses throughout White Rock, Surrey, and Metro Vancouver.
          </p>
        </div>
      </div>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-6">
                Founded in 2013, BC Pressure Washing began with a simple mission: to provide the highest quality exterior cleaning services with unmatched customer satisfaction. What started as a small, one-man operation has grown into a trusted name in the industry, serving thousands of satisfied customers across the Lower Mainland.
              </p>
              <p className="text-gray-600 mb-6">
                Our founder, a lifelong resident of White Rock, recognized the unique cleaning challenges posed by the Pacific Northwest climate. From stubborn moss growth on roofs to salt-spray buildup on windows near the ocean, our services were specifically developed to address these regional issues.
              </p>
              <p className="text-gray-600">
                Today, we continue to uphold our founding values of integrity, quality, and exceptional service, treating each property with the care and attention it deserves.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/lovable-uploads/f69ce980-a64c-43c2-9d3b-7a93c47e127b.png" 
                alt="BC Pressure Washing founder" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Why Choose Us</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
            We're committed to delivering superior results and an exceptional experience from start to finish
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 text-bc-red mb-4">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Fully Insured</h3>
              <p className="text-gray-600">
                We carry comprehensive insurance coverage, providing peace of mind and protection for both our clients and our team.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 text-bc-red mb-4">
                <Star size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">5-Star Service</h3>
              <p className="text-gray-600">
                With over 100 five-star reviews, our reputation for excellence and customer satisfaction speaks for itself.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 text-bc-red mb-4">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Prompt & Reliable</h3>
              <p className="text-gray-600">
                We respect your time with punctual service, clear communication, and projects completed on schedule.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 text-bc-red mb-4">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Quality Equipment</h3>
              <p className="text-gray-600">
                We invest in professional-grade equipment and eco-friendly products to deliver superior, long-lasting results.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 text-bc-red mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Experienced Team</h3>
              <p className="text-gray-600">
                Our trained professionals bring years of industry experience and specialized knowledge to every project.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 text-bc-red mb-4">
                <ThumbsUp size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Satisfaction Guaranteed</h3>
              <p className="text-gray-600">
                We stand behind our work with a 100% satisfaction guarantee, ensuring you're completely happy with our service.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Our Commitment to Quality</h2>
              <p className="text-gray-600 mb-6">
                At BC Pressure Washing, we believe that quality isn't just about the end result – it's about the entire experience. From your first contact with our team to the completion of your service, we're dedicated to exceeding your expectations at every step.
              </p>
              <p className="text-gray-600 mb-6">
                Unlike many competitors who prioritize speed over thoroughness, we take the time to do each job right. Our technicians are trained in the most effective, up-to-date cleaning techniques and follow detailed processes to ensure consistent, superior results on every project.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Check className="text-bc-red mr-2 mt-1 flex-shrink-0" />
                  <p>Thorough pre-service inspection</p>
                </div>
                <div className="flex items-start">
                  <Check className="text-bc-red mr-2 mt-1 flex-shrink-0" />
                  <p>Safe, appropriate cleaning methods for each surface</p>
                </div>
                <div className="flex items-start">
                  <Check className="text-bc-red mr-2 mt-1 flex-shrink-0" />
                  <p>Premium, eco-friendly cleaning solutions</p>
                </div>
                <div className="flex items-start">
                  <Check className="text-bc-red mr-2 mt-1 flex-shrink-0" />
                  <p>Careful attention to surrounding areas</p>
                </div>
                <div className="flex items-start">
                  <Check className="text-bc-red mr-2 mt-1 flex-shrink-0" />
                  <p>Post-service quality check</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/lovable-uploads/82d69edb-6210-433b-a762-4610f454fc2c.png" 
                alt="BC Pressure Washing quality service" 
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      <CallToAction 
        backgroundImage="/lovable-uploads/1d7d3c0f-21a5-4ae2-80c7-7f156797449f.png"
        title="Ready to Transform Your Property?"
        subtitle="Contact us today to experience the BC Pressure Washing difference."
      />
    </Layout>
  );
};

export default About;
