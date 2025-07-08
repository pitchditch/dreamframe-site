
import React from 'react';
import Layout from '../components/Layout';
import QuoteBuilderForm from '../components/QuoteBuilder/QuoteBuilderForm';
import { Helmet } from 'react-helmet-async';

const QuoteBuilder = () => {
  return (
    <Layout>
      <Helmet>
        <title>Quote Builder - BC Pressure Washing</title>
        <meta name="description" content="Professional quote builder for pressure washing, window cleaning, and exterior cleaning services in White Rock & Surrey, BC." />
        <meta name="keywords" content="quote builder, pressure washing quote, window cleaning estimate, BC pressure washing" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Professional Quote Builder
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create detailed quotes for pressure washing and exterior cleaning services with automatic pricing calculations.
            </p>
          </div>
          
          <QuoteBuilderForm />
        </div>
      </div>
    </Layout>
  );
};

export default QuoteBuilder;
