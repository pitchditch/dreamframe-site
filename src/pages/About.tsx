import Layout from '../components/Layout';
import CallToAction from '../components/CallToAction';
import { Shield, Award, Wrench, Users } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="badge-pill mx-auto w-fit mb-4">About BC Pressure Washing</div>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Professional Service, Exceptional Results</h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
            We're a family-owned business dedicated to providing high-quality pressure washing and cleaning services to residential and commercial clients throughout Langley and the Lower Mainland.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151" 
                alt="Gutter cleaning process" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div>
              <div className="badge-pill mb-4">Our Story</div>
              <h2 className="text-3xl font-bold mb-6">Built on Trust and Quality</h2>
              <p className="text-gray-600 mb-4">
                BC Pressure Washing was founded with a simple mission: to provide exceptional cleaning services with the highest level of professionalism and customer care. Since our inception, we've been committed to delivering outstanding results for every client.
              </p>
              <p className="text-gray-600 mb-6">
                Our team consists of skilled professionals who are thoroughly trained in the latest cleaning techniques and safety protocols. We use only premium, eco-friendly cleaning solutions and state-of-the-art equipment to ensure the best possible results for your property.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="badge-pill mx-auto w-fit mb-4">Why Choose Us</div>
          <h2 className="text-3xl font-bold text-center mb-6">What Sets Us Apart</h2>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            We pride ourselves on delivering unmatched service quality and customer satisfaction.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-bc-red mb-4 mx-auto">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Fully Insured</h3>
              <p className="text-gray-600 text-center">
                We're fully insured and bonded for your peace of mind, protecting your property and our team.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-bc-red mb-4 mx-auto">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Experienced Team</h3>
              <p className="text-gray-600 text-center">
                Our technicians have years of industry experience and continuous training to perfect their craft.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-bc-red mb-4 mx-auto">
                <Wrench size={32} />
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Premium Equipment</h3>
              <p className="text-gray-600 text-center">
                We invest in the best professional-grade equipment to ensure superior cleaning results every time.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-bc-red mb-4 mx-auto">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Customer Focused</h3>
              <p className="text-gray-600 text-center">
                We prioritize your satisfaction with transparent pricing, punctual service, and outstanding results.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="badge-pill mb-4">Our Commitment</div>
              <h2 className="text-3xl font-bold mb-6">Environmentally Responsible Cleaning</h2>
              <p className="text-gray-600 mb-4">
                We believe in protecting the environment while cleaning your property. That's why we use eco-friendly and biodegradable cleaning solutions that are tough on dirt but gentle on the planet.
              </p>
              <p className="text-gray-600 mb-6">
                Our low-pressure cleaning methods conserve water while still delivering exceptional results. We're committed to sustainable practices that keep your property clean and preserve our natural resources.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-bc-red mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Eco-friendly, biodegradable cleaning solutions</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-bc-red mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Water conservation techniques</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-bc-red mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Safe for plants, pets, and your family</span>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2">
              <img 
                src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21" 
                alt="Environmentally friendly cleaning" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Our Service Area</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
            BC Pressure Washing proudly serves residential and commercial clients throughout the Lower Mainland, including:
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="font-medium">Langley</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="font-medium">Surrey</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="font-medium">White Rock</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="font-medium">Abbotsford</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="font-medium">Maple Ridge</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="font-medium">Coquitlam</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="font-medium">Port Coquitlam</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="font-medium">Burnaby</p>
            </div>
          </div>
          
          <p className="mt-8 text-gray-600">
            Don't see your area listed? Contact us to inquire about service availability in your location.
          </p>
        </div>
      </section>

      <CallToAction />
    </Layout>
  );
};

export default About;
