
import React from 'react';
import Layout from '../../components/Layout';
import ServiceHeader from '../../components/ServiceHeader';
import FAQSection from '../../components/FAQSection';
import ServiceBenefits from '../../components/ServiceBenefits';
import CallToAction from '../../components/CallToAction';
import { Shield, Droplets, Cloud } from 'lucide-react';
import PriceCalculatorOverlay from '@/components/PriceCalculatorOverlay';
import GutterCleaningForm from '@/components/forms/GutterCleaningForm';
import TestimonialsSection from '@/components/home/TestimonialsSection';

const GutterCleaning = () => {
  const benefits = [
    {
      title: "Prevent Water Damage",
      description: "Clogged gutters can cause water to overflow and damage your home's foundation, walls, and landscaping."
    },
    {
      title: "Avoid Pest Infestations",
      description: "Debris-filled gutters create perfect breeding grounds for mosquitoes, rodents, and other pests."
    },
    {
      title: "Extend Gutter Lifespan",
      description: "Regular cleaning prevents rust and deterioration, adding years to your gutter system."
    },
    {
      title: "Protect Roof & Fascia",
      description: "Prevent water backup that can damage shingles, roof underlayment, and fascia boards."
    },
    {
      title: "Prevent Ice Dams",
      description: "Clean gutters help prevent ice dams in winter that can cause serious roof and interior damage."
    },
    {
      title: "Maintain Curb Appeal",
      description: "Clean, well-functioning gutters enhance your home's appearance and value."
    }
  ];

  const faqs = [
    {
      question: "How often should I have my gutters cleaned?",
      answer: "Most homes benefit from gutter cleaning twice per year – once in spring and once in fall. However, if your property has many trees nearby, you may need more frequent cleanings, especially during fall when leaves are dropping."
    },
    {
      question: "What happens if I don't clean my gutters?",
      answer: "Neglected gutters can lead to water damage to your roof, walls, and foundation. They can also become homes for pests, develop rust and corrosion, and in winter, form ice dams that cause extensive damage."
    },
    {
      question: "Do you install gutter guards?",
      answer: "Yes, we offer gutter guard installation services. While they don't eliminate the need for cleaning entirely, quality gutter guards significantly reduce cleaning frequency and make maintenance easier."
    },
    {
      question: "How long does gutter cleaning take?",
      answer: "For an average-sized home, professional gutter cleaning typically takes 1-2 hours. Larger homes or those with severe clogging may take longer. We'll provide a time estimate when you book your service."
    },
    {
      question: "Do I need to be home during the service?",
      answer: "Not necessarily. As long as we have access to your gutters and exterior water sources, we can perform the cleaning while you're away. Many of our customers prefer this convenience."
    }
  ];

  return (
    <Layout title="Professional Gutter Cleaning Services | BC Pressure Washing" description="Expert gutter cleaning services in White Rock, Surrey and Metro Vancouver. Prevent water damage and extend the life of your gutters with our thorough cleaning.">
      <ServiceHeader 
        title="Professional Gutter Cleaning"
        description="Keep your home protected with our thorough gutter cleaning services."
        youtubeId="dkSPq9opzBg" // Mobile YouTube video ID
        youtubeDesktopId="m5wfZZCuFeg" // Desktop YouTube video ID
      />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-3xl font-bold mb-6">Get Your Gutters Cleaned Today</h2>
              <p className="text-lg text-gray-700 mb-4">
                Clogged gutters can cause serious damage to your home's foundation, roof, and exterior. Our professional gutter cleaning service ensures your gutters function properly year-round.
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600 mr-3">
                    <Shield size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Complete Gutter System Cleaning</h3>
                    <p className="text-gray-600">
                      We thoroughly remove all leaves, debris, and buildup from your gutters and downspouts, ensuring proper water flow.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600 mr-3">
                    <Droplets size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Downspout Flushing</h3>
                    <p className="text-gray-600">
                      We test all downspouts to ensure water flows freely and remove any blockages using professional equipment.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600 mr-3">
                    <Cloud size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Gutter Face Cleaning</h3>
                    <p className="text-gray-600">
                      We clean the exterior faces of your gutters to remove black streaks, algae, and dirt, improving your home's appearance.
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
                <h3 className="text-xl font-bold mb-2 text-amber-800">Gutter Cleaning Warning!</h3>
                <p className="text-amber-700">
                  Neglected gutters can lead to costly water damage to your foundation, roof, and interior walls. Don't wait until it's too late - regular maintenance is much more affordable than repairs.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-xl p-6 border-2 border-gray-100">
              <GutterCleaningForm />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <ServiceBenefits 
            title="Benefits of Regular Gutter Cleaning" 
            subtitle="Protect your home's structural integrity and prevent costly damage with our professional gutter cleaning services"
            benefits={benefits} 
          />
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Our Gutter Cleaning Process</h2>
            
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-2/5">
                  <img 
                    src="/lovable-uploads/3f5a834d-b684-4522-a2a6-e877e036ccd8.png" 
                    alt="Gutter Debris Removal" 
                    className="rounded-lg shadow-md w-full"
                  />
                </div>
                <div className="md:w-3/5">
                  <h3 className="text-xl font-bold mb-2">1. Debris Removal</h3>
                  <p className="text-gray-700">
                    We safely remove all leaves, twigs, and debris from your gutters by hand to ensure a thorough cleaning. All collected debris is bagged and removed from your property, leaving no mess behind.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-3/5 md:order-1 order-2">
                  <h3 className="text-xl font-bold mb-2">2. Downspout Clearing & Testing</h3>
                  <p className="text-gray-700">
                    We check all downspouts for blockages and flush them with water to ensure proper flow. If we encounter stubborn clogs, we use specialized tools to clear them completely.
                  </p>
                </div>
                <div className="md:w-2/5 md:order-2 order-1">
                  <iframe 
                    className="w-full aspect-video rounded-lg shadow-md"
                    src="https://www.youtube.com/embed/EdMlx1sYJDc"
                    title="Downspout Clearing"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-2/5">
                  <img 
                    src="/lovable-uploads/f899a443-8930-4364-b538-916f65545f84.png" 
                    alt="Gutter Face Cleaning" 
                    className="rounded-lg shadow-md w-full"
                  />
                </div>
                <div className="md:w-3/5">
                  <h3 className="text-xl font-bold mb-2">3. Gutter Face Cleaning</h3>
                  <p className="text-gray-700">
                    We clean the exterior faces of your gutters to remove unsightly black streaks, tiger stripes, and algae growth. This not only improves functionality but also enhances your home's curb appeal.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-3/5 md:order-1 order-2">
                  <h3 className="text-xl font-bold mb-2">4. Final Inspection & Cleanup</h3>
                  <p className="text-gray-700">
                    After allowing the cleaning solution to dwell for the appropriate time, we perform a final water flow test to ensure everything is working properly and clean up any debris that may have fallen during the cleaning process. You'll receive before and after photos showing the work completed.
                  </p>
                </div>
                <div className="md:w-2/5 md:order-2 order-1">
                  <img 
                    src="/lovable-uploads/73b10424-3e39-4265-a1de-66f4508eaa9d.png" 
                    alt="Final Inspection" 
                    className="rounded-lg shadow-md w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Gutter Stick Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Professional Gutter Cleaning Tools</h2>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-3">Gutter Vacuum System</h3>
                <p className="text-gray-700 mb-4">
                  Our professional-grade gutter vacuum system allows us to efficiently clean gutters with minimal mess. The powerful vacuum removes leaves, debris, and even standing water, ensuring a thorough cleaning every time.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                  <li>Reaches up to 3 stories high</li>
                  <li>Removes both wet and dry debris</li>
                  <li>Safer than cleaning by hand</li>
                  <li>More efficient for extensive clogging</li>
                </ul>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="/lovable-uploads/281422a1-6eb1-4353-9f93-de7d6163152e.png" 
                  alt="Gutter Vacuum System" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Leaf Guard Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Gutter Guards Installation</h2>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="order-2 md:order-1">
                <img 
                  src="/lovable-uploads/0889ee32-e298-45b5-91f8-825360447c0b.png" 
                  alt="Gutter Guards" 
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-2xl font-bold mb-3">Protect Your Gutters Year-Round</h3>
                <p className="text-gray-700 mb-4">
                  After cleaning your gutters, consider installing our premium gutter guard systems. These guards prevent leaves, pine needles, and debris from entering your gutters while allowing water to flow freely.
                </p>
                <h4 className="font-bold text-lg mb-2">Benefits of Our Gutter Guards:</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                  <li>Reduce cleaning frequency</li>
                  <li>Prevent clogs and overflow</li>
                  <li>Keep pests and birds out</li>
                  <li>Extend the lifespan of your gutters</li>
                  <li>Prevent ice dams in winter</li>
                </ul>
                <div className="mt-6">
                  <PriceCalculatorOverlay buttonText="Get a Quote for Gutter Guards" variant="bc-red" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <TestimonialsSection />
      
      <FAQSection
        title="Frequently Asked Questions About Gutter Cleaning"
        subtitle="Get answers to common questions about our gutter cleaning services"
        faqs={faqs}
      />
      
      <CallToAction 
        title="Ready to Book Your Gutter Cleaning?"
        subtitle="Contact us today for a free estimate and experience the difference professional gutter maintenance makes."
      />
    </Layout>
  );
};

export default GutterCleaning;
