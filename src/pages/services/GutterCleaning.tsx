import React from 'react';
import Layout from '../../components/Layout';
import ServiceHeader from '../../components/ServiceHeader';
import CallToAction from '../../components/CallToAction';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import ServiceProcessSection from '../../components/services/gutter-cleaning/ServiceProcessSection';
import MoreServicesSection from '../../components/MoreServicesSection';
import CitiesCarousel from '@/components/CitiesCarousel';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import GutterCleaningForm from '@/components/forms/GutterCleaningForm';
import ServiceAreaMap from '@/components/ServiceAreaMap';

const GutterCleaning = () => {
  const faqs = [
    {
      question: "How often should I clean my gutters?",
      answer: "We recommend cleaning your gutters at least twice a year, in the spring and fall. However, if you have many trees around your property, you may need to clean them more often."
    },
    {
      question: "What are the signs that my gutters need cleaning?",
      answer: "Signs include overflowing gutters, water damage on your home's exterior, sagging gutters, and visible debris buildup."
    },
    {
      question: "Can I clean my gutters myself?",
      answer: "While you can clean your gutters yourself, it can be a dangerous and time-consuming task. Our professional team has the equipment and experience to safely and efficiently clean your gutters."
    },
    {
      question: "Do you offer gutter repair services?",
      answer: "Yes, we offer gutter repair services to fix any damage to your gutters, such as leaks, sagging, or broken hangers."
    },
    {
      question: "Are you insured?",
      answer: "Yes, we are fully insured with WCB coverage and liability insurance for your complete peace of mind."
    }
  ];
  
  return (
    <Layout title="Professional Gutter Cleaning Services | Surrey & White Rock" description="Expert gutter cleaning services to prevent water damage and maintain your home's structural integrity.">
      <ServiceHeader 
        title="Professional Gutter Cleaning"
        description="Protect your home from water damage with our expert gutter cleaning services."
        youtubeId="EdMlx1sYJDc"
      />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="md:col-span-1 lg:pr-8">
              <h2 className="text-3xl font-bold mb-6">Protect Your Home with Clean Gutters</h2>
              <p className="text-lg text-gray-700 mb-4">
                Clogged gutters can cause serious water damage to your home's foundation, roof, and siding. Our professional gutter cleaning services ensure that your gutters are free of debris and functioning properly.
              </p>
              <p className="text-lg text-gray-700">
                We remove all leaves, twigs, and other debris from your gutters and downspouts, ensuring that water flows freely away from your home.
              </p>
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-3">Our Gutter Cleaning Services Include:</h3>
                <ul className="list-none pl-0">
                  <li className="mb-2 flex items-center">
                    <Check className="text-green-500 mr-2" size={16} />
                    Debris removal from gutters and downspouts
                  </li>
                  <li className="mb-2 flex items-center">
                    <Check className="text-green-500 mr-2" size={16} />
                    Inspection for damage and leaks
                  </li>
                  <li className="mb-2 flex items-center">
                    <Check className="text-green-500 mr-2" size={16} />
                    Flushing of downspouts to ensure proper flow
                  </li>
                  <li className="mb-2 flex items-center">
                    <Check className="text-green-500 mr-2" size={16} />
                    Before and after photos
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-100 hover:border-bc-red transition-all duration-300 transform hover:-translate-y-1">
                <GutterCleaningForm />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <ServiceProcessSection />
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">What to Expect After Your Gutter Cleaning</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            After our professional gutter cleaning service, you can expect properly functioning gutters that protect your home from water damage.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-xl mb-2">Improved Water Flow</h3>
              <p className="text-gray-700">Gutters will efficiently channel water away from your home's foundation.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-xl mb-2">Reduced Risk of Damage</h3>
              <p className="text-gray-700">Minimize the potential for water damage to your roof, siding, and foundation.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-xl mb-2">Prevention of Pest Infestation</h3>
              <p className="text-gray-700">Eliminate breeding grounds for pests like mosquitoes and rodents.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-xl mb-2">Extended Gutter Lifespan</h3>
              <p className="text-gray-700">Regular cleaning prevents corrosion and extends the life of your gutter system.</p>
            </div>
          </div>
        </div>
      </section>
      
      <TestimonialsSection />
      
      <FAQSection
        title="Frequently Asked Questions"
        subtitle="Get answers to common questions about our gutter cleaning services"
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
      <div className="bg-cover bg-center py-16 relative" style={{ backgroundImage: `url('/lovable-uploads/1f54ff74-e94a-413b-a279-55efad21b29a.png')` }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Book Your Gutter Cleaning?</h2>
            <p className="text-lg md:text-xl text-gray-100 mb-8">
              Protect your home from water damage with our professional gutter cleaning services.
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

export default GutterCleaning;
