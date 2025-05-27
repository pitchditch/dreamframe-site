
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/use-translation';

const RedCarSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-6 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4 items-center">
            <div>
              <img 
                src="/lovable-uploads/9dc6484c-91bb-4ae3-994d-f6cfefbf7c63.png" 
                alt="BC Pressure Washing Service Vehicle at White Rock Beach" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div>
              <h2 className="text-lg font-bold mb-2">{t("Have You Seen Our Red Car or Met Me Door-to-Door?")}</h2>
              <p className="text-gray-700 mb-2 text-sm">
                {t("That's us! As a local exterior cleaning expert serving White Rock and the Lower Mainland, you've probably spotted our distinctive red company vehicle along Marine Drive or throughout the neighborhood.")}
              </p>
              <div className="p-2 bg-yellow-50 rounded-lg border border-yellow-200 mb-3">
                <p className="font-bold text-gray-800 mb-1 text-xs">{t("🚗 Special Offer")}</p>
                <p className="text-gray-700 text-xs">{t("Mention you've seen our red car on Marine Drive when you contact us and receive 10% OFF your service!")}</p>
                <div className="mt-2">
                  <Button asChild variant="bc-red" size="sm" className="w-full sm:w-auto text-xs">
                    <Link to="/contact">
                      {t("Claim Your 10% Discount")}
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center p-2 bg-gray-100 rounded-lg">
                <img 
                  src="/lovable-uploads/9ab5a05b-8db4-45b1-b31f-73f16bbc49a0.png"
                  alt="Jayden Fisher, Owner" 
                  className="w-10 h-10 rounded-full mr-2 border-2 border-bc-red object-cover"
                />
                <div>
                  <p className="font-semibold text-xs">"{t("I'm personally committed to the quality of every service we provide.")}"</p>
                  <p className="text-bc-red text-xs">{t("— Jayden Fisher, Owner")}</p>
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
