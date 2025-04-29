
import React from 'react';
import Layout from '../components/Layout';
import ServiceHeader from '../components/ServiceHeader';
import { Shield, Award, Clock, ThumbsUp, Zap, Droplets } from 'lucide-react';
import TestimonialsSection from '../components/home/TestimonialsSection';
import EquipmentSection from '../components/EquipmentSection';
import CallToAction from '../components/CallToAction';

const WhyUs = () => {
  return (
    <Layout>
      <ServiceHeader 
        title="Why Choose BC Pressure Washing?"
        description="Discover what sets our service apart and why we've become the most trusted exterior cleaning company in Surrey & White Rock."
        imagePath="/lovable-uploads/77f10df6-6f51-4587-8315-7bb702183f0a.png"
        darkOverlay={true}
      />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">The BC Pressure Washing Difference</h2>
            <p className="text-lg text-gray-700">
              When you choose BC Pressure Washing, you're not just hiring a service provider – you're partnering with a local business that truly cares about delivering exceptional results for your home or business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center mb-4">
                <Shield className="text-bc-red w-8 h-8 mr-3" />
                <h3 className="text-xl font-bold">Owner-Operated</h3>
              </div>
              <p className="text-gray-700">
                Unlike franchise operations, our owner Jayden personally oversees every job to ensure the highest quality standards are met.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center mb-4">
                <Award className="text-bc-red w-8 h-8 mr-3" />
                <h3 className="text-xl font-bold">5-Star Rated</h3>
              </div>
              <p className="text-gray-700">
                We maintain a perfect 5-star rating across Google, Facebook, and HomeStars because customer satisfaction is our top priority.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center mb-4">
                <Clock className="text-bc-red w-8 h-8 mr-3" />
                <h3 className="text-xl font-bold">Prompt & Reliable</h3>
              </div>
              <p className="text-gray-700">
                We respect your time with punctual arrivals, clear communication, and efficient service completion without sacrificing quality.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center mb-4">
                <ThumbsUp className="text-bc-red w-8 h-8 mr-3" />
                <h3 className="text-xl font-bold">Satisfaction Guaranteed</h3>
              </div>
              <p className="text-gray-700">
                If you're not 100% satisfied with our work, we'll return and make it right at no additional cost to you.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center mb-4">
                <Zap className="text-bc-red w-8 h-8 mr-3" />
                <h3 className="text-xl font-bold">Advanced Equipment</h3>
              </div>
              <p className="text-gray-700">
                We invest in professional-grade equipment and eco-friendly cleaning solutions for superior results every time.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center mb-4">
                <Droplets className="text-bc-red w-8 h-8 mr-3" />
                <h3 className="text-xl font-bold">Eco-Friendly Approach</h3>
              </div>
              <p className="text-gray-700">
                Our cleaning methods and products are effective while being environmentally responsible and safe for your family and pets.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Our Commitment to Excellence</h2>
            <p className="text-lg text-gray-700">
              At BC Pressure Washing, we believe that attention to detail and genuine care for our customers' properties sets us apart from other service providers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-bc-red">Fully Insured & Bonded</h3>
              <p className="text-gray-700 mb-4">
                We carry comprehensive insurance coverage to protect your property and provide you with peace of mind. Our team is professionally trained and follows strict safety protocols.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>$5 million liability insurance</li>
                <li>WCB coverage for all employees</li>
                <li>Bonded for your protection</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-bc-red">Transparent Pricing</h3>
              <p className="text-gray-700 mb-4">
                We provide clear, upfront pricing with no hidden fees or surprise charges. Our quotes are detailed and comprehensive, so you know exactly what you're paying for.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Free, no-obligation estimates</li>
                <li>Competitive rates with no hidden fees</li>
                <li>Value-based pricing for exceptional service</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      <EquipmentSection />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">What Our Customers Say</h2>
            <p className="text-lg text-gray-700">
              Don't just take our word for it. Here's what our satisfied customers have to say about our services.
            </p>
          </div>
          
          <TestimonialsSection />
        </div>
      </section>
      
      <CallToAction />
    </Layout>
  );
};

export default WhyUs;
