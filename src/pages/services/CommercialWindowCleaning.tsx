import Layout from '../../components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Building, CheckCircle, Droplets, SparkleIcon } from 'lucide-react';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import FAQSection from '@/components/FAQSection';
import MoreServicesSection from '@/components/MoreServicesSection';
import ServiceAreasCarousel from '@/components/ServiceAreasCarousel';
const CommercialWindowCleaning = () => {
  const benefits = [{
    title: "Enhance Curb Appeal",
    description: "Clean windows create a positive first impression for customers, clients, and tenants, enhancing your property's professional appearance."
  }, {
    title: "Extend Window Lifespan",
    description: "Regular cleaning prevents dirt, hard water, and contaminants from etching and damaging glass and frames over time."
  }, {
    title: "Improve Natural Lighting",
    description: "Clean windows allow maximum natural light to enter your building, creating a brighter, more inviting atmosphere and reducing energy costs."
  }, {
    title: "Maintain Property Value",
    description: "Regular window maintenance protects your investment and contributes to the overall upkeep of your commercial property."
  }, {
    title: "Specialized Equipment Access",
    description: "Our professional team has the specialized equipment needed to safely clean windows at any height, from ground level to high-rise."
  }, {
    title: "Safety & Liability Protection",
    description: "Avoid the risks and liability concerns associated with employees or untrained staff attempting to clean high windows."
  }];
  const processes = [{
    title: "Property Assessment",
    description: "We conduct a thorough evaluation of your property's windows to determine the best cleaning approach and equipment needed.",
    icon: <CheckCircle size={32} className="text-bc-red" />
  }, {
    title: "Pure Water Cleaning",
    description: "Using our advanced pure water technology, we clean windows without chemicals, leaving a streak-free, crystal clear finish.",
    icon: <Droplets size={32} className="text-bc-red" />
  }, {
    title: "Final Inspection",
    description: "We conduct a detailed quality check, ensuring every window meets our high standards before considering the job complete.",
    icon: <SparkleIcon size={32} className="text-bc-red" />
  }];
  const faqs = [{
    question: "How often should commercial windows be cleaned?",
    answer: "For most commercial buildings, we recommend professional window cleaning 2-4 times per year. However, this can vary based on your building's location, surrounding environment, and the image you want to maintain. Retail stores, restaurants, and other customer-facing businesses often benefit from more frequent cleaning."
  }, {
    question: "Can you clean high-rise building windows?",
    answer: "Yes, we are equipped to clean windows on buildings of all heights. Our team uses professional water-fed pole systems for buildings up to six stories and can arrange specialized equipment for taller structures. We follow all safety protocols and have the proper insurance for high-rise window cleaning."
  }, {
    question: "Do you offer service contracts for regular window cleaning?",
    answer: "Yes, we provide service contracts with scheduled cleanings at intervals that work for your business. Our contract clients receive priority scheduling, consistent pricing, and the convenience of not having to remember when it's time for their next cleaning."
  }, {
    question: "What if it rains soon after the windows are cleaned?",
    answer: "Our pure water cleaning system leaves no soap residue, so rain that follows a cleaning typically won't leave spots or streaks. If you're concerned about the results after rainfall, contact us and we'll come take a look."
  }, {
    question: "Can you clean windows during business hours?",
    answer: "Yes, our team is trained to work efficiently with minimal disruption to your business operations. However, we also offer after-hours and weekend appointments if you prefer the cleaning to be done when your business is closed."
  }];
  return <Layout title="Commercial Window Cleaning Services | BC Pressure Washing" description="Professional window cleaning services for commercial properties in Surrey, White Rock & Metro Vancouver. Keep your business looking its best.">
      {/* Hero Section */}
      <section className="relative h-screen w-full">
        <img src="/lovable-uploads/598eb62a-290d-41ec-8c69-abae60a5a757.png" alt="Commercial Window Cleaning Services" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Commercial Window Cleaning Services</h1>
            <p className="text-xl mb-8">Professional window cleaning for businesses of all sizes in the Surrey & White Rock area</p>
            <Button asChild variant="bc-red" size="lg" className="text-lg font-semibold">
              <Link to="/calculator">Check Prices & Availability</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Description */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Commercial Window Cleaning</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We provide expert window cleaning services for all types of commercial properties, from small storefronts to multi-story office buildings. 
            Our skilled technicians use professional equipment and techniques to ensure crystal clear, streak-free windows every time.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img alt="Professional window cleaning" className="rounded-lg shadow-lg w-full h-auto" src="/lovable-uploads/116eeb05-47f5-49d6-abe4-ebb88696ffd2.png" />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Our Commercial Window Cleaning Includes:</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="text-bc-red mr-2 mt-1 flex-shrink-0" size={20} />
                <span>Exterior window cleaning using pure water technology</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-bc-red mr-2 mt-1 flex-shrink-0" size={20} />
                <span>Interior window cleaning with streak-free solutions</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-bc-red mr-2 mt-1 flex-shrink-0" size={20} />
                <span>Frame and sill cleaning</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-bc-red mr-2 mt-1 flex-shrink-0" size={20} />
                <span>Screen cleaning and maintenance</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-bc-red mr-2 mt-1 flex-shrink-0" size={20} />
                <span>Hard water stain removal</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-bc-red mr-2 mt-1 flex-shrink-0" size={20} />
                <span>High-rise window cleaning capabilities</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-bc-red mr-2 mt-1 flex-shrink-0" size={20} />
                <span>Scheduled maintenance programs</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Benefits of Professional Window Cleaning</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Regular professional window cleaning provides numerous advantages for your commercial property.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Window Cleaning Process</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We follow a proven methodology to ensure thorough, streak-free results for all your commercial windows.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {processes.map((process, index) => <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mb-4 flex justify-center">
                {process.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{process.title}</h3>
              <p className="text-gray-600">{process.description}</p>
            </div>)}
        </div>
      </section>

      {/* Maintenance Program */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Window Maintenance Programs</h2>
              <p className="text-gray-600 mb-6">
                Keep your commercial property looking its best year-round with our custom maintenance programs.
                Regular window cleaning protects your investment and maintains a professional image.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="text-bc-red mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>Quarterly, bi-annual, or annual service options</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-bc-red mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>Custom schedules to meet your specific needs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-bc-red mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>Priority scheduling for maintenance plan customers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-bc-red mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>Discounted rates for scheduled recurring services</span>
                </li>
              </ul>
              <div className="mt-8">
                <Button asChild variant="bc-red">
                  <Link to="/contact">Request a Maintenance Quote</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img alt="Window cleaning maintenance" className="rounded-lg shadow-lg w-full h-auto object-cover" src="/lovable-uploads/3794e9ea-1675-4129-baec-0aa974323e86.png" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsCarousel />

      {/* FAQ Section */}
      <FAQSection title="Frequently Asked Questions" subtitle="Common questions about our commercial window cleaning services" faqs={faqs} />

      {/* More Services Section */}
      <MoreServicesSection />
      
      {/* Service Areas Map and Carousel */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Areas We Service</h2>
          <div className="mb-8">
            <iframe src="https://www.google.com/maps/d/embed?mid=1EFqLJEb-CuHik9j9h2e0iuzKHJwFD30" width="100%" height="450" style={{
            border: 0,
            borderRadius: '0.5rem'
          }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="BC Pressure Washing Service Area" className="shadow-lg"></iframe>
          </div>
          <ServiceAreasCarousel />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-bc-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Commercial Property?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today to schedule a consultation or request a free quote for your commercial window cleaning needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild variant="outline" className="bg-white text-bc-red hover:bg-gray-100">
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/calculator">Get a Free Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>;
};
export default CommercialWindowCleaning;