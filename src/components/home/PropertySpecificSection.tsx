
import React from 'react';
import { useTranslation } from '@/hooks/use-translation';
import { Button } from '@/components/ui/button';
import { ArrowRight, Home, Building2, Warehouse } from 'lucide-react';
import { Link } from 'react-router-dom';

const PropertySpecificSection = () => {
  const { t } = useTranslation();

  const propertyTypes = [
    {
      icon: Home,
      title: t("Residential"),
      description: t("Complete exterior cleaning for homes, condos, and townhouses"),
      features: [
        t("Window cleaning"),
        t("Pressure washing"),
        t("Gutter cleaning"),
        t("Roof cleaning")
      ],
      cta: t("Get Home Quote"),
      link: "/calculator"
    },
    {
      icon: Building2,
      title: t("Commercial"),
      description: t("Professional cleaning services for offices, retail, and multi-unit buildings"),
      features: [
        t("Storefront cleaning"),
        t("Building maintenance"),
        t("Scheduled service"),
        t("Emergency cleaning")
      ],
      cta: t("Commercial Services"),
      link: "/commercial"
    },
    {
      icon: Warehouse,
      title: t("Industrial"),
      description: t("Heavy-duty cleaning for warehouses, factories, and industrial facilities"),
      features: [
        t("Equipment cleaning"),
        t("Facility maintenance"),
        t("Safety compliance"),
        t("Specialized solutions")
      ],
      cta: t("Industrial Quote"),
      link: "/calculator"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
            {t("Ready to Transform Your Property?")}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t("Whether residential, commercial, or industrial - we have specialized cleaning solutions for every property type")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {propertyTypes.map((property, index) => {
            const IconComponent = property.icon;
            return (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-bc-red/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <IconComponent className="w-8 h-8 text-bc-red" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{property.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{property.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {property.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center justify-center text-gray-700">
                      <div className="w-2 h-2 bg-bc-red rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  asChild 
                  variant="bc-red" 
                  size="lg" 
                  className="w-full rounded-full font-semibold hover:scale-105 transition-all duration-300"
                >
                  <Link to={property.link}>
                    {property.cta} <ArrowRight className="ml-2" size={18} />
                  </Link>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PropertySpecificSection;
