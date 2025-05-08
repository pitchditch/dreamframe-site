
import React from 'react';
import Layout from '../components/Layout';
import ServiceProcess from '../components/ServiceProcess';
import { Helmet } from 'react-helmet-async';

const ServiceProcessPage = () => {
  return (
    <Layout title="Our Service Process | BC Pressure Washing" 
            description="Learn about our detailed service process at BC Pressure Washing - how we deliver exceptional results every time.">
      <Helmet>
        <title>Our Service Process | BC Pressure Washing</title>
        <meta name="description" content="Learn about our detailed service process at BC Pressure Washing - how we deliver exceptional results every time." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Service Process</h1>
        <ServiceProcess />
      </div>
    </Layout>
  );
};

export default ServiceProcessPage;
