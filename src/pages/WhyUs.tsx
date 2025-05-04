import Layout from '../components/Layout';
import { useTranslation } from '@/hooks/use-translation';
const WhyUs = () => {
  const {
    t
  } = useTranslation();
  return <Layout>
      <section className="py-24 md:py-32 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 inline-flex">Why Choose Us</h1>
            <p className="text-xl text-gray-300 mb-8">
              We're dedicated to providing superior exterior cleaning services with a focus on quality, reliability, and customer satisfaction.
            </p>
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
      
      {/* Our Story Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                BC Pressure Washing & Property Maintenance began with a simple mission: to provide the highest quality exterior cleaning services to homeowners and businesses throughout the Lower Mainland.
              </p>
              <p className="text-gray-600 mb-4">
                Founded by Jayden Fisher, our company has grown from a one-man operation to a team of dedicated professionals, all committed to delivering excellence in every job we undertake.
              </p>
              <p className="text-gray-600 mb-4">
                What sets us apart is our attention to detail and our commitment to customer satisfaction. We're not just cleaning properties; we're building relationships with our clients based on trust, reliability, and exceptional results.
              </p>
              <p className="text-gray-600">
                Today, we're proud to be one of the most trusted exterior cleaning companies in the Vancouver area, serving both residential and commercial clients with the same level of care and dedication.
              </p>
            </div>
            <div>
              <img src="/lovable-uploads/10e953e1-c5f0-4899-a3b7-944cf15bca76.png" alt="BC Pressure Washing Company History" className="rounded-lg shadow-lg w-full" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Professional Equipment Section */}
      <section className="py-16 md:py-24">
        
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-bc-red text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Experience the Difference?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contact us today for a free consultation and quote. Let us show you why we're the preferred choice for exterior cleaning in the Vancouver area.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/contact" className="bg-white text-bc-red font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300">
              Get a Free Quote
            </a>
            <a href="tel:7788087620" className="bg-black bg-opacity-30 text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-40 transition duration-300">
              Call: 778-808-7620
            </a>
          </div>
        </div>
      </section>
    </Layout>;
};
export default WhyUs;