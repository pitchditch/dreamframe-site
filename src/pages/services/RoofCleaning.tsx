
import React from 'react';
import Layout from '../../components/Layout';
import ServiceHeader from '../../components/ServiceHeader';
import FAQSection from '../../components/FAQSection';
import ServiceBenefits from '../../components/ServiceBenefits';
import CallToAction from '../../components/CallToAction';
import { Shield, Droplets, Cloud } from 'lucide-react';
import PriceCalculatorOverlay from '@/components/PriceCalculatorOverlay';
import RoofCleaningForm from '@/components/forms/RoofCleaningForm';
import TestimonialsSection from '@/components/home/TestimonialsSection';

const RoofCleaning = () => {
  const benefits = [
    {
      title: "Extend Roof Lifespan",
      description: "Remove moss and algae that can trap moisture and deteriorate roofing materials."
    },
    {
      title: "Improve Curb Appeal",
      description: "Restore your roof's appearance and increase your home's value."
    },
    {
      title: "Prevent Costly Repairs",
      description: "Address issues early to avoid expensive repairs or premature roof replacement."
    },
    {
      title: "Enhance Energy Efficiency",
      description: "A clean roof reflects sunlight better, potentially reducing cooling costs."
    },
    {
      title: "Protect Gutters",
      description: "Prevent debris buildup in gutters caused by moss and algae runoff."
    },
    {
      title: "Healthier Environment",
      description: "Eliminate harmful organisms like mold and mildew that can affect air quality."
    }
  ];

  const faqs = [
    {
      question: "Why is roof cleaning important?",
      answer: "Moss, algae, and lichen can damage your roof by trapping moisture and deteriorating roofing materials. Regular cleaning extends your roof's lifespan and improves your home's appearance."
    },
    {
      question: "How often should I clean my roof?",
      answer: "The frequency depends on your location and environmental factors. Generally, cleaning every 2-3 years is recommended to prevent significant buildup."
    },
    {
      question: "What cleaning methods do you use?",
      answer: "We use soft washing techniques that are safe for all types of roofing materials. This involves applying a gentle cleaning solution that kills organisms without high-pressure washing."
    },
    {
      question: "Is soft washing safe for my roof?",
      answer: "Yes, soft washing is a safe and effective method for cleaning roofs. It avoids the damage that high-pressure washing can cause, while still thoroughly removing moss and algae."
    },
    {
      question: "Do I need to be home during the service?",
      answer: "No, you don't need to be home. As long as we have access to your property, we can perform the cleaning without you being present. We'll notify you when the job is complete."
    }
  ];

  return (
    <Layout title="Professional Roof Cleaning Services | BC Pressure Washing" description="Expert roof cleaning services in White Rock and Surrey. Remove moss, algae and extend the life of your roof with our professional cleaning methods.">
      <ServiceHeader 
        title="Professional Roof Cleaning"
        description="Restore your roof's appearance and extend its lifespan with our safe and effective cleaning methods."
        youtubeId="twtzf2gRdFU"
      />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-3xl font-bold mb-6">Restore Your Roof's Beauty</h2>
              <p className="text-lg text-gray-700 mb-4">
                Moss, algae, and lichen can not only make your roof look unsightly but also cause significant damage over time. Our professional roof cleaning service safely removes these growths, extending the life of your roof and enhancing your home's curb appeal.
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600 mr-3">
                    <Shield size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Safe Soft Washing Techniques</h3>
                    <p className="text-gray-600">
                      We use low-pressure soft washing to gently remove moss and algae without damaging your roofing materials.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600 mr-3">
                    <Droplets size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Effective Algae and Moss Removal</h3>
                    <p className="text-gray-600">
                      Our specialized cleaning solutions effectively kill and remove moss, algae, and lichen, preventing regrowth for longer-lasting results.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600 mr-3">
                    <Cloud size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Eco-Friendly Cleaning Products</h3>
                    <p className="text-gray-600">
                      We use environmentally friendly cleaning solutions that are safe for your family, pets, and landscaping.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <PriceCalculatorOverlay buttonText="Check Price & Availability" variant="bc-red" />
                <a 
                  href="tel:7788087620"
                  className="bg-green-600 hover:bg-green-700 text-white text-center py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  Call Now: (778) 808-7620
                </a>
              </div>
              
              <div className="mt-10 p-6 bg-amber-50 rounded-lg border border-amber-200">
                <h3 className="text-xl font-bold mb-2 text-amber-800">Roof Cleaning Warning!</h3>
                <p className="text-amber-700">
                  Ignoring moss and algae growth can lead to significant roof damage and costly repairs. Protect your investment with regular, professional cleaning.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-xl p-6 border-2 border-gray-100">
              <RoofCleaningForm />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <ServiceBenefits 
            title="Benefits of Professional Roof Cleaning" 
            subtitle="Protect your home and extend the life of your roof with our expert cleaning services"
            benefits={benefits} 
          />
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Our Roof Cleaning Process</h2>
            
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-2/5">
                  <img 
                    src="/lovable-uploads/69999999-9999-9999-9999-999999999999.png" 
                    alt="Roof Assessment" 
                    className="rounded-lg shadow-md w-full"
                  />
                </div>
                <div className="md:w-3/5">
                  <h3 className="text-xl font-bold mb-2">1. Roof Assessment</h3>
                  <p className="text-gray-700">
                    We start with a thorough inspection of your roof to identify the type of growth, assess the condition of your roofing materials, and determine the best cleaning approach.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-3/5 md:order-1 order-2">
                  <h3 className="text-xl font-bold mb-2">2. Preparation and Protection</h3>
                  <p className="text-gray-700">
                    We protect your landscaping, plants, and surrounding areas by covering them with tarps and taking precautions to prevent any damage during the cleaning process.
                  </p>
                </div>
                <div className="md:w-2/5 md:order-2 order-1">
                  <img 
                    src="/lovable-uploads/11111111-1111-1111-1111-111111111111.png" 
                    alt="Area Protection" 
                    className="rounded-lg shadow-md w-full"
                  />
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-2/5">
                  <img 
                    src="/lovable-uploads/22222222-2222-2222-2222-222222222222.png" 
                    alt="Soft Washing Application" 
                    className="rounded-lg shadow-md w-full"
                  />
                </div>
                <div className="md:w-3/5">
                  <h3 className="text-xl font-bold mb-2">3. Soft Washing Application</h3>
                  <p className="text-gray-700">
                    We apply our eco-friendly cleaning solution using a low-pressure soft washing system. This ensures the solution gently penetrates and kills the moss, algae, and lichen without damaging your roofing materials.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-3/5 md:order-1 order-2">
                  <h3 className="text-xl font-bold mb-2">4. Rinsing and Cleanup</h3>
                  <p className="text-gray-700">
                    After allowing the cleaning solution to dwell for the appropriate time, we gently rinse your roof to remove the dead moss and algae. We then clean up any remaining debris, leaving your property clean and tidy.
                  </p>
                </div>
                <div className="md:w-2/5 md:order-2 order-1">
                  <img 
                    src="/lovable-uploads/33333333-3333-3333-3333-333333333333.png" 
                    alt="Rinsing and Cleanup" 
                    className="rounded-lg shadow-md w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <TestimonialsSection />
      
      <FAQSection
        title="Frequently Asked Questions About Roof Cleaning"
        subtitle="Get answers to common questions about our roof cleaning services"
        faqs={faqs}
      />
      
      <CallToAction 
        title="Ready to Restore Your Roof's Beauty?"
        subtitle="Contact us today for a free estimate and discover the benefits of professional roof cleaning."
      />
    </Layout>
  );
};

export default RoofCleaning;
