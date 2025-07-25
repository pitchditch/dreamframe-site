
import Layout from '../../components/Layout';
import { useTranslation } from '@/hooks/use-translation';
import { Check, ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import CallToAction from '../../components/CallToAction';
import FAQSection from '../../components/FAQSection';
import TestimonialSection from '../../components/home/TestimonialsSection';
import WhatWeCleanSection from '../../components/services/window-cleaning/WhatWeCleanSection';

const WindowCleaning = () => {
  const { t } = useTranslation();

  const windowCleaningFAQs = [
    {
      question: "How often should I have my windows cleaned?",
      answer: "For residential properties, we recommend window cleaning every 3-6 months. Commercial properties may need more frequent cleaning depending on location and environmental factors."
    },
    {
      question: "Do you clean windows in winter?",
      answer: "Yes, we provide year-round window cleaning services. We use specialized techniques and solutions that work effectively even in colder temperatures."
    },
    {
      question: "What is purified water system cleaning?",
      answer: "Our purified water system removes all minerals and impurities from water, leaving windows spot-free and streak-free. This method is more effective and environmentally friendly than traditional cleaning."
    },
    {
      question: "Do you clean both inside and outside?",
      answer: "Yes, our standard window cleaning service includes both interior and exterior cleaning for a complete, crystal-clear result."
    },
    {
      question: "Are you insured?",
      answer: "Absolutely! We are fully insured and bonded for your peace of mind. Our insurance covers both liability and workers' compensation."
    },
    {
      question: "How long does window cleaning take?",
      answer: "The time depends on the size of your property and number of windows. Most residential homes take 1-3 hours, while larger commercial properties may take longer."
    }
  ];

  return (
    <Layout>
      {/* Hero Section - Completely New */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/lovable-uploads/f7abf414-3ad9-4c10-a077-7cbb8881d937.png')" }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        {/* Hero Content - Centered */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Window Cleaning in Surrey, White Rock & Greater Vancouver
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-4xl mx-auto leading-relaxed">
            Crystal-clear, streak-free windows using our purified water technology.
          </p>
          <Button asChild size="lg" variant="bc-red" className="text-lg px-8 py-4 hover:scale-105 transition-transform">
            <Link to="/calculator">Check Prices & Availability</Link>
          </Button>
        </div>
      </section>

      {/* What We Clean Section */}
      <WhatWeCleanSection />

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Why Choose Our Window Cleaning Service?</h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-bc-red p-2 rounded-full flex-shrink-0">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Purified Water System</h3>
                      <p className="text-gray-600">Our advanced purified water system ensures spot-free, streak-free results that last longer than traditional cleaning methods.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-bc-red p-2 rounded-full flex-shrink-0">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Eco-Friendly Solutions</h3>
                      <p className="text-gray-600">We use environmentally safe cleaning products that are safe for your family, pets, and the environment.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-bc-red p-2 rounded-full flex-shrink-0">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Professional Team</h3>
                      <p className="text-gray-600">Our trained professionals have years of experience and are fully insured for your peace of mind.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-bc-red p-2 rounded-full flex-shrink-0">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">100% Satisfaction Guarantee</h3>
                      <p className="text-gray-600">We're not satisfied until you are. If you're not happy with our work, we'll make it right.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src="/lovable-uploads/4a9921b9-2dd2-42b8-ade9-61bbeeb18898.png" 
                  alt="Professional window cleaning process" 
                  className="rounded-lg shadow-xl w-full"
                />
                <div className="absolute -top-4 -right-4 bg-bc-red text-white p-4 rounded-lg shadow-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold">100%</div>
                    <div className="text-sm">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Our Window Cleaning Process</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Assessment & Setup</h3>
                <p className="text-gray-600">We assess your windows and set up our equipment, including our purified water system and professional tools.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Deep Cleaning</h3>
                <p className="text-gray-600">We clean your windows inside and out using our advanced techniques and eco-friendly solutions.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-blue-600">3</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Quality Check</h3>
                <p className="text-gray-600">We perform a thorough quality check to ensure every window is spotless and streak-free.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialSection />

      {/* FAQ Section */}
      <FAQSection 
        title="Frequently Asked Questions"
        subtitle="Get answers to common questions about our window cleaning services"
        faqs={windowCleaningFAQs}
      />

      {/* Call to Action */}
      <CallToAction 
        title="Get Crystal Clear Windows Today!"
        subtitle="Contact us now for professional window cleaning in Surrey, White Rock & Greater Vancouver."
        backgroundImage="/lovable-uploads/26f6a625-a200-4106-8f94-579be5c566b6.png"
      />
    </Layout>
  );
};

export default WindowCleaning;
