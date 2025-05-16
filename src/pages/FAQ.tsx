
import React from 'react';
import Layout from '../components/Layout';
import FAQSection from '../components/FAQSection';
import { Helmet } from 'react-helmet-async';

const faqItems = [
  {
    question: "What areas do you service?",
    answer: "We are based in White Rock and service the entire Metro Vancouver region, including Surrey, Langley, Delta, Vancouver and surrounding areas."
  },
  {
    question: "Are you fully insured?",
    answer: "Yes, we are fully insured with WCB coverage and liability insurance for your complete peace of mind."
  },
  {
    question: "How often should I have my windows cleaned?",
    answer: "Most homeowners benefit from window cleaning 2-3 times per year, though this varies based on your location, property conditions, and personal preference."
  },
  {
    question: "Do you offer any guarantees?",
    answer: "Absolutely! We offer a 100% satisfaction guarantee. If you're not completely satisfied with our work, we'll come back and make it right at no additional cost."
  },
  {
    question: "How do you price your services?",
    answer: "Our pricing is based on the service requested, property size, accessibility, and specific requirements. We offer free quotes after assessing your property's needs."
  },
  {
    question: "Do you clean screens as well?",
    answer: "Yes, we remove, clean, and reinstall screens as part of our standard window cleaning service at no extra charge."
  },
  {
    question: "What cleaning solutions do you use?",
    answer: "We use environmentally friendly, biodegradable cleaning solutions that are safe for your property, plants, and pets while still delivering exceptional results."
  },
  {
    question: "How long will it take to clean my house?",
    answer: "The time required depends on the size of your property and services requested. A typical residential service takes between 2-4 hours, while larger properties may take longer."
  },
  {
    question: "Do I need to be home during the service?",
    answer: "Not necessarily. As long as we have access to the areas that need cleaning, you don't need to be present. Many of our clients provide access instructions and we take care of the rest."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept cash, e-transfer, credit cards, and checks for your convenience."
  }
];

const FAQ = () => {
  return (
    <Layout
      title="Frequently Asked Questions | BC Pressure Washing"
      description="Get answers to common questions about our pressure washing, window cleaning, and roof cleaning services in White Rock, Surrey, and Metro Vancouver."
      canonicalUrl="/faq"
    >
      <Helmet>
        <meta name="keywords" content="pressure washing FAQ, window cleaning questions, roof cleaning FAQ, exterior cleaning services FAQ, White Rock pressure washing, Surrey window cleaning" />
      </Helmet>
      
      <div className="bg-gradient-to-b from-blue-50 to-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Frequently Asked Questions</h1>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Get answers to the most common questions about our pressure washing, window cleaning, and other exterior cleaning services.
          </p>
        </div>
      </div>
      
      <FAQSection 
        title="Common Questions About Our Services"
        description="Everything you need to know about BC Pressure Washing services"
        faqs={faqItems}
        darkMode={false}
      />
      
      <section className="py-12 bg-bc-red">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Still Have Questions?</h2>
          <p className="text-white mb-6">Our team is ready to help answer any other questions you might have.</p>
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

export default FAQ;
