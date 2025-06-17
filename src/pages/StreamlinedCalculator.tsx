
import React from 'react';
import Layout from '../components/Layout';
import StreamlinedCalculatorPage from '../components/StreamlinedCalculator/StreamlinedCalculatorPage';
import { Helmet } from 'react-helmet-async';

const StreamlinedCalculator = () => {
  return (
    <Layout>
      <Helmet>
        <title>Get Your Free Quote - 3 Simple Steps | BC Pressure Washing</title>
        <meta name="description" content="Get an instant quote for professional cleaning services in White Rock & Surrey. Simple 3-step form - address, property size, service type." />
        <meta name="keywords" content="free quote, pressure washing estimate, window cleaning quote, White Rock, Surrey, BC" />
      </Helmet>
      <StreamlinedCalculatorPage />
    </Layout>
  );
};

export default StreamlinedCalculator;
