
import React from 'react';
import { Shield, Clock, Star } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

const ServiceBanner = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-bc-red text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6" />
            <span className="font-semibold text-sm md:text-base">{t("Fully Insured & Licensed")}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6" />
            <span className="font-semibold text-sm md:text-base">{t("Fast Response Times")}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Star className="w-6 h-6" />
            <span className="font-semibold text-sm md:text-base">{t("5-Star Rated Service")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceBanner;
