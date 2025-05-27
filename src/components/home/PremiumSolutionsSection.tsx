
import React from 'react';
import { Shield, Star, Clock, Award } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

const PremiumSolutionsSection = () => {
  const { t } = useTranslation();

  return (
    <section data-section="premium-solutions" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("Premium Cleaning Solutions")}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t("We deliver exceptional results using professional-grade equipment and eco-friendly cleaning solutions.")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-bc-red rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t("Fully Insured")}</h3>
            <p className="text-gray-600">{t("WCB coverage and liability insurance for your complete peace of mind.")}</p>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-bc-red rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t("5-Star Service")}</h3>
            <p className="text-gray-600">{t("Consistently rated 5 stars by our satisfied customers across Metro Vancouver.")}</p>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-bc-red rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t("Same-Day Service")}</h3>
            <p className="text-gray-600">{t("Quick response times with same-day service available for urgent cleaning needs.")}</p>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-bc-red rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t("100% Guarantee")}</h3>
            <p className="text-gray-600">{t("Not satisfied? We'll return and make it right at no additional cost.")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumSolutionsSection;
