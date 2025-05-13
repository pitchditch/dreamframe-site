
import React from 'react';
import Layout from '../../components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Building, CheckCircle, ShieldCheck, Droplets } from 'lucide-react';
import ServiceHeader from '@/components/ServiceHeader';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import FAQSection from '@/components/FAQSection';
import MoreServicesSection from '@/components/MoreServicesSection';
import ServiceAreasCarousel from '@/components/ServiceAreasCarousel';

const CommercialPressureWashing = () => {
  const services = [{
    title: "Building Exteriors",
    description: "Remove dirt, grime, and pollutants from your commercial building's exterior surfaces, restoring their appearance and preventing premature deterioration.",
    icon: <Building size={32} className="text-bc-red" />,
    image: "/lovable-uploads/8a55a001-6d53-4d15-a3ce-cf0763d47e29.png"
  }, {
    title: "Concrete & Pavement",
    description: "Deep clean parking lots, sidewalks, and other concrete surfaces to remove unsightly stains, gum, oil, and grease buildup.",
    icon: <Droplets size={32} className="text-bc-red" />,
    image: "/lovable-uploads/e4c3ca8c-1fe4-4d69-a8a5-747daa4af2f1.png"
  }, {
    title: "Dumpster Areas",
    description: "Eliminate odors and sanitize dumpster areas to maintain a clean and hygienic environment for customers and employees.",
    icon: <ShieldCheck size={32} className="text-bc-red" />,
    image: "/lovable-uploads/0ff95df8-8b0f-40ed-a367-7ff568c5ee4d.png"
  }, {
    title: "Graffiti Removal",
    description: "Professional removal of graffiti from walls and surfaces, protecting your property's image and value.",
    icon: <CheckCircle size={32} className="text-bc-red" />,
    image: "/lovable-uploads/16b476d3-56e8-40c9-a1c6-7cd772e62b07.png"
  }, {
    title: "Parking Garages",
    description: "Thorough cleaning of parking structures to remove oil stains, tire marks, and built-up debris, improving appearance and safety.",
    icon: <Building size={32} className="text-bc-red" />,
    image: "/lovable-uploads/10877f40-2faf-4231-bc7d-a5440a408ca2.png"
  }];
  
  const faqs = [
    {
      question: "How often should commercial properties be pressure washed?",
      answer: "We recommend professional pressure washing at least twice a year for most commercial properties. However, high-traffic areas or buildings in areas with more pollution may benefit from quarterly cleaning. Our team can establish a maintenance schedule tailored to your property's specific needs."
    },
    {
      question: "Will pressure washing damage my building's exterior?",
      answer: "When performed by professionals with the right equipment and techniques, pressure washing is safe for most commercial building exteriors. Our team adjusts the pressure and uses appropriate cleaning solutions based on the surface material, ensuring effective cleaning without damage."
    },
    {
      question: "How long does commercial pressure washing take?",
      answer: "The time required depends on the size of your property and the specific services needed. A typical commercial pressure washing job might take anywhere from a few hours to multiple days. We'll provide a time estimate during your consultation and work efficiently to minimize disruption to your business."
    },
    {
      question: "Do you work after business hours?",
      answer: "Yes, we understand that commercial cleaning often needs to happen outside regular business hours. We offer flexible scheduling, including evenings and weekends, to minimize disruption to your operations and customers."
    },
    {
      question: "Is your pressure washing environmentally friendly?",
      answer: "Yes, we use environmentally responsible cleaning methods and biodegradable detergents that effectively clean without harming surrounding landscape or water systems. Our team also implements water reclamation techniques when appropriate to minimize environmental impact."
    }
  ];

  return (
    <Layout title="Commercial Pressure Washing Services | BC Pressure Washing" description="Professional pressure washing services for commercial properties in Surrey, White Rock & Metro Vancouver. Keep your business looking its best.">
      {/* Hero Section */}
      <section className="relative h-screen w-full">
        <img src="/lovable-uploads/d9f3e980-9bd8-4f15-afb2-6df7cb095002.png" alt="Commercial Pressure Washing Services" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-end pb-20">
          <div className="text-center mb-8">
            <h2 className="text-white text-2xl md:text-3xl font-semibold mb-4">Enhance Your Property's Value & Image</h2>
            <p className="text-white text-lg mb-6">Schedule your commercial pressure washing service today</p>
          </div>
          <Button asChild variant="bc-red" size="lg" className="text-lg font-semibold">
            <Link to="/calculator">Check Prices & Availability</Link>
          </Button>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Complete Commercial Pressure Washing Solutions</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive pressure washing services for all types of commercial properties, 
            helping businesses maintain a professional, clean, and inviting appearance for customers and employees.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
              </div>
              <div className="p-6">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose BC Pressure Washing</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We understand the unique needs of commercial properties and deliver reliable, efficient service that exceeds expectations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Fully Insured & Licensed</h3>
              <p className="text-gray-600">
                We carry comprehensive insurance coverage, protecting your property and giving you peace of mind.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Flexible Scheduling</h3>
              <p className="text-gray-600">
                We work around your business hours to minimize disruption to your operations and customers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Eco-Friendly Options</h3>
              <p className="text-gray-600">
                Our environmentally responsible cleaning methods and products protect your property and the planet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Maintenance Programs */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Regular Maintenance Programs</h2>
            <p className="text-gray-600 mb-6">
              Keep your commercial property looking its best year-round with our customized maintenance programs.
              Regular professional cleaning protects your investment and enhances your business image.
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
            <img alt="Commercial pressure washing maintenance" className="rounded-lg shadow-lg w-full h-auto object-cover" src="/lovable-uploads/3ff52f8f-29e2-421b-983b-b72c1ab34b52.png" />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsCarousel />

      {/* FAQ Section */}
      <FAQSection 
        title="Frequently Asked Questions"
        subtitle="Common questions about our commercial pressure washing services"
        faqs={faqs}
      />

      {/* More Services Section */}
      <MoreServicesSection />
      
      {/* Service Areas Map and Carousel */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Areas We Service</h2>
          <div className="mb-8">
            <iframe
              src="https://www.google.com/maps/d/embed?mid=1EFqLJEb-CuHik9j9h2e0iuzKHJwFD30"
              width="100%"
              height="450"
              style={{ border: 0, borderRadius: '0.5rem' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="BC Pressure Washing Service Area"
              className="shadow-lg"
            ></iframe>
          </div>
          <div className="bg-white py-6">
            <ServiceAreasCarousel />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-bc-red text-white relative overflow-hidden">
        <img 
          src="/lovable-uploads/761663e4-04b5-48f6-8d47-235fbec8008d.png" 
          alt="Pressure washing equipment" 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Commercial Property?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today to schedule a consultation or request a free quote for your commercial pressure washing needs.
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
    </Layout>
  );
};

export default CommercialPressureWashing;
