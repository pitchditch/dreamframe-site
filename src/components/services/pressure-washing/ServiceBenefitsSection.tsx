
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
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <ServiceBenefits 
          title={t("Benefits of Professional House Washing")}
          subtitle={t("Regular exterior cleaning provides numerous advantages for your home's appearance and longevity")}
          benefits={benefits} 
        />
      </div>
    </section>
  );
};

export default ServiceBenefitsSection;
