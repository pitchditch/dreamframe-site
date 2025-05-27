import React from 'react';
import { Shield, Clock, ThumbsUp } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
const ServiceFeatures = () => {
  const {
    t
  } = useTranslation();
  return <section className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-6">{t("Revitalize Your Home's Exterior")}</h2>
          <p className="text-gray-600 mb-6">
            {t("Your home's exterior faces constant exposure to the elements, resulting in the accumulation of dirt, grime, algae, mold, and other contaminants over time. These not only detract from your home's appearance but can cause long-term damage to various exterior surfaces.")}
          </p>
          <p className="text-gray-600 mb-6">
            {t("Our professional house washing service uses the \"soft wash\" approach – combining low pressure with specialized cleaning solutions to safely and effectively clean all exterior surfaces including vinyl siding, brick, stucco, wood, and more. This method delivers superior results while protecting delicate surfaces from damage.")}
          </p>
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <Shield className="text-bc-red mr-2" size={24} />
              <span className="font-medium">{t("Fully Insured")}</span>
            </div>
            <div className="flex items-center">
              <Clock className="text-bc-red mr-2" size={24} />
              <span className="font-medium">{t("Prompt Service")}</span>
            </div>
            <div className="flex items-center">
              <ThumbsUp className="text-bc-red mr-2" size={24} />
              <span className="font-medium">{t("100% Satisfaction")}</span>
            </div>
          </div>
        </div>
        <div className="md:w-1/2">
          
        </div>
      </div>
    </section>;
};
export default ServiceFeatures;