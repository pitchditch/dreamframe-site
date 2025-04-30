
import React from 'react';
import Layout from '../components/Layout';
import ServiceHeader from '../components/ServiceHeader';
import { Shield, Award, Clock, ThumbsUp, Zap, Droplets } from 'lucide-react';
import TestimonialsSection from '../components/home/TestimonialsSection';
import EquipmentSection from '../components/EquipmentSection';
import CallToAction from '../components/CallToAction';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const WhyUs = () => {
  return (
    <Layout>
      <ServiceHeader 
        title="Why Choose BC Pressure Washing?"
        description="Discover what sets our service apart and why we've become the most trusted exterior cleaning company in Surrey & White Rock."
        imagePath="/lovable-uploads/55d5e426-c21d-4c24-8cf1-0cc45bd0b603.png"
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
      
      {/* Gutter Sticks Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <img 
                src="/lovable-uploads/0e0f9d23-dc80-43e4-9599-eb9fc29013d0.png" 
                alt="Gutter stick installation" 
                className="rounded-lg shadow-lg max-w-full"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Gutter Protection System</h2>
              <p className="text-lg text-gray-700 mb-6">
                Say goodbye to clogged gutters and expensive repairs. Our gutter stick protection system is an affordable way to prevent leaves and debris from blocking your downspouts while still allowing water to flow freely.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="bg-bc-red rounded-full p-1 text-white mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Prevents clogged downspouts</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-bc-red rounded-full p-1 text-white mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Easy to install - just $70 per drain</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-bc-red rounded-full p-1 text-white mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Safer and more effective than mesh screens</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-bc-red rounded-full p-1 text-white mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Reduces maintenance costs and extends gutter life</span>
                </li>
              </ul>
              <Button asChild variant="bc-red" className="w-full sm:w-auto px-8 py-3 text-white font-medium">
                <Link to="/contact">Ask About Installation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Professional Equipment Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Professional Equipment</h2>
            <p className="text-lg text-gray-700">
              We invest in the best equipment to deliver superior results for your property. Our professional-grade tools and cleaning solutions ensure efficient and effective cleaning every time.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="flex justify-center mb-4">
                <img 
                  src="/lovable-uploads/55d5e426-c21d-4c24-8cf1-0cc45bd0b603.png" 
                  alt="Water Fed Pole System" 
                  className="h-48 w-auto object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Water Fed Pole System</h3>
              <p className="text-gray-600 text-center">
                Pure water technology for streak-free window cleaning up to 60 feet high.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="flex justify-center mb-4">
                <img 
                  src="/lovable-uploads/fc1513eb-e5d4-4ac2-ab52-70b930041127.png" 
                  alt="Surface Cleaner" 
                  className="h-48 w-auto object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Surface Cleaner</h3>
              <p className="text-gray-600 text-center">
                Even cleaning pattern for driveways, patios and large surface areas.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="flex justify-center mb-4">
                <img 
                  src="/lovable-uploads/3e86d1b1-3e04-46f3-885d-2a41fc4eb192.png" 
                  alt="Pressure Washer" 
                  className="h-48 w-auto object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Pressure Washer</h3>
              <p className="text-gray-600 text-center">
                Commercial-grade equipment for efficient and powerful cleaning.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="flex justify-center mb-4">
                <img 
                  src="/lovable-uploads/3e86d1b1-3e04-46f3-885d-2a41fc4eb192.png" 
                  alt="Premium Cleaning Solutions" 
                  className="h-48 w-auto object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Eco-Friendly Products</h3>
              <p className="text-gray-600 text-center">
                Safe for your family, pets, and plants while still providing exceptional cleaning power.
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
