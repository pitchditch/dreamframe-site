
import React from 'react';
import ServiceProcess from '@/components/ServiceProcess';
import { Search, Droplets, Sparkles } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

const ServiceProcessSection = () => {
  const { t } = useTranslation();
  
  const processes = [
    {
      title: t("Surface Inspection"),
      description: t("We carefully assess your home's exterior to determine the appropriate cleaning method and identify any areas needing special attention."),
      icon: <Search size={32} />
    },
    {
      title: t("Soft Washing Application"),
      description: t("Using specialized equipment, we apply eco-friendly cleaning solutions that break down organic growth and contaminants."),
      icon: <Droplets size={32} />
    },
    {
      title: t("Thorough Rinse"),
      description: t("We complete the process with a gentle, thorough rinse that removes all cleaning solutions and loosened contaminants."),
      icon: <Sparkles size={32} />
    }
  ];
  
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="section-title">{t("Our House Washing Process")}</h2>
      <p className="section-subtitle">
        {t("We follow a comprehensive approach to safely clean and restore your home's exterior")}
      </p>
      <ServiceProcess processes={processes} />
    </section>
  );
};

export default ServiceProcessSection;
