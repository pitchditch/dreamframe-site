
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import Layout from "../components/Layout";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Award, Star, ThumbsUp, Camera, Shield } from "lucide-react";
import ServiceAreaMap from "../components/ServiceAreaMap";
import TestimonialsSection from "../components/home/TestimonialsSection";

const WhyUs = () => {
  const [zipCode, setZipCode] = useState('');

  const handleZipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipCode) {
      sessionStorage.setItem('userZipCode', zipCode);
      window.location.href = '/calculator';
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Why Choose Us | BC Pressure Washing</title>
        <meta name="description" content="Discover why BC Pressure Washing is the top choice for exterior cleaning services in Surrey, White Rock, and Metro Vancouver." />
      </Helmet>
      
      {/* Updated Hero Section with new image and postal code input */}
      <section className="relative h-screen w-full overflow-hidden hero-section">
        <img 
          src="/lovable-uploads/91a0791c-9a57-45d1-bfae-2bced2dcc76f.png"
          alt="Why Choose BC Pressure Washing"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>
        <div className="relative h-full flex items-center justify-center px-4 z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-shadow">
              Why Choose BC Pressure Washing?
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 text-shadow">
              We deliver exceptional exterior cleaning solutions with a focus on quality, reliability, and customer satisfaction.
            </p>
            <form onSubmit={handleZipSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
              <Input
                type="text"
                placeholder="Enter Your Postal Code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="w-full sm:w-64 text-lg h-12 bg-white"
                maxLength={7}
              />
              <Button type="submit" variant="default" size="lg" className="w-full sm:w-auto bg-bc-red hover:bg-red-700">
                Get Free Quote
              </Button>
            </form>
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

      {/* Satisfaction Guarantee Section - Updated with Google Review button */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Satisfaction Guarantee</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Camera className="w-6 h-6 text-bc-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Before & After Documentation</h3>
                    <p className="text-gray-700">We capture detailed before and after photos of every job, showing you the dramatic transformation of your property.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 text-bc-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">100% Satisfaction Promise</h3>
                    <p className="text-gray-700">If you're not completely satisfied with our work, we'll come back and make it right at no additional cost.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Star className="w-6 h-6 text-bc-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Customer Reviews</h3>
                    <p className="text-gray-700">We value your feedback and encourage you to share your experience. Your reviews help us maintain our high standards.</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Button
                  className="bg-bc-red hover:bg-bc-red/90 text-white font-semibold py-4 px-6 rounded-lg w-full md:w-auto flex items-center justify-center gap-2"
                  onClick={() => window.open('https://g.page/r/CUJj9wYVinVUEBM/review', '_blank')}
                >
                  <Star className="w-5 h-5" />
                  Leave us a Review on Google
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="/lovable-uploads/97ab1ee0-b864-4d9e-b37b-9a526229a18f.png"
                alt="Before and After Transformation"
                className="rounded-lg shadow-xl w-full"
              />
              <div className="absolute -bottom-4 -right-4 bg-bc-red text-white px-4 py-2 rounded-lg font-semibold">
                Real Results
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Your Local Cleaning Expert Section - Enhanced background for car image */}
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
            <div className="relative rounded-lg overflow-hidden shadow-xl bg-white p-3">
              <img 
                src="/lovable-uploads/3146f82b-e494-43b8-91c3-4bf5921f2e3a.png"
                alt="BC Pressure Washing Service Vehicle"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Professional Equipment</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <img 
                src="/lovable-uploads/7a4334e8-e64a-4438-a0db-0319a25f8d0f.png"
                alt="Professional Pressure Washer"
                className="w-full h-48 object-contain rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">State-of-the-Art Pressure Washer</h3>
              <p className="text-gray-600">Our Lifan Hydro Pro pressure washer delivers perfect pressure for each surface.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <img 
                src="/lovable-uploads/6c45cc15-89d9-4846-9040-98eb1f18e24f.png"
                alt="Surface Cleaner"
                className="w-full h-48 object-contain rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Surface Cleaner</h3>
              <p className="text-gray-600">Professional surface cleaner for streak-free results on large areas.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <img 
                src="/lovable-uploads/dc85910b-5a9d-4d47-a400-aa93946bf62e.png"
                alt="Eco-Friendly Solutions"
                className="w-full h-48 object-contain rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Eco-Friendly Products</h3>
              <p className="text-gray-600">Safe and effective cleaning solutions for your property.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <img 
                src="/lovable-uploads/c5717ab7-6ffd-477f-9518-01adaa2fc3b2.png"
                alt="Water Fed Pole System"
                className="w-full h-48 object-contain rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Water Fed Pole System</h3>
              <p className="text-gray-600">Professional pure water cleaning system for windows and high areas.</p>
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

      <ServiceAreaMap />
    </Layout>
  );
};

export default WhyUs;
