
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Home, Building2, Building, CheckCircle, Star } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

const PropertySpecificSection = () => {
  const { t } = useTranslation();
  
  const propertyTypes = [
    {
      icon: Home,
      title: t("Residential Homes"),
      subtitle: t("Complete exterior cleaning for your home"),
      description: t("Transform your home's appearance with our comprehensive exterior cleaning services. From single-family homes to townhouses, we deliver spotless results that boost curb appeal and property value."),
      services: [
        t("Professional window cleaning (interior & exterior)"),
        t("Soft wash house cleaning & siding treatment"),
        t("Driveway & walkway pressure washing"),
        t("Gutter cleaning & maintenance")
      ],
      benefits: [
        t("Eco-friendly, family-safe cleaning products"),
        t("Flexible scheduling around your lifestyle"),
        t("Complete landscaping protection"),
        t("100% satisfaction guarantee")
      ],
      image: "/lovable-uploads/2aa44443-acb7-47d2-a63d-295c7414a46d.png",
      link: "/services/window-cleaning",
      buttonText: t("Get Free Home Quote"),
      pricing: t("Starting from $150")
    },
    {
      icon: Building2,
      title: t("Commercial Buildings"),
      subtitle: t("Professional exterior cleaning for businesses"),
      description: t("Maintain a professional image with our commercial exterior cleaning services. We work with offices, retail spaces, and business complexes to ensure your property makes the right impression."),
      services: [
        t("High-rise window cleaning up to 5 stories"),
        t("Building facade pressure washing"),
        t("Commercial gutter systems cleaning"),
        t("Regular maintenance contracts available")
      ],
      benefits: [
        t("After-hours & weekend scheduling available"),
        t("Fully insured & WCB covered"),
        t("Custom maintenance programs"),
        t("Minimal disruption to business operations")
      ],
      image: "/lovable-uploads/44fea6cf-3991-4456-9cd6-04d2a1d836fd.png",
      link: "/services/commercial-window-cleaning",
      buttonText: t("Get Commercial Quote"),
      pricing: t("Custom pricing available")
    },
    {
      icon: Building,
      title: t("Multi-Story Apartments"),
      subtitle: t("Specialized cleaning for residential complexes"),
      description: t("Expert cleaning services for apartment buildings, condos, and high-rise residential properties. We work directly with strata councils and property managers for hassle-free maintenance."),
      services: [
        t("Water-fed pole window cleaning (up to 5 stories)"),
        t("Balcony & common area pressure washing"),
        t("Strata-approved cleaning processes"),
        t("Bulk unit pricing & scheduling")
      ],
      benefits: [
        t("Reach heights safely without scaffolding"),
        t("Direct strata council coordination"),
        t("Volume discounts for multiple units"),
        t("Flexible maintenance schedules")
      ],
      image: "/lovable-uploads/14d8f5da-5c4c-4be3-a974-8f34da54186f.png",
      link: "/services/window-cleaning",
      buttonText: t("Get Strata Quote"),
      pricing: t("Volume discounts available")
    }
  ];

  return (
    <section 
      className="py-12 md:py-16 relative overflow-hidden"
      style={{
        backgroundImage: `url('/lovable-uploads/069112d9-e61f-4def-94ed-7f1c34172bfd.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
            <span className="text-white font-semibold text-sm uppercase tracking-wide">Trusted Local Experts</span>
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-white">
            {t("Ready to Transform Your Property?")}
            <span className="block text-bc-red">{t("Tailored Services for Every Need")}</span>
          </h2>
          <p className="text-lg md:text-xl text-white max-w-4xl mx-auto leading-relaxed">
            {t("From residential homes to commercial buildings, BC Pressure Washing delivers specialized exterior cleaning solutions designed for your specific property needs in Surrey, White Rock & Metro Vancouver.")}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {propertyTypes.map((property, index) => {
            const IconComponent = property.icon;
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg overflow-hidden bg-white/95 backdrop-blur-sm">
                <div className="relative">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                      <IconComponent className="w-6 h-6 text-bc-red" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-bc-red text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {property.pricing}
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6 md:p-8">
                  <div className="mb-4">
                    <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-900">{property.title}</h3>
                    <p className="text-bc-red font-semibold text-sm md:text-base mb-3">{property.subtitle}</p>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">{property.description}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-bold mb-3 text-gray-800 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-bc-red" />
                      {t("Our Services")}
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      {property.services.map((service, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-bc-red rounded-full mt-2 flex-shrink-0"></div>
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-bold mb-3 text-gray-800 flex items-center gap-2">
                      <Star className="w-4 h-4 text-green-500" />
                      {t("Why Choose Us")}
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      {property.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button asChild className="w-full bg-bc-red hover:bg-red-700 text-white font-semibold py-3 text-base shadow-lg hover:shadow-xl transition-all duration-300">
                    <Link to={property.link}>
                      {property.buttonText}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-12 md:mt-16 bg-bc-red/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-white shadow-xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            {t("Ready to Transform Your Property?")}
          </h3>
          <p className="text-lg mb-6 opacity-90">
            {t("Get your free, no-obligation quote today. Same-day service available!")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" variant="secondary" className="bg-white text-bc-red hover:bg-gray-100 font-semibold">
              <a href="tel:778-808-7620">
                📞 {t("Call (778) 808-7620")}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-bc-red font-semibold">
              <Link to="/contact">
                {t("Get Free Quote Online")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertySpecificSection;
