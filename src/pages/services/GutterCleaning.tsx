import Layout from '../../components/Layout';
import ServiceHeader from '../../components/ServiceHeader';
import ServiceBenefits from '../../components/ServiceBenefits';
import ServiceProcess from '../../components/ServiceProcess';
import CallToAction from '../../components/CallToAction';
import TestimonialsSection from '../../components/home/TestimonialsSection';
import FAQSection from '../../components/FAQSection';
import { Droplets, Leaf, Shield, Clock, PieChart, ThumbsUp } from 'lucide-react';
import GutterCleaningForm from '@/components/forms/GutterCleaningForm';
import { Card, CardContent } from '@/components/ui/card';
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
  const faqs = [{
    question: "How often should I have my gutters cleaned?",
    answer: "We recommend having your gutters cleaned at least twice a year - in spring and fall. However, if you have trees overhanging your roof, you might need more frequent cleaning, especially during fall when leaves are dropping."
  }, {
    question: "How long does a typical gutter cleaning service take?",
    answer: "For an average-sized home, our professional team can complete a thorough gutter cleaning in 1-2 hours. This timeframe can vary depending on the size of your home, the amount of debris, and the complexity of your gutter system."
  }, {
    question: "What happens if you find damaged gutters during cleaning?",
    answer: "If we identify any issues with your gutters during cleaning, we'll document them with photos and provide you with a detailed assessment. We can then discuss repair options and provide a quote for any necessary work."
  }, {
    question: "Do you install gutter guards?",
    answer: "Yes, we offer professional installation of high-quality gutter guards. These can significantly reduce how often your gutters need cleaning by preventing debris from entering while still allowing water to flow through."
  }, {
    question: "Is there any preparation I need to do before you arrive?",
    answer: "We ask that you ensure clear access to the perimeter of your home. Please remove any obstacles that might impede our work, secure pets, and inform us of any specific areas of concern before we begin."
  }];
  return <Layout>
      <ServiceHeader title="Professional Gutter Cleaning" description="Keep your home protected from water damage with our thorough gutter cleaning service" youtubeId="m5wfZZCuFeg" darkOverlay={true} />

      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <img src="/lovable-uploads/9c9bdfd6-9f85-46ca-9d4f-3ec96d158813.png" alt="Professional gutter cleaning in action" className="rounded-lg shadow-xl w-full h-auto" />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Why Gutter Cleaning Is Essential</h2>
            <p className="text-gray-600 mb-6">
              Gutters play a crucial role in protecting your home from water damage by channeling rainwater away from your roof, walls, and foundation. When gutters become clogged with leaves, twigs, and debris, they can't function properly, leading to overflowing water that can damage your home's exterior, foundation, landscaping, and even interior spaces.
            </p>
            <p className="text-gray-600 mb-6">
              Our professional gutter cleaning service removes all debris, ensures proper water flow, and protects your home from costly damage. We recommend gutter cleaning at least twice a year, typically in spring and fall, to prevent clogs and maintain your gutter system.
            </p>
            <div className="flex flex-wrap items-center gap-4">
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
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title mb-12">Our Gutter Cleaning Process</h2>
          <ServiceProcess processes={processes} />
        </div>
      </section>
      
      {/* Gutter Face Cleaning Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="section-title mb-6">Gutter Face Cleaning</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="text-gray-600 mb-6">
              Beyond the interior cleaning of your gutters, we also provide thorough cleaning of gutter faces and exteriors. Over time, gutters can develop black streaks, algae, and stains that detract from your home's appearance. Our specialized gutter face cleaning service restores the original look of your gutters, enhancing your home's curb appeal.
            </p>
            <p className="text-gray-600 mb-6">
              Using safe, effective cleaning solutions and professional equipment, we can remove all traces of dirt, mildew, and oxidation from your gutters without causing any damage to the material or surrounding areas.
            </p>
            <h3 className="text-xl font-bold mb-4">Benefits of Gutter Face Cleaning:</h3>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-bc-red mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Improved curb appeal and home aesthetics</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-bc-red mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Removal of harmful mold and mildew</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-bc-red mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Extended gutter lifespan through proper maintenance</span>
              </li>
            </ul>
          </div>
          <div className="space-y-6">
            
            <img src="/lovable-uploads/1e06febe-e5ba-4258-88bf-f51b8712cb04.png" alt="Before and after gutter face cleaning" className="rounded-lg shadow-md w-full h-auto" />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="section-title mb-2">Benefits of Professional Gutter Cleaning</h2>
        <p className="section-subtitle mb-12">
          Protect your home's foundation, roof, and exterior with our expert gutter cleaning service
        </p>
        <ServiceBenefits benefits={benefits} />
      </section>
      
      {/* Leaf Guard Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Premium Leaf Guard Installation</h2>
              <p className="text-gray-600 mb-6">
                Want to reduce the frequency of gutter cleaning? Our professional leaf guard installation offers a long-term solution for keeping debris out while allowing water to flow freely through your gutters.
              </p>
              <p className="text-gray-600 mb-6">
                Our premium leaf guards create a protective barrier that prevents leaves, twigs, and other debris from entering your gutters while still allowing rainwater to flow through efficiently. This means less maintenance for you and better protection for your home.
              </p>
              
              <h3 className="text-xl font-bold mb-4">Benefits of Our Leaf Guard System:</h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-bc-red mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Significantly reduces gutter cleaning frequency</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-bc-red mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Prevents clogs in gutters and downspouts</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-bc-red mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Extends the life of your gutter system</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-bc-red mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Helps prevent water damage to your home</span>
                </li>
              </ul>
              
              <div className="mt-6">
                
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl h-96">
              <iframe src={`https://www.youtube.com/embed/OICbIRmx-80?si=FIGd5zZjfhJ9FlRo`} title="Leaf Guard Video" className="w-full h-full object-cover" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
          </div>
        </div>
      </section>
      
      {/* Gutter Sticks Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-1 gap-6">
            <img src="/lovable-uploads/8e5ee557-95fc-4103-b9b9-41a3007cc3a6.png" alt="Gutter Stick installation" className="rounded-lg shadow-xl w-full h-auto" />
            <img src="/lovable-uploads/a5266091-5d6d-42f0-a4bf-f9bfc489bd62.png" alt="Gutter Stick in use" className="rounded-lg shadow-xl w-full h-auto" />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Gutter Sticks: Affordable Leaf Guard Alternative</h2>
            <p className="text-gray-600 mb-6">
              Looking for a cost-effective alternative to traditional leaf guards? Gutter Sticks provide an innovative solution for keeping leaves and debris out of your gutters without breaking the bank.
            </p>
            <p className="text-gray-600 mb-6">
              These simple yet effective devices fit inside your gutters and create a permeable barrier that allows water to flow while blocking larger debris. Installation is quick and non-invasive, with no modifications needed to your existing gutter system.
            </p>
            
            <h3 className="text-xl font-bold mb-4">Advantages of Gutter Sticks:</h3>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-bc-red mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Significantly more affordable than traditional leaf guards</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-bc-red mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Quick, simple installation with no tools required</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-bc-red mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Easy to remove for occasional maintenance</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-bc-red mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Compatible with most standard gutter systems</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-bc-red mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Extends time between necessary gutter cleanings</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <a href="/calculator" className="btn-primary py-3 px-6 rounded-lg font-medium inline-block">
                Get a Quote for Gutter Sticks
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Recent Projects Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title mb-8">Recent Gutter Cleaning Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="h-72 overflow-hidden">
                  <img src="/lovable-uploads/50c2be43-ecf8-4ef3-af03-61bbdaa26e0a.png" alt="Recent gutter cleaning project" className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">Residential Gutter Cleaning</h3>
                  <p className="text-gray-600">Complete gutter system cleaning for a two-story home in Surrey. Removed heavy debris accumulation and ensured proper water flow.</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="h-72 overflow-hidden">
                  <img src="/lovable-uploads/9c9bdfd6-9f85-46ca-9d4f-3ec96d158813.png" alt="Commercial gutter cleaning" className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">Commercial Property Maintenance</h3>
                  <p className="text-gray-600">Regular gutter cleaning service for a commercial building in White Rock. Part of our scheduled maintenance program.</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="h-72 overflow-hidden">
                  <img src="/lovable-uploads/1e06febe-e5ba-4258-88bf-f51b8712cb04.png" alt="Gutter face cleaning project" className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">Gutter Face Cleaning</h3>
                  <p className="text-gray-600">Complete gutter face cleaning for a home in Langley. Removed black streaks and restored original appearance.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Get Your Gutters Cleaned Today</h3>
              <p className="text-gray-600 mb-6">
                Don't wait until water damage occurs. Our professional team is ready to clean your gutters thoroughly and efficiently. Fill out the form to get a quick quote or schedule your service.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-bc-red mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Free estimates with detailed pricing</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-bc-red mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Flexible scheduling to fit your needs</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-bc-red mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Experienced, professional technicians</span>
                </li>
              </ul>
            </div>
            <div>
              <GutterCleaningForm />
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <TestimonialsSection />
      </section>
      
      <FAQSection title="Frequently Asked Questions About Gutter Cleaning" subtitle="Get answers to common questions about our services" faqs={faqs} />
      
      <CallToAction />
    </Layout>;
};
export default GutterCleaning;