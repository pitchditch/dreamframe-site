
import React from 'react';
import ServiceBenefits from '@/components/ServiceBenefits';
import { useTranslation } from '@/hooks/use-translation';

const ServiceBenefitsSection = () => {
  const { t } = useTranslation();
  
  const benefits = [
    {
      title: t("Restore Original Beauty"),
      description: t("Remove years of built-up dirt, grime, algae, and mildew to reveal the original beauty of your home's exterior surfaces.")
    },
    {
      title: t("Prevent Costly Damage"),
      description: t("Regular cleaning prevents organic growth and contaminants from deteriorating your siding, brick, or other exterior materials.")
    },
    {
      title: t("Healthier Home Environment"),
      description: t("Eliminate mold, mildew, and allergens from exterior surfaces that can affect indoor air quality and trigger allergies.")
    },
    {
      title: t("Increase Property Value"),
      description: t("A clean exterior significantly enhances curb appeal and can increase your property's market value by up to 5-10%.")
    },
    {
      title: t("Prepare for Painting"),
      description: t("Create the perfect clean surface if you're planning to paint or stain your home's exterior in the near future.")
    },
    {
      title: t("Safe, Eco-Friendly Process"),
      description: t("Our soft washing techniques and biodegradable cleaning solutions are safe for your home, family, pets, and landscaping.")
    }
  ];
  
  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-4">{t("Benefits of Professional House Washing")}</h2>
      <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">{t("Regular exterior cleaning provides numerous advantages for your home's appearance and longevity")}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold">{benefit.title}</h3>
            </div>
            <p className="text-gray-600">{benefit.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ServiceBenefitsSection;
