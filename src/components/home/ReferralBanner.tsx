
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, DollarSign } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

const ReferralBanner = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="bg-blue-100 p-4 rounded-full">
                <MessageCircle className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                {t("Spread the Word, Save 5%!")}
              </h2>
              <div className="text-gray-700 mb-4 space-y-2">
                <p>
                  {t("Recommend us in your local Facebook group and tag our page.")}
                </p>
                <p>
                  {t("Send us a screenshot, and we'll refund you 5% of your service — no strings attached.")}
                </p>
                <div className="flex items-center justify-center md:justify-start gap-2 text-green-600 font-semibold">
                  <DollarSign className="w-5 h-5" />
                  <span>{t("Bonus: If someone books from your post, you'll get a $20 credit too!")}</span>
                </div>
              </div>
              <div className="text-sm text-gray-600 mb-4">
                <strong>{t("How to tag us:")}</strong> {t("In your group post, type @BC Pressure Washing and select our business page.")}
              </div>
            </div>
            
            {/* CTA Button */}
            <div className="flex-shrink-0">
              <Button 
                asChild 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
              >
                <a href="mailto:info@bcpressurewashing.ca?subject=Referral Screenshot&body=Hi! I shared your business in a local Facebook group. Please find the screenshot attached.">
                  📸 {t("Submit Screenshot for 5% Back")}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReferralBanner;
