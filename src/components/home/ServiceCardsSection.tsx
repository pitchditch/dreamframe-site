
import React from 'react';
import { Button } from '../ui/button';
import { Phone, Home, Building, Building2 } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { Link } from 'react-router-dom';

const ServiceCardsSection = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: <Home className="w-8 h-8 text-bc-red" />,
      emoji: "🏠",
      title: t("Residential Homes"),
      subtitle: t("Fast, affordable exterior home cleaning"),
      services: [
        "🧼 " + t("House washing (vinyl/siding/brick)"),
        "🪟 " + t("Window & frame cleaning"),
        "🚿 " + t("Driveway & patio power washing"),
        "🏢 " + t("Gutter clearing")
      ],
      whyUs: [
        "✅ " + t("Fully insured & licensed"),
        "✅ " + t("Soft wash safe on all surfaces"),
        "✅ " + t("Fast quotes — no hidden fees")
      ],
      locations: t("Surrey, Coquitlam, Langley & More"),
      ctaText: t("Get Free Home Quote"),
      ctaLink: "/calculator"
    },
    {
      icon: <Building className="w-8 h-8 text-bc-red" />,
      emoji: "🏢",
      title: t("Commercial Buildings"),
      subtitle: t("Impress clients with a spotless exterior"),
      services: [
        "🧼 " + t("Building facade washing"),
        "🪟 " + t("Storefronts & signage"),
        "🚿 " + t("Concrete paths & walkways"),
        "🏢 " + t("Parking lot cleaning")
      ],
      whyUs: [
        "✅ " + t("Flexible scheduling"),
        "✅ " + t("After-hours service"),
        "✅ " + t("Monthly maintenance plans")
      ],
      locations: "",
      ctaText: t("Get Commercial Quote"),
      ctaLink: "/services/commercial-pressure-washing"
    },
    {
      icon: <Building2 className="w-8 h-8 text-bc-red" />,
      emoji: "🏘",
      title: t("Multi-Story Apartments"),
      subtitle: t("Safe & scalable cleaning for complexes"),
      services: [
        "🧼 " + t("Soft wash for siding & balconies"),
        "🪟 " + t("Exterior window cleaning (up to 5 stories)"),
        "🚿 " + t("Common areas & garbage zones")
      ],
      whyUs: [
        "✅ " + t("Work with strata & property managers"),
        "✅ " + t("Detailed reporting & before/afters"),
        "✅ " + t("Fast scheduling + strata discounts")
      ],
      locations: "",
      ctaText: t("Request Strata Quote"),
      ctaLink: "/contact"
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t("Professional Cleaning Services")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("Choose the perfect service for your property type")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-bc-red/20"
            >
              {/* Card Header */}
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">{service.emoji}</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{service.subtitle}</p>
                </div>
              </div>

              {/* Services Include */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2 text-sm">✅ {t("Services Include")}:</h4>
                <ul className="space-y-1">
                  {service.services.map((item, idx) => (
                    <li key={idx} className="text-sm text-gray-600">{item}</li>
                  ))}
                </ul>
              </div>

              {/* Why Us */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2 text-sm">💡 {t("Why Us")}:</h4>
                <ul className="space-y-1">
                  {service.whyUs.map((item, idx) => (
                    <li key={idx} className="text-sm text-gray-600">{item}</li>
                  ))}
                </ul>
              </div>

              {/* Locations (if provided) */}
              {service.locations && (
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-1 text-sm">📍 {t("Available in")}:</h4>
                  <p className="text-sm text-gray-600">{service.locations}</p>
                </div>
              )}

              {/* CTA Button */}
              <Link to={service.ctaLink} className="block">
                <Button 
                  variant="bc-red" 
                  className="w-full mt-4 rounded-lg font-semibold text-sm py-3 hover:scale-105 transition-transform duration-200"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {service.ctaText}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">{t("Not sure which service you need?")}</p>
          <Link to="/contact">
            <Button 
              variant="outline" 
              size="lg"
              className="border-bc-red text-bc-red hover:bg-bc-red hover:text-white transition-colors duration-300"
            >
              <Phone className="w-4 h-4 mr-2" />
              {t("Call (778) 808-7620 for Expert Advice")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceCardsSection;
