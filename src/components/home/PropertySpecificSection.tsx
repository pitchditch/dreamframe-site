
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Home, Building2, Building, CheckCircle, Star, Phone, MessageSquare } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';
const PropertySpecificSection = () => {
  const {
    t
  } = useTranslation();
  const isMobile = useIsMobile();
  const propertyTypes = [{
    icon: Home,
    title: t("Residential Homes"),
    subtitle: t("Fast, affordable exterior home cleaning"),
    shortDescription: isMobile ? t("Complete exterior cleaning for your home.") : t("Transform your home's appearance with our comprehensive exterior cleaning services."),
    services: [t("House washing (vinyl/siding/brick)"), t("Window & frame cleaning"), t("Driveway & patio power washing"), t("Gutter clearing")],
    benefits: [t("Fully insured & licensed"), t("Soft wash safe on all surfaces"), t("Fast quotes — no hidden fees"), t("Available in Surrey, Langley & More")],
    link: "/services/window-cleaning",
    buttonText: t("Get Free Home Quote"),
    pricing: t("Starting from $150"),
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100"
  }, {
    icon: Building2,
    title: t("Commercial Buildings"),
    subtitle: t("Impress clients with a spotless exterior"),
    shortDescription: isMobile ? t("Professional cleaning for offices and retail spaces.") : t("Maintain a professional image with our commercial exterior cleaning services."),
    services: [t("Building facade washing"), t("Storefronts & signage"), t("Concrete paths & walkways"), t("Parking lot cleaning")],
    benefits: [t("Flexible scheduling"), t("After-hours service"), t("Monthly maintenance plans"), t("Fully insured & WCB covered")],
    link: "/services/commercial-window-cleaning",
    buttonText: t("Get Commercial Quote"),
    pricing: t("Custom pricing available"),
    iconColor: "text-green-600",
    iconBg: "bg-green-100"
  }, {
    icon: Building,
    title: t("Multi-Story Apartments"),
    subtitle: t("Safe & scalable cleaning for complexes"),
    shortDescription: isMobile ? t("Expert cleaning for apartment buildings and condos.") : t("Expert cleaning services for apartment buildings, condos, and high-rise residential properties."),
    services: [t("Soft wash for siding & balconies"), t("Exterior window cleaning (up to 5 stories)"), t("Common areas & garbage zones"), t("Detailed reporting & before/afters")],
    benefits: [t("Work with strata & property managers"), t("Fast scheduling + strata discounts"), t("Reach heights safely without scaffolding"), t("Volume discounts for multiple units")],
    link: "/services/window-cleaning",
    buttonText: t("Request Strata Quote"),
    pricing: t("Volume discounts available"),
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100"
  }];
  return <section className="py-12 md:py-16 relative overflow-hidden" style={{
    backgroundImage: `url('/lovable-uploads/12d4233e-3fc6-4af4-9c06-3f0b56849154.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed'
  }}>
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
            {isMobile ? t("Professional exterior cleaning in Surrey, White Rock & Metro Vancouver.") : t("From residential homes to commercial buildings, BC Pressure Washing delivers specialized exterior cleaning solutions designed for your specific property needs in Surrey, White Rock & Metro Vancouver.")}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {propertyTypes.map((property, index) => {
          const IconComponent = property.icon;
          return <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg overflow-hidden bg-white/95 backdrop-blur-sm">
                <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 h-48 md:h-56 flex items-center justify-center">
                  <div className={`w-24 h-24 ${property.iconBg} rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-12 h-12 ${property.iconColor}`} />
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-white border-2 border-bc-red text-bc-red px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      {property.pricing}
                    </div>
                  </div>
                </div>
                
                <CardContent className={`${isMobile ? 'p-4' : 'p-6 md:p-8'}`}>
                  <div className="mb-4">
                    <h3 className={`${isMobile ? 'text-lg' : 'text-xl md:text-2xl'} font-bold mb-2 text-gray-900`}>{property.title}</h3>
                    <p className={`text-bc-red font-semibold ${isMobile ? 'text-sm' : 'text-sm md:text-base'} mb-3`}>{property.subtitle}</p>
                    <p className={`text-gray-600 ${isMobile ? 'text-sm' : 'text-sm md:text-base'} leading-relaxed`}>
                      {property.shortDescription}
                    </p>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className={`font-bold mb-2 text-gray-800 flex items-center gap-2 ${isMobile ? 'text-sm' : ''}`}>
                      <CheckCircle className="w-4 h-4 text-bc-red flex-shrink-0" />
                      {t("Services Include")}
                    </h4>
                    <ul className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 space-y-1`}>
                      {property.services.slice(0, isMobile ? 3 : 4).map((service, idx) => <li key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-bc-red rounded-full mt-2 flex-shrink-0"></div>
                          <span>{service}</span>
                        </li>)}
                      {isMobile && property.services.length > 3 && <li className="text-bc-red font-medium">+ More services</li>}
                    </ul>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className={`font-bold mb-2 text-gray-800 flex items-center gap-2 ${isMobile ? 'text-sm' : ''}`}>
                      <Star className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {t("Why Choose Us")}
                    </h4>
                    <ul className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 space-y-1`}>
                      {property.benefits.slice(0, isMobile ? 2 : 4).map((benefit, idx) => <li key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{benefit}</span>
                        </li>)}
                    </ul>
                  </div>
                  
                  <Button asChild className={`w-full bg-bc-red hover:bg-red-700 text-white font-semibold ${isMobile ? 'py-2 text-sm' : 'py-3 text-base'} shadow-lg hover:shadow-xl transition-all duration-300`}>
                    <Link to={property.link}>
                      <Phone className="w-4 h-4 mr-2" />
                      {property.buttonText}
                    </Link>
                  </Button>
                </CardContent>
              </Card>;
        })}
        </div>

        {/* Bottom CTA Section */}
        
      </div>
    </section>;
};
export default PropertySpecificSection;
