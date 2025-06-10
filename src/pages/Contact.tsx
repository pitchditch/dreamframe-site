
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import ContactForm from '../components/ContactForm';
import { Phone, Mail, MapPin, Star } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <Layout
      title="Contact BC Pressure Washing - Free Quotes in Surrey & White Rock"
      description="Get your free pressure washing quote today! Contact BC Pressure Washing for window cleaning, gutter cleaning, and house washing in Surrey, White Rock & Metro Vancouver."
    >
      <Helmet>
        <title>Contact BC Pressure Washing - Free Quotes in Surrey & White Rock</title>
        <meta name="description" content="Get your free pressure washing quote today! Contact BC Pressure Washing for window cleaning, gutter cleaning, and house washing in Surrey, White Rock & Metro Vancouver." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-blue-900 via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('Contact Us')}
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            {t('Get your free quote today. Same-day service available!')}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-gray-900">{t('Get In Touch')}</h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-center space-x-4">
                <Phone className="h-6 w-6 text-bc-red" />
                <div>
                  <h3 className="font-semibold text-gray-900">{t('Phone')}</h3>
                  <a href="tel:7788087620" className="text-bc-red hover:underline">
                    (778) 808-7620
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Mail className="h-6 w-6 text-bc-red" />
                <div>
                  <h3 className="font-semibold text-gray-900">{t('Email')}</h3>
                  <a href="mailto:bcpressurewashing.ca@gmail.com" className="text-bc-red hover:underline">
                    bcpressurewashing.ca@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <MapPin className="h-6 w-6 text-bc-red" />
                <div>
                  <h3 className="font-semibold text-gray-900">{t('Service Area')}</h3>
                  <p className="text-gray-600">White Rock, Surrey & Metro Vancouver</p>
                </div>
              </div>
            </div>

            {/* Referral Section */}
            <div className="bg-gradient-to-r from-bc-red to-red-600 text-white p-6 rounded-lg mb-8">
              <div className="flex items-center mb-4">
                <Star className="h-6 w-6 mr-2" />
                <h3 className="text-xl font-bold">{t('Refer a Friend & Save 50%!')}</h3>
              </div>
              <p className="mb-4">
                {t('Know someone who needs our services? Refer them and you both save 50% on your next service!')}
              </p>
              <Link 
                to="/#referral"
                className="inline-block bg-white text-bc-red px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                {t('Learn More & Refer Now')}
              </Link>
            </div>

            {/* Business Hours */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-gray-900">{t('Business Hours')}</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>{t('Monday - Saturday')}</span>
                  <span>8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('Sunday')}</span>
                  <span>{t('Closed')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-gray-900">{t('Request a Free Quote')}</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
