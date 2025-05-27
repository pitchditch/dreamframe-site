
import React from 'react';
import Layout from '../../components/Layout';
import ServiceHeader from '../../components/ServiceHeader';
import FAQSection from '../../components/FAQSection';
import ServiceBenefits from '../../components/ServiceBenefits';
import CallToAction from '../../components/CallToAction';
import { Shield, Droplets, Leaf } from 'lucide-react';
import PriceCalculatorOverlay from '@/components/PriceCalculatorOverlay';
import RoofCleaningForm from '@/components/forms/RoofCleaningForm';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const RoofCleaning = () => {
  const benefits = [{
    title: "Prevent Roof Damage",
    description: "Moss and algae can deteriorate roofing materials, leading to leaks and expensive repairs."
  }, {
    title: "Extend Roof Lifespan",
    description: "Regular cleaning can add years to your roof's life expectancy by preventing organic growth damage."
  }, {
    title: "Improve Energy Efficiency",
    description: "A clean roof reflects more sunlight and absorbs less heat, potentially reducing cooling costs."
  }, {
    title: "Enhance Curb Appeal",
    description: "Remove unsightly stains and growths to dramatically improve your home's overall appearance."
  }, {
    title: "Maintain Property Value",
    description: "A well-maintained roof is a significant factor in your home's market value and appeal to buyers."
  }, {
    title: "Prevent Health Issues",
    description: "Mold and algae can spread into your home, creating potential health concerns for you and your family."
  }];
  
  const faqs = [{
    question: "How often should I have my roof cleaned?",
    answer: "Most homes benefit from roof cleaning every 1-3 years, depending on your location's climate, surrounding trees, and previous growth issues. In the Pacific Northwest's damp climate, annual inspection and cleaning may be recommended."
  }, {
    question: "Will roof cleaning damage my shingles?",
    answer: "Our soft washing technique is specifically designed to clean effectively without damaging roofing materials. We never use high pressure on asphalt shingles, which can remove granules and shorten roof life."
  }, {
    question: "How do you remove the moss and algae without damaging my roof?",
    answer: "We use a specialized two-step process: first applying an environmentally responsible cleaning solution that kills the organic growth, followed by gentle low-pressure rinsing. This method effectively removes growths without damaging shingles."
  }, {
    question: "Will the cleaning solution harm my plants or landscaping?",
    answer: "We take precautions to protect your landscaping by pre-wetting plants and covering sensitive areas. Our cleaning solutions are biodegradable and, when properly diluted and applied, won't harm your landscaping."
  }, {
    question: "How long does roof cleaning take?",
    answer: "For an average home, professional roof cleaning typically takes 3-5 hours. Larger homes or those with severe growth may take longer. Weather conditions can also affect timing."
  }];

  return (
    <Layout title="Professional Roof Cleaning Services | BC Pressure Washing" description="Expert roof cleaning services in White Rock, Surrey and Metro Vancouver. Prevent damage and extend the life of your roof with our soft washing techniques.">
      <ServiceHeader 
        title="Professional Roof Cleaning" 
        description="Protect your investment with our safe and effective roof cleaning service." 
        youtubeId="twtzf2gRdFU" // Updated Mobile YouTube video ID
        youtubeDesktopId="eQSgdx9ujcc" // Updated Desktop YouTube video ID
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
                    <Leaf size={18} />
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
                <Button className="bg-bc-red hover:bg-red-700 text-white" size="lg" asChild>
                  <Link to="/calculator">Check Price & Availability</Link>
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 text-white" size="lg" asChild>
                  <a href="tel:7788087620" className="flex items-center justify-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    Call Now: (778) 808-7620
                  </a>
                </Button>
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
          <ServiceBenefits title="Benefits of Professional Roof Cleaning" subtitle="Protect your biggest investment and enhance your home's appearance with our safe and effective roof cleaning services" benefits={benefits} />
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Our Roof Cleaning Process</h2>
            
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-2/5">
                  <img alt="Roof Assessment" className="rounded-lg shadow-md w-full" src="/lovable-uploads/5f628a3f-670b-4ac2-b2b8-f6e15c408c3f.jpg" />
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
                  <img src="/lovable-uploads/11de9343-a9b0-48b8-b747-d18318f16d86.png" alt="Area Protection" className="rounded-lg shadow-md w-full" />
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-2/5">
                  <img alt="Soft Washing Application" className="rounded-lg shadow-md w-full" src="/lovable-uploads/06bbf1e1-0ee0-4176-9417-4af9bf7a4460.jpg" />
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
                  <img alt="Rinsing and Cleanup" className="rounded-lg shadow-md w-full" src="/lovable-uploads/781082de-7949-4655-bc96-5ef110675262.jpg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Section about what we remove from roofs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10 heading-text">What We Remove From Your Roof</h2>
            
            <div className="grid md:grid-cols-2 gap-10">
              <div className="bg-white p-7 rounded-lg shadow-md">
                <div className="mb-5 h-72 overflow-hidden rounded-md">
                  <img 
                    src="/lovable-uploads/915344bc-d3d8-4352-8b18-c51057dbdd10.png" 
                    alt="Moss on roof" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Moss Removal</h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  Moss can be particularly damaging to your roof as it retains moisture against roofing materials. This constant moisture can deteriorate shingles, create openings for leaks, and even lift shingles causing exposure. Our specialized treatment effectively kills and removes moss, preventing regrowth and extending the life of your roof.
                </p>
                <div className="mt-4 text-base text-bc-red font-medium p-3 bg-red-50 rounded-md">
                  * Moss can reduce your roof's lifespan by up to 10 years if left untreated
                </div>
              </div>
              
              <div className="bg-white p-7 rounded-lg shadow-md">
                <div className="mb-5 h-72 overflow-hidden rounded-md">
                  <img 
                    src="/lovable-uploads/bc8662ae-2020-4268-ada3-deb86d5804df.png" 
                    alt="Roof stain removal" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Black Streak & Stain Removal</h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  Those black streaks on your roof aren't just cosmetic issues—they're actually colonies of algae (Gloeocapsa magnifera) that feed on the limestone filler in asphalt shingles. Beyond being unsightly, these organisms gradually break down your roofing materials. Our cleaning solution thoroughly eliminates these stains without damaging your roof's surface.
                </p>
                <div className="mt-4 text-base text-bc-red font-medium p-3 bg-red-50 rounded-md">
                  * Black streaks can reduce your home's value by up to 5% according to real estate professionals
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Button className="bg-bc-red hover:bg-red-700 text-white px-8 py-6" size="lg" asChild>
                <Link to="/calculator">Schedule Your Roof Cleaning</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <TestimonialsSection />
      
      <FAQSection title="Frequently Asked Questions About Roof Cleaning" subtitle="Get answers to common questions about our roof cleaning services" faqs={faqs} />
      
      <CallToAction 
        title="Ready for a Cleaner, Healthier Roof?" 
        subtitle="Contact us today for a free estimate and protect your home with our professional roof cleaning service." 
        backgroundImage="/lovable-uploads/9454f467-d96c-435e-b88d-8a78e379102a.png"
      />
    </Layout>
  );
};

export default RoofCleaning;
