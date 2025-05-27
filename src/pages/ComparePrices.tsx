
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '../components/Layout';
import { useTranslation } from '@/hooks/use-translation';
import { Check, X, Star } from 'lucide-react';

const ComparePrices = () => {
  const { t } = useTranslation();

  const competitors = [
    {
      name: "BC Pressure Washing",
      isUs: true,
      features: {
        quality: true,
        insurance: true,
        guarantee: true,
        equipment: true,
        experience: true,
        pricing: true,
        availability: true,
        followUp: true
      },
      price: "Competitive",
      rating: 5
    },
    {
      name: "Generic Cleaners",
      isUs: false,
      features: {
        quality: false,
        insurance: true,
        guarantee: false,
        equipment: false,
        experience: false,
        pricing: false,
        availability: false,
        followUp: false
      },
      price: "Variable",
      rating: 3
    },
    {
      name: "Budget Services",
      isUs: false,
      features: {
        quality: false,
        insurance: false,
        guarantee: false,
        equipment: false,
        experience: false,
        pricing: true,
        availability: true,
        followUp: false
      },
      price: "Low",
      rating: 2
    }
  ];

  const features = [
    { key: 'quality', label: 'Professional Quality Results' },
    { key: 'insurance', label: 'Fully Insured & WCB Coverage' },
    { key: 'guarantee', label: '100% Satisfaction Guarantee' },
    { key: 'equipment', label: 'Professional Grade Equipment' },
    { key: 'experience', label: '5+ Years Experience' },
    { key: 'pricing', label: 'Transparent Pricing' },
    { key: 'availability', label: 'Same-Day Service Available' },
    { key: 'followUp', label: 'Personal Follow-Up' }
  ];

  return (
    <Layout
      title="Compare Pressure Washing Services | BC Pressure Washing"
      description="Compare BC Pressure Washing with other cleaning services in Surrey & White Rock. See why we're the top choice for professional exterior cleaning."
      canonicalUrl="/compare-prices"
    >
      <Helmet>
        <meta name="keywords" content="compare pressure washing services, best window cleaning Surrey, professional cleaning comparison, BC pressure washing reviews" />
      </Helmet>

      <div className="pt-32 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t("Compare Our Services")}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("See how BC Pressure Washing compares to other cleaning services in the Metro Vancouver area.")}
            </p>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Features</th>
                    {competitors.map((competitor, index) => (
                      <th key={index} className={`px-6 py-4 text-center font-semibold ${competitor.isUs ? 'bg-bc-red' : ''}`}>
                        <div className="flex flex-col items-center">
                          <span className="mb-2">{competitor.name}</span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={`${i < competitor.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
                              />
                            ))}
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, featureIndex) => (
                    <tr key={feature.key} className={featureIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 font-medium text-gray-900">{feature.label}</td>
                      {competitors.map((competitor, compIndex) => (
                        <td key={compIndex} className={`px-6 py-4 text-center ${competitor.isUs ? 'bg-red-50' : ''}`}>
                          {competitor.features[feature.key as keyof typeof competitor.features] ? (
                            <Check className="mx-auto text-green-500" size={20} />
                          ) : (
                            <X className="mx-auto text-red-500" size={20} />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="bg-gray-100 font-semibold">
                    <td className="px-6 py-4 text-gray-900">Starting Price</td>
                    {competitors.map((competitor, index) => (
                      <td key={index} className={`px-6 py-4 text-center ${competitor.isUs ? 'bg-red-100 text-bc-red' : 'text-gray-900'}`}>
                        {competitor.price}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {t("Why BC Pressure Washing Stands Out")}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-bc-red rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t("Quality Guarantee")}</h3>
                <p className="text-gray-600">{t("100% satisfaction guarantee on all our services with personal follow-up from the owner.")}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-bc-red rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t("Professional Equipment")}</h3>
                <p className="text-gray-600">{t("State-of-the-art equipment and eco-friendly cleaning solutions for superior results.")}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-bc-red rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t("Local & Trusted")}</h3>
                <p className="text-gray-600">{t("Family-owned business serving Metro Vancouver with personalized service and community commitment.")}</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-bc-red text-white rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">{t("Ready to Experience the Difference?")}</h2>
            <p className="text-xl mb-6">{t("Get your free quote today and see why we're the top choice in Metro Vancouver.")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/calculator"
                className="bg-white text-bc-red px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                {t("Get Free Quote")}
              </a>
              <a
                href="tel:778-808-7620"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-bc-red transition-colors"
              >
                {t("Call (778) 808-7620")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ComparePrices;
