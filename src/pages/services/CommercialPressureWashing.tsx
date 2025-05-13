import React from 'react';
import { Helmet } from "react-helmet-async";
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import CallToAction from '@/components/CallToAction';

const CommercialPressureWashing = () => {
  return (
    <Layout
      image="/lovable-uploads/2e6b8af4-e2b3-424a-bdfb-3ba6a8d188f4.png"
      title="Commercial Pressure Washing Services in Surrey & White Rock | BC Pressure Washing"
      description="Professional commercial pressure washing services for businesses in Surrey, White Rock & Metro Vancouver. Enhance curb appeal & property value."
      canonicalUrl="/services/commercial-pressure-washing"
    >
      <Helmet>
        <title>Commercial Pressure Washing Services in Surrey & White Rock | BC Pressure Washing</title>
        <meta name="description" content="Professional commercial pressure washing services for businesses in Surrey, White Rock & Metro Vancouver. Enhance curb appeal & property value." />
        <meta property="og:title" content="Commercial Pressure Washing Services | BC Pressure Washing" />
        <meta property="og:description" content="Expert commercial pressure washing in Surrey, White Rock & Metro Vancouver. Get a free quote today!" />
        <meta name="keywords" content="commercial pressure washing, pressure washing services, commercial cleaning, exterior cleaning, Surrey, White Rock, Metro Vancouver" />
        <link rel="canonical" href="https://www.bcpressurewashing.ca/services/commercial-pressure-washing" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-24 bg-gray-100 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">Commercial Pressure Washing Services</h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Enhance your business's curb appeal with our professional commercial pressure washing services.
          </p>
          <Button asChild size="lg" variant="bc-red">
            <Link to="/contact">Get a Free Quote</Link>
          </Button>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Commercial Pressure Washing Service Areas</h2>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-black">
              <p className="text-center text-lg mb-4 font-medium">We proudly serve businesses throughout:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {["White Rock", "Surrey", "South Surrey", "Langley", "Delta", "Richmond", "Vancouver", "Burnaby", "New Westminster", "Coquitlam"].map((area, index) => (
                  <span key={index} className="bg-gray-100 text-black px-3 py-1 rounded-full text-sm font-medium">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Why Choose Our Commercial Pressure Washing?</h2>
              <p className="text-gray-700 mb-6">
                First impressions matter. A clean, well-maintained exterior can significantly enhance your business's image and attract more customers. Our commercial pressure washing services are designed to remove dirt, grime, and stains, leaving your property looking its best.
              </p>
              <ul className="list-disc pl-5 text-gray-700">
                <li>Improved curb appeal</li>
                <li>Enhanced property value</li>
                <li>Safe and clean environment for customers and employees</li>
                <li>Protection against long-term damage from dirt and pollutants</li>
              </ul>
            </div>
            <div>
              <img 
                src="/lovable-uploads/4e998e9d-a996-459d-a99a-84611193481f.png" 
                alt="Commercial pressure washing in action" 
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-2">What types of commercial properties do you service?</h3>
              <p className="text-gray-700 mb-4">
                We service a wide range of commercial properties, including office buildings, retail stores, restaurants, warehouses, and more.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Is pressure washing safe for all surfaces?</h3>
              <p className="text-gray-700 mb-4">
                Our experienced technicians use a variety of pressure washing techniques and eco-friendly cleaning solutions to safely clean all types of surfaces, including concrete, brick, siding, and more.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">How often should I pressure wash my commercial property?</h3>
              <p className="text-gray-700 mb-4">
                The frequency of pressure washing depends on several factors, such as location, weather conditions, and the type of business. We recommend scheduling a pressure washing service at least once a year to maintain a clean and professional appearance.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Do you offer eco-friendly cleaning solutions?</h3>
              <p className="text-gray-700 mb-4">
                Yes, we are committed to using eco-friendly cleaning solutions that are safe for your property, your employees, and the environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-bc-red text-white relative overflow-hidden">
        <img 
          src="/lovable-uploads/b54ea65f-7f3b-438b-a788-4530cde9147a.png" 
          alt="Pressure washing equipment" 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          style={{ objectPosition: "center" }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Commercial Property?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today to schedule a consultation or request a free quote for your commercial pressure washing needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="bg-white text-bc-red hover:bg-gray-100 border-none shadow-lg">
              <Link to="/contact">Get a Free Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 shadow-lg">
              <a href="tel:+16047860399">Call Us Today</a>
            </Button>
          </div>
        </div>
      </section>

      <CallToAction 
        title="Enhance Your Commercial Property's Appearance"
        subtitle="Our professional pressure washing services can transform your commercial property and make a lasting impression on customers."
      />
    </Layout>
  );
};

export default CommercialPressureWashing;
