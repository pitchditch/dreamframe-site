import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { MapPin, Envelope, Phone } from 'lucide-react';
import Layout from '@/components/Layout';
import ServicesSection from '@/components/home/ServicesSection';
import { Helmet } from 'react-helmet';

const Contact = () => {
  const [state, handleSubmit] = useForm("xoqovgnk");
  if (state.succeeded) {
      return <p className="container mx-auto px-4 py-24 text-center">Thanks for your submission!</p>;
  }

  return (
    <Layout>
      <Helmet>
        <title>Contact BC Pressure Washing | Schedule Window Cleaning in White Rock</title>
        <meta name="description" content="Contact BC Pressure Washing for window cleaning in White Rock, pressure washing, and exterior cleaning services. Get a free quote today!" />
        <meta name="keywords" content="contact BC Pressure Washing, window cleaning quote, pressure washing estimate, White Rock cleaning services" />
        <link rel="canonical" href="https://bcpressurewashing.ca/contact" />
        <meta property="og:title" content="Contact BC Pressure Washing | Get a Free Quote" />
        <meta property="og:description" content="Reach out for professional window cleaning in White Rock, pressure washing, and exterior cleaning services. Free, no-obligation quotes." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bcpressurewashing.ca/contact" />
        <meta property="og:image" content="/lovable-uploads/f69ce980-a64c-43c2-9d3b-7a93c47e127b.png" />
      </Helmet>
      
      {/* Hero Section */}
      <div className="relative bg-black text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url('/lovable-uploads/1a1f8b2e-bcc7-4d88-ae7c-ed4024c70ae4.png')` }}
        />
        <div className="relative container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
            We're here to help with all your exterior cleaning needs. Contact us today for a free quote!
          </p>
        </div>
      </div>

      {/* Contact Form Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ValidationError 
                  prefix="Name" 
                  field="name"
                  errors={state.errors}
                  className="text-red-500 text-xs italic"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email" 
                  name="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ValidationError 
                  prefix="Email" 
                  field="email"
                  errors={state.errors}
                  className="text-red-500 text-xs italic"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ValidationError 
                  prefix="Message" 
                  field="message"
                  errors={state.errors}
                  className="text-red-500 text-xs italic"
                />
              </div>
              <div>
                <button type="submit" disabled={state.submitting} className="btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="text-bc-red mr-2" />
                <span>Surrey, BC, Canada</span>
              </div>
              <div className="flex items-center">
                <Envelope className="text-bc-red mr-2" />
                <span>info@bcpressurewashing.ca</span>
              </div>
              <div className="flex items-center">
                <Phone className="text-bc-red mr-2" />
                <span>(604) 123-4567</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Add ServicesSection */}
      <ServicesSection />
      
      {/* CTA Section */}
      <div className="cta-section bg-bc-black">
        <div 
          className="relative bg-cover bg-center py-16"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/lovable-uploads/b937b789-e5a5-4a00-9d06-d7101902b6a5.png')`,
            backgroundPosition: 'center'
          }}
        >
          <div className="container mx-auto px-4 py-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Get Started?</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
              Contact us today for a free quote and let us help you with all your exterior cleaning needs.
            </p>
            <a href="/calculator">
              <button className="btn-primary">Get a Free Quote</button>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
