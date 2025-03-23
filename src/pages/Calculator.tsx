
import React from 'react';
import Layout from '../components/Layout';
import PriceCalculatorForm from '../components/PriceCalculator/PriceCalculatorForm';
import { useTranslation } from '@/hooks/use-translation';

const Calculator = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center mb-8">{t("Service Price Calculator")}</h1>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          {t("Get an instant estimate for your service needs. Our calculator provides a customized quote based on your specific requirements. We serve residential and commercial properties in White Rock and surrounding areas.")}
        </p>
        <PriceCalculatorForm />
      </div>
    </Layout>
  );
};

export default Calculator;
