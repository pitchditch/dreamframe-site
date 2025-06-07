import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Home, Building2, Building, CheckCircle, Star, Phone, MessageSquare, ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';

const PropertySpecificSection = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const propertyTypes = [
    {
      icon: Home,
      title: t("Residential Homes"),
      subtitle: t("Fast, affordable exterior home cleaning"),
      shortDescription: t("Transform your home's appearance with our comprehensive exterior cleaning services."),
      services: [
        t("Soft washing & pressure washing"),
        t("Driveways, siding, windows & gutters"), 
        t("Licensed, insured, guaranteed"),
        t("Same-day quotes available")
      ],
      highlights: [
        t("✓ Fully insured & licensed"),
        t("✓ Soft wash safe on all surfaces"),
        t("✓ Fast quotes — no hidden fees"),
        t("✓ Available in Surrey, Langley & More")
      ],
      link: "/services/window-cleaning",
      buttonText: t("Get Instant Quote"),
      secondaryButton: t("Learn More"),
      pricing: t("From $189"),
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      gradient: "from-blue-50 to-blue-100",
      emoji: "🏡"
    },
    {
      icon: Building2,
      title: t("Commercial Buildings"),
      subtitle: t("Impress clients with a spotless exterior"),
      shortDescription: t("Maintain a professional image with our commercial exterior cleaning services."),
      services: [
        t("Building facade washing"),
        t("Storefronts & professional signage"),
        t("Concrete paths & parking lots"),
        t("Monthly maintenance plans")
      ],
      highlights: [
        t("✓ Flexible scheduling"),
        t("✓ After-hours service available"),
        t("✓ Monthly maintenance plans"),
        t("✓ Fully insured & WCB covered")
      ],
      link: "/services/commercial-window-cleaning",
      buttonText: t("Get Commercial Quote"),
      secondaryButton: t("View Services"),
      pricing: t("Custom pricing"),
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
      gradient: "from-green-50 to-green-100",
      emoji: "🏢"
    },
    {
      icon: Building,
      title: t("Multi-Story Apartments"),
      subtitle: t("Safe & scalable cleaning for complexes"),
      shortDescription: t("Expert cleaning services for apartment buildings, condos, and high-rise residential properties."),
      services: [
        t("Soft wash for siding & balconies"),
        t("Exterior windows (up to 5 stories)"),
        t("Common areas & entrance cleaning"),
        t("Detailed reporting & before/afters")
      ],
      highlights: [
        t("✓ Work with strata & property managers"),
        t("✓ Fast scheduling + strata discounts"),
        t("✓ Reach heights safely without scaffolding"),
        t("✓ Volume discounts for multiple units")
      ],
      link: "/services/window-cleaning",
      buttonText: t("Request Strata Quote"),
      secondaryButton: t("Strata Info"),
      pricing: t("Volume discounts"),
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100",
      gradient: "from-purple-50 to-purple-100",
      emoji: "🏬"
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = isMobile ? 300 : 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollToSection = () => {
    const element = document.getElementById('property-services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    const element = document.getElementById('property-services');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <>
      {/* Floating Anchor Button */}
      <div className="fixed top-20 right-4 z-30 animate-bounce">
        <Button
          onClick={scrollToSection}
          className="bg-bc-red/90 hover:bg-bc-red text-white rounded-full p-3 shadow-lg backdrop-blur-sm"
          size="sm"
        >
          <ArrowDown className="w-4 h-4" />
          <span className="hidden md:inline ml-2">Our Services</span>
        </Button>
      </div>

      <section 
        id="property-services"
        className={`py-16 md:py-20 relative overflow-hidden transition-all duration-1000 ${
          isVisible ? 'animate-fade-in' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `url('/lovable-uploads/12d4233e-3fc6-4af4-9c06-3f0b56849154.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Enhanced overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Star className="w-6 h-6 text-yellow-400 fill-current drop-shadow-lg animate-pulse" />
              <span className="text-white font-bold text-lg uppercase tracking-wide drop-shadow-lg">
                Transform Your Property Today
              </span>
              <Star className="w-6 h-6 text-yellow-400 fill-current drop-shadow-lg animate-pulse" />
            </div>
            <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl lg:text-6xl'} font-bold mb-6 text-white drop-shadow-lg`}>
              {t("Which Property Type")}
              <span className="block text-yellow-400 drop-shadow-lg">{t("Do You Need Cleaned?")}</span>
            </h2>
            <p className={`${isMobile ? 'text-lg' : 'text-xl md:text-2xl'} text-white/95 max-w-4xl mx-auto leading-relaxed drop-shadow-lg font-medium`}>
              {t("Professional exterior cleaning in Surrey, White Rock & Metro Vancouver")}
            </p>
          </div>

          {/* Horizontal Scrollable Cards */}
          <div className="relative">
            {/* Scroll Navigation - Desktop */}
            {!isMobile && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white border-0 shadow-lg ${
                    !canScrollLeft ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={() => scroll('left')}
                  disabled={!canScrollLeft}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                
                <Button
                  variant="outline"
                  size="icon"
                  className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white border-0 shadow-lg ${
                    !canScrollRight ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={() => scroll('right')}
                  disabled={!canScrollRight}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </>
            )}

            {/* Cards Container */}
            <div
              ref={scrollRef}
              className={`${
                isMobile 
                  ? 'flex flex-col gap-6' 
                  : 'flex gap-8 overflow-x-auto scrollbar-hide px-12'
              } scroll-smooth`}
              onScroll={handleScroll}
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {propertyTypes.map((property, index) => {
                const IconComponent = property.icon;
                return (
                  <Card 
                    key={index} 
                    className={`${
                      isMobile ? 'w-full' : 'min-w-[380px] w-[380px]'
                    } group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 overflow-hidden bg-white/95 backdrop-blur-sm animate-slide-in`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {/* Card Header */}
                    <div className={`relative bg-gradient-to-br ${property.gradient} h-32 flex items-center justify-center overflow-hidden`}>
                      <div className="absolute top-4 left-4 text-3xl animate-bounce">
                        {property.emoji}
                      </div>
                      <div className={`w-20 h-20 ${property.iconBg} rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className={`w-10 h-10 ${property.iconColor}`} />
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <div className="bg-bc-red text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
                          {property.pricing}
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold mb-2 text-gray-900 group-hover:text-bc-red transition-colors">
                          {property.title}
                        </h3>
                        <p className="text-bc-red font-semibold text-sm mb-3">
                          {property.subtitle}
                        </p>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {property.shortDescription}
                        </p>
                      </div>
                      
                      {/* Services */}
                      <div className="mb-4">
                        <h4 className="font-bold mb-2 text-gray-800 flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-bc-red flex-shrink-0" />
                          {t("What's Included")}
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {property.services.map((service, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-bc-red rounded-full mt-2 flex-shrink-0"></div>
                              <span>{service}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Highlights */}
                      <div className="mb-6">
                        <h4 className="font-bold mb-2 text-gray-800 flex items-center gap-2 text-sm">
                          <Star className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {t("Why Choose Us")}
                        </h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {property.highlights.slice(0, 3).map((highlight, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* CTAs */}
                      <div className="space-y-3">
                        <Button 
                          asChild 
                          className="w-full bg-bc-red hover:bg-red-700 text-white font-bold py-3 text-base shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                        >
                          <Link to={property.link}>
                            <Phone className="w-4 h-4 mr-2" />
                            {property.buttonText}
                          </Link>
                        </Button>
                        
                        <Button 
                          asChild 
                          variant="outline" 
                          className="w-full border-2 border-bc-red text-bc-red hover:bg-bc-red hover:text-white font-semibold py-3 transition-all duration-300"
                        >
                          <Link to={property.link}>
                            {property.secondaryButton}
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {t("Ready to Get Started?")}
              </h3>
              <p className="text-gray-600 mb-6">
                {t("Get your free quote in under 60 seconds. No pressure, just honest pricing.")}
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild size="lg" className="bg-bc-red hover:bg-red-700 text-white font-bold shadow-lg">
                  <Link to="/calculator">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Get Free Quote
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 border-bc-red text-bc-red hover:bg-bc-red hover:text-white">
                  <a href="tel:7788087620">
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.6s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default PropertySpecificSection;
