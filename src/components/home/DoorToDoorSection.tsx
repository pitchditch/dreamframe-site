
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
    <section className="py-8 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Car className="w-5 h-5 text-bc-red" />
            <span className="text-bc-red font-semibold text-sm uppercase tracking-wide">Local & Personal</span>
          </div>
          
          <h2 className={`${isMobile ? 'text-xl' : 'text-2xl md:text-3xl'} font-bold mb-4 text-gray-900 leading-tight`}>
            {t("Have You Seen Our Red Car or Met Me Door-to-Door?")}
          </h2>
          
          <p className={`${isMobile ? 'text-sm' : 'text-base md:text-lg'} text-gray-600 mb-6 leading-relaxed max-w-2xl mx-auto`}>
            {t("You've probably spotted our distinctive red vehicle around White Rock! As a local resident, I personally visit neighborhoods to meet homeowners and discuss how BC Pressure Washing can help maintain their properties.")}
          </p>

          {/* Special Red Car Offer */}
          <div className="bg-gradient-to-r from-bc-red/10 to-red-100 rounded-lg p-6 mb-6 border border-bc-red/20 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Car className="w-6 h-6 text-bc-red" />
              <h3 className="font-bold text-lg text-gray-900">{t("🚗 Special Red Car Discount!")}</h3>
            </div>
            <p className="text-gray-700 mb-4">
              {t("Mention you've seen our red car on Marine Drive or around the neighborhood when you contact us and receive 10% OFF your service!")}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 max-w-2xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="bg-bc-red/10 rounded-full p-2 mb-2">
                <Home className="w-4 h-4 text-bc-red" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1 text-sm">{t("Neighborhood Expert")}</h4>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-bc-red/10 rounded-full p-2 mb-2">
                <Handshake className="w-4 h-4 text-bc-red" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1 text-sm">{t("Personal Touch")}</h4>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-bc-red/10 rounded-full p-2 mb-2">
                <Heart className="w-4 h-4 text-bc-red" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1 text-sm">{t("Community Focused")}</h4>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-bc-red/10 rounded-full p-2 mb-2">
                <MapPin className="w-4 h-4 text-bc-red" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1 text-sm">{t("Door-to-Door Service")}</h4>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm mb-6 max-w-2xl mx-auto">
            <p className="text-gray-700 italic mb-4 text-sm">
              "{t("When I knock on your door or when you see my red car around town, it's not just about business—it's about building relationships with my neighbors and ensuring every property in our community looks its best.")}"
            </p>
            <div className="flex items-center justify-center gap-3">
              <img 
                src="/lovable-uploads/069112d9-e61f-4def-94ed-7f1c34172bfd.png"
                alt="Jayden Fisher - Owner" 
                className="w-10 h-10 rounded-full border-2 border-gray-200"
              />
              <div>
                <p className="font-semibold text-gray-900 text-sm">Jayden Fisher</p>
                <p className="text-xs text-gray-600">{t("Owner & Operator")}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
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
      </div>
    </section>
  );
};

export default DoorToDoorSection;
