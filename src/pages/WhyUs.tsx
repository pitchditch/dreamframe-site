import { Helmet } from "react-helmet-async";
import Layout from "../components/Layout";
import { MapPin, Award, Star, ThumbsUp } from "lucide-react";
import TestimonialsSection from "../components/home/TestimonialsSection";
import ChatAssistant from '@/components/ChatAssistant';

const WhyUs = () => {
  return (
    <Layout>
      <Helmet>
        <title>Why Choose Us | BC Pressure Washing</title>
        <meta name="description" content="Discover why BC Pressure Washing is the top choice for exterior cleaning services in Surrey, White Rock, and Metro Vancouver." />
      </Helmet>
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-16 md:py-24 relative">
        {/* Badge image fixed on hero (top right, only md+) */}
        <img 
          src="/lovable-uploads/a1f01b41-c73a-4644-8580-6399a42951bf.png"
          alt="Licensed & Insured"
          className="hidden md:block absolute top-8 right-8 w-32 h-32 md:w-40 md:h-40 object-contain z-20 drop-shadow-lg"
          style={{ pointerEvents: 'none' }}
        />
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Why Choose BC Pressure Washing?</h1>
            <p className="text-xl text-gray-300 mb-8">
              We deliver exceptional exterior cleaning solutions with a focus on quality, reliability, and customer satisfaction.
            </p>
          </div>
        </div>
        {/* Desktop chatbot floating at right-bottom */}
        <div className="hidden md:block fixed right-8 bottom-8 z-50">
          <ChatAssistant />
        </div>
        {/* Mobile: show chatbot bottom right */}
        <div className="md:hidden fixed right-5 bottom-5 z-50 flex flex-row gap-4">
          <ChatAssistant />
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
    </Layout>
  );
};

export default WhyUs;
