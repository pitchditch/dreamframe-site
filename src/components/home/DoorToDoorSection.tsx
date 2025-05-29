
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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {t("Door-to-Door Service")}
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            {t("We come directly to your property for convenient, professional cleaning services.")}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
          <div>
            <div className="flex items-center mb-4">
              <Car className="text-bc-red mr-3" size={32} />
              <h3 className="text-xl font-semibold">
                {t("Convenient Service")}
              </h3>
            </div>
            <p className="text-gray-700 mb-6">
              {t("No need to travel or drop off your items. We bring our professional equipment and expertise directly to your door.")}
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-bc-red rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-gray-700">{t("Scheduled at your convenience")}</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-bc-red rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-gray-700">{t("Professional equipment brought to you")}</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-bc-red rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-gray-700">{t("No disruption to your day")}</span>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <img 
              src="/lovable-uploads/9dc6484c-91bb-4ae3-994d-f6cfefbf7c63.png" 
              alt={t("BC Pressure Washing Service Vehicle")}
              className="rounded-lg shadow-lg w-full mb-4"
            />
            <Button asChild variant="bc-red" size="lg">
              <Link to="/calculator">
                {t("Schedule Service")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoorToDoorSection;
