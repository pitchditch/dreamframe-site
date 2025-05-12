
import React from 'react';
import Layout from '../../components/Layout';
import ServiceHeader from '../../components/ServiceHeader';
import CallToAction from '../../components/CallToAction';
import { ExternalLink, MessageCircle } from 'lucide-react';
import ServiceProcess from '../../components/ServiceProcess';
import ServiceBenefits from '../../components/ServiceBenefits';
import { Check } from 'lucide-react';
import TestimonialsSection from '../../components/home/TestimonialsSection';
import FAQSection from '../../components/FAQSection';
import MoreServicesSection from '../../components/MoreServicesSection';
import CitiesCarousel from '@/components/CitiesCarousel';
import WindowCleaningForm from '@/components/forms/WindowCleaningForm';
import { Card } from '@/components/ui/card';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const WindowCleaning = () => {
  const faqs = [
    {
      question: "How often should I clean my windows?",
      answer: "We recommend cleaning your windows at least twice a year to maintain their clarity and prevent buildup of dirt and grime. However, depending on your location and environmental factors, you may want to clean them more frequently."
    },
    {
      question: "What is included in your window cleaning service?",
      answer: "Our window cleaning service includes washing the exterior and interior of your windows, cleaning the screens, and wiping down the sills and frames. We use professional-grade equipment and eco-friendly cleaning solutions to ensure a streak-free finish."
    },
    {
      question: "Do I need to be home during the window cleaning service?",
      answer: "It is not necessary for you to be home during the service, as long as we have access to all windows. We will communicate with you before and after the service to ensure your satisfaction."
    },
    {
      question: "Are your cleaning products safe for my family and pets?",
      answer: "Yes, we use eco-friendly cleaning solutions that are safe for your family, pets, and the environment. Our products are non-toxic and biodegradable."
    },
    {
      question: "How long does the window cleaning service take?",
      answer: "The duration of the service depends on the size and number of windows in your home or business. We will provide you with an estimated time frame when you book your appointment."
    }
  ];

  const windowCleaningProcesses = [
    {
      title: "Assessment",
      description: "We start with a thorough assessment of your windows and property to determine the best cleaning approach.",
      icon: <Check size={24} />,
      number: 1
    },
    {
      title: "Preparation",
      description: "Our team prepares the area, removing obstacles and ensuring your property is protected during cleaning.",
      icon: <Check size={24} />,
      number: 2
    },
    {
      title: "Cleaning",
      description: "Using our professional tools and eco-friendly cleaning solutions, we clean each window inside and out.",
      icon: <Check size={24} />,
      number: 3
    }
  ];

  const windowCleaningBenefits = [
    {
      title: "Improved Natural Light",
      description: "Clean windows allow more natural light to enter your home, creating a brighter, more inviting environment.",
      icon: <Check size={18} />
    },
    {
      title: "Enhanced Curb Appeal",
      description: "Sparkling windows instantly improve your property's appearance and create a positive first impression.",
      icon: <Check size={18} />
    },
    {
      title: "Extended Window Life",
      description: "Regular cleaning prevents corrosion and extends the lifespan of your windows and frames.",
      icon: <Check size={18} />
    },
    {
      title: "Better Energy Efficiency",
      description: "Clean windows maximize sunlight transmission, potentially reducing your heating costs during colder months.",
      icon: <Check size={18} />
    },
    {
      title: "Healthier Indoor Environment",
      description: "Removing accumulated dust, pollen, and allergens from your windows improves indoor air quality.",
      icon: <Check size={18} />
    },
    {
      title: "Professional Results",
      description: "Our skilled technicians deliver streak-free, spotless windows that DIY methods simply can't match.",
      icon: <Check size={18} />
    }
  ];
  
  return (
    <Layout title="Professional Window Cleaning Services | Surrey & White Rock" description="Expert window cleaning services for crystal clear views. Interior and exterior window cleaning for residential and commercial properties.">
      <ServiceHeader 
        title="Professional Window Cleaning"
        description="Experience crystal-clear views with our expert window cleaning services for homes and businesses."
        youtubeId="lYnXijewxCM"
      />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="md:col-span-1 lg:pr-8">
              <h2 className="text-3xl font-bold mb-6">Achieve Spotless Windows with Our Expert Cleaning</h2>
              <p className="text-lg text-gray-700 mb-4">
                Our professional window cleaning services remove dirt, grime, and streaks, leaving your windows sparkling clean and enhancing your property's appearance.
              </p>
              <p className="text-lg text-gray-700">
                We use state-of-the-art equipment and eco-friendly cleaning solutions to safely clean all types of windows, including:
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                  <img src="/lovable-uploads/5d9b60f7-561a-4672-acdf-29948d260793.png" alt="Residential Windows" className="w-16 h-16 object-cover rounded-lg" />
                  <span className="font-medium">Residential windows</span>
                </div>
                <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                  <img src="/lovable-uploads/b3e01fd9-0f50-4524-b794-26a9f6f93ee5.png" alt="Commercial Windows" className="w-16 h-16 object-cover rounded-lg" />
                  <span className="font-medium">Commercial windows</span>
                </div>
                <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                  <img src="/lovable-uploads/47504564-617f-4553-85c8-0f9f5d5ec715.png" alt="Skylights" className="w-16 h-16 object-cover rounded-lg" />
                  <span className="font-medium">Skylights</span>
                </div>
                <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                  <img src="/lovable-uploads/ef54ad3a-1e61-4d1e-b827-b556187487ef.png" alt="Glass Railings" className="w-16 h-16 object-cover rounded-lg" />
                  <span className="font-medium">Glass railings</span>
                </div>
              </div>
            </div>
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-100 hover:border-bc-red transition-all duration-300 transform hover:-translate-y-1">
                <WindowCleaningForm />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="w-full bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Benefits of Professional Window Cleaning</h2>
          <ServiceBenefits benefits={windowCleaningBenefits} />
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Our Window Cleaning Service</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3">Experienced Professionals</h3>
              <p className="text-gray-600">Our fully trained and insured team has years of experience cleaning windows of all types and sizes.</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3">Advanced Equipment</h3>
              <p className="text-gray-600">We use professional-grade tools and purified water systems for spotless results every time.</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3">Eco-Friendly Solutions</h3>
              <p className="text-gray-600">Our cleaning solutions are effective yet safe for your family, pets, and the environment.</p>
            </Card>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-3">Before & After</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            See the dramatic difference our professional window cleaning makes on homes in Surrey and White Rock.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <img src="/lovable-uploads/5d9b60f7-561a-4672-acdf-29948d260793.png" alt="Before Window Cleaning" className="rounded-lg shadow-lg w-full h-auto" />
            <img src="/lovable-uploads/ef54ad3a-1e61-4d1e-b827-b556187487ef.png" alt="After Window Cleaning" className="rounded-lg shadow-lg w-full h-auto" />
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Window Cleaning Process</h2>
          <ServiceProcess processes={windowCleaningProcesses} />
        </div>
      </section>
      
      <TestimonialsSection />
      
      <FAQSection
        title="Frequently Asked Questions"
        subtitle="Get answers to common questions about our window cleaning services"
        faqs={faqs}
      />
      
      <MoreServicesSection />
      
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Areas We Service</h2>
          <ServiceAreaMap />
        </div>
      </section>
      
      {/* Update the CTA section with new background image */}
      <div className="bg-cover bg-center py-16 relative" style={{ backgroundImage: `url('/lovable-uploads/359b90ff-bbcc-479a-a4e8-4843fdbf10dc.png')` }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Your Property?</h2>
            <p className="text-lg md:text-xl text-gray-100 mb-8">
              Book our professional window cleaning services today.
            </p>
            <Button asChild variant="bc-red" size="lg" className="px-8 py-6">
              <Link to="/calculator">Check Prices & Availability</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WindowCleaning;
