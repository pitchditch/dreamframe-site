
import React from 'react';
import { MapPin, Home, Handshake, Heart, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';

const DoorToDoorSection = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-2 mb-4">
              <Car className="w-5 h-5 text-bc-red" />
              <span className="text-bc-red font-semibold text-sm uppercase tracking-wide">Local & Personal</span>
            </div>
            
            <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl lg:text-5xl'} font-bold mb-4 md:mb-6 text-gray-900 leading-tight`}>
              {t("Have You Seen Our Red Car or Met Me Door-to-Door?")}
            </h2>
            
            <p className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} text-gray-600 mb-6 leading-relaxed`}>
              {isMobile 
                ? t("You've probably spotted our distinctive red vehicle around White Rock! As a local resident, I personally visit neighborhoods to meet homeowners and discuss how BC Pressure Washing can help maintain their properties.")
                : t("That's us! You've probably spotted our distinctive red company vehicle along Marine Drive or throughout White Rock and Surrey. As a proud local resident, I personally visit neighborhoods throughout the Metro Vancouver area to meet homeowners face-to-face and discuss how BC Pressure Washing can help maintain and beautify their properties.")
              }
            </p>

            {/* Special Red Car Offer */}
            <div className="bg-gradient-to-r from-bc-red/10 to-red-100 rounded-lg p-6 mb-6 border border-bc-red/20">
              <div className="flex items-center gap-3 mb-3">
                <Car className="w-6 h-6 text-bc-red" />
                <h3 className="font-bold text-lg text-gray-900">{t("🚗 Special Red Car Discount!")}</h3>
              </div>
              <p className="text-gray-700 mb-4">
                {t("Mention you've seen our red car on Marine Drive or around the neighborhood when you contact us and receive 10% OFF your service!")}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="bg-bc-red/10 rounded-full p-2 mt-1">
                  <Home className="w-4 h-4 text-bc-red" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{t("Neighborhood Expert")}</h4>
                  <p className="text-sm text-gray-600">{t("I know the local area and understand property needs")}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-bc-red/10 rounded-full p-2 mt-1">
                  <Handshake className="w-4 h-4 text-bc-red" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{t("Personal Touch")}</h4>
                  <p className="text-sm text-gray-600">{t("Direct conversation about your specific needs")}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-bc-red/10 rounded-full p-2 mt-1">
                  <Heart className="w-4 h-4 text-bc-red" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{t("Community Focused")}</h4>
                  <p className="text-sm text-gray-600">{t("Supporting local homeowners with quality service")}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-bc-red/10 rounded-full p-2 mt-1">
                  <MapPin className="w-4 h-4 text-bc-red" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{t("Door-to-Door Service")}</h4>
                  <p className="text-sm text-gray-600">{t("Meeting you where you are, when it's convenient")}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm mb-6">
              <p className="text-gray-700 italic mb-4">
                "{t("When I knock on your door or when you see my red car around town, it's not just about business—it's about building relationships with my neighbors and ensuring every property in our community looks its best.")}"
              </p>
              <div className="flex items-center gap-3">
                <img 
                  src="/lovable-uploads/069112d9-e61f-4def-94ed-7f1c34172bfd.png"
                  alt="Jayden Fisher - Owner" 
                  className="w-12 h-12 rounded-full border-2 border-gray-200"
                />
                <div>
                  <p className="font-semibold text-gray-900">Jayden Fisher</p>
                  <p className="text-sm text-gray-600">{t("Owner & Operator")}</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="bg-bc-red hover:bg-red-700 text-white">
                <Link to="/contact">
                  {t("Claim Your 10% Red Car Discount")}
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="tel:778-808-7620">
                  {t("Call")} (778) 808-7620
                </a>
              </Button>
            </div>
          </div>
          
          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <img 
                src="/lovable-uploads/9dc6484c-91bb-4ae3-994d-f6cfefbf7c63.png"
                alt="BC Pressure Washing red car at Marine Drive - door-to-door service"
                className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              
              {/* Floating badge */}
              <div className="absolute top-6 left-6 bg-white rounded-full px-4 py-2 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-900">{t("Available in Your Area")}</span>
                </div>
              </div>

              {/* Red Car Badge */}
              <div className="absolute bottom-6 right-6 bg-bc-red rounded-full px-4 py-2 shadow-lg">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-white" />
                  <span className="text-sm font-medium text-white">{t("10% Off Discount")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoorToDoorSection;
