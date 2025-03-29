import React from 'react';
import Layout from '@/components/Layout';
import PriceCalculator from '@/components/PriceCalculator';
import { Helmet } from 'react-helmet';
import ServicesSection from '@/components/home/ServicesSection';

const Calculator = () => {
  return (
    <Layout>
      <Helmet>
        <title>Price Calculator | Window Cleaning & Pressure Washing Quote | White Rock</title>
        <meta name="description" content="Get an instant quote for window cleaning in White Rock, pressure washing, and other exterior cleaning services with our easy-to-use price calculator." />
        <meta name="keywords" content="window cleaning quote, White Rock pressure washing prices, exterior cleaning cost calculator, free estimate" />
        <link rel="canonical" href="https://bcpressurewashing.ca/calculator" />
        <meta property="og:title" content="Free Quote Calculator | BC Pressure Washing" />
        <meta property="og:description" content="Get an instant price estimate for professional window cleaning and exterior cleaning services in White Rock and Surrey." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bcpressurewashing.ca/calculator" />
        <meta property="og:image" content="/lovable-uploads/76968d4f-c862-4989-a3e3-b74ac31968e2.png" />
      </Helmet>
      
      <PriceCalculator />
      
      {/* Add ServicesSection */}
      <ServicesSection />
      
    </Layout>
  );
};

export default Calculator;
