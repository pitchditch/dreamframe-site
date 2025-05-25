
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Home, Building2, Building } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

const PropertySpecificSection = () => {
  const { t } = useTranslation();
  
  const propertyTypes = [
    {
      icon: Home,
      title: t("Residential Homes"),
      description: t("Comprehensive exterior cleaning for single-family homes, townhouses, and duplexes."),
      services: [
        t("Exterior & interior window cleaning"),
        t("Soft wash siding treatment"),
        t("Interior debris removal"),
        t("Roof inspection")
      ],
      specialFeatures: [
        t("Family-safe cleaning products"),
        t("Flexible scheduling around your routine"),
        t("Landscaping protection during service"),
        t("Interior window cleaning available")
      ],
      image: "/lovable-uploads/2aa44443-acb7-47d2-a63d-295c7414a46d.png",
      link: "/services/window-cleaning",
      buttonText: t("Get Quote for Residential Homes")
    },
    {
      icon: Building2,
      title: t("Commercial Buildings"),
      description: t("Professional exterior cleaning services for offices, retail spaces, and business complexes."),
      services: [
        t("High-rise window cleaning"),
        t("Building facade pressure washing"),
        t("Commercial gutter systems"),
        t("Maintenance programs available")
      ],
      specialFeatures: [
        t("After-hours & weekend scheduling"),
        t("Fully insured & bonded"),
        t("Custom maintenance contracts"),
        t("Minimal business disruption")
      ],
      image: "/lovable-uploads/44fea6cf-3991-4456-9cd6-04d2a1d836fd.png",
      link: "/services/commercial-window-cleaning",
      buttonText: t("Get Quote for Commercial Buildings")
    },
    {
      icon: Building,
      title: t("Multi-Story Apartments"),
      description: t("Specialized cleaning for apartment complexes, condos, and high-rise residential buildings."),
      services: [
        t("Water-fed pole window cleaning"),
        t("Balcony & exterior cleaning"),
        t("Common area maintenance"),
        t("Strata-approved services")
      ],
      specialFeatures: [
        t("Reach up to 5 stories safely"),
        t("Strata council coordination"),
        t("Bulk pricing for multiple units"),
        t("Regular maintenance schedules")
      ],
      image: "/lovable-uploads/14d8f5da-5c4c-4be3-a974-8f34da54186f.png",
      link: "/services/window-cleaning",
      buttonText: t("Get Quote for Multi-Story Apartments")
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("Tailored Services for Every Property Type")}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t("From residential homes to commercial buildings, we provide specialized cleaning solutions designed for your specific property needs.")}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {propertyTypes.map((property, index) => {
            const IconComponent = property.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-bc-red/10 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="w-8 h-8 text-bc-red" />
                    </div>
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3">{property.title}</h3>
                  <p className="text-gray-600 mb-4">{property.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2 text-bc-red">{t("Our Services")}:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {property.services.map((service, idx) => (
                        <li key={idx} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-bc-red rounded-full mr-2"></div>
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2 text-bc-red">{t("Why Choose Us")}:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {property.specialFeatures.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button asChild className="w-full bg-bc-red hover:bg-red-700">
                    <Link to={property.link}>
                      {property.buttonText}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PropertySpecificSection;
