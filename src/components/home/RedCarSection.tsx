
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/use-translation';

const RedCarSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-4 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="grid md:grid-cols-2 gap-3 items-center">
            <div>
              <img 
                src="/lovable-uploads/9dc6484c-91bb-4ae3-994d-f6cfefbf7c63.png" 
                alt="BC Pressure Washing Service Vehicle at White Rock Beach" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div>
              <h2 className="text-base font-bold mb-2">{t("Seen Our Red Car Around Town?")}</h2>
              <p className="text-gray-700 mb-2 text-sm">
                {t("You've probably spotted our red vehicle around White Rock! We're your local cleaning experts.")}
              </p>
              <div className="p-2 bg-yellow-50 rounded-lg border border-yellow-200 mb-2">
                <p className="font-bold text-gray-800 mb-1 text-xs">{t("🚗 Special Offer")}</p>
                <p className="text-gray-700 text-xs">{t("Mention our red car for 10% OFF!")}</p>
                <div className="mt-1">
                  <Button asChild variant="bc-red" size="sm" className="w-full sm:w-auto text-xs">
                    <Link to="/contact">
                      {t("Claim Discount")}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RedCarSection;
