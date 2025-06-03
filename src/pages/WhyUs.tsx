import React from 'react';
import Layout from '../components/Layout';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, Rocket } from 'lucide-react';
import CallToAction from '../components/CallToAction';
import { TestimonialCarousel } from '@/components/TestimonialCarousel';
import { Link } from 'react-router-dom';

const WhyUs = () => {
  return (
    <Layout>
      <Helmet>
        <title>Why Choose BC Pressure Washing | Trusted Exterior Cleaning Experts</title>
        <meta name="description" content="Discover why BC Pressure Washing is the top choice for pressure washing, window cleaning, and gutter cleaning in White Rock, Surrey, and Metro Vancouver." />
        <meta name="keywords" content="pressure washing, window cleaning, gutter cleaning, White Rock, Surrey, BC, trusted, experts" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Why Choose BC Pressure Washing?</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            We're not just another cleaning company. We're your neighbors, committed to providing exceptional service and building lasting relationships.
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Quality */}
            <div className="text-center">
              <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Uncompromising Quality</h3>
              <p className="text-gray-600">We use the best equipment and eco-friendly solutions to deliver spotless results every time.</p>
            </div>

            {/* Reliability */}
            <div className="text-center">
              <Rocket className="w-12 h-12 mx-auto mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Reliable & On-Time</h3>
              <p className="text-gray-600">We respect your time and property, arriving on schedule and completing the job efficiently.</p>
            </div>

            {/* Trust */}
            <div className="text-center">
              <CheckCircle className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Trusted & Insured</h3>
              <p className="text-gray-600">Fully licensed and insured for your peace of mind. We stand behind our work with a satisfaction guarantee.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">What Our Clients Say</h2>
          <TestimonialCarousel />
        </div>
      </section>

      {/* Service Area Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Our Service Areas</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center">
            We proudly serve White Rock, Surrey, and the entire Metro Vancouver area. Contact us to see if we're in your neighborhood!
          </p>
          <div className="flex justify-center mt-8">
            <Link to="/contact" className="bg-bc-red hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full">
              Check Availability
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CallToAction 
        title="Ready to Experience the BC Pressure Washing Difference?" 
        subtitle="Contact us today for a free estimate and see why we're the trusted choice for exterior cleaning in Metro Vancouver."
        backgroundImage="/lovable-uploads/9454f467-d96c-435e-b88d-8a78e379102a.png" 
      />
    </Layout>
  );
};

export default WhyUs;
