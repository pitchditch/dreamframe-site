
import React from 'react';
import { Shield, Clock, ThumbsUp } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

const ServiceFeatures = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t("Why Choose Our Pressure Washing Services?")}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t("We deliver exceptional results with professional equipment, experienced technicians, and a commitment to customer satisfaction.")}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-bc-red p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Shield className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t("Fully Insured")}</h3>
            <p className="text-gray-600">
              {t("Complete peace of mind with comprehensive insurance coverage for all our services.")}
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-bc-red p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Clock className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t("Prompt Service")}</h3>
            <p className="text-gray-600">
              {t("Reliable scheduling and timely completion of all pressure washing projects.")}
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-bc-red p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <ThumbsUp className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t("100% Satisfaction")}</h3>
            <p className="text-gray-600">
              {t("We guarantee your complete satisfaction with every pressure washing service.")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceFeatures;
