import { Helmet } from "react-helmet-async";
import Layout from "../components/Layout";
import { MapPin, Award, Star, ThumbsUp } from "lucide-react";
import TestimonialsSection from "../components/home/TestimonialsSection";
import ChatAssistant from '@/components/ChatAssistant';
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const WhyUs = () => {
  return (
    <Layout>
      <Helmet>
        <title>Why Choose Us | BC Pressure Washing</title>
        <meta name="description" content="Discover why BC Pressure Washing is the top choice for exterior cleaning services in Surrey, White Rock, and Metro Vancouver." />
      </Helmet>
      
      {/* Hero Section with new background */}
      <section className="bg-gray-900 text-white relative min-h-[600px] flex items-center">
        <div className="absolute inset-0">
          <img 
            src="/lovable-uploads/098e918c-11ab-464e-ba8b-ef8e215463c3.png"
            alt="BC Pressure Washing Service"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Why Choose BC Pressure Washing?</h1>
            <p className="text-xl text-gray-300 mb-8">
              We deliver exceptional exterior cleaning solutions with a focus on quality, reliability, and customer satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <img 
                src="/lovable-uploads/970e3c9b-99cf-4d26-b9f1-825193b4cc3e.png"
                alt="Satisfaction Guaranteed"
                className="w-32 h-32 mb-4"
              />
              <h3 className="text-lg font-semibold">100% Satisfaction Guaranteed</h3>
            </div>
            <div className="flex flex-col items-center text-center">
              <img 
                src="/lovable-uploads/2407d3c7-6540-4457-af2e-671f7d6fe788.png"
                alt="Fully Insured & Licensed"
                className="w-32 h-32 mb-4"
              />
              <h3 className="text-lg font-semibold">Fully Insured & Licensed</h3>
            </div>
            <div className="flex flex-col items-center text-center">
              <img 
                src="/lovable-uploads/279e64d9-3d06-4cc5-8750-e55fa3b27862.png"
                alt="Locally Owned & Operated"
                className="w-32 h-32 mb-4"
              />
              <h3 className="text-lg font-semibold">Locally Owned & Operated</h3>
            </div>
            <div className="flex flex-col items-center text-center">
              <img 
                src="/lovable-uploads/4a7fc035-4cd5-416d-89bf-b9ee39d95909.png"
                alt="Eco-Friendly Solutions"
                className="w-32 h-32 mb-4"
              />
              <h3 className="text-lg font-semibold">Eco-Friendly Solutions</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Local Business Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Your Local Cleaning Expert</h2>
              <p className="text-lg text-gray-700 mb-6">
                As a proud local business, we're deeply connected to our community. You've probably seen our red service vehicle along Marine Drive or throughout White Rock and Surrey. We're not just another cleaning company – we're your neighbors, committed to keeping our community beautiful.
              </p>
              <p className="text-lg text-gray-700">
                When you choose BC Pressure Washing, you're supporting a local business that understands the unique needs of properties in our area.
              </p>
            </div>
            <div className="relative">
              <img 
                src="/lovable-uploads/3146f82b-e494-43b8-91c3-4bf5921f2e3a.png"
                alt="BC Pressure Washing Service Vehicle"
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-600 text-white p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Superior Quality</h3>
              <p className="text-gray-600">
                We use professional-grade equipment and eco-friendly cleaning solutions to deliver superior results every time.
              </p>
            </div>
            
            {/* Benefit 2 */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-600 text-white p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Star size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Experienced Team</h3>
              <p className="text-gray-600">
                Our highly trained technicians have years of experience in all aspects of exterior cleaning.
              </p>
            </div>
            
            {/* Benefit 3 */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-600 text-white p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <ThumbsUp size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Customer Satisfaction</h3>
              <p className="text-gray-600">
                We're not satisfied until you are. Our team is committed to delivering results that exceed your expectations.
              </p>
            </div>
            
            {/* Benefit 4 */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-600 text-white p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Local Expertise</h3>
              <p className="text-gray-600">
                As a local business, we understand the unique needs of properties in Surrey, White Rock, and Metro Vancouver.
              </p>
            </div>
            
            {/* Benefit 5 */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-600 text-white p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Fully Insured</h3>
              <p className="text-gray-600">
                We carry comprehensive insurance coverage for your peace of mind and protection.
              </p>
            </div>
            
            {/* Benefit 6 */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-600 text-white p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Star size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">100% Satisfaction Guarantee</h3>
              <p className="text-gray-600">
                If you're not completely satisfied with our work, we'll return and make it right at no additional cost.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* Our Approach */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Approach</h2>
            <p className="text-gray-600">
              We believe in providing honest, reliable service with transparent pricing and exceptional results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">Comprehensive Assessment</h3>
              <p className="text-gray-600 mb-6">
                Before starting any project, we thoroughly assess your property's specific needs and challenges. This allows us to provide an accurate quote and develop an effective cleaning plan.
              </p>
              <h3 className="text-2xl font-bold mb-4">Customized Solutions</h3>
              <p className="text-gray-600">
                We understand that every property is unique. Our team tailors our cleaning methods to address your specific concerns while protecting your property's surfaces.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4">State-of-the-Art Equipment</h3>
              <p className="text-gray-600 mb-6">
                We invest in the latest cleaning technology to deliver superior results efficiently and safely. Our equipment allows us to tackle even the toughest cleaning challenges.
              </p>
              <h3 className="text-2xl font-bold mb-4">Environmental Responsibility</h3>
              <p className="text-gray-600">
                We use eco-friendly cleaning solutions whenever possible and employ water conservation techniques to minimize environmental impact.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Desktop chatbot floating at right-bottom */}
      <div className="hidden md:block fixed right-8 bottom-8 z-50">
        <ChatAssistant />
      </div>
      {/* Mobile: show chatbot bottom right */}
      <div className="md:hidden fixed right-5 bottom-5 z-50 flex flex-row gap-4">
        <ChatAssistant />
      </div>
    </Layout>
  );
};

export default WhyUs;
