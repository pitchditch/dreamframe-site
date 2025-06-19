
import Layout from '../components/Layout';
import { useTranslation } from '@/hooks/use-translation';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import EquipmentSection from '../components/EquipmentSection';
import CompanyHistory from '../components/CompanyHistory';
import CallToAction from '../components/CallToAction';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const WhyUs = () => {
  const {
    t
  } = useTranslation();
  
  return <Layout>
      <section className="py-24 md:py-32 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 opacity-30">
          {/* Use different images for mobile and desktop */}
          <img 
            src="/lovable-uploads/c445485c-8dd6-4dcf-8896-5c61eee4d27f.png" 
            alt="House exterior cleaning" 
            className="w-full h-full object-cover md:hidden" 
          />
          <img 
            src="/lovable-uploads/97d248af-b7d9-450c-bc42-b0df42d9491d.png" 
            alt="House exterior cleaning" 
            className="w-full h-full object-cover hidden md:block" 
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Why Choose Us</h1>
            <p className="text-xl text-gray-300 mb-8">
              We're dedicated to providing superior exterior cleaning services with a focus on quality, reliability, and customer satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Red Car Discount Banner - NEW SECTION */}
      <section className="bg-bc-red py-8 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-white p-2 rounded-full">
                <img 
                  src="/lovable-uploads/e7b51501-d13b-45ad-889c-383298d75f6f.png" 
                  alt="BC Pressure Washing Red Car" 
                  className="w-16 h-16 object-cover rounded-full" 
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">Spotted Our Red Car?</h3>
                <p className="text-lg">Mention you saw us on Marine Drive for 10% OFF!</p>
              </div>
            </div>
            <div>
              <Button asChild size="lg" variant="secondary" className="whitespace-nowrap">
                <a href="tel:7788087620" className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  <span>Call Now: 778-808-7620</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Our Core Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Quality Service</h3>
              <p className="text-gray-600">
                We never compromise on quality. Our team is trained to deliver exceptional results on every project.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Reliability</h3>
              <p className="text-gray-600">
                We show up on time, every time, and complete projects within the promised timeframe.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p className="text-gray-600">
                We utilize the latest technology and techniques to deliver superior cleaning results.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Customer Focus</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. We listen to your needs and exceed expectations.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* My Car Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Have You Seen Our Red Car?</h2>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <img alt="BC Pressure Washing Red Car" className="rounded-lg shadow-xl w-full" src="/lovable-uploads/e7b51501-d13b-45ad-889c-383298d75f6f.png" />
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">That's Me! Your Local Exterior Cleaning Expert</h3>
                <p className="text-lg leading-relaxed text-gray-700">
                  If you've spotted a bright red car with "BC Pressure Washing" around White Rock Beach or driving through Surrey, you've seen us in action! 
                  As a local business owner, I take pride in personally serving our community and ensuring every job meets our high standards.
                </p>
                <p className="text-lg leading-relaxed text-gray-700">
                  Our distinctive vehicle is fully equipped with professional cleaning equipment, ready to transform your property. We're not just a faceless 
                  company - we're your neighbors, committed to making our community look its best.
                </p>
                <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-bc-red flex items-center">
                  <img 
                    src="/lovable-uploads/5ab1b520-40ad-4e25-b0d6-6292266b90ea.png" 
                    alt="Jayden, Owner" 
                    className="w-16 h-16 rounded-full mr-4 object-cover border-2 border-bc-red"
                  />
                  <div>
                    <p className="italic text-gray-600">
                      "I believe in being visible and approachable in the community I serve. When you see our red car, feel free to wave or stop for a chat!"
                    </p>
                    <p className="font-medium mt-2">— Jayden, Owner</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Company History - Our Story */}
      <CompanyHistory />
      
      {/* Professional Equipment Section */}
      <EquipmentSection />
      
      {/* Call to Action */}
      <CallToAction 
        title="Ready to Experience the BC Pressure Washing Difference?"
        subtitle="Contact us today for professional exterior cleaning services that exceed your expectations."
        backgroundImage="/lovable-uploads/26f6a625-a200-4106-8f94-579be5c566b6.png"
      />
    </Layout>;
};

export default WhyUs;
