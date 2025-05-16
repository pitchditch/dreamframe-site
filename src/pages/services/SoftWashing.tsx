
import React from 'react';
import Layout from '../../components/Layout';
import { Helmet } from 'react-helmet-async';

const SoftWashing = () => {
  return (
    <Layout
      title="Soft Washing Services | BC Pressure Washing"
      description="Professional soft washing services in White Rock, Surrey, and Metro Vancouver. Gentle cleaning for delicate surfaces."
      canonicalUrl="/services/soft-washing"
    >
      <Helmet>
        <meta name="keywords" content="soft washing, gentle pressure washing, house washing, exterior cleaning, White Rock soft washing, Surrey soft washing" />
      </Helmet>
      
      <div className="bg-gradient-to-b from-blue-50 to-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Soft Washing Services</h1>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Gentle cleaning for delicate surfaces that removes dirt, grime, and organic growth without causing damage.
          </p>
        </div>
      </div>
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">What is Soft Washing?</h2>
            <p className="mb-6">
              Soft washing is a cleaning method that uses low pressure and specialized solutions to safely remove dirt, 
              algae, mildew, and other contaminants from your home's exterior surfaces. This technique is perfect for 
              delicate surfaces that could be damaged by traditional high-pressure washing.
            </p>
            
            <h2 className="text-2xl font-bold mb-4 mt-8">Our Soft Washing Services</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Vinyl and delicate siding cleaning</li>
              <li>Stucco and painted surfaces</li>
              <li>Roof soft washing</li>
              <li>Deck and fence gentle cleaning</li>
              <li>Solar panel cleaning</li>
            </ul>
            
            <p className="mt-6">
              Contact us today to learn more about our soft washing services and how we can help maintain your property's 
              exterior surfaces safely and effectively.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-bc-red">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready for a Soft Washing Quote?</h2>
          <p className="text-white mb-6">Contact our team today to schedule your service or get a free quote.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/contact" 
              className="bg-white text-bc-red font-bold py-3 px-8 rounded-md hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </a>
            <a 
              href="tel:778-808-7620" 
              className="bg-black bg-opacity-20 text-white font-bold py-3 px-8 rounded-md hover:bg-opacity-30 transition-colors"
            >
              Call: 778-808-7620
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SoftWashing;
