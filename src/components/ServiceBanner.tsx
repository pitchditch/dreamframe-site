
import React from 'react';
import { Shield, Star, Home } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

const ServiceBanner = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-gray-50 py-6 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          <div className="flex items-center bg-white px-6 py-3 rounded-lg shadow-sm border border-gray-200">
            <Shield className="text-bc-red mr-3" size={24} />
            <span className="text-gray-800 font-semibold">{t("Fully Insured & Licensed")}</span>
          </div>
          <div className="flex items-center bg-white px-6 py-3 rounded-lg shadow-sm border border-gray-200">
            <Star className="text-yellow-500 mr-3" size={24} />
            <span className="text-gray-800 font-semibold">{t("5-Star Rated Service")}</span>
          </div>
          <div className="flex items-center bg-white px-6 py-3 rounded-lg shadow-sm border border-gray-200">
            <Home className="text-bc-red mr-3" size={24} />
            <span className="text-gray-800 font-semibold">{t("Locally Owned")}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceBanner;
