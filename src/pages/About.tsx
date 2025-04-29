import React from 'react';
import Layout from '../components/Layout';
import { Helmet } from 'react-helmet';
import FounderSection from '../components/home/FounderSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CallToAction from '../components/CallToAction';
import ServiceAreaMap from '../components/ServiceAreaMap';
import { useTranslation } from '@/hooks/use-translation';

const About = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Helmet>
        <title>About Us | BC Pressure Washing</title>
        <meta name="description" content="Learn about BC Pressure Washing, our mission, and our commitment to providing top-quality exterior cleaning services in White Rock, Surrey, and Metro Vancouver." />
        <meta name="keywords" content="about us, BC Pressure Washing, mission, values, exterior cleaning services, White Rock, Surrey, Metro Vancouver" />
      </Helmet>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-8">{t('About BC Pressure Washing')}</h1>
            <p className="text-gray-600 text-lg mb-12">
              {t('We are a locally owned and operated exterior cleaning company based in White Rock, BC. Our mission is to provide exceptional service and quality workmanship to every customer.')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src="/lovable-uploads/c5219e28-4a09-4d72-bef9-e96193360fa6.png"
                alt="About BC Pressure Washing"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">{t('Our Story')}</h2>
              <p className="text-gray-600 mb-6">
                {t('BC Pressure Washing was founded in 2015 by Jayden Fisher with a vision to deliver reliable and professional exterior cleaning services to homeowners and businesses in the Metro Vancouver area. What started as a small operation has grown into a trusted name in the industry, thanks to our commitment to customer satisfaction and quality results.')}
              </p>
              <p className="text-gray-600">
                {t('We believe in building long-term relationships with our clients by providing personalized service and exceeding their expectations. Our team of experienced technicians is dedicated to delivering the best possible results, using the latest equipment and eco-friendly cleaning solutions.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <FounderSection />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">{t('Our Core Values')}</h2>
            <p className="text-gray-600 text-lg mb-12">
              {t('These are the principles that guide our business and shape our interactions with customers, partners, and employees.')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">{t('Quality')}</h3>
              <p className="text-gray-600">
                {t('We are committed to delivering the highest standards of workmanship and using the best equipment and products to achieve exceptional results.')}
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">{t('Integrity')}</h3>
              <p className="text-gray-600">
                {t('We operate with honesty, transparency, and ethical practices in all our business dealings, ensuring trust and reliability with our clients.')}
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">{t('Customer Satisfaction')}</h3>
              <p className="text-gray-600">
                {t('We prioritize our customers needs and strive to exceed their expectations by providing personalized service, clear communication, and reliable support.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <ServiceAreaMap />

      <CallToAction
        background="bg-gray-100"
        title="Join Our Growing Family of Happy Customers"
        subtitle="We'd love to add your property to our list of success stories. Contact us today for a free, no-obligation quote."
      />
    </Layout>
  );
};

export default About;
