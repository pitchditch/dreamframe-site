
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

const PremiumSolutionsSection = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: "🪟",
      title: t("Window Cleaning"),
      description: t("Crystal-clear windows inside and out using eco-friendly solutions."),
      features: [
        t("Exterior & interior window cleaning"),
        t("Screen & sill wipe-down"),
        t("Streak-free finish"),
        t("Track & debris cleaning")
      ]
    },
    {
      icon: "🏠",
      title: t("House Washing"),
      description: t("Gentle soft-washing to remove dirt, mold, and algae without damage."),
      features: [
        t("Soft wash siding treatment"),
        t("Algae & mildew removal"),
        t("Safe for stucco, vinyl, wood"),
        t("Enhanced curb appeal")
      ]
    },
    {
      icon: "🌧️",
      title: t("Gutter Cleaning"),
      description: t("Prevent clogs and overflow damage with professional gutter care."),
      features: [
        t("Interior debris removal"),
        t("Downspout flushing"),
        t("Exterior gutter brightening"),
        t("Safe ladder access")
      ]
    },
    {
      icon: "🏘️",
      title: t("Roof Cleaning"),
      description: t("Eliminate moss, algae, and stains — extend roof life safely."),
      features: [
        t("Soft wash or brushing method"),
        t("Moss & algae treatment"),
        t("Roof inspection"),
        t("Gentle on shingles (no pressure)")
      ]
    }
  ];

  return (
    <section data-section="premium-solutions" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            {t("Premium Cleaning Solutions")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("Enhance your home's curb appeal and protect its value with professional, fully insured exterior cleaning services — personally checked by Jayden Fisher.")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="h-full hover:shadow-lg transition-shadow duration-300 border border-gray-200">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="text-4xl mb-4 text-center">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-center text-gray-900">{service.title}</h3>
                <p className="text-gray-600 mb-4 text-center flex-grow">{service.description}</p>
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm">
                      <CheckCircle className="text-green-500 mr-2 flex-shrink-0" size={16} />
                      <span className="text-gray-700">{feature}</span>
                      <span className="ml-auto text-green-600 font-medium">{t("Included")}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <a 
            href="/services" 
            className="inline-flex items-center text-bc-red hover:text-red-700 font-semibold text-lg transition-colors"
          >
            {t("See All Services")} 
            <span className="ml-2">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default PremiumSolutionsSection;
