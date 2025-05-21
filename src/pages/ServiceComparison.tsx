
import React from 'react';
import Layout from '@/components/Layout';
import ServiceComparisonTool from '@/components/ServiceComparisonTool';
import { useTranslation } from '@/hooks/use-translation';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ServiceComparison = () => {
  const { t } = useTranslation();
  
  return (
    <Layout
      title="Compare Our Services | BC Pressure Washing"
      description="Compare our window cleaning, pressure washing, gutter cleaning, and roof cleaning services. Choose the right package for your needs and budget."
    >
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("Compare Our Services")}</h1>
          <p className="text-xl max-w-3xl mx-auto">
            {t("Find the perfect cleaning package for your home. Compare features, benefits, and pricing across our service offerings.")}
          </p>
        </div>
      </div>
      
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <ServiceComparisonTool />
          
          <div className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">{t("Frequently Asked Questions")}</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">{t("Can I customize these packages?")}</h3>
                <p className="text-gray-700">
                  {t("Yes! These packages are our most popular options, but we can customize any service to meet your specific needs. Contact us for a custom quote.")}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">{t("How often should I schedule these services?")}</h3>
                <p className="text-gray-700">
                  {t("We recommend window cleaning 2-4 times per year, gutter cleaning twice a year, and roof cleaning every 2-3 years. Pressure washing is typically done annually, but frequency can vary based on your property's specific conditions.")}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">{t("Do you offer discounts for bundled services?")}</h3>
                <p className="text-gray-700">
                  {t("Yes! We offer package discounts when you book multiple services together. Contact us for special bundle pricing tailored to your needs.")}
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <p className="text-xl mb-6">{t("Ready to schedule your service?")}</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" variant="bc-red">
                  <Link to="/contact">{t("Request a Quote")}</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/services">{t("View All Services")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServiceComparison;
