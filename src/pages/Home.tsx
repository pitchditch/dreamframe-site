
import React from 'react';
import Layout from '../components/Layout';
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import ProcessSection from '../components/home/ProcessSection';
import CallToAction from '../components/CallToAction';

const Home = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
      <TestimonialsSection />
      <ProcessSection />
      <CallToAction 
        title="Ready to Transform Your Property?"
        subtitle="Get your free quote today and experience the BC Pressure Washing difference."
        backgroundImage="/lovable-uploads/26f6a625-a200-4106-8f94-579be5c566b6.png"
      />
    </Layout>
  );
};

export default Home;
