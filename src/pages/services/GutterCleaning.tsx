
import Layout from '../../components/Layout';
import ServiceHeader from '../../components/ServiceHeader';
import ServiceBenefits from '../../components/ServiceBenefits';
import ServiceProcess from '../../components/ServiceProcess';
import CallToAction from '../../components/CallToAction';
import TestimonialsSection from '../../components/home/TestimonialsSection';
import FAQSection from '../../components/FAQSection';
import { Droplets, Leaf, Shield, Clock, PieChart, ThumbsUp } from 'lucide-react';

const GutterCleaning = () => {
  const benefits = [{
    title: "Prevent Water Damage",
    description: "Clean gutters properly channel water away from your home, preventing costly water damage to foundations, walls, and landscaping."
  }, {
    title: "Eliminate Pest Breeding Grounds",
    description: "Remove debris that can become a breeding ground for mosquitoes, birds, and other pests that can damage your home."
  }, {
    title: "Extend Gutter Lifespan",
    description: "Regular cleaning prevents rust and corrosion, extending the life of your gutter system and saving you money on replacements."
  }, {
    title: "Protect Roof and Fascia",
    description: "Prevent water backup that can damage roof shingles, fascia boards, and cause interior leaks during heavy rainfall."
  }, {
    title: "Maintain Home Value",
    description: "Well-maintained gutters contribute to your home's curb appeal and help preserve its market value over time."
  }, {
    title: "Prevent Basement Flooding",
    description: "Properly functioning gutters direct water away from your foundation, reducing the risk of basement flooding and moisture issues."
  }];

  const processes = [{
    title: "Debris Removal",
    description: "We carefully remove leaves, twigs, and debris from your gutters and downspouts to ensure proper water flow.",
    icon: <Leaf size={32} />
  }, {
    title: "Gutter Flushing",
    description: "After removing debris, we thoroughly flush your gutters with water to clear any remaining particles and check for proper drainage.",
    icon: <Droplets size={32} />
  }, {
    title: "Downspout Inspection",
    description: "We inspect and clear all downspouts to ensure water can flow freely from your roof to the ground, away from your foundation.",
    icon: <PieChart size={32} />
  }];

  const handleVideoClick = () => {
    window.open("https://youtu.be/m5wfZZCuFeg?si=zIa4LgX-eu9gBVoI", "_blank");
  };

  const faqs = [
    {
      question: "How often should I have my gutters cleaned?",
      answer: "We recommend having your gutters cleaned at least twice a year - in spring and fall. However, if you have trees overhanging your roof, you might need more frequent cleaning, especially during fall when leaves are dropping."
    },
    {
      question: "How long does a typical gutter cleaning service take?",
      answer: "For an average-sized home, our professional team can complete a thorough gutter cleaning in 1-2 hours. This timeframe can vary depending on the size of your home, the amount of debris, and the complexity of your gutter system."
    },
    {
      question: "What happens if you find damaged gutters during cleaning?",
      answer: "If we identify any issues with your gutters during cleaning, we'll document them with photos and provide you with a detailed assessment. We can then discuss repair options and provide a quote for any necessary work."
    },
    {
      question: "Do you install gutter guards?",
      answer: "Yes, we offer professional installation of high-quality gutter guards. These can significantly reduce how often your gutters need cleaning by preventing debris from entering while still allowing water to flow through."
    },
    {
      question: "Is there any preparation I need to do before you arrive?",
      answer: "We ask that you ensure clear access to the perimeter of your home. Please remove any obstacles that might impede our work, secure pets, and inform us of any specific areas of concern before we begin."
    }
  ];

  return <Layout>
      <ServiceHeader title="" description="" icon={<Droplets size={48} className="opacity-0" />} imagePath="/lovable-uploads/88ee1ee3-e92f-4015-b234-2c07a16f1b58.png" darkOverlay={true} />

      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Why Gutter Cleaning Is Essential</h2>
            <p className="text-gray-600 mb-6">
              Gutters play a crucial role in protecting your home from water damage by channeling rainwater away from your roof, walls, and foundation. When gutters become clogged with leaves, twigs, and debris, they can't function properly, leading to overflowing water that can damage your home's exterior, foundation, landscaping, and even interior spaces.
            </p>
            <p className="text-gray-600 mb-6">
              Our professional gutter cleaning service removes all debris, ensures proper water flow, and protects your home from costly damage. We recommend gutter cleaning at least twice a year, typically in spring and fall, to prevent clogs and maintain your gutter system.
            </p>
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <Shield className="text-bc-red mr-2" size={24} />
                <span className="font-medium">Fully Insured</span>
              </div>
              <div className="flex items-center">
                <Clock className="text-bc-red mr-2" size={24} />
                <span className="font-medium">Prompt Service</span>
              </div>
              <div className="flex items-center">
                <ThumbsUp className="text-bc-red mr-2" size={24} />
                <span className="font-medium">100% Satisfaction</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 cursor-pointer relative rounded-lg overflow-hidden shadow-lg" onClick={handleVideoClick}>
            <div className="relative pt-[56.25%] w-full">
              <iframe className="absolute inset-0 w-full h-full" src="https://www.youtube.com/embed/m5wfZZCuFeg?mute=1" title="Gutter Cleaning" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              <div className="absolute inset-0 bg-transparent hover:bg-black hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-bc-red text-white rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="section-title">Recent Projects & Reviews</h2>
        <p className="section-subtitle mb-12">
          See what our satisfied customers are saying about our gutter cleaning services
        </p>
        <TestimonialsSection />
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="section-title">Gutter Protection Solutions</h2>
        <p className="section-subtitle mb-12">
          Ask about our gutter protection systems to keep debris out while letting water flow
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-content">
            <h3 className="text-2xl font-bold mb-4">Gutter Guards &amp; Protectors</h3>
            <p className="text-gray-600 mb-6">
              We offer high-quality gutter protection systems that prevent leaves, twigs, and debris from entering your gutters while still allowing water to flow through. These systems can dramatically reduce the frequency of gutter cleanings and protect your home from water damage.
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li>Keeps debris out while letting water flow in</li>
              <li>Reduces the need for frequent gutter cleaning</li>
              <li>Prevents rust and corrosion of gutter systems</li>
              <li>Extends the lifespan of your gutters</li>
              <li>Prevents pests from nesting in your gutters</li>
            </ul>
            <div className="relative h-0 pb-[177%] mt-4 mb-2 rounded-xl overflow-hidden" style={{
            paddingBottom: "56.25%"
          }}>
              <iframe src="https://www.youtube.com/embed/O0Ig4vVAjxA?rel=0" title="Gutter protection video" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen className="absolute top-0 left-0 w-full h-full rounded-xl"></iframe>
            </div>
          </div>
          <div className="image-content">
            
          </div>
        </div>
      </section>
      
      <FAQSection 
        title="Frequently Asked Questions About Gutter Cleaning"
        subtitle="Get answers to common questions about our services"
        faqs={faqs}
      />
      
      <CallToAction />
    </Layout>;
};

export default GutterCleaning;
