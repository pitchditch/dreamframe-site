
import React from 'react';
import { Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';

const DoorToDoorSection = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <section className="py-6 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Car className="w-5 h-5 text-bc-red" />
            <span className="text-bc-red font-semibold text-sm uppercase tracking-wide">Local & Personal</span>
          </div>
          
          <h2 className={`${isMobile ? 'text-lg' : 'text-xl md:text-2xl'} font-bold mb-3 text-gray-900`}>
            {t("Seen Our Red Car Around White Rock?")}
          </h2>
          
          <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600 mb-4`}>
            {t("You've probably spotted our red BC Pressure Washing vehicle! We're locally based and personally visit neighborhoods.")}
          </p>

          {/* Special Red Car Offer */}
          <div className="bg-gradient-to-r from-bc-red/10 to-red-100 rounded-lg p-4 mb-4 border border-bc-red/20 max-w-xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Car className="w-5 h-5 text-bc-red" />
              <h3 className="font-bold text-base text-gray-900">{t("🚗 Red Car Discount!")}</h3>
            </div>
            <p className="text-gray-700 mb-3 text-sm">
              {t("Mention you've seen our red car and get 10% OFF your service!")}
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm mb-4 max-w-xl mx-auto">
            <p className="text-gray-700 italic mb-3 text-sm">
              "{t("Building relationships with my neighbors and ensuring every property looks its best.")}"
            </p>
            <div className="flex items-center justify-center gap-2">
              <img 
                src="/lovable-uploads/069112d9-e61f-4def-94ed-7f1c34172bfd.png"
                alt="Jayden Fisher - Owner" 
                className="w-8 h-8 rounded-full border-2 border-gray-200"
              />
              <div>
                <p className="font-semibold text-gray-900 text-sm">Jayden Fisher</p>
                <p className="text-xs text-gray-600">{t("Owner")}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button asChild size="lg" className="bg-bc-red hover:bg-red-700 text-white">
              <Link to="/contact">
                {t("Claim 10% Red Car Discount")}
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
