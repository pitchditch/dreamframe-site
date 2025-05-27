
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Home, Building2, Building, CheckCircle, Star, Phone, MessageSquare } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';

const PropertySpecificSection = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  
  const propertyTypes = [
    {
      icon: Home,
      title: t("Residential Homes"),
      subtitle: t("Fast, affordable exterior home cleaning"),
      shortDescription: isMobile 
        ? t("Complete exterior cleaning for your home with eco-friendly products and flexible scheduling.")
        : t("Transform your home's appearance with our comprehensive exterior cleaning services. From single-family homes to townhouses, we deliver spotless results that boost curb appeal and property value."),
      services: [
        t("House washing (vinyl/siding/brick)"),
        t("Window & frame cleaning"),
        t("Driveway & patio power washing"),
        t("Gutter clearing")
      ],
      benefits: [
        t("Fully insured & licensed"),
        t("Soft wash safe on all surfaces"),
        t("Fast quotes — no hidden fees"),
        t("Available in Surrey, Langley & More")
      ],
      image: "/lovable-uploads/2aa44443-acb7-47d2-a63d-295c7414a46d.png",
      link: "/services/window-cleaning",
      buttonText: t("Get Free Home Quote"),
      pricing: t("Starting from $150")
    },
    {
      icon: Building2,
      title: t("Commercial Buildings"),
      subtitle: t("Impress clients with a spotless exterior"),
      shortDescription: isMobile
        ? t("Professional cleaning for offices, retail spaces, and business complexes with flexible scheduling.")
        : t("Maintain a professional image with our commercial exterior cleaning services. We work with offices, retail spaces, and business complexes to ensure your property makes the right impression."),
      services: [
        t("Building facade washing"),
        t("Storefronts & signage"),
        t("Concrete paths & walkways"),
        t("Parking lot cleaning")
      ],
      benefits: [
        t("Flexible scheduling"),
        t("After-hours service"),
        t("Monthly maintenance plans"),
        t("Fully insured & WCB covered")
      ],
      image: "/lovable-uploads/44fea6cf-3991-4456-9cd6-04d2a1d836fd.png",
      link: "/services/commercial-window-cleaning",
      buttonText: t("Get Commercial Quote"),
      pricing: t("Custom pricing available")
    },
    {
      icon: Building,
      title: t("Multi-Story Apartments"),
      subtitle: t("Safe & scalable cleaning for complexes"),
      shortDescription: isMobile
        ? t("Expert cleaning for apartment buildings and condos. Work directly with strata councils and property managers.")
        : t("Expert cleaning services for apartment buildings, condos, and high-rise residential properties. We work directly with strata councils and property managers for hassle-free maintenance."),
      services: [
        t("Soft wash for siding & balconies"),
        t("Exterior window cleaning (up to 5 stories)"),
        t("Common areas & garbage zones"),
        t("Detailed reporting & before/afters")
      ],
      benefits: [
        t("Work with strata & property managers"),
        t("Fast scheduling + strata discounts"),
        t("Reach heights safely without scaffolding"),
        t("Volume discounts for multiple units")
      ],
      image: "/lovable-uploads/14d8f5da-5c4c-4be3-a974-8f34da54186f.png",
      link: "/services/window-cleaning",
      buttonText: t("Request Strata Quote"),
      pricing: t("Volume discounts available")
    }
  ];

  return (
    <section 
      className="py-12 md:py-16 relative overflow-hidden"
      style={{
        backgroundImage: `url('/lovable-uploads/12d4233e-3fc6-4af4-9c06-3f0b56849154.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Enhanced overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section with improved text contrast */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-5 h-5 text-yellow-400 fill-current drop-shadow-lg" />
            <span className="text-white font-semibold text-sm uppercase tracking-wide drop-shadow-lg">Trusted Local Experts</span>
            <Star className="w-5 h-5 text-yellow-400 fill-current drop-shadow-lg" />
          </div>
          <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl lg:text-5xl'} font-bold mb-4 md:mb-6 text-white drop-shadow-lg`}>
            {t("Ready to Transform Your Property?")}
            <span className="block text-yellow-400 drop-shadow-lg">{t("Tailored Services for Every Need")}</span>
          </h2>
          <p className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} text-white max-w-4xl mx-auto leading-relaxed drop-shadow-lg font-medium`}>
            {isMobile 
              ? t("Professional exterior cleaning in Surrey, White Rock & Metro Vancouver.")
              : t("From residential homes to commercial buildings, BC Pressure Washing delivers specialized exterior cleaning solutions designed for your specific property needs in Surrey, White Rock & Metro Vancouver.")
            }
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
                
                <CardContent className={`${isMobile ? 'p-4' : 'p-6 md:p-8'}`}>
                  <div className="mb-4">
                    <h3 className={`${isMobile ? 'text-lg' : 'text-xl md:text-2xl'} font-bold mb-2 text-gray-900`}>{property.title}</h3>
                    <p className={`text-bc-red font-semibold ${isMobile ? 'text-sm' : 'text-sm md:text-base'} mb-3`}>{property.subtitle}</p>
                    <p className={`text-gray-600 ${isMobile ? 'text-sm' : 'text-sm md:text-base'} leading-relaxed`}>
                      {isMobile ? property.shortDescription : property.shortDescription}
                    </p>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className={`font-bold mb-2 text-gray-800 flex items-center gap-2 ${isMobile ? 'text-sm' : ''}`}>
                      <CheckCircle className="w-4 h-4 text-bc-red flex-shrink-0" />
                      {t("Services Include")}
                    </h4>
                    <ul className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 space-y-1`}>
                      {property.services.slice(0, isMobile ? 3 : 4).map((service, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-bc-red rounded-full mt-2 flex-shrink-0"></div>
                          <span>{service}</span>
                        </li>
                      ))}
                      {isMobile && property.services.length > 3 && (
                        <li className="text-bc-red font-medium">+ More services</li>
                      )}
                    </ul>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className={`font-bold mb-2 text-gray-800 flex items-center gap-2 ${isMobile ? 'text-sm' : ''}`}>
                      <Star className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {t("Why Choose Us")}
                    </h4>
                    <ul className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 space-y-1`}>
                      {property.benefits.slice(0, isMobile ? 2 : 4).map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button asChild className={`w-full bg-bc-red hover:bg-red-700 text-white font-semibold ${isMobile ? 'py-2 text-sm' : 'py-3 text-base'} shadow-lg hover:shadow-xl transition-all duration-300`}>
                    <Link to={property.link}>
                      <Phone className="w-4 h-4 mr-2" />
                      {property.buttonText}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className={`text-center ${isMobile ? 'mt-8 bg-bc-red/95 backdrop-blur-sm rounded-xl p-4' : 'mt-12 md:mt-16 bg-bc-red/95 backdrop-blur-sm rounded-2xl p-6 md:p-8'} text-white shadow-xl`}>
          <h3 className={`${isMobile ? 'text-xl' : 'text-2xl md:text-3xl'} font-bold mb-4`}>
            {t("Ready to Transform Your Property?")}
          </h3>
          <p className={`${isMobile ? 'text-base mb-4' : 'text-lg mb-6'} opacity-90`}>
            {isMobile 
              ? t("Get your free quote today!")
              : t("Get your free, no-obligation quote today. Same-day service available!")
            }
          </p>
          <div className={`flex ${isMobile ? 'flex-col gap-3' : 'flex-col sm:flex-row gap-4'} justify-center items-center`}>
            <Button asChild size={isMobile ? "default" : "lg"} variant="secondary" className={`bg-white text-bc-red hover:bg-gray-100 font-semibold ${isMobile ? 'w-full' : ''}`}>
              <a href="tel:778-808-7620">
                <Phone className="mr-2" size={isMobile ? 16 : 20} />
                {t("Call (778) 808-7620")}
              </a>
            </Button>
            <Button asChild size={isMobile ? "default" : "lg"} variant="outline" className={`border-white text-white hover:bg-white hover:text-bc-red font-semibold ${isMobile ? 'w-full' : ''}`}>
              <Link to="/contact">
                <MessageSquare className="mr-2" size={isMobile ? 16 : 20} />
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
