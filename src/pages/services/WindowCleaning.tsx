
import React from 'react';
import Layout from '../../components/Layout';
import ServiceHeader from '../../components/ServiceHeader';
import CallToAction from '../../components/CallToAction';
import FAQSection from '../../components/FAQSection';
import ServiceBenefits from '../../components/ServiceBenefits';
import WindowCleaningQuoteOverlay from '../../components/forms/WindowCleaningQuoteOverlay';
import WaterFedPoleSection from '../../components/services/window-cleaning/WaterFedPoleSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import MoreServicesSection from '@/components/MoreServicesSection';

const WindowCleaning = () => {
  const benefits = [
    {
      title: "Crystal Clear Views",
      description: "Enjoy unobstructed views with our streak-free cleaning technology using purified water systems."
    },
    {
      title: "Extended Window Life",
      description: "Regular cleaning prevents buildup of corrosive elements that can permanently damage glass surfaces."
    },
    {
      title: "Enhanced Curb Appeal",
      description: "Clean windows dramatically improve your property's appearance and make a great first impression."
    },
    {
      title: "Natural Light Maximization",
      description: "Clean windows allow up to 30% more natural light into your home, reducing energy costs."
    },
    {
      title: "Professional Equipment",
      description: "We use commercial-grade squeegees, pure water systems, and eco-friendly cleaning solutions."
    },
    {
      title: "Safety First",
      description: "Our insured technicians use proper safety equipment and techniques for all window cleaning jobs."
    }
  ];

  const faqs = [
    {
      question: "How often should I have my windows cleaned?",
      answer: "For residential properties, we recommend quarterly cleanings (4 times per year). Commercial properties may benefit from monthly or bi-monthly service depending on location and foot traffic."
    },
    {
      question: "Do you clean windows in winter?",
      answer: "Yes, we provide window cleaning services year-round. However, we may reschedule appointments during severe weather conditions for safety reasons."
    },
    {
      question: "What's included in your window cleaning service?",
      answer: "Our standard service includes cleaning both interior and exterior window surfaces, sills, and frames. We also remove screens when necessary and clean them separately."
    },
    {
      question: "Do you have insurance?",
      answer: "Yes, we are fully insured with general liability and workers' compensation insurance. We can provide proof of insurance upon request."
    },
    {
      question: "What if it rains after you clean my windows?",
      answer: "Rain actually keeps windows cleaner longer when properly cleaned with purified water. However, if you're not satisfied with the results, we'll return to re-clean at no charge."
    }
  ];

  return (
    <Layout title="Professional Window Cleaning Services | Surrey & White Rock" description="Expert window cleaning using purified water systems. Streak-free results for residential and commercial properties in Surrey, White Rock, and Metro Vancouver.">
      <ServiceHeader 
        title="Professional Window Cleaning" 
        description="Crystal clear, streak-free windows using our advanced purified water cleaning system." 
        imagePath="/lovable-uploads/43f837f2-f6f3-404b-85de-ba0901296f83.png"
        darkOverlay={true}
      />
      
      {/* Streak-Free Window Cleaning Section - Full Width */}
      <section className="w-full py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-6 heading-text">Streak-Free Window Cleaning</h2>
            <p className="text-lg text-gray-700 mb-8 content-text">
              Experience the difference of our professional window cleaning service using cutting-edge purified water technology. 
              Our system removes all minerals and impurities, leaving your windows crystal clear without streaks or residue.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">💧</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Purified Water System</h3>
                <p className="text-gray-600">No chemicals needed - just pure water for perfect results</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🏠</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Interior & Exterior</h3>
                <p className="text-gray-600">Complete window cleaning service inside and out</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Streak-Free Guarantee</h3>
                <p className="text-gray-600">Perfect results every time or we'll return for free</p>
              </div>
            </div>

            <WindowCleaningQuoteOverlay buttonText="Request Window Cleaning Quote" variant="bc-red" />
          </div>
        </div>
      </section>
      
      {/* Water Fed Pole System Video Section */}
      <section className="w-full py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 heading-text">Water Fed Pole System</h2>
              <p className="text-lg text-gray-700 mb-6 content-text">
                Our state-of-the-art water fed pole system revolutionizes window cleaning by using purified water 
                and extending telescopic poles to reach heights up to 60 feet safely from the ground.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-bc-red rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Purified Water Technology</h3>
                    <p className="text-gray-600">
                      Our system uses deionized water that leaves no spots, streaks, or residue, 
                      providing crystal-clear results every time.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-bc-red rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Enhanced Safety</h3>
                    <p className="text-gray-600">
                      No ladders required - our technicians stay safely on the ground while 
                      cleaning windows up to 6 stories high.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe 
                  src="https://www.youtube.com/embed/03njfGLUDUQ" 
                  title="Water Fed Pole System for Window Cleaning"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Traditional Squeegee Cleaning Technique Video Section */}
      <section className="w-full py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="lg:order-2">
              <h2 className="text-3xl font-bold mb-6 heading-text">Traditional Squeegee Cleaning</h2>
              <p className="text-lg text-gray-700 mb-6 content-text">
                For interior windows and detailed cleaning work, our skilled technicians use traditional squeegee 
                techniques combined with eco-friendly cleaning solutions for perfect results.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-bc-red rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Expert Technique</h3>
                    <p className="text-gray-600">
                      Our trained professionals use proper squeegee techniques for streak-free results every time.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-bc-red rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Interior Cleaning</h3>
                    <p className="text-gray-600">
                      Perfect for interior windows where water fed pole systems aren't suitable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:order-1 relative">
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe 
                  src="https://www.youtube.com/embed/bbHnt4UNPcU" 
                  title="Professional Squeegee Window Cleaning Technique"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <ServiceBenefits 
            title="Benefits of Professional Window Cleaning" 
            subtitle="Discover why regular professional window cleaning is essential for your property"
            benefits={benefits} 
          />
        </div>
      </section>
      
      <TestimonialsSection />
      
      <FAQSection
        title="Frequently Asked Questions"
        subtitle="Get answers to common questions about our window cleaning services"
        faqs={faqs}
      />
      
      <MoreServicesSection />
      
      <CallToAction 
        title="Ready for Crystal Clear Windows?"
        subtitle="Contact us today for a free estimate on our professional window cleaning services."
        backgroundImage="/lovable-uploads/26f6a625-a200-4106-8f94-579be5c566b6.png"
      />
    </Layout>
  );
};

export default WindowCleaning;
